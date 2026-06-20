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

// Permanently removes a task template. Earned stars stay in the ledger (P4),
// so the balance is unaffected — only the task itself goes away.
export async function deleteTask(taskId) {
  const db = await getDB();
  await db.delete('tasks', taskId);
}

// ── Today's board ─────────────────────────────────────────────────────────
// A task only appears on the child's board once a grown-up has added it "for
// today". The selection is keyed to the local day, so the board starts empty
// each morning and the parent picks again. Completing a task marks it done for
// today, which removes it from the board without touching the template.
export function todayKey(d = new Date()) {
  return d.toDateString();
}

export async function listTodayTasks(childId) {
  const db = await getDB();
  const today = todayKey();
  const all = await db.getAllFromIndex('tasks', 'by_child', childId);
  return all
    .filter(t => t.active && t.todayDate === today && t.doneDate !== today)
    .sort((a, b) => a.order - b.order);
}

export async function addTaskToToday(taskId) {
  const db = await getDB();
  const task = await db.get('tasks', taskId);
  if (!task) return;
  await db.put('tasks', { ...task, todayDate: todayKey(), doneDate: null });
}

export async function removeTaskFromToday(taskId) {
  const db = await getDB();
  const task = await db.get('tasks', taskId);
  if (!task) return;
  await db.put('tasks', { ...task, todayDate: null });
}

export async function markTaskDone(taskId) {
  const db = await getDB();
  const task = await db.get('tasks', taskId);
  if (!task) return;
  await db.put('tasks', { ...task, doneDate: todayKey() });
}

// ── Fade (P5) ─────────────────────────────────────────────────────────────
// Surfaces skill tasks the child is doing reliably, so the parent is prompted
// to start tapering (§11). A habit looks self-sustaining when the task earned
// on most days across its taper window and there is still room to fade.
export async function getFadeSuggestions(childId) {
  const db = await getDB();
  const tasks = (await db.getAllFromIndex('tasks', 'by_child', childId))
    .filter(t => t.active && t.mode === 'skill');
  const earns = (await db.getAllFromIndex('ledger', 'by_child', childId))
    .filter(e => e.type === 'earn');

  const now = Date.now();
  const suggestions = [];
  for (const t of tasks) {
    const fp = t.fadePlan || {};
    const window = fp.taperEvery > 0 ? fp.taperEvery : 14;
    const target = fp.targetStars ?? 0;
    if (t.maxStars <= target) continue; // already faded to its target

    const since = now - window * 24 * 60 * 60 * 1000;
    const days = new Set(
      earns
        .filter(e => e.taskId === t.id && e.ts >= since)
        .map(e => new Date(e.ts).toDateString())
    );
    const threshold = Math.max(3, Math.ceil(window * 0.7));
    if (days.size >= threshold) {
      suggestions.push({
        taskId: t.id,
        label: t.label,
        days: days.size,
        window,
        currentMax: t.maxStars,
        nextMax: Math.max(target, t.maxStars - 1),
      });
    }
  }
  return suggestions;
}

// Take one taper step: lower maxStars by one toward the fade target. This is a
// config change, never a ledger change — earned stars are permanent (P4).
export async function applyFadeStep(taskId) {
  const db = await getDB();
  const task = await db.get('tasks', taskId);
  if (!task) return;
  const target = task.fadePlan?.targetStars ?? 0;
  const nextMax = Math.max(target, task.maxStars - 1);
  await db.put('tasks', { ...task, maxStars: nextMax });
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

// Permanently removes a reward. Past redemptions stay in the ledger as history.
export async function deleteReward(rewardId) {
  const db = await getDB();
  await db.delete('rewards', rewardId);
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

// ── Data reset ─────────────────────────────────────────────────────────────
// Wipes everything on this device — children, tasks, rewards, stars, images
// and settings. Irreversible; the caller should confirm and then reload so the
// app re-seeds from scratch.
export async function clearAllData() {
  const db = await getDB();
  const stores = ['children', 'tasks', 'rewards', 'goals', 'ledger', 'images', 'settings'];
  const tx = db.transaction(stores, 'readwrite');
  await Promise.all(stores.map(s => tx.objectStore(s).clear()));
  await tx.done;
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

// Removes a child and everything tied to them: tasks, rewards, goal and the
// whole ledger. Shared images are left in place (they aren't owned per child).
export async function deleteChild(childId) {
  const db = await getDB();
  const tx = db.transaction(['children', 'tasks', 'rewards', 'goals', 'ledger'], 'readwrite');
  for (const store of ['tasks', 'rewards', 'ledger']) {
    const keys = await tx.objectStore(store).index('by_child').getAllKeys(childId);
    for (const key of keys) await tx.objectStore(store).delete(key);
  }
  await tx.objectStore('goals').delete(childId);
  await tx.objectStore('children').delete(childId);
  await tx.done;
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
  return {
    calmMode: false, sound: false, tts: false, highContrast: false,
    parentGate: true, capabilityCheck: true,
    puzzleOnTaskDone: false,
    puzzleTypes: ['shapeMatch', 'colorMatch', 'counting', 'emojiPair', 'addition', 'subtraction', 'multiplication'],
  };
}
