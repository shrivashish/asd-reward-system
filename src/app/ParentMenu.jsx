import { useApp } from '../state/AppContext';
import styles from './ParentMenu.module.css';

const ITEMS = [
  { id: 'tasks', label: 'Tasks', icon: '📋' },
  { id: 'rewards', label: 'Rewards', icon: '🎁' },
  { id: 'child', label: 'Child', icon: '👤' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
  { id: 'guide', label: 'Guide', icon: '📖' },
];

export default function ParentMenu() {
  const { parentUnlocked, view, setView } = useApp();
  if (!parentUnlocked) return null;

  return (
    <nav className={styles.nav} aria-label="Parent navigation">
      {ITEMS.map(item => (
        <button
          key={item.id}
          className={`${styles.item} ${view === item.id ? styles.active : ''}`}
          onClick={() => setView(item.id)}
          aria-current={view === item.id ? 'page' : undefined}
        >
          <span className={styles.icon}>{item.icon}</span>
          <span className={styles.label}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
