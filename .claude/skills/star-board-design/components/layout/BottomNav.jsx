import React from 'react';

/**
 * Bottom tab bar for the parent area. Emoji icon over a tiny label;
 * the active tab turns teal. Fixed to the bottom of the viewport.
 */
export function BottomNav({ items = [], value, onChange }) {
  return (
    <nav
      aria-label="Parent navigation"
      style={{
        display: 'flex',
        background: 'var(--surface)',
        borderTop: '1px solid var(--line)',
      }}
    >
      {items.map((item) => {
        const active = item.id === value;
        return (
          <button
            key={item.id}
            onClick={() => onChange && onChange(item.id)}
            aria-current={active ? 'page' : undefined}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              padding: '8px 4px',
              minHeight: 'var(--tap-min)',
              color: active ? 'var(--teal)' : 'var(--ink-soft)',
              transition: 'color var(--anim-dur)',
            }}
          >
            <span aria-hidden="true" style={{ fontSize: 20 }}>{item.icon}</span>
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-bold)', fontSize: 'var(--text-xs)' }}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
