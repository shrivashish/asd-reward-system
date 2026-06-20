import React from 'react';

export interface AppHeaderProps {
  /** Wordmark text after the ⭐. Default "Star Board". */
  title?: string;
  /** Right-side action node — typically a <HeaderAction>. */
  action?: React.ReactNode;
}

export interface HeaderActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible label. */
  label?: string;
  children?: React.ReactNode;
}

/** Sticky top bar with the teal ⭐ Star Board wordmark. */
export function AppHeader(props: AppHeaderProps): JSX.Element;
/** Round 56px header action button. */
export function HeaderAction(props: HeaderActionProps): JSX.Element;
