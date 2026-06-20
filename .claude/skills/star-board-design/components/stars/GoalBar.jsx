import React from 'react';
import { FillingBoard } from './FillingBoard.jsx';
import { Avatar } from '../core/Avatar.jsx';
import { Button } from '../core/Button.jsx';

/**
 * The child board's goal header: the current reward, the balance / cost,
 * the FillingBoard, and a redeem button once the balance is enough.
 */
export function GoalBar({ reward, balance = 0, onRedeem }) {
  if (!reward) {
    return (
      <div style={barStyle(false)}>
        <p style={{ textAlign: 'center', color: 'var(--ink-soft)', fontSize: 'var(--text-base)', padding: 'var(--space-4)' }}>
          No goal set yet — ask a parent to set one!
        </p>
      </div>
    );
  }
  const ready = balance >= reward.cost;
  return (
    <div style={barStyle(ready)}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-3)' }}>
        <Avatar emoji={reward.emoji} src={reward.src} size={64} alt={reward.label} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', color: 'var(--ink)' }}>{reward.label}</span>
          <span style={{ fontSize: 'var(--text-base)', color: 'var(--ink-soft)' }}>
            <span style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-heavy)', color: 'var(--teal)' }}>{balance}</span>
            {' / '}{reward.cost} ★
          </span>
        </div>
      </div>
      <FillingBoard balance={balance} cost={reward.cost} />
      {ready && (
        <Button variant="reward" block iconLeft="🎉" onClick={() => onRedeem && onRedeem(reward)} style={{ marginTop: 'var(--space-3)', fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)' }}>
          Ready to redeem!
        </Button>
      )}
    </div>
  );
}

function barStyle(ready) {
  return {
    background: 'var(--surface)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-4)',
    boxShadow: 'var(--shadow)',
    border: ready ? '2px solid var(--gold)' : 'none',
  };
}
