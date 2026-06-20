import React from 'react';

export interface SheetProps {
  children?: React.ReactNode;
  /** Called when the scrim is tapped. */
  onClose?: () => void;
  /** bottom = slide-up sheet (default), center = dialog. */
  anchor?: 'bottom' | 'center';
  /** Max content width in px. Default 480. */
  maxWidth?: number;
  zIndex?: number;
}

/** Modal surface over the calm scrim — bottom sheet or centered dialog. */
export function Sheet(props: SheetProps): JSX.Element;
