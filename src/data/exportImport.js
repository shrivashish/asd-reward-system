import { getDB } from './db';
import { getSettings } from './repo';

export async function exportBundle() {
  const db = await getDB();
  const [children, tasks, rewards, goals, ledger, settings] = await Promise.all([
    db.getAll('children'),
    db.getAll('tasks'),
    db.getAll('rewards'),
    db.getAll('goals'),
    db.getAll('ledger'),
    getSettings(),
  ]);

  const imageRecords = await db.getAll('images');
  const images = await Promise.all(
    imageRecords.map(async (r) => {
      const dataUrl = await blobToDataUrl(r.blob);
      return { imageId: r.imageId, dataUrl };
    })
  );

  const bundle = { version: 1, children, tasks, rewards, goals, ledger, settings, images };
  const json = JSON.stringify(bundle);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `star-board-backup-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function importBundle(file) {
  const text = await file.text();
  const bundle = JSON.parse(text);
  if (bundle.version !== 1) throw new Error('Unknown backup version');

  const db = await getDB();
  const tx = db.transaction(['children', 'tasks', 'rewards', 'goals', 'ledger', 'images', 'settings'], 'readwrite');

  for (const c of bundle.children) tx.objectStore('children').put(c);
  for (const t of bundle.tasks) tx.objectStore('tasks').put(t);
  for (const r of bundle.rewards) tx.objectStore('rewards').put(r);
  for (const g of bundle.goals) tx.objectStore('goals').put(g);
  for (const e of bundle.ledger) tx.objectStore('ledger').put(e);
  if (bundle.settings) tx.objectStore('settings').put({ key: 'main', value: bundle.settings });
  for (const img of (bundle.images || [])) {
    const blob = await dataUrlToBlob(img.dataUrl);
    tx.objectStore('images').put({ imageId: img.imageId, blob });
  }

  await tx.done;
}

function blobToDataUrl(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

async function dataUrlToBlob(dataUrl) {
  const res = await fetch(dataUrl);
  return res.blob();
}
