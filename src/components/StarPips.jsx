import styles from './StarPips.module.css';

export default function StarPips({ max, filled = 0 }) {
  return (
    <div className={styles.pips} aria-label={`${filled} of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={i < filled ? styles.filled : styles.empty}>★</span>
      ))}
    </div>
  );
}
