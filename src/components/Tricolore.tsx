/**
 * The tricolore rule from the concept.
 *
 * The concept's own note: "used once per page, never as a stripe background".
 * On the real pages that works out as one inline rule marking the opening
 * eyebrow, plus the band that caps the footer, which is how the concept's
 * own home page uses it.
 */
interface Props {
  /** `band` spans the full width at 3px; the default is the 36px inline rule. */
  variant?: 'inline' | 'band';
  className?: string;
}

export default function Tricolore({ variant = 'inline', className }: Props) {
  const classes = ['tricolore', variant === 'band' && 'tricolore--band', className]
    .filter(Boolean)
    .join(' ');
  return (
    <span className={classes} aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </span>
  );
}
