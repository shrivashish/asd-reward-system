import { LayoutGrid } from 'lucide-react';
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
        setView('tasks');
      }
    }
  }

  return (
    <header className={styles.header}>
      <span className={styles.logo}>⭐ Star Board</span>
      <button
        className={styles.parentBtn}
        onClick={handleParentToggle}
        aria-label={parentUnlocked ? 'Back to board' : 'Parent area'}
      >
        {parentUnlocked ? <LayoutGrid size={22} aria-hidden="true" /> : '⚙️'}
      </button>
    </header>
  );
}
