import { AppProvider, useApp } from '../state/AppContext';
import AppHeader from './AppHeader';
import ParentGate from './ParentGate';
import ParentMenu from './ParentMenu';
import BoardScreen from '../screens/BoardScreen';
import TasksScreen from '../screens/TasksScreen';
import RewardsGoalScreen from '../screens/RewardsGoalScreen';
import ChildScreen from '../screens/ChildScreen';
import SettingsScreen from '../screens/SettingsScreen';
import GuideScreen from '../screens/GuideScreen';
import styles from './App.module.css';

function AppInner() {
  const { view, loading } = useApp();

  if (loading) {
    return <div className={styles.loading}><span>⭐</span></div>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        {view === 'board' && <BoardScreen />}
        {view === 'tasks' && <TasksScreen />}
        {view === 'rewards' && <RewardsGoalScreen />}
        {view === 'child' && <ChildScreen />}
        {view === 'settings' && <SettingsScreen />}
        {view === 'guide' && <GuideScreen />}
      </main>
      <ParentMenu />
      <ParentGate />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
