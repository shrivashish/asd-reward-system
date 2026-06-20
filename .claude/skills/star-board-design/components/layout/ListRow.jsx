import React from 'react';

/**
 * Horizontal list row on a white card: leading visual (emoji/image/node),
 * title + optional meta, and trailing actions. The workhorse of every
 * parent management list (tasks, rewards, children, settings).
 */
export function ListRow({ leading, title, meta, trailing, selected = false, selectColor = 'var(--teal)', dim = false, style = {} }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        background: 'var(--surface)',
        borderRadius: 'var(--radius)',
        padding: 'var(--space-3)',
        boxShadow: 'var(--shadow)',
        border: selected ? `2px solid ${selectColor}` : 'none',
        opacity: dim ? 0.5 : 1,
        ...style,
      }}
    >
      {leading != null && <div style={{ flexShrink: 0 }}>{leading}</div>}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--weight-medium)', color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
        {meta != null && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-soft)' }}>{meta}</span>}
      </div>
      {trailing != null && <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', flexShrink: 0 }}>{trailing}</div>}
    </div>
  );
}
