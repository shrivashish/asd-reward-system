import styles from './CapabilityCheck.module.css';

const OPTIONS = [
  { id: 'loud', label: 'Too loud', icon: '🔊' },
  { id: 'hurts', label: 'Something hurts', icon: '😣' },
  { id: 'tired', label: 'Too tired', icon: '😴' },
  { id: 'no', label: "Doesn't want to", icon: '✋' },
  { id: 'ok', label: 'All good, proceed →', icon: '✅' },
];

export default function CapabilityCheck({ task, onProceed, onCancel }) {
  return (
    <div className={styles.wrap}>
      <p className={styles.prompt}>Is anything making this hard right now?</p>
      {task.capabilityNote && (
        <p className={styles.note}>💡 {task.capabilityNote}</p>
      )}
      <div className={styles.options}>
        {OPTIONS.map(opt => (
          <button
            key={opt.id}
            className={`${styles.option} ${opt.id === 'ok' ? styles.proceed : ''}`}
            onClick={() => { if (opt.id === 'ok') onProceed(); }}
          >
            <span className={styles.optIcon}>{opt.icon}</span>
            <span>{opt.label}</span>
          </button>
        ))}
      </div>
      <button className={styles.cancelLink} onClick={onCancel}>Cancel</button>
    </div>
  );
}
