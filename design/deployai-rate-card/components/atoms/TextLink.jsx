import React from "react";

/** Tertiary text link (.tert) and arrow link (.arrow). kind="tert"|"arrow"; tone="blue"|"dark"|"ink". */
export function TextLink({ kind = "tert", tone = "blue", href = "#", children, ...rest }) {
  const cls = kind === "arrow" ? "arrow" : `tert${tone !== "blue" ? " " + tone : ""}`;
  return <a className={cls} href={href} {...rest}>{children}</a>;
}
