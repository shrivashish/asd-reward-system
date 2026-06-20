export interface NavItem {
  id: string;
  label: string;
  /** Emoji glyph icon. */
  icon: string;
}

export interface BottomNavProps {
  items: NavItem[];
  /** Active item id. */
  value?: string;
  onChange?: (id: string) => void;
}

/** Parent-area bottom tab bar — emoji over label, teal when active. */
export function BottomNav(props: BottomNavProps): JSX.Element;
