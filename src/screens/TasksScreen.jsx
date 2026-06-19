import { useState, useEffect } from 'react';
import { listTasks, upsertTask, archiveTask } from '../data/repo';
import { useApp } from '../state/AppContext';
import ImagePicker from '../components/ImagePicker';
import ImageDisplay from '../components/ImageDisplay';
import styles from './TasksScreen.module.css';

const BLANK_TASK = {
  label: '', emoji: '⭐', imageId: null,
  maxStars: 3, mode: 'skill',
  capabilityNote: '', active: true, order: 0,
  fadePlan: { taperEvery: 14, targetStars: 1, note: '' },
};

export default function TasksScreen() {
  const { currentChildId, refresh } = useApp();
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);

  async function loadTasks() {
    if (!currentChildId) return;
    const all = await listTasks(currentChildId, { activeOnly: false });
    setTasks(all);
  }

  useEffect(() => { loadTasks(); }, [currentChildId]);

  async function save() {
    if (!editing.label.trim()) return;
    const order = editing.order ?? tasks.filter(t => t.active).length;
    await upsertTask({ ...editing, childId: currentChildId, order });
    await loadTasks();
    setEditing(null);
    refresh();
  }

  async function archive(id) {
    await archiveTask(id);
    await loadTasks();
    refresh();
  }

  return (
    <div className={styles.wrap}>
      <h1 className={styles.h1}>Tasks</h1>

      {!editing && (
        <button className={styles.addBtn} onClick={() => setEditing({ ...BLANK_TASK })}>
          + Add Task
        </button>
      )}

      {editing && (
        <div className={styles.editor}>
          <h2 className={styles.editorTitle}>{editing.id ? 'Edit Task' : 'New Task'}</h2>

          <label className={styles.field}>
            Label
            <input
              className={styles.input}
              value={editing.label}
              onChange={e => setEditing(p => ({ ...p, label: e.target.value }))}
              placeholder="e.g. Brush teeth"
              autoFocus
            />
          </label>

          <span className={styles.fieldLabel}>Image</span>
          <ImagePicker
            value={editing.imageId}
            emoji={editing.emoji}
            onImage={imageId => setEditing(p => ({ ...p, imageId, emoji: null }))}
            onEmoji={em => setEditing(p => ({ ...p, emoji: em, imageId: null }))}
          />

          <label className={styles.field}>
            Max stars: {editing.maxStars}
            <input
              type="range" min={1} max={10} value={editing.maxStars}
              onChange={e => setEditing(p => ({ ...p, maxStars: Number(e.target.value) }))}
            />
          </label>

          <label className={styles.field}>
            Mode
            <select
              className={styles.input}
              value={editing.mode}
              onChange={e => setEditing(p => ({ ...p, mode: e.target.value }))}
            >
              <option value="skill">Skill-building (daily living)</option>
              <option value="firstTry">First-try (new things)</option>
            </select>
          </label>

          <label className={styles.field}>
            Sensory/capability note (private)
            <input
              className={styles.input}
              value={editing.capabilityNote}
              onChange={e => setEditing(p => ({ ...p, capabilityNote: e.target.value }))}
              placeholder="e.g. Try mild toothpaste if needed"
            />
          </label>

          <label className={styles.field}>
            Fade plan note (how will this become unnecessary?)
            <input
              className={styles.input}
              value={editing.fadePlan?.note || ''}
              onChange={e => setEditing(p => ({
                ...p, fadePlan: { ...p.fadePlan, note: e.target.value }
              }))}
              placeholder="e.g. Taper to 1 star after 2 weeks"
            />
          </label>

          <div className={styles.editorActions}>
            <button className={styles.cancelBtn} onClick={() => setEditing(null)}>Cancel</button>
            <button className={styles.saveBtn} onClick={save} disabled={!editing.label.trim()}>Save</button>
          </div>
        </div>
      )}

      <div className={styles.list}>
        {tasks.map(t => (
          <div key={t.id} className={`${styles.row} ${!t.active ? styles.archived : ''}`}>
            <ImageDisplay imageId={t.imageId} emoji={t.emoji} size={44} alt={t.label} />
            <div className={styles.rowInfo}>
              <span className={styles.rowLabel}>{t.label}</span>
              <span className={styles.rowMeta}>
                {t.mode === 'firstTry' ? 'First try' : 'Skill'} · max {t.maxStars}★
              </span>
            </div>
            <div className={styles.rowActions}>
              {t.active && (
                <>
                  <button className={styles.editBtn} onClick={() => setEditing({ ...t })}>Edit</button>
                  <button className={styles.archiveBtn} onClick={() => archive(t.id)}>Archive</button>
                </>
              )}
              {!t.active && <span className={styles.archivedTag}>Archived</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
