import React from 'react';
import { StarPips } from '../stars/StarPips.jsx';
import { Avatar } from '../core/Avatar.jsx';
import { Badge } from '../core/Badge.jsx';

/**
 * The big tappable task tile on the child board. Large image-first visual,
 * Fredoka label, star pips, and (for first-try tasks) a plum badge.
 * Whole card is one 100px+ tap target.
 */
export function TaskCard({ task, onTap }) {
  const [pressed, setPressed] = React.useState(false);
  return (
    <button
      onClick={() => onTap && onTap(task)}
      aria-label={`Award stars for ${task.label}`}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        background: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4)',
        boxShadow: 'var(--shadow)',
        width: '100%',
        textAlign: 'left',
        minHeight: 100,
        transform: pressed ? 'scale(0.98)' : 'scale(1)',
        transition: 'transform var(--anim-dur) var(--anim-ease)',
      }}
    >
      <Avatar emoji={task.emoji} src={task.src} size={72} alt={task.label} style={{ borderRadius: 'var(--radius)' }} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', color: 'var(--ink)', lineHeight: 'var(--leading-tight)' }}>{task.label}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <StarPips max={task.maxStars} />
          {task.mode === 'firstTry' && <Badge tone="info">First try</Badge>}
        </div>
      </div>
    </button>
  );
}
