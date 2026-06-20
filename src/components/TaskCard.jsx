import { useState } from 'react';
import { addEarn, markTaskDone } from '../data/repo';
import { useApp } from '../state/AppContext';
import CalmCelebration from './CalmCelebration';
import MiniPuzzle from './MiniPuzzle';
import ImageDisplay from './ImageDisplay';
import TTSButton from './TTSButton';
import styles from './TaskCard.module.css';

export default function TaskCard({ task, onChange }) {
  const { settings } = useApp();
  const isFirstTry = task.mode === 'firstTry';
  const [selected, setSelected] = useState(isFirstTry ? task.maxStars : 0);
  const [celebrate, setCelebrate] = useState(0);
  const [showPuzzle, setShowPuzzle] = useState(false);

  const showNote = settings.capabilityCheck && task.capabilityNote;

  // Tapping a star only selects it — nothing is earned until "Mark done".
  function pick(n) {
    setSelected(s => (s === n ? 0 : n));
  }

  async function done() {
    if (settings.puzzleOnTaskDone) {
      setShowPuzzle(true); // puzzle gates entry — nothing earned yet
    } else if (selected > 0) {
      await addEarn(task.childId, task.id, selected);
      setCelebrate(selected);
    } else {
      await finish();
    }
  }

  async function finish() {
    await markTaskDone(task.id);
    onChange();
  }

  function celebrationDone() {
    setCelebrate(0);
    finish();
  }

  async function puzzleDone() {
    setShowPuzzle(false);
    // Puzzle passed — now proceed with normal completion
    if (selected > 0) {
      await addEarn(task.childId, task.id, selected);
      setCelebrate(selected);
    } else {
      await finish();
    }
  }

  return (
    <div className={`${styles.card} ${selected > 0 ? styles.selectedCard : ''}`}>
      {celebrate > 0 && <CalmCelebration stars={celebrate} onDone={celebrationDone} />}
      {showPuzzle && <MiniPuzzle onDone={puzzleDone} onCancel={() => setShowPuzzle(false)} />}

      <div className={styles.header}>
        <ImageDisplay imageId={task.imageId} emoji={task.emoji} size={72} alt={task.label} />
        <div className={styles.info}>
          <span className={styles.label}>{task.label}</span>
          {isFirstTry && <span className={styles.badge}>First try</span>}
          {showNote && <span className={styles.note}>💡 {task.capabilityNote}</span>}
        </div>
        <TTSButton text={task.label} />
      </div>

      {isFirstTry ? (
        <p className={styles.firstTry}>🌟 Gave it a try — full {task.maxStars} ★</p>
      ) : (
        <div className={styles.stars} role="group" aria-label={`Choose stars for ${task.label}`}>
          {Array.from({ length: task.maxStars }).map((_, i) => (
            <button
              key={i}
              className={`${styles.star} ${i < selected ? styles.starFilled : ''}`}
              onClick={() => pick(i + 1)}
              aria-label={`${i + 1} star${i > 0 ? 's' : ''}`}
              aria-pressed={i < selected}
            >
              ★
            </button>
          ))}
        </div>
      )}

      <button className={styles.doneBtn} onClick={done}>
        ✓ Mark done{selected > 0 ? ` (+${selected} ★)` : ''}
      </button>
    </div>
  );
}
