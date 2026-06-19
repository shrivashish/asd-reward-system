import { openDB } from 'idb';

const DB_NAME = 'star-board';
const DB_VERSION = 1;

let dbPromise = null;

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        db.createObjectStore('children', { keyPath: 'id' });

        const tasks = db.createObjectStore('tasks', { keyPath: 'id' });
        tasks.createIndex('by_child', 'childId');

        const rewards = db.createObjectStore('rewards', { keyPath: 'id' });
        rewards.createIndex('by_child', 'childId');

        db.createObjectStore('goals', { keyPath: 'childId' });

        const ledger = db.createObjectStore('ledger', { keyPath: 'id' });
        ledger.createIndex('by_child', 'childId');
        ledger.createIndex('by_child_ts', ['childId', 'ts']);

        db.createObjectStore('images', { keyPath: 'imageId' });

        db.createObjectStore('settings', { keyPath: 'key' });
      },
    });
  }
  return dbPromise;
}
