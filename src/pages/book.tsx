import Head from "next/head";
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
      <Head>
        <title>Book a call: a straight answer on AI for your business</title>
        <meta
          name="description"
          content="Book a free thirty-minute call with an experienced engineer. We will look at where AI could create the most value for your business and whether we are the right fit. No obligation, and the booking happens right on this page."
        />
      </Head>
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
