import { Seo } from "@/components/site/Seo";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CredBar } from "@/components/site/CredBar";
import { BookHero } from "@/components/site/book/BookHero";
import { BookAgenda } from "@/components/site/book/BookAgenda";
import { BookCalendar } from "@/components/site/book/BookCalendar";
import { BookWho } from "@/components/site/book/BookWho";
import { BookOffRamp } from "@/components/site/book/BookOffRamp";

const credBadges = [
  {
    alt: "Claude Certified Architect — Foundations",
    src: "/site/badges/architect-foundations-logo.png",
  },
  { alt: "Claude Certified Developer", src: "/site/badges/developer-logo.png" },
  {
    alt: "Claude Certified Architect — Professional",
    src: "/site/badges/architect-pro-logo.png",
  },
  { alt: "Claude Certified Associate", src: "/site/badges/associate-logo.png" },
  { alt: "Claude Code Partner", src: "/site/badges/partner-logo.png" },
];

export default function Book() {
  return (
    <>
      <Seo
        title="Book a call | Deploy AI Studio"
        description="A free thirty-minute call with the engineer who'd build it: where AI could pay off in your business, and whether we're the right fit. No obligation."
        path="/book"
      />
      <div className="site">
        <Navbar />
        <BookHero />
        <CredBar label="Certified across the Claude stack" badges={credBadges} />
        <BookAgenda />
        <BookCalendar />
        <BookWho />
        <BookOffRamp />
        <Footer />
      </div>
    </>
  );
}
