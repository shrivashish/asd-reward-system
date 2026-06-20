import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Use the quieter surface-2 fill with no shadow (fields, note blocks). */
  inset?: boolean;
  /** Draw a 2px selection border. */
  selected?: boolean;
  /** Selection border color (teal for tasks/children, gold for goals). */
  selectColor?: string;
  /** Inner padding. Defaults to --space-4 (16px). */
  padding?: string;
  children?: React.ReactNode;
}

/**
 * White rounded surface with the soft cool shadow — the base container.
 * @startingPoint section="Core" subtitle="Surface, inset & selected card" viewport="700x180"
 */
export function Card(props: CardProps): JSX.Element;
