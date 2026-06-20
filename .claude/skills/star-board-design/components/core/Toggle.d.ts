export interface ToggleProps {
  /** On/off state. */
  checked?: boolean;
  /** Called with the next boolean value. */
  onChange?: (next: boolean) => void;
  /** Accessible label (announced to screen readers). */
  label?: string;
  disabled?: boolean;
}

/** Settings-style switch — teal when on, sliding white thumb. */
export function Toggle(props: ToggleProps): JSX.Element;
