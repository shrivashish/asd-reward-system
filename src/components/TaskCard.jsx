import { useState } from 'react';
import { addEarn, markTaskDone } from '../data/repo';
import { useApp } from '../state/AppContext';
import CapabilityCheck from './CapabilityCheck';
import StarPicker from './StarPicker';
import CalmCelebration from './CalmCelebration';
import ImageDisplay from './ImageDisplay';
import StarPips from './StarPips';
import TTSButton from './TTSButton';
import styles from './TaskCard.module.css';

export default function TaskCard({ task, onChange }) {
  const { settings } = useApp();
  const needsCapability = task.mode === 'skill' && settings.capabilityCheck;

  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false); // capability check passed
  const [stars, setStars] = useState(0);
  const [awarded, setAwarded] = useState(0);     // stars given so far on this card
  const [celebrate, setCelebrate] = useState(0);

  function start() {
    setOpen(true);
    setChecked(!needsCapability);
    setStars(0);
  }

  function cancel() {
    setOpen(false);
    setChecked(false);
    setStars(0);
  }

  async function give() {
    const amount = task.mode === 'firstTry' ? task.maxStars : stars;
    if (amount === 0) { cancel(); return; }
    await addEarn(task.childId, task.id, amount);
    setAwarded(a => a + amount);
    setCelebrate(amount);
    cancel();
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
          <div className={styles.meta}>
            <StarPips max={task.maxStars} filled={Math.min(awarded, task.maxStars)} />
            {task.mode === 'firstTry' && <span className={styles.badge}>First try</span>}
          </div>
        </div>
        <TTSButton text={task.label} />
      </div>

      {!open && (
        <div className={styles.cardActions}>
          {awarded > 0 ? (
            <>
              <span className={styles.awardedTag}>★ {awarded} given</span>
              <button className={styles.giveMore} onClick={start}>Give more</button>
              <button className={styles.complete} onClick={complete}>✓ Mark done</button>
            </>
          ) : (
            <button className={styles.give} onClick={start} aria-label={`Give stars for ${task.label}`}>
              ★ Give stars
            </button>
          )}
        </div>
      )}

      {open && needsCapability && !checked && (
        <CapabilityCheck task={task} onProceed={() => setChecked(true)} onCancel={cancel} />
      )}

      {open && checked && (
        <div className={styles.picker}>
          {task.mode === 'firstTry' ? (
            <div className={styles.firstTry}>
              <span className={styles.firstTryIcon}>🌟</span>
              <p className={styles.firstTryText}>They gave it a try — full stars!</p>
            </div>
          ) : (
            <StarPicker max={task.maxStars} value={stars} onChange={setStars} />
          )}
          <div className={styles.pickerActions}>
            <button className={styles.cancel} onClick={cancel}>Cancel</button>
            <button className={styles.confirm} onClick={give}>
              {task.mode === 'firstTry'
                ? `Give ${task.maxStars} ★`
                : stars > 0 ? `Give ${stars} ★` : 'No stars (ok)'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
