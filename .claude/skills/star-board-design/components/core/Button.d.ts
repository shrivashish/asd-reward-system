import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual intent. primary=teal action, reward=gold (stars/redeem), secondary=quiet fill, ghost=text-only, danger=coral (destructive). */
  variant?: 'primary' | 'reward' | 'secondary' | 'ghost' | 'danger';
  /** sm=40px, md=56px (default tap target), lg=larger display action. */
  size?: 'sm' | 'md' | 'lg';
  /** Stretch to full container width. */
  block?: boolean;
  disabled?: boolean;
  /** Optional leading icon (emoji or node) — Star Board uses emoji glyphs. */
  iconLeft?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * The Star Board button: large, rounded, single-action-color.
 * @startingPoint section="Core" subtitle="Primary, reward, secondary, ghost & danger buttons" viewport="700x200"
 */
export function Button(props: ButtonProps): JSX.Element;
