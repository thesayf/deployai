import type { ReactNode } from "react";

/** A laptop device chassis for the desktop surfaces (CRM, diary). The screen is
 *  a browser window (chrome + URL bar) so the web apps read as real screens, not
 *  flat cards. Pairs with PhoneFrame so all product shots are real hardware. */
export function LaptopFrame({
  url = "app.jbluxedetailing.co.uk",
  children,
}: {
  url?: string;
  children: ReactNode;
}) {
  return (
    <div className="dv-laptop">
      <span className="dv-laptop-cam" aria-hidden="true" />
      <div className="dv-laptop-screen">
        <div className="dv-lbar">
          <span className="dv-lbar-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="dv-lbar-url">{url}</span>
        </div>
        <div className="dv-lbody">{children}</div>
      </div>
      <div className="dv-laptop-chin" aria-hidden="true" />
    </div>
  );
}
