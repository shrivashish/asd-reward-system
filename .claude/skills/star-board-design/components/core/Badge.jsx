import React from 'react';

/**
 * Small rounded pill label. `tone` picks the color; `soft` uses a tinted
 * background with colored text instead of a solid fill.
 */
export function Badge({ children, tone = 'info', soft = false, style = {}, ...rest }) {
  const tones = {
    info:   { solid: 'var(--plum)',  ink: 'var(--plum)' },
    reward: { solid: 'var(--gold)',  ink: 'var(--gold-deep)' },
    action: { solid: 'var(--teal)',  ink: 'var(--teal-deep)' },
    danger: { solid: 'var(--coral)', ink: 'var(--coral)' },
    neutral:{ solid: 'var(--ink-soft)', ink: 'var(--ink-soft)' },
  };
  const t = tones[tone] || tones.info;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-2xs)',
        fontWeight: 'var(--weight-bold)',
        lineHeight: 1,
        padding: '3px 9px',
        borderRadius: 'var(--radius-pill)',
        background: soft ? 'color-mix(in srgb, ' + t.solid + ' 16%, transparent)' : t.solid,
        color: soft ? t.ink : '#fff',
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
