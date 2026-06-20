import { useState } from 'react';
import { addEarn, markTaskDone } from '../data/repo';
import { useApp } from '../state/AppContext';
import CalmCelebration from './CalmCelebration';
import ImageDisplay from './ImageDisplay';
import TTSButton from './TTSButton';
import styles from './TaskCard.module.css';

export default function TaskCard({ task, onChange }) {
  const { settings } = useApp();
  const [awarded, setAwarded] = useState(0);
  const [celebrate, setCelebrate] = useState(0);

  const showNote = settings.capabilityCheck && task.capabilityNote;

  async function give(amount) {
    if (amount <= 0) return;
    await addEarn(task.childId, task.id, amount);
    setAwarded(a => a + amount);
    setCelebrate(amount);
  }

  function celebrationDone() {
    setCelebrate(0);
    onChange();
  }

  async function complete() {
    await markTaskDone(task.id);
    onChange();
  }

  if (celebrate > 0) {
    return <CalmCelebration stars={celebrate} onDone={celebrationDone} />;
  }

  return (
    <div className={`${styles.card} ${awarded > 0 ? styles.awardedCard : ''}`}>
      <div className={styles.header}>
        <ImageDisplay imageId={task.imageId} emoji={task.emoji} size={72} alt={task.label} />
        <div className={styles.info}>
          <span className={styles.label}>{task.label}</span>
          {task.mode === 'firstTry' && <span className={styles.badge}>First try</span>}
          {showNote && <span className={styles.note}>💡 {task.capabilityNote}</span>}
        </div>
        <TTSButton text={task.label} />
      </div>

      {task.mode === 'firstTry' ? (
        <button className={styles.fullBtn} onClick={() => give(task.maxStars)}>
          🌟 Give {task.maxStars} ★
        </button>
      ) : (
        <div className={styles.stars} role="group" aria-label={`Give stars for ${task.label}`}>
          {Array.from({ length: task.maxStars }).map((_, i) => (
            <button
              key={i}
              className={styles.star}
              onClick={() => give(i + 1)}
              aria-label={`Give ${i + 1} star${i > 0 ? 's' : ''}`}
            >
              ★
            </button>
          ))}
        </div>
      )}

      {awarded > 0 && (
        <div className={styles.doneRow}>
          <span className={styles.awardedTag}>★ {awarded} given today</span>
          <button className={styles.complete} onClick={complete}>✓ Mark done</button>
        </div>
      )}
    </div>
  );
}
