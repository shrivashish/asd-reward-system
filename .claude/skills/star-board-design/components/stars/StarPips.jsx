import React from 'react';

/**
 * Compact star meter — small ★ glyphs, `filled` gold, the rest line-gray.
 * Used inline on task cards to show a task's max-star value or progress.
 */
export function StarPips({ max = 3, filled = 0, size = 14, style = {} }) {
  return (
    <div
      aria-label={`${filled} of ${max} stars`}
      style={{ display: 'flex', gap: 2, flexWrap: 'wrap', ...style }}
    >
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{ fontSize: size, color: i < filled ? 'var(--gold)' : 'var(--line)' }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
