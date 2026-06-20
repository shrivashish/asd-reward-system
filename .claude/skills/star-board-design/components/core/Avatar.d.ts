export interface AvatarProps {
  /** Emoji glyph fallback (Star Board's image-first default). */
  emoji?: string;
  /** Optional image URL — overrides the emoji. */
  src?: string | null;
  /** Diameter in px. Default 48. */
  size?: number;
  /** Accessible label. */
  alt?: string;
}

/** Round emoji-or-image identity tile on the quiet surface-2 fill. */
export function Avatar(props: AvatarProps): JSX.Element;
