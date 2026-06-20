import { useState, useEffect } from 'react';
import { listRewards } from '../data/repo';
import ImageDisplay from './ImageDisplay';
import styles from './GoalBar.module.css';

export default function GoalBar({ childId, balance, refreshKey, onRedeem }) {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    if (!childId) return;
    listRewards(childId).then(list =>
      setRewards([...list].sort((a, b) => a.cost - b.cost))
    );
  }, [childId, refreshKey]);

  if (rewards.length === 0) {
    return (
      <div className={styles.bar}>
        <p className={styles.noGoal}>No rewards yet — ask a parent to add some!</p>
      </div>
    );
  }

  // One continuous climb: the rewards are milestones along a single track that
  // runs from 0 up to the biggest reward. The fill rises with the balance, so
  // progress flows past each milestone instead of restarting per reward.
  const maxCost = Math.max(...rewards.map(r => r.cost), 1);
  const fillPct = Math.min(balance, maxCost) / maxCost * 100;
  const trackHeight = Math.max(240, rewards.length * 84);

  return (
    <div className={styles.bar}>
      <div className={styles.header}>
        <span className={styles.headerLabel}>You have</span>
        <span className={styles.headerStars}>{balance} ★</span>
      </div>

      <div className={styles.track} style={{ height: trackHeight }}>
        <div className={styles.rail}>
          <div className={styles.railFill} style={{ height: `${fillPct}%` }} />
        </div>

        {balance > 0 && balance < maxCost && (
          <div className={styles.here} style={{ bottom: `${fillPct}%` }} aria-hidden="true" />
        )}

        {rewards.map(reward => {
          const ready = balance >= reward.cost;
          const remaining = reward.cost - balance;
          const pos = Math.min(reward.cost, maxCost) / maxCost * 100;

          return (
            <div key={reward.id} className={styles.marker} style={{ bottom: `${pos}%` }}>
              <span className={`${styles.node} ${ready ? styles.nodeReady : ''}`} aria-hidden="true" />
              <div className={`${styles.card} ${ready ? styles.ready : ''}`}>
                <ImageDisplay imageId={reward.imageId} emoji={reward.emoji} size={48} alt={reward.label} />
                <div className={styles.info}>
                  <span className={styles.label}>{reward.label}</span>
                  <span className={styles.cost}>{reward.cost} ★</span>
                </div>
                {ready ? (
                  <button className={styles.redeemBtn} onClick={() => onRedeem(reward)}>
                    🎉 Claim
                  </button>
                ) : (
                  <span className={styles.remaining}>{remaining} to go</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
