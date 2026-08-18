export type JumpSection = { label: string; anchor: string };

type JumpNavProps = {
  /** In-page anchors — fully replaceable per page. */
  sections: JumpSection[];
};

/**
 * M03 in-page jump-nav (periwinkle cleanser band). Not used on Home;
 * built reusable for the diagnostic / services pages. Section names are
 * driven entirely by the `sections` prop.
 */
export function JumpNav({ sections }: JumpNavProps) {
  return (
    <div className="jn">
      <div className="wrap">
        {sections.map((s) => (
          <a key={s.anchor} href={s.anchor}>
            {s.label}
          </a>
        ))}
      </div>
    </div>
  );
}
