import { useState, useEffect } from 'react';
import { listRewards } from '../data/repo';
import ImageDisplay from './ImageDisplay';
import styles from './GoalBar.module.css';

export default function GoalBar({ childId, balance, refreshKey, onRedeem }) {
  const [rewards, setRewards] = useState([]);
  const [showRewards, setShowRewards] = useState(false);
  const [claim, setClaim] = useState(null);

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

  const maxCost = Math.max(...rewards.map(r => r.cost), 1);
  const readyCount = rewards.filter(r => balance >= r.cost).length;

  async function doClaim() {
    await onRedeem(claim);
    setClaim(null);
    setShowRewards(false);
  }

  // The track is pure star progress: one slot per star up to the biggest
  // reward, filling left-to-right as the balance climbs. Rewards live behind
  // the claim button, not inside the track. Slots that land on a reward's
  // cost are milestones — they unlock a new reward when reached.
  const milestones = new Set(rewards.map(r => r.cost));
  const slots = [];
  for (let n = 1; n <= maxCost; n++) slots.push(n);

  return (
    <div className={styles.bar}>
      <div className={styles.header}>
        <span className={styles.headerStars}>{balance}</span>
        <span className={styles.headerLabel}>stars to spend</span>
      </div>

      <div className={styles.column} aria-hidden="true">
        {slots.map(n => {
          const milestone = milestones.has(n);
          const reached = balance >= n;
          if (milestone) {
            return (
              <span
                key={n}
                className={`${styles.milestone} ${reached ? styles.milestoneReached : ''}`}
              >
                <MilestoneStar />
              </span>
            );
          }
          return (
            <span key={n} className={`${styles.star} ${reached ? styles.filled : ''}`}>
              ★
            </span>
          );
        })}
      </div>

      <button
        className={styles.claimOpenBtn}
        onClick={() => setShowRewards(true)}
        aria-label={
          readyCount > 0
            ? `Claim a reward, ${readyCount} ready`
            : 'See your rewards'
        }
      >
        <span className={styles.claimOpenLabel}>Claim a reward</span>
        {readyCount > 0 && (
          <span className={styles.readyCount}>{readyCount} ready</span>
        )}
      </button>

      {showRewards && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label="Your rewards"
          onClick={() => setShowRewards(false)}
        >
          <div className={styles.rewardsSheet} onClick={e => e.stopPropagation()}>
            <h2 className={styles.rewardsTitle}>Your rewards</h2>
            <p className={styles.rewardsHint}>
              You have <strong>{balance} ★</strong> to spend. Tap one you have enough
              stars for.
            </p>

            <div className={styles.rewardsList}>
              {rewards.map(r => {
                const ready = balance >= r.cost;
                return (
                  <button
                    key={r.id}
                    className={`${styles.rewardRow} ${ready ? '' : styles.locked}`}
                    onClick={() => ready && setClaim(r)}
                    disabled={!ready}
                    aria-label={
                      ready
                        ? `Claim ${r.label}, ${r.cost} stars`
                        : `${r.label}, ${r.cost} stars, ${r.cost - balance} more stars to go`
                    }
                  >
                    <span className={styles.rewardImg}>
                      <ImageDisplay imageId={r.imageId} emoji={r.emoji} size={44} alt={r.label} />
                    </span>
                    <span className={styles.rewardRowInfo}>
                      <span className={styles.rewardRowLabel}>{r.label}</span>
                      <span className={styles.rewardRowCost}>{r.cost} ★</span>
                    </span>
                    {ready ? (
                      <span className={styles.rewardRowAction}>Claim</span>
                    ) : (
                      <span className={styles.rewardRowLock}>{r.cost - balance} more ★</span>
                    )}
                  </button>
                );
              })}
            </div>

            <button className={styles.closeBtn} onClick={() => setShowRewards(false)}>
              Close
            </button>
          </div>
        </div>
      )}

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
            <p className={styles.sheetMsg}>You have enough stars! 🎉</p>
            <button className={styles.claimBtn} onClick={doClaim}>Claim now</button>
            <button className={styles.closeBtn} onClick={() => setClaim(null)}>Not yet</button>
          </div>
        </div>
      )}
    </div>
  );
}

// A friendly star badge for reward milestones: a soft, rounded gold star with
// its own little face, plus sparkles that show once the milestone is reached.
// Colour comes from the wrapping CSS (currentColor), so it greys out before
// it is earned and turns gold after.
function MilestoneStar() {
  return (
    <svg className={styles.milestoneSvg} viewBox="0 0 24 24" aria-hidden="true">
      <polygon
        className={styles.milestoneShape}
        points="12,1.8 14.9,8.2 21.8,9.1 16.8,14 18.1,20.9 12,17.5 5.9,20.9 7.2,14 2.2,9.1 9.1,8.2"
      />
      <circle className={styles.milestoneEye} cx="9.4" cy="11" r="1.05" />
      <circle className={styles.milestoneEye} cx="14.6" cy="11" r="1.05" />
      <path
        className={styles.milestoneSmile}
        d="M9.2 13.4 Q12 16.1 14.8 13.4"
        fill="none"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        className={styles.milestoneSparkle}
        d="M21 4.2 C21.2 5 21.3 5.1 22.1 5.3 C21.3 5.5 21.2 5.6 21 6.4 C20.8 5.6 20.7 5.5 19.9 5.3 C20.7 5.1 20.8 5 21 4.2 Z"
      />
      <path
        className={styles.milestoneSparkle}
        d="M3.3 5.6 C3.45 6.2 3.55 6.3 4.2 6.45 C3.55 6.6 3.45 6.7 3.3 7.3 C3.15 6.7 3.05 6.6 2.4 6.45 C3.05 6.3 3.15 6.2 3.3 5.6 Z"
      />
    </svg>
  );
}
