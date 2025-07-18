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

const HomePage: React.FC = () => {
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
        <meta property="og:url" content="https://yourwebsite.com/" />

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
                priceCurrency: "USD",
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
        <CaseStudies filter="all" />

        {/* Social Proof */}
        <StaggerTestimonials />

        {/* Pricing Section */}
        <MVPPricing />

        {/* Tech Stack */}
        <TechStackShowcase />

        {/* FAQ Section */}
        <FAQ variant="mvp" />

        {/* Final CTA */}
        <FinalCTA />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
};

export default HomePage;
