export interface StarPipsProps {
  /** Total pips to draw. */
  max?: number;
  /** How many are gold-filled (left to right). */
  filled?: number;
  /** Glyph font-size in px. Default 14. */
  size?: number;
}

/** Inline ★ meter — gold filled, line-gray empty. */
export function StarPips(props: StarPipsProps): JSX.Element;
