import React from 'react';

/**
 * Sticky app header: ⭐ Star Board wordmark (teal, Fredoka) on the left,
 * a single round action button on the right (parent gate / back).
 */
export function AppHeader({ title = 'Star Board', action = null }) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        background: 'var(--surface)',
        borderBottom: '1px solid var(--line)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-medium)', color: 'var(--teal)' }}>
        ⭐ {title}
      </span>
      {action}
    </header>
  );
}

/** The round 56px header action button (e.g. ⚙️ parent gate, ← back). */
export function HeaderAction({ children, onClick, label, ...rest }) {
  const [pressed, setPressed] = React.useState(false);
  return (
    <button
      onClick={onClick}
      aria-label={label}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        minWidth: 'var(--tap-min)',
        minHeight: 'var(--tap-min)',
        borderRadius: 'var(--radius)',
        fontSize: 'var(--text-lg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: pressed ? 'var(--line)' : 'var(--surface-2)',
        color: 'var(--ink)',
        transition: 'background var(--anim-dur)',
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
