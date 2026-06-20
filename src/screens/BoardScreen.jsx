import { useState, useEffect } from 'react';
import { listTodayTasks, addRedeem } from '../data/repo';
import { useApp } from '../state/AppContext';
import { useBalance } from '../state/useBalance';
import GoalBar from '../components/GoalBar';
import TaskCard from '../components/TaskCard';
import styles from './BoardScreen.module.css';

export default function BoardScreen() {
  const { currentChildId, refreshKey, refresh } = useApp();
  const balance = useBalance(currentChildId, refreshKey);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!currentChildId) return;
    listTodayTasks(currentChildId).then(setTasks);
  }, [currentChildId, refreshKey]);

  async function handleRedeem(reward) {
    if (balance < reward.cost) return;
    await addRedeem(currentChildId, reward.id, reward.cost);
    refresh();
  }

  if (!currentChildId) {
    return (
      <div className={styles.empty}>
        No child profile found. Open the parent area (⚙️) and go to Child to add one.
      </div>
    );
  }

  return (
    <div className={styles.board}>
      <GoalBar
        childId={currentChildId}
        balance={balance}
        refreshKey={refreshKey}
        onRedeem={handleRedeem}
      />

      <div className={styles.taskList} role="list">
        {tasks.length === 0 && (
          <p className={styles.empty}>
            No tasks for today yet — a grown-up can add some from the Tasks screen.
          </p>
        )}
        {tasks.map(task => (
          <div key={task.id} role="listitem">
            <TaskCard task={task} onChange={refresh} />
          </div>
        ))}
      </div>
    </div>
  );
}
