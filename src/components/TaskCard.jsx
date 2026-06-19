import ImageDisplay from './ImageDisplay';
import StarPips from './StarPips';
import TTSButton from './TTSButton';
import styles from './TaskCard.module.css';

export default function TaskCard({ task, onTap }) {
  return (
    <button
      className={styles.card}
      onClick={() => onTap(task)}
      aria-label={`Award stars for ${task.label}`}
    >
      <ImageDisplay imageId={task.imageId} emoji={task.emoji} size={72} alt={task.label} />
      <div className={styles.info}>
        <span className={styles.label}>{task.label}</span>
        <div className={styles.meta}>
          <StarPips max={task.maxStars} />
          {task.mode === 'firstTry' && <span className={styles.badge}>First try</span>}
        </div>
      </div>
      <TTSButton text={task.label} />
    </button>
  );
}
