import styles from './StarPicker.module.css';

export default function StarPicker({ max, value, onChange }) {
  return (
    <div className={styles.wrap}>
      <p className={styles.label}>How much did they manage?</p>
      <div className={styles.stars}>
        {Array.from({ length: max + 1 }).map((_, i) => (
          <button
            key={i}
            className={`${styles.star} ${i === value ? styles.active : ''} ${i === 0 ? styles.zero : ''}`}
            onClick={() => onChange(i)}
            aria-label={i === 0 ? 'No stars' : `${i} star${i > 1 ? 's' : ''}`}
            aria-pressed={value === i}
          >
            {i === 0 ? '0' : '★'}
          </button>
        ))}
      </div>
      <p className={styles.hint}>
        {value === 0
          ? 'No stars — that is okay, try again later'
          : `${value} star${value > 1 ? 's' : ''}`}
      </p>
    </div>
  );
}
