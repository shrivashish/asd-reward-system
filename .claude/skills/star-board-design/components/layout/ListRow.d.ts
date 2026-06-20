import React from 'react';

export interface ListRowProps {
  /** Leading visual — Avatar, ImageDisplay, emoji, etc. */
  leading?: React.ReactNode;
  title: React.ReactNode;
  /** Secondary line under the title. */
  meta?: React.ReactNode;
  /** Trailing actions (buttons, badges). */
  trailing?: React.ReactNode;
  /** Draw a 2px selection border. */
  selected?: boolean;
  selectColor?: string;
  /** Dim to 50% (e.g. archived items). */
  dim?: boolean;
}

/**
 * The workhorse management row: leading visual, title/meta, trailing actions.
 * @startingPoint section="Layout" subtitle="List row for tasks, rewards & children" viewport="700x100"
 */
export function ListRow(props: ListRowProps): JSX.Element;
