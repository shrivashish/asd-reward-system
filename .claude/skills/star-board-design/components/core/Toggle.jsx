import React from 'react';

/**
 * Star Board switch toggle. Matches the Settings screen: 52×30 track,
 * teal when on, white thumb that slides 22px.
 */
export function Toggle({ checked = false, onChange, label, disabled = false, style = {}, ...rest }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange && onChange(!checked)}
      style={{
        width: 52,
        height: 30,
        flexShrink: 0,
        borderRadius: 'var(--radius-pill)',
        background: checked ? 'var(--teal)' : 'var(--line)',
        position: 'relative',
        opacity: disabled ? 0.5 : 1,
        transition: 'background var(--anim-dur) var(--anim-ease)',
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          position: 'absolute',
          top: 3,
          left: 3,
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 1px 4px rgba(0,0,0,.2)',
          transform: checked ? 'translateX(22px)' : 'translateX(0)',
          transition: 'transform var(--anim-dur) var(--anim-ease)',
        }}
      />
    </button>
  );
}
