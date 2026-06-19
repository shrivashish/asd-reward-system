import { useApp } from '../state/AppContext';
import styles from './AppHeader.module.css';

export default function AppHeader() {
  const { parentUnlocked, setParentUnlocked, setView, settings } = useApp();

  function handleParentToggle() {
    if (parentUnlocked) {
      setParentUnlocked(false);
      setView('board');
    } else {
      if (settings.parentGate) {
        document.dispatchEvent(new CustomEvent('open-parent-gate'));
      } else {
        setParentUnlocked(true);
      }
    }
  }

  return (
    <header className={styles.header}>
      <span className={styles.logo}>⭐ Star Board</span>
      <button
        className={styles.parentBtn}
        onClick={handleParentToggle}
        aria-label={parentUnlocked ? 'Exit parent area' : 'Parent area'}
      >
        {parentUnlocked ? '← Board' : '⚙️'}
      </button>
    </header>
  );
}
