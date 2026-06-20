import React from 'react';

/**
 * The literal "star board" — a wrapping grid of slots that fill with gold
 * stars as the child earns toward a goal. One slot per star of the cost.
 */
export function FillingBoard({ balance = 0, cost = 10, slotSize = 34, style = {} }) {
  const slots = Math.max(cost, 1);
  const filled = Math.min(balance, slots);
  return (
    <div
      aria-label={`${filled} of ${slots} stars filled`}
      style={{ display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: 'center', padding: '8px 0', ...style }}
    >
      {Array.from({ length: slots }).map((_, i) => {
        const on = i < filled;
        return (
          <div
            key={i}
            style={{
              width: slotSize,
              height: slotSize,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: on ? 'var(--gold)' : 'var(--surface-2)',
              border: `2px solid ${on ? 'var(--gold-deep)' : 'var(--line)'}`,
              transition: 'background var(--anim-dur) var(--anim-ease), border-color var(--anim-dur)',
            }}
          >
            {on && <span aria-hidden="true" style={{ fontSize: Math.round(slotSize * 0.5), color: '#fff', lineHeight: 1 }}>★</span>}
          </div>
        );
      })}
    </div>
  );
}
