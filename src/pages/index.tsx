import React from "react";
import Head from "next/head";
import { AnimatedNavBar } from "@/components/navigation/AnimatedNavBar";
import { Hero } from "@/components/hero/Hero";
import { ProblemAgitation } from "@/components/problem-agitation/ProblemAgitation";
import { TimelineProcess } from "@/components/timeline-process/TimelineProcess";
import { CaseStudiesBrutal } from "@/components/case-studies-brutal/CaseStudiesBrutal";
import { MVPPricingBrutal } from "@/components/mvp-pricing-brutal/MVPPricingBrutal";
import { TechStackShowcase } from "@/components/tech-stack-showcase/TechStackShowcase";
import { FAQ } from "@/components/faq/FAQ";
import { FinalCTA } from "@/components/final-cta/FinalCTA";
import { Footer } from "@/components/footer/Footer";
import { LogoTicker } from "@/components/logo-ticker/LogoTicker";
import { StaggerTestimonials } from "@/components/stagger-testimonials/StaggerTestimonials";
import { SectionWrapper } from "@/components/section-wrapper/SectionWrapper";

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
        <SectionWrapper variant="default" spacing="none">
          <Hero variant={heroVariant} />
        </SectionWrapper>

        {/* Problem Agitation */}
        <SectionWrapper variant="default" spacing="large">
          <ProblemAgitation {...problemContent} />
        </SectionWrapper>

        {/* Process Timeline */}
        <SectionWrapper variant="default" spacing="large">
          <TimelineProcess />
        </SectionWrapper>

        {/* Portfolio/Case Studies */}
        <SectionWrapper variant="default" spacing="large">
          <CaseStudiesBrutal 
            title="Real People, Real Impact"
            subtitle="See how we've transformed operations for companies just like yours"
            variant="image-hover"
            accentColor="orange"
            filter="all"
          />
        </SectionWrapper>

        {/* Social Proof */}
        <StaggerTestimonials />

        {/* Pricing Section */}
        <SectionWrapper variant="default" spacing="large">
          <MVPPricingBrutal 
            title="Simple, Transparent Pricing"
            subtitle="One price. One deliverable. No hidden costs or scope creep."
            price="$10,000"
            features={[
              "Full MVP development",
              "AI integration (OpenAI/Claude)",
              "Payment processing (Stripe)",
              "User authentication",
              "Admin dashboard",
              "Deployment & hosting setup",
              "30 days post-launch support",
              "Complete source code ownership"
            ]}
            paymentSchedule={[
              {
                phase: "To Start",
                amount: "$1,000",
                percentage: "10%",
                description: "Project kickoff & planning",
                icon: "calendar" as const
              },
              {
                phase: "Week 2 Milestone",
                amount: "$4,000",
                percentage: "40%",
                description: "Core development complete",
                icon: "creditcard" as const
              },
              {
                phase: "On Delivery",
                amount: "$5,000",
                percentage: "50%",
                description: "Live MVP with full handover",
                icon: "shield" as const
              }
            ]}
            guaranteeItems={[
              "Only 10% deposit required to start",
              "Weekly progress demos",
              "Full refund if we miss deadline",
              "100% code ownership"
            ]}
            ctaText="Book Your Free Strategy Call"
            limitText="Limited to 3 new MVPs per month"
            variant="default"
            accentColor="blue"
          />
        </SectionWrapper>

        {/* Tech Stack */}
        <SectionWrapper variant="default" spacing="large">
          <TechStackShowcase />
        </SectionWrapper>

        {/* FAQ Section */}
        <SectionWrapper variant="default" spacing="large">
          <FAQ variant="mvp" />
        </SectionWrapper>

        {/* Final CTA */}
        <SectionWrapper variant="default" spacing="large">
          <FinalCTA />
        </SectionWrapper>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
};

export default HomePage;
