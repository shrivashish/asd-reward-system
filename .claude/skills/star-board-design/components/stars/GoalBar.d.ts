export interface GoalReward {
  label: string;
  cost: number;
  emoji?: string;
  src?: string | null;
}

export interface GoalBarProps {
  /** The current goal reward, or null/undefined for the empty state. */
  reward?: GoalReward | null;
  /** Stars earned so far. */
  balance?: number;
  /** Called with the reward when the redeem button is tapped. */
  onRedeem?: (reward: GoalReward) => void;
}

/**
 * Child-board goal header: reward, balance, FillingBoard, and redeem CTA.
 * @startingPoint section="Stars" subtitle="Goal progress header with redeem state" viewport="700x320"
 */
export function GoalBar(props: GoalBarProps): JSX.Element;
