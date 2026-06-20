import React from 'react';

/**
 * The basic Star Board surface: white, generously rounded, soft cool shadow.
 * Use `inset` for the quieter surface-2 fill (fields, notes).
 */
export function Card({
  children,
  inset = false,
  selected = false,
  selectColor = 'var(--teal)',
  padding = 'var(--space-4)',
  style = {},
  ...rest
}) {
  return (
    <div
      style={{
        background: inset ? 'var(--surface-2)' : 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: inset ? 'none' : 'var(--shadow)',
        border: selected ? `2px solid ${selectColor}` : 'none',
        padding,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
