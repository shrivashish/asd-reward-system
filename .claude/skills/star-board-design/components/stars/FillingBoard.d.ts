export interface FillingBoardProps {
  /** Stars earned so far. */
  balance?: number;
  /** Goal cost — number of slots drawn. */
  cost?: number;
  /** Slot size in px. Default 34. */
  slotSize?: number;
}

/** The literal star board: slots that fill with gold stars toward a goal. */
export function FillingBoard(props: FillingBoardProps): JSX.Element;
