/* Proxy-free IndexedDB wrapper.
 *
 * Replaces the `idb` package, which wraps IndexedDB in a `Proxy`. Proxy is
 * unsupported on Safari 9 (iPad 2 / iOS 9) and cannot be polyfilled, so idb
 * throws on open and the app hangs on the loading screen.
 *
 * This shim implements just the slice of idb's API the app uses, with
 * cursor-based fallbacks for getAll / getAllKeys (also missing before
 * Safari 10.1). It works on everything from Safari 9 up to current engines.
 */

const idb =
  (typeof indexedDB !== 'undefined' && indexedDB) ||
  (typeof window !== 'undefined' &&
    (window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB)) ||
  null;

function req(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function txDone(tx) {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

// Walk a cursor over a store or index, collecting either values or primary keys.
// `query` (optional) narrows to a key or key range.
function cursorCollect(source, kind, query) {
  return new Promise((resolve, reject) => {
    const out = [];
    const request =
      query !== undefined && query !== null
        ? source.openCursor(query)
        : source.openCursor();
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) {
        resolve(out);
        return;
      }
      out.push(kind === 'key' ? cursor.primaryKey : cursor.value);
      cursor.continue();
    };
    request.onerror = () => reject(request.error);
  });
}

function getAllValues(source, query) {
  if (query === undefined || query === null) {
    if (typeof source.getAll === 'function') return req(source.getAll());
    return cursorCollect(source, 'value');
  }
  if (typeof source.getAll === 'function') return req(source.getAll(query));
  return cursorCollect(source, 'value', query);
}

function getAllKeys(source, query) {
  if (typeof source.getAllKeys === 'function') return req(source.getAllKeys(query));
  return cursorCollect(source, 'key', query);
}

function wrapTransaction(tx) {
  let donePromise = null;
  return {
    objectStore(name) {
      const store = tx.objectStore(name);
      return {
        clear: () => req(store.clear()),
        delete: (key) => req(store.delete(key)),
        get: (key) => req(store.get(key)),
        put: (value) => req(store.put(value)),
        add: (value) => req(store.add(value)),
        index(indexName) {
          const index = store.index(indexName);
          return {
            getAllKeys: (query) => getAllKeys(index, query),
            getAll: (query) => getAllValues(index, query),
          };
        },
      };
    },
    get done() {
      if (!donePromise) donePromise = txDone(tx);
      return donePromise;
    },
  };
}

function wrapDB(db) {
  const run = (storeName, mode, fn) => {
    const tx = db.transaction(storeName, mode);
    const result = fn(tx.objectStore(storeName));
    return result;
  };
  return {
    raw: db,
    get: (storeName, key) => run(storeName, 'readonly', (s) => req(s.get(key))),
    getAll: (storeName) => run(storeName, 'readonly', (s) => getAllValues(s)),
    getAllFromIndex: (storeName, indexName, query) =>
      run(storeName, 'readonly', (s) => getAllValues(s.index(indexName), query)),
    add: (storeName, value) => run(storeName, 'readwrite', (s) => req(s.add(value))),
    put: (storeName, value) => run(storeName, 'readwrite', (s) => req(s.put(value))),
    delete: (storeName, key) => run(storeName, 'readwrite', (s) => req(s.delete(key))),
    transaction: (storeNames, mode) => wrapTransaction(db.transaction(storeNames, mode)),
    close: () => db.close(),
  };
}

// Mirrors idb's openDB(name, version, { upgrade }). The raw IDBDatabase passed
// to upgrade already exposes createObjectStore / createIndex, so it's forwarded
// as-is (the app's upgrade callback only uses those).
export function openDB(name, version, { upgrade } = {}) {
  if (!idb) return Promise.reject(new Error('IndexedDB is not available'));
  return new Promise((resolve, reject) => {
    const request = idb.open(name, version);
    request.onupgradeneeded = () => {
      if (upgrade) upgrade(request.result);
    };
    request.onsuccess = () => resolve(wrapDB(request.result));
    request.onerror = () => reject(request.error);
    request.onblocked = () => {};
  });
}
