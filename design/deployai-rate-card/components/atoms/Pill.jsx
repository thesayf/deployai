import React from "react";

/** Deploy AI pill button/link. Variants map to the source's .p-* classes. */
export function Pill({ variant = "blue", href, onClick, children, small = false, className = "", asLink = false, ...rest }) {
  const cls = `pill p-${variant}${small ? " nav-cta" : ""}${className ? " " + className : ""}`;
  if (onClick && !href && !asLink) return <button type="button" className={cls} onClick={onClick} {...rest}>{children}</button>;
  return <a className={cls} href={href ?? "#"} onClick={onClick} {...rest}>{children}</a>;
}
