import { useState, useEffect } from 'react';
import { listChildren, upsertChild } from '../data/repo';
import { useApp } from '../state/AppContext';
import styles from './ChildScreen.module.css';

export default function ChildScreen() {
  const { currentChildId, setCurrentChildId, refreshChildren } = useApp();
  const [children, setChildren] = useState([]);
  const [editing, setEditing] = useState(null);

  async function load() {
    const kids = await listChildren();
    setChildren(kids);
  }

  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing.name.trim()) return;
    const saved = await upsertChild(editing);
    await refreshChildren();
    await load();
    if (!currentChildId) setCurrentChildId(saved.id);
    setEditing(null);
  }

  return (
    <div className={styles.wrap}>
      <h1 className={styles.h1}>Children</h1>

      {!editing && (
        <button className={styles.addBtn} onClick={() => setEditing({ name: '' })}>
          + Add child
        </button>
      )}

      {editing && (
        <div className={styles.editor}>
          <label className={styles.field}>
            Name
            <input
              className={styles.input}
              value={editing.name}
              onChange={e => setEditing(p => ({ ...p, name: e.target.value }))}
              placeholder="Child's name"
              autoFocus
            />
          </label>
          <div className={styles.actions}>
            <button className={styles.cancel} onClick={() => setEditing(null)}>Cancel</button>
            <button className={styles.save} onClick={save} disabled={!editing.name.trim()}>Save</button>
          </div>
        </div>
      )}

      <div className={styles.list}>
        {children.map(c => (
          <div key={c.id} className={`${styles.row} ${c.id === currentChildId ? styles.active : ''}`}>
            <span className={styles.avatar}>👤</span>
            <span className={styles.name}>{c.name}</span>
            <div className={styles.rowActions}>
              {c.id !== currentChildId && (
                <button className={styles.selectBtn} onClick={() => setCurrentChildId(c.id)}>
                  Select
                </button>
              )}
              {c.id === currentChildId && <span className={styles.activeTag}>Active</span>}
              <button className={styles.editBtn} onClick={() => setEditing({ ...c })}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
