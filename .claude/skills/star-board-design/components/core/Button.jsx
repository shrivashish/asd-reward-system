import React from 'react';

/**
 * Star Board primary button. Big, rounded, calm. Defaults to the
 * 56px minimum tap target the whole product is built around.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  disabled = false,
  iconLeft = null,
  style = {},
  ...rest
}) {
  const palettes = {
    primary:   { bg: 'var(--teal)',       fg: '#fff',            press: 'var(--teal-deep)' },
    reward:    { bg: 'var(--gold)',       fg: '#fff',            press: 'var(--gold-deep)' },
    secondary: { bg: 'var(--surface-2)',  fg: 'var(--ink)',      press: 'var(--line)' },
    ghost:     { bg: 'transparent',       fg: 'var(--ink-soft)', press: 'var(--surface-2)' },
    danger:    { bg: 'var(--coral)',      fg: '#fff',            press: 'var(--coral)' },
  };
  const p = palettes[variant] || palettes.primary;

  const sizes = {
    sm: { minHeight: 40, padding: '6px 14px', fontSize: 'var(--text-sm)' },
    md: { minHeight: 'var(--tap-min)', padding: '12px 20px', fontSize: 'var(--text-md)' },
    lg: { minHeight: 'var(--tap-min)', padding: '14px 28px', fontSize: 'var(--text-lg)' },
  };
  const s = sizes[size] || sizes.md;

  const [pressed, setPressed] = React.useState(false);

  return (
    <button
      disabled={disabled}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-2)',
        width: block ? '100%' : 'auto',
        minHeight: s.minHeight,
        padding: s.padding,
        fontSize: s.fontSize,
        fontFamily: 'var(--font-body)',
        fontWeight: 'var(--weight-bold)',
        borderRadius: 'var(--radius)',
        background: pressed && !disabled ? p.press : p.bg,
        color: p.fg,
        opacity: disabled ? 0.5 : 1,
        boxShadow: variant === 'ghost' || variant === 'secondary' ? 'none' : 'var(--shadow)',
        transition: 'background var(--anim-dur) var(--anim-ease)',
        ...style,
      }}
      {...rest}
    >
      {iconLeft && <span aria-hidden="true">{iconLeft}</span>}
      {children}
    </button>
  );
}
