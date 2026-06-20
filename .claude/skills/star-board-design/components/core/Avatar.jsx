import React from 'react';

/**
 * Round avatar tile. Shows an emoji glyph (the product's default,
 * image-first identity) or an image URL, on the quiet surface-2 fill.
 */
export function Avatar({ emoji = '👤', src = null, size = 48, alt = '', style = {}, ...rest }) {
  return (
    <div
      role="img"
      aria-label={alt}
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: '50%',
        background: 'var(--surface-2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: Math.round(size * 0.55),
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      {src ? (
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <span aria-hidden="true">{emoji}</span>
      )}
    </div>
  );
}
