import { useState } from 'react';
import { addEarn } from '../data/repo';
import CapabilityCheck from './CapabilityCheck';
import StarPicker from './StarPicker';
import CalmCelebration from './CalmCelebration';
import ImageDisplay from './ImageDisplay';
import { useApp } from '../state/AppContext';
import styles from './AwardSheet.module.css';

export default function AwardSheet({ task, onClose, onAwarded }) {
  const { settings } = useApp();
  const [step, setStep] = useState(() => {
    if (task.mode === 'skill' && settings.capabilityCheck) return 'capability';
    return 'pick';
  });
  const [stars, setStars] = useState(0);
  const [celebrating, setCelebrating] = useState(false);
  const [awardedCount, setAwardedCount] = useState(0);

  async function confirm() {
    const amount = task.mode === 'firstTry' ? task.maxStars : stars;
    if (amount === 0) { onClose(); return; }
    await addEarn(task.childId, task.id, amount);
    setAwardedCount(amount);
    setCelebrating(true);
  }

  function celebrationDone() {
    setCelebrating(false);
    onAwarded();
    onClose();
  }

  if (celebrating) {
    return <CalmCelebration stars={awardedCount} onDone={celebrationDone} />;
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Award stars">
      <div className={styles.sheet}>
        <div className={styles.taskHeader}>
          <ImageDisplay imageId={task.imageId} emoji={task.emoji} size={56} alt={task.label} />
          <span className={styles.taskLabel}>{task.label}</span>
        </div>

        {step === 'capability' && (
          <CapabilityCheck
            task={task}
            onProceed={() => setStep('pick')}
            onCancel={onClose}
          />
        )}

        {step === 'pick' && (
          <>
            {task.mode === 'firstTry' ? (
              <div className={styles.firstTry}>
                <span className={styles.firstTryIcon}>🌟</span>
                <p className={styles.firstTryText}>They gave it a try — full stars!</p>
                <p className={styles.firstTryCount}>{task.maxStars} ★</p>
              </div>
            ) : (
              <StarPicker max={task.maxStars} value={stars} onChange={setStars} />
            )}

            <div className={styles.actions}>
              <button className={styles.cancel} onClick={onClose}>Cancel</button>
              <button className={styles.give} onClick={confirm}>
                {task.mode === 'firstTry'
                  ? `Give ${task.maxStars} ★`
                  : stars > 0
                    ? `Give ${stars} ★`
                    : 'No stars (ok)'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
