import { getDB } from './db';

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// ── Balance (always derived, never stored) ──────────────────────────────
export async function getBalance(childId) {
  const db = await getDB();
  const entries = await db.getAllFromIndex('ledger', 'by_child', childId);
  return entries.reduce((sum, e) => sum + e.amount, 0);
}

// ── Ledger writes (append-only, P4) ────────────────────────────────────
export async function addEarn(childId, taskId, amount, note = '') {
  if (amount <= 0) throw new Error('Earn amount must be positive');
  const db = await getDB();
  await db.add('ledger', { id: uid(), childId, type: 'earn', taskId, amount, ts: Date.now(), note });
}

export async function addRedeem(childId, rewardId, cost) {
  const db = await getDB();
  await db.add('ledger', { id: uid(), childId, type: 'redeem', rewardId, amount: -cost, ts: Date.now() });
}

export async function addCorrection(childId, amount, note) {
  const db = await getDB();
  await db.add('ledger', { id: uid(), childId, type: 'correction', amount, ts: Date.now(), note });
}

export async function getLedger(childId) {
  const db = await getDB();
  return db.getAllFromIndex('ledger', 'by_child', childId);
}

// ── Tasks ───────────────────────────────────────────────────────────────
export async function listTasks(childId, { activeOnly = true } = {}) {
  const db = await getDB();
  const all = await db.getAllFromIndex('tasks', 'by_child', childId);
  const filtered = activeOnly ? all.filter(t => t.active) : all;
  return filtered.sort((a, b) => a.order - b.order);
}

export async function upsertTask(task) {
  const db = await getDB();
  const toStore = { ...task, id: task.id || uid() };
  await db.put('tasks', toStore);
  return toStore;
}

export async function archiveTask(taskId) {
  const db = await getDB();
  const task = await db.get('tasks', taskId);
  if (task) await db.put('tasks', { ...task, active: false });
}

// ── Rewards ─────────────────────────────────────────────────────────────
export async function listRewards(childId) {
  const db = await getDB();
  const all = await db.getAllFromIndex('rewards', 'by_child', childId);
  return all.filter(r => r.active);
}

export async function upsertReward(reward) {
  const db = await getDB();
  const toStore = { ...reward, id: reward.id || uid() };
  await db.put('rewards', toStore);
  return toStore;
}

// ── Goals ────────────────────────────────────────────────────────────────
export async function getGoal(childId) {
  const db = await getDB();
  return db.get('goals', childId);
}

export async function setGoal(childId, rewardId) {
  const db = await getDB();
  await db.put('goals', { childId, rewardId });
}

// ── Images ───────────────────────────────────────────────────────────────
export async function putImage(blob) {
  const resized = await resizeBlob(blob, 512);
  const imageId = uid();
  const db = await getDB();
  await db.put('images', { imageId, blob: resized });
  return imageId;
}

export async function getImageURL(imageId) {
  if (!imageId) return null;
  const db = await getDB();
  const record = await db.get('images', imageId);
  if (!record) return null;
  return URL.createObjectURL(record.blob);
}

async function resizeBlob(blob, maxPx) {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const { width, height } = img;
      const scale = Math.min(1, maxPx / Math.max(width, height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(resolve, 'image/jpeg', 0.85);
    };
    img.src = url;
  });
}

// ── Children ─────────────────────────────────────────────────────────────
export async function listChildren() {
  const db = await getDB();
  return db.getAll('children');
}

export async function upsertChild(child) {
  const db = await getDB();
  const toStore = { ...child, id: child.id || uid() };
  await db.put('children', toStore);
  return toStore;
}

// ── Settings ──────────────────────────────────────────────────────────────
export async function getSettings() {
  const db = await getDB();
  const record = await db.get('settings', 'main');
  return record?.value ?? defaultSettings();
}

export async function setSettings(patch) {
  const db = await getDB();
  const current = await getSettings();
  await db.put('settings', { key: 'main', value: { ...current, ...patch } });
}

function defaultSettings() {
  return { calmMode: false, sound: false, tts: false, highContrast: false, parentGate: true, capabilityCheck: true };
}
