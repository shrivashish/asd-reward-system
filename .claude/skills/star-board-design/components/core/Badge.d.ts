import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Color intent. info=plum (e.g. "First try"), reward=gold, action=teal, danger=coral, neutral=gray. */
  tone?: 'info' | 'reward' | 'action' | 'danger' | 'neutral';
  /** Tinted background + colored text instead of a solid fill. */
  soft?: boolean;
  children?: React.ReactNode;
}

/** Small rounded pill label for status & categories. */
export function Badge(props: BadgeProps): JSX.Element;
