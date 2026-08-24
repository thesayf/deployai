import { SiteLink } from "@/components/site/SiteLink";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const grounds = {
  blue: "bg-blue",
  royal: "bg-royal",
  coral: "bg-coral",
  lime: "bg-lime",
  lavender: "bg-lavender",
  peri: "bg-peri",
} as const;

/** Mid-page CTA interlude (Slalom pattern): a full-width saturated band with a
 *  big centred question + one outline-pill CTA. Placed after "At a glance".
 *  Ground colour is chosen per page from the palette (tone prop). */
export function CaseInterlude({
  heading,
  label,
  href,
  tone = "blue",
}: {
  heading: ReactNode;
  label: string;
  href: string;
  tone?: keyof typeof grounds;
}) {
  return (
    <section className={cn("case-interlude", grounds[tone])}>
      <div className="wrap">
        <h2>{heading}</h2>
        <SiteLink className="pill-arrow" href={href}>
          {label}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </SiteLink>
      </div>
    </section>
  );
}
