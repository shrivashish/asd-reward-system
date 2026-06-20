import React from 'react';

/**
 * Modal surface over the calm scrim. `anchor="bottom"` slides up from the
 * bottom edge (award flow); `anchor="center"` is a centered dialog
 * (parent gate, confirmations). Tapping the scrim calls onClose.
 */
export function Sheet({ children, onClose, anchor = 'bottom', maxWidth = 480, zIndex = 50 }) {
  const bottom = anchor === 'bottom';
  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--overlay-scrim)',
        display: 'flex',
        alignItems: bottom ? 'flex-end' : 'center',
        justifyContent: 'center',
        zIndex,
        padding: bottom ? 0 : 'var(--space-6)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--surface)',
          borderRadius: bottom ? 'var(--radius-lg) var(--radius-lg) 0 0' : 'var(--radius-lg)',
          padding: bottom ? '24px 20px 36px' : '32px 24px',
          width: '100%',
          maxWidth,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-5)',
          animation: bottom
            ? 'sb-sheet-up var(--anim-dur) var(--anim-ease-settle)'
            : 'sb-sheet-pop var(--anim-dur) var(--anim-ease-settle)',
        }}
      >
        {children}
      </div>
      <style>{`
        @keyframes sb-sheet-up { from { transform: translateY(20px); opacity: .8 } to { transform: translateY(0); opacity: 1 } }
        @keyframes sb-sheet-pop { from { transform: scale(.95); opacity: .6 } to { transform: scale(1); opacity: 1 } }
      `}</style>
    </div>
  );
}
