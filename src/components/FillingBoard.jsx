import styles from './FillingBoard.module.css';

export default function FillingBoard({ balance, cost }) {
  const slots = Math.max(cost, 1);
  const filled = Math.min(balance, slots);

  return (
    <div className={styles.board} aria-label={`${filled} of ${slots} stars filled`}>
      {Array.from({ length: slots }).map((_, i) => (
        <div key={i} className={`${styles.slot} ${i < filled ? styles.filled : ''}`}>
          {i < filled && <span className={styles.star}>★</span>}
        </div>
      ))}
    </div>
  );
}
