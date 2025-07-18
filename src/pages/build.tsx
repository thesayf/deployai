import React from "react";
import Head from "next/head";
import { AnimatedNavBar } from "@/components/navigation/AnimatedNavBar";
import { Hero } from "@/components/hero/Hero";
import { ProblemAgitation } from "@/components/problem-agitation/ProblemAgitation";
import { ProcessTimeline } from "@/components/process-timeline/ProcessTimeline";
import { CaseStudies } from "@/components/case-studies/CaseStudies";
import { MVPPricing } from "@/components/mvp-pricing/MVPPricing";
import { TechStackShowcase } from "@/components/tech-stack-showcase/TechStackShowcase";
import { FAQ } from "@/components/faq/FAQ";
import { FinalCTA } from "@/components/final-cta/FinalCTA";
import { Footer } from "@/components/footer/Footer";
import { LogoTicker } from "@/components/logo-ticker/LogoTicker";
import { StaggerTestimonials } from "@/components/stagger-testimonials/StaggerTestimonials";

const BuildPage: React.FC = () => {
  // MVP-specific hero content
  const heroVariant = "build" as const;

  // MVP-specific problem agitation content
  const problemContent = {
    variant: "mvp" as const,
    opening: "Most developers quote 6 months and $50k for your MVP...",
    painPoints: [
      "6-month timelines",
      "$50k+ quotes",
      "endless meetings",
      "no transparency",
    ],
    solution: "We deliver real MVPs in 4 weeks for $10k flat",
  };

  // MVP-specific FAQ content
  const faqContent = {
    variant: "mvp" as const,
    questions: [
      {
        question: "What exactly can you build in 4 weeks?",
        answer:
          "We can build a full-featured AI app with user authentication, payment processing, admin dashboard, and core functionality. This includes database setup, API development, AI integration (OpenAI/Claude), and deployment. The scope is defined clearly in week 1 to ensure we deliver exactly what you need.",
      },
      {
        question: "What if my project needs more than 4 weeks?",
        answer:
          "We scope projects specifically for 4-week delivery during our initial consultation. If additional features are needed, we can discuss a follow-up project after the initial MVP is delivered. Our goal is to get you to market quickly with a viable product.",
      },
      {
        question: "Do I own the code?",
        answer:
          "Yes, you own 100% of the code, documentation, and intellectual property. We provide complete source code access and documentation. There are no licensing fees or vendor lock-in - you can take the code anywhere.",
      },
      {
        question: "What happens after the MVP launches?",
        answer:
          "We include 30 days of post-launch support for bug fixes and minor adjustments. After that, you can maintain the code in-house, hire other developers, or work with us on ongoing development - you have complete flexibility.",
      },
      {
        question: "Can you integrate with my existing systems?",
        answer:
          "Yes, we can integrate with existing APIs, databases, and third-party services. We'll assess integration requirements during the planning phase and include them in the 4-week timeline if they're essential for your MVP.",
      },
      {
        question: "What if I need changes during development?",
        answer:
          "Minor changes are included in our process. For major scope changes, we'll discuss options including extending the timeline or delivering the original scope first, then adding changes in a follow-up project.",
      },
    ],
  };

  // MVP-specific final CTA content
  const finalCTAContent = {
    variant: "mvp" as const,
    headline: "Start Your Project This Month",
    subheadline: "Limited to 3 new MVPs per month to ensure quality",
    urgency: "2 spots left for January 2025",
    ctaText: "Book Your Free Strategy Call",
    ctaLink: "https://calendly.com/your-booking-link",
  };

  return (
    <>
      <Head>
        <title>Build Your AI App MVP in 4 Weeks | $10k Fixed Price</title>
        <meta
          name="description"
          content="Launch your AI app MVP in just 4 weeks for $10k total. Only 10% deposit required. Full code ownership, transparent process, and guaranteed delivery."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph tags */}
        <meta
          property="og:title"
          content="Build Your AI App MVP in 4 Weeks | $10k Fixed Price"
        />
        <meta
          property="og:description"
          content="Launch your AI app MVP in just 4 weeks for $10k total. Only 10% deposit required. Full code ownership, transparent process, and guaranteed delivery."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/build" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Build Your AI App MVP in 4 Weeks | $10k Fixed Price"
        />
        <meta
          name="twitter:description"
          content="Launch your AI app MVP in just 4 weeks for $10k total. Only 10% deposit required. Full code ownership, transparent process, and guaranteed delivery."
        />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "AI App MVP Development",
              description: "4-week AI app MVP development service",
              provider: {
                "@type": "Organization",
                name: "Your Company Name",
              },
              offers: {
                "@type": "Offer",
                price: "10000",
                priceCurrency: "GBP",
                description: "Complete AI app MVP development in 4 weeks",
              },
            }),
          }}
        />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Navigation */}
        <AnimatedNavBar />

        {/* Hero Section */}
        <Hero variant={heroVariant} />

        {/* Problem Agitation */}
        <ProblemAgitation {...problemContent} />

        {/* Process Timeline */}
        <ProcessTimeline />

        {/* Portfolio/Case Studies */}
        <CaseStudies
          title="Real MVPs We've Built"
          subtitle="See how we've helped founders launch successful AI apps in just 4 weeks"
          filterCategory="mvp"
        />

        {/* Social Proof */}
        <StaggerTestimonials
          title="What Founders Are Saying"
          subtitle="Real feedback from founders who launched their MVPs with us"
          variant="mvp"
        />

        {/* Pricing Section */}
        <MVPPricing />

        {/* Tech Stack */}
        <TechStackShowcase />

        {/* FAQ Section */}
        <FAQ {...faqContent} />

        {/* Final CTA */}
        <FinalCTA {...finalCTAContent} />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
};

export default BuildPage;
