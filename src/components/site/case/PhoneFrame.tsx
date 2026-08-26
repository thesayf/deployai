import type { ReactNode } from "react";

/** A simple phone device shell for the mobile surfaces (e.g. the chat). */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="dv-phone">
      <span className="dv-phone-speaker" aria-hidden="true" />
      <div className="dv-phone-screen">{children}</div>
    </div>
  );
}
