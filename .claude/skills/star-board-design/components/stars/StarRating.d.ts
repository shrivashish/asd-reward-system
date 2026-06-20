export interface StarRatingProps {
  /** Highest awardable star count. */
  max?: number;
  /** Currently selected value (0..max). */
  value?: number;
  /** Called with the chosen star count. */
  onChange?: (value: number) => void;
  /** Question shown above the stars. */
  prompt?: string;
}

/**
 * Award picker with an explicit "0 = no stars" soft-exit option.
 * @startingPoint section="Stars" subtitle="Tap-to-award star rating picker" viewport="700x220"
 */
export function StarRating(props: StarRatingProps): JSX.Element;
