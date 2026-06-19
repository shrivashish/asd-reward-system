import { useState, useEffect } from 'react';
import { getGoal, listRewards, addRedeem } from '../data/repo';
import FillingBoard from './FillingBoard';
import ImageDisplay from './ImageDisplay';
import styles from './GoalBar.module.css';

export default function GoalBar({ childId, balance, refreshKey, onRedeem }) {
  const [reward, setReward] = useState(null);

  useEffect(() => {
    if (!childId) return;
    async function load() {
      const goal = await getGoal(childId);
      if (!goal) { setReward(null); return; }
      const rewards = await listRewards(childId);
      setReward(rewards.find(r => r.id === goal.rewardId) || null);
    }
    load();
  }, [childId, refreshKey]);

  if (!reward) {
    return (
      <div className={styles.bar}>
        <p className={styles.noGoal}>No goal set yet — ask a parent to set one!</p>
      </div>
    );
  }

  const ready = balance >= reward.cost;

  return (
    <div className={`${styles.bar} ${ready ? styles.ready : ''}`}>
      <div className={styles.top}>
        <div className={styles.goalImage}>
          <ImageDisplay imageId={reward.imageId} emoji={reward.emoji} size={64} alt={reward.label} />
        </div>
        <div className={styles.goalInfo}>
          <span className={styles.goalLabel}>{reward.label}</span>
          <span className={styles.balance}>
            <span className={styles.balanceNum}>{balance}</span>
            <span className={styles.balanceSep}> / </span>
            <span className={styles.balanceCost}>{reward.cost} ★</span>
          </span>
        </div>
      </div>
      <FillingBoard balance={balance} cost={reward.cost} />
      {ready && (
        <button className={styles.redeemBtn} onClick={() => onRedeem(reward)}>
          🎉 Ready to redeem!
        </button>
      )}
    </div>
  );
}
