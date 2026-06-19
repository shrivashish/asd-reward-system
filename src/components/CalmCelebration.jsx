import { useEffect } from 'react';
import { useApp } from '../state/AppContext';
import styles from './CalmCelebration.module.css';

export default function CalmCelebration({ stars, onDone }) {
  const { settings } = useApp();

  useEffect(() => {
    const timer = setTimeout(onDone, settings.calmMode ? 1200 : 2200);
    return () => clearTimeout(timer);
  }, [onDone, settings.calmMode]);

  return (
    <div className={styles.overlay} onClick={onDone} role="status" aria-live="polite">
      <div className={`${styles.bubble} ${settings.calmMode ? styles.calm : ''}`}>
        <span className={styles.icon}>⭐</span>
        <span className={styles.count}>+{stars}</span>
        <span className={styles.text}>Great job!</span>
      </div>
    </div>
  );
}
