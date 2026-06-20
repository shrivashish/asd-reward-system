export interface Task {
  label: string;
  maxStars: number;
  /** 'skill' = award what they managed; 'firstTry' = full stars on the attempt. */
  mode?: 'skill' | 'firstTry';
  emoji?: string;
  src?: string | null;
}

export interface TaskCardProps {
  task: Task;
  /** Called with the task when the card is tapped (opens the award flow). */
  onTap?: (task: Task) => void;
}

/**
 * Big image-first task tile on the child board — the whole card is one tap target.
 * @startingPoint section="Layout" subtitle="Tappable child-board task tile" viewport="700x140"
 */
export function TaskCard(props: TaskCardProps): JSX.Element;
