export type CredBadge = {
  /** Badge label — also the img alt. Rendered as a text badge when `src` is absent. */
  alt: string;
  /** Path to the badge image once art lands (e.g. "/site/badges/architect-foundations-logo.png"). */
  src?: string;
};

type CredBarProps = {
  label: string;
  badges: CredBadge[];
};

/**
 * The Claude certification badge wall (A1 cred band). Reused across home,
 * services, and diagnostic. Renders real badge images when `src` is provided;
 * until then, presentable text badges that share the grayscale→colour hover.
 */
export function CredBar({ label, badges }: CredBarProps) {
  return (
    <section className="cred-band">
      <div className="wrap">
        <span className="creds-label">{label}</span>
        <div className="creds-row">
          {badges.map((b) =>
            b.src ? (
              <img
                loading="lazy"
                decoding="async"
                key={b.alt}
                className="cred-badge"
                src={b.src}
                alt={b.alt}
              />
            ) : (
              <span key={b.alt} className="cred-badge-text">
                {b.alt}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
