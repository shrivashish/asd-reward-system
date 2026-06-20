import React from 'react';

/**
 * The award picker. Round star buttons 0..max; tapping selects how many
 * stars the child managed. Includes an explicit "0" (no stars) option —
 * declining costs nothing (P2 soft exit). Selected star scales up gold.
 */
export function StarRating({
  max = 3,
  value = 0,
  onChange,
  prompt = 'How much did they manage?',
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
      {prompt && (
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--ink-soft)' }}>{prompt}</p>
      )}
      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', justifyContent: 'center' }}>
        {Array.from({ length: max + 1 }).map((_, i) => {
          const active = i === value;
          const zero = i === 0;
          return (
            <button
              key={i}
              onClick={() => onChange && onChange(i)}
              aria-pressed={active}
              aria-label={zero ? 'No stars' : `${i} star${i > 1 ? 's' : ''}`}
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: zero ? 18 : 24,
                background: active ? 'var(--gold)' : 'var(--surface-2)',
                color: active ? '#fff' : zero ? 'var(--ink-soft)' : 'var(--line)',
                transform: active ? 'scale(1.1)' : 'scale(1)',
                transition: 'background var(--anim-dur) var(--anim-ease), transform var(--anim-dur) var(--anim-ease), color var(--anim-dur)',
              }}
            >
              {zero ? '0' : '★'}
            </button>
          );
        })}
      </div>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-soft)', minHeight: 20, textAlign: 'center' }}>
        {value === 0 ? 'No stars — that is okay, try again later' : `${value} star${value > 1 ? 's' : ''}`}
      </p>
    </div>
  );
}
