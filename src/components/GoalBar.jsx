import { useState, useEffect, useRef } from 'react';
import { listRewards } from '../data/repo';
import ImageDisplay from './ImageDisplay';
import styles from './GoalBar.module.css';

export default function GoalBar({ childId, balance, refreshKey, onRedeem }) {
  const [rewards, setRewards] = useState([]);
  const [claim, setClaim] = useState(null);
  const columnRef = useRef(null);

  useEffect(() => {
    if (!childId) return;
    listRewards(childId).then(list =>
      setRewards([...list].sort((a, b) => a.cost - b.cost))
    );
  }, [childId, refreshKey]);

  // The row runs left (star 1) to right (the biggest reward). Slots fill as the
  // balance climbs. Start scrolled to the left, where the child begins.
  useEffect(() => {
    const el = columnRef.current;
    if (el) el.scrollLeft = 0;
  }, [rewards]);

  if (rewards.length === 0) {
    return (
      <div className={styles.bar}>
        <p className={styles.noGoal}>No rewards yet — ask a parent to add some!</p>
      </div>
    );
  }

  const maxCost = Math.max(...rewards.map(r => r.cost), 1);
  const byCost = {};
  rewards.forEach(r => { byCost[r.cost] = r; });

  async function doClaim() {
    await onRedeem(claim);
    setClaim(null);
  }

  const slots = [];
  for (let n = 1; n <= maxCost; n++) slots.push(n);

  return (
    <div className={styles.bar}>
      <div className={styles.header}>
        <span className={styles.headerStars}>{balance}</span>
        <span className={styles.headerLabel}>stars to spend</span>
      </div>

      <div className={styles.column} ref={columnRef}>
        {slots.map(n => {
          const reward = byCost[n];
          const filled = balance >= n;

          if (reward) {
            const ready = balance >= reward.cost;
            return (
              <button
                key={n}
                className={`${styles.rewardStar} ${filled ? styles.filled : ''} ${ready ? styles.ready : ''}`}
                onClick={() => setClaim(reward)}
                aria-label={`${reward.label}, ${reward.cost} stars${ready ? ', ready to claim' : ''}`}
              >
                <span className={styles.rewardImg}>
                  <ImageDisplay imageId={reward.imageId} emoji={reward.emoji} size={40} alt={reward.label} />
                </span>
                <span className={styles.rewardMeta}>
                  <span className={styles.rewardLabel}>{reward.label}</span>
                  <span className={styles.rewardCost}>{reward.cost} ★</span>
                </span>
                {ready && <span className={styles.readyTag}>Tap to claim</span>}
              </button>
            );
          }

          return (
            <span
              key={n}
              className={`${styles.star} ${filled ? styles.filled : ''}`}
              aria-hidden="true"
            >
              ★
            </span>
          );
        })}
      </div>

      {claim && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label={`Claim ${claim.label}`}
          onClick={() => setClaim(null)}
        >
          <div className={styles.sheet} onClick={e => e.stopPropagation()}>
            <ImageDisplay imageId={claim.imageId} emoji={claim.emoji} size={96} alt={claim.label} />
            <span className={styles.sheetLabel}>{claim.label}</span>
            <span className={styles.sheetCost}>{claim.cost} ★</span>
            {balance >= claim.cost ? (
              <>
                <p className={styles.sheetMsg}>You have enough stars! 🎉</p>
                <button className={styles.claimBtn} onClick={doClaim}>Claim now</button>
              </>
            ) : (
              <p className={styles.sheetMsg}>{claim.cost - balance} more ★ to go</p>
            )}
            <button className={styles.closeBtn} onClick={() => setClaim(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
