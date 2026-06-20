import { useState, useEffect } from 'react';
import { listRewards } from '../data/repo';
import FillingBoard from './FillingBoard';
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

  // The "next" reward is the cheapest one the child can't afford yet — that's
  // the one we show a full star board for, so they can see how close they are.
  const nextId = rewards.find(r => balance < r.cost)?.id ?? null;

  return (
    <div className={styles.bar}>
      <div className={styles.header}>
        <span className={styles.headerLabel}>You have</span>
        <span className={styles.headerStars}>{balance} ★</span>
      </div>

      <ul className={styles.ladder} role="list">
        {rewards.map(reward => {
          const ready = balance >= reward.cost;
          const remaining = reward.cost - balance;
          const isNext = reward.id === nextId;

          return (
            <li
              key={reward.id}
              className={`${styles.rung} ${ready ? styles.ready : ''} ${isNext ? styles.next : ''}`}
            >
              <div className={styles.top}>
                <div className={styles.goalImage}>
                  <ImageDisplay imageId={reward.imageId} emoji={reward.emoji} size={56} alt={reward.label} />
                </div>
                <div className={styles.goalInfo}>
                  <span className={styles.goalLabel}>{reward.label}</span>
                  <span className={styles.cost}>{reward.cost} ★</span>
                </div>
                {ready ? (
                  <span className={styles.badge}>Ready!</span>
                ) : (
                  <span className={styles.remaining}>{remaining} to go</span>
                )}
              </div>

              {isNext && <FillingBoard balance={balance} cost={reward.cost} />}

              {ready && (
                <button className={styles.redeemBtn} onClick={() => onRedeem(reward)}>
                  🎉 Claim {reward.label}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
