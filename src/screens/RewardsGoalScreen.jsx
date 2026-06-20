import { useState, useEffect } from 'react';
import { listRewards, upsertReward, getGoal, setGoal } from '../data/repo';
import { useApp } from '../state/AppContext';
import ImagePicker from '../components/ImagePicker';
import ImageDisplay from '../components/ImageDisplay';
import styles from './RewardsGoalScreen.module.css';

const BLANK_REWARD = { label: '', emoji: '🎁', imageId: null, cost: 10, active: true };

export default function RewardsGoalScreen() {
  const { currentChildId, refresh } = useApp();
  const [rewards, setRewards] = useState([]);
  const [goal, setGoalState] = useState(null);
  const [editing, setEditing] = useState(null);

  async function load() {
    if (!currentChildId) return;
    const [r, g] = await Promise.all([listRewards(currentChildId), getGoal(currentChildId)]);
    setRewards(r);
    setGoalState(g);
  }

  useEffect(() => { load(); }, [currentChildId]);

  async function save() {
    if (!editing.label.trim()) return;
    await upsertReward({ ...editing, childId: currentChildId });
    await load();
    setEditing(null);
    refresh();
  }

  async function pickGoal(rewardId) {
    await setGoal(currentChildId, rewardId);
    setGoalState({ childId: currentChildId, rewardId });
    refresh();
  }

  return (
    <div className={styles.wrap}>
      <h1 className={styles.h1}>Rewards & goal</h1>

      {!editing && (
        <button className={styles.addBtn} onClick={() => setEditing({ ...BLANK_REWARD })}>
          + Add reward
        </button>
      )}

      {editing && (
        <div className={styles.editor}>
          <h2 className={styles.editorTitle}>{editing.id ? 'Edit reward' : 'New reward'}</h2>

          <label className={styles.field}>
            Label
            <input
              className={styles.input}
              value={editing.label}
              onChange={e => setEditing(p => ({ ...p, label: e.target.value }))}
              placeholder="e.g. Choose a movie"
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
            Star cost: {editing.cost}
            <input
              type="range" min={1} max={50} value={editing.cost}
              onChange={e => setEditing(p => ({ ...p, cost: Number(e.target.value) }))}
            />
          </label>

          <div className={styles.editorActions}>
            <button className={styles.cancelBtn} onClick={() => setEditing(null)}>Cancel</button>
            <button className={styles.saveBtn} onClick={save} disabled={!editing.label.trim()}>Save</button>
          </div>
        </div>
      )}

      <div className={styles.list}>
        {rewards.length === 0 && !editing && (
          <p className={styles.empty}>No rewards yet — add one above.</p>
        )}
        {rewards.map(r => (
          <div key={r.id} className={`${styles.row} ${goal?.rewardId === r.id ? styles.current : ''}`}>
            <ImageDisplay imageId={r.imageId} emoji={r.emoji} size={48} alt={r.label} />
            <div className={styles.rowInfo}>
              <span className={styles.rowLabel}>{r.label}</span>
              <span className={styles.rowMeta}>{r.cost} ★</span>
              {goal?.rewardId === r.id && <span className={styles.currentTag}>Current goal</span>}
            </div>
            <div className={styles.rowActions}>
              <button className={styles.editBtn} onClick={() => setEditing({ ...r })}>Edit</button>
              {goal?.rewardId !== r.id && (
                <button className={styles.goalBtn} onClick={() => pickGoal(r.id)}>Set goal</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
