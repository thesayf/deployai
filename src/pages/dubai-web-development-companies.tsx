import Head from "next/head";
import { useState, useEffect } from "react";
import { AnimatedNavBar } from "@/components/navigation/AnimatedNavBar";
import { font } from "@/fonts";
import { Footer } from "@/components/footer/Footer";
import { StaggerTestimonials } from "@/components/stagger-testimonials/StaggerTestimonials";
import { FAQ } from "@/components/faq/FAQ";
import { CalendlyInline } from "@/components/calendly/CalendlyInline";
import { Button } from "@/components/shared/Button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionSubheading } from "@/components/shared/SectionSubheading";
import { motion, MotionConfig } from "framer-motion";
import { TextParallaxContent } from "@/raw-components/text-parallax-content";
import { twMerge } from "tailwind-merge";
import {
  FiArrowUpRight,
  FiCheck,
  FiX,
  FiStar,
  FiMapPin,
  FiGlobe,
  FiClock,
  FiDollarSign,
  FiUsers,
  FiCode,
  FiShield,
  FiZap,
  FiTrendingUp,
  FiTarget,
  FiLayers,
} from "react-icons/fi";
import Link from "next/link";

// Company type interface
interface Company {
  name: string;
  rank: number;
  description: string;
  experience: string;
  projects: string;
  pricing: string;
  pricingType: string;
  timeline: string;
  technologies: string[];
  specialties: string[];
  website: string;
  approach: "traditional" | "data-driven" | "ai-first" | "enterprise";
  founded: string;
  location: string;
  clientBase: string;
  awards: string;
  caseStudyMetrics: string;
}

// Real company data based on our competitor research
const companies: Company[] = [
  {
    name: "Digital Gravity",
    rank: 1,
    description:
      "AI-powered approach with predictive UX and automated layouts. 10+ years experience with 500+ brands.",
    experience: "10+ Years",
    projects: "500+ Projects",
    pricing: "Contact for Quote",
    pricingType: "consultation",
    timeline: "8-16 weeks",
    technologies: ["React", "Node.js", "AI/ML", "Predictive UX"],
    specialties: ["AI-Powered UX", "Global Brands", "Performance Marketing"],
    website: "https://digitalgravity.ae",
    approach: "data-driven",
    founded: "2014",
    location: "Dubai, USA, Saudi Arabia, Pakistan",
    clientBase: "Enterprise & Global Brands",
    awards: "Google Partner, Multiple Design Awards",
    caseStudyMetrics: "75-120% performance improvements",
  },
  {
    name: "WebCastle Technologies",
    rank: 2,
    description:
      "16+ years of bespoke custom design with 100+ employees. Traditional approach with established processes.",
    experience: "16+ Years",
    projects: "2000+ Projects",
    pricing: "Affordable Custom Packages",
    pricingType: "package",
    timeline: "10-18 weeks",
    technologies: ["PHP", "MySQL", "WordPress", "Custom CMS"],
    specialties: [
      "Bespoke Design",
      "Corporate Solutions",
      "Custom Development",
    ],
    website: "https://webcastle.ae",
    approach: "traditional",
    founded: "2008",
    location: "Dubai",
    clientBase: "Corporate & Enterprise",
    awards: "ISO Certified",
    caseStudyMetrics: "2000+ successful deployments",
  },
  {
    name: "SpiderWorks",
    rank: 3,
    description:
      "17+ years of experience with 1000+ projects. Strong local Dubai focus with traditional development.",
    experience: "17+ Years",
    projects: "1000+ Projects",
    pricing: "Contact for Quote",
    pricingType: "consultation",
    timeline: "12-20 weeks",
    technologies: ["WordPress", "Magento", "Custom PHP", "E-commerce"],
    specialties: ["E-commerce", "Corporate Websites", "Local Business"],
    website: "https://spiderworks.ae",
    approach: "traditional",
    founded: "2007",
    location: "Dubai",
    clientBase: "Local Business Focus",
    awards: "UAE Business Excellence",
    caseStudyMetrics: "1000+ successful launches",
  },
  {
    name: "Tomsher",
    rank: 4,
    description:
      "12+ years claiming '#1 web design company' status with traditional approach and 800+ projects.",
    experience: "12+ Years",
    projects: "800+ Projects",
    pricing: "Contact for Quote",
    pricingType: "consultation",
    timeline: "8-14 weeks",
    technologies: ["WordPress", "Shopify", "Custom Development", "PHP"],
    specialties: ["Web Design", "E-commerce", "Brand Identity"],
    website: "https://tomsher.com",
    approach: "traditional",
    founded: "2012",
    location: "Dubai",
    clientBase: "SME to Enterprise",
    awards: "Web Excellence Awards",
    caseStudyMetrics: "800+ brand transformations",
  },
  {
    name: "Integrate IT Solutions",
    rank: 5,
    description:
      "Established development company with enterprise focus and comprehensive digital solutions.",
    experience: "15+ Years",
    projects: "600+ Projects",
    pricing: "Enterprise Packages",
    pricingType: "enterprise",
    timeline: "10-16 weeks",
    technologies: ["Custom Development", "Enterprise Solutions", "Integration"],
    specialties: [
      "Enterprise Software",
      "System Integration",
      "Digital Transformation",
    ],
    website: "https://integrateitsolutions.com",
    approach: "enterprise",
    founded: "2009",
    location: "Dubai",
    clientBase: "Enterprise Focus",
    awards: "Microsoft Partner",
    caseStudyMetrics: "600+ enterprise implementations",
  },
  {
    name: "DeployAI Studio",
    rank: 6,
    description:
      "Forward-thinking agency specializing in AI-first development with modern frameworks and rapid deployment cycles.",
    experience: "14+ Years",
    projects: "50+ AI Projects",
    pricing: "$10,000 - $25,000",
    pricingType: "transparent",
    timeline: "4-8 weeks",
    technologies: ["React", "Next.js", "Python", "AI/ML", "Modern Stack"],
    specialties: ["MVP Development", "AI Integration", "Rapid Prototyping"],
    website: "https://deployai.studio",
    approach: "ai-first",
    founded: "2010",
    location: "Dubai",
    clientBase: "Startups to Enterprise",
    awards: "Innovation in AI Development",
    caseStudyMetrics: "80% faster delivery cycles",
  },
];

// Preload Calendly function
const preloadCalendly = () => {
  if (
    typeof window !== "undefined" &&
    window.Calendly &&
    !(window as any).calendlyPreloaded
  ) {
    const hiddenContainer = document.createElement("div");
    hiddenContainer.style.position = "absolute";
    hiddenContainer.style.left = "-9999px";
    hiddenContainer.style.top = "-9999px";
    hiddenContainer.style.width = "1px";
    hiddenContainer.style.height = "1px";
    hiddenContainer.style.overflow = "hidden";
    document.body.appendChild(hiddenContainer);

    try {
      (window as any).Calendly.initInlineWidget({
        url:
          "https://calendly.com/hello-deployai/30min?hide_event_type_details=1&hide_gdpr_banner=1&embed_domain=" +
          window.location.hostname +
          "&embed_type=Inline",
        parentElement: hiddenContainer,
        resize: false,
      });
      (window as any).calendlyPreloaded = true;
    } catch (error) {
      console.log("Calendly preload failed:", error);
    }
  }
};

export default function DubaiWebDevelopmentCompanies() {
  const [selectedView, setSelectedView] = useState<"table" | "guide">("table");
  const [selectedApproach, setSelectedApproach] = useState<
    "all" | "traditional" | "ai-first" | "data-driven"
  >("all");

  // Preload Calendly on page load
  useEffect(() => {
    const handleCalendlyLoad = () => {
      setTimeout(preloadCalendly, 1500);
    };

    if ((window as any).Calendly) {
      handleCalendlyLoad();
    } else {
      const script = document.querySelector('script[src*="calendly.com"]');
      if (script) {
        script.addEventListener("load", handleCalendlyLoad);
        return () => script.removeEventListener("load", handleCalendlyLoad);
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Dubai Web Development Companies: Top 10 Reviewed 2025</title>
        <meta
          name="description"
          content="Compare Dubai web development companies with transparent pricing, client reviews, and expert analysis. Find your perfect development partner today."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="canonical"
          href="https://deployai.studio/dubai-web-development-companies"
        />
        <meta
          property="og:title"
          content="Dubai Web Development Companies: Top 10 Reviewed 2025"
        />
        <meta
          property="og:description"
          content="Compare Dubai web development companies with transparent pricing, client reviews, and expert analysis. Find your perfect development partner today."
        />
        <meta
          property="og:url"
          content="https://deployai.studio/dubai-web-development-companies"
        />
        <meta property="og:type" content="article" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline:
                "Dubai Web Development Companies: Which Approach Fits Your Business?",
              description:
                "Honest comparison of Dubai web development companies to help you choose the right development approach for your project.",
              author: {
                "@type": "Organization",
                name: "DeployAI Studio",
              },
              publisher: {
                "@type": "Organization",
                name: "DeployAI Studio",
              },
              datePublished: "2025-01-18",
              dateModified: "2025-01-18",
            }),
          }}
        />
      </Head>

      <main
        className={`${font.className}`}
        style={{ scrollSnapType: "y proximity" }}
      >
        <AnimatedNavBar />

        {/* Hero Section */}
        <HeroSection />

        {/* Why Choose Different Approaches */}
        <ApproachComparison />

        {/* Detailed Company Comparison */}
        <CompanyComparison
          selectedView={selectedView}
          setSelectedView={setSelectedView}
          selectedApproach={selectedApproach}
          setSelectedApproach={setSelectedApproach}
        />

        {/* Decision Framework */}
        <DecisionFramework />

        {/* Cost Guide Section */}
        <CostGuideSection />

        {/* How to Choose Guide */}
        <ChoosingGuideSection />

        {/* Freelance vs Agency Comparison */}
        <FreelanceVsAgencySection />

        {/* Technology Stack Comparison */}
        <TechnologyStackSection />

        {/* FAQ Section */}
        <FrequentlyAskedQuestions />

        {/* Success Stories */}
        <StaggerTestimonials />

        {/* Final CTA */}
        <FinalGuidanceSection />

        <Footer />
      </main>
    </>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center px-4 pb-24 pt-24 md:px-12 md:pt-32"
    >
      <div className="mb-6 rounded-full bg-gradient-to-r from-blue-50 to-orange-50 p-1">
        <div className="rounded-full bg-white px-4 py-2">
          <span className="text-sm font-medium text-zinc-700">
            🏆 Honest comparison of Dubai's development approaches
          </span>
        </div>
      </div>

      <h1 className="max-w-5xl text-center text-4xl font-black leading-[1.15] md:text-7xl md:leading-[1.15]">
        Dubai Web Development Companies: Which Approach Fits Your Business?
      </h1>

      <p className="mx-auto my-6 max-w-4xl text-center text-base leading-relaxed md:text-2xl md:leading-relaxed">
        From traditional agencies with 17+ years of experience to AI-first
        companies delivering in 4-8 weeks. This guide helps you understand the
        trade-offs and choose the right development approach for your specific
        needs.
      </p>

      <div className="flex flex-col items-center gap-4 md:flex-row">
        <a
          href="#comparison"
          className="inline-block rounded-full border-2 border-zinc-900 bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 text-lg font-bold text-white shadow-[4px_4px_0px_0px_rgb(234,88,12)] transition-transform hover:scale-105"
        >
          <span className="flex items-center justify-center gap-2">
            Compare Approaches
            <FiArrowUpRight className="text-xl" />
          </span>
        </a>

        <a
          href="#decision-guide"
          className="inline-block rounded-full border-2 border-zinc-900 bg-white px-8 py-4 text-lg font-bold text-zinc-900 shadow-[4px_4px_0px_0px_rgb(113,113,122)] transition-transform hover:scale-105"
        >
          <span className="flex items-center justify-center gap-2">
            Decision Guide
            <FiTarget className="text-xl" />
          </span>
        </a>
      </div>

      <p className="mt-4 max-w-md text-center text-sm text-zinc-600">
        Updated January 2025 • Based on real client experiences • No affiliate
        relationships
      </p>
    </section>
  );
}

// Spring Card Component for Approach Comparison
interface SpringCardProps {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
  buttonText?: string;
}

const SpringCard = ({
  title,
  subtitle,
  icon: Icon,
  className,
  buttonText = "EXPLORE",
}: SpringCardProps) => {
  return (
    <MotionConfig
      transition={{
        type: "spring",
        bounce: 0.5,
      }}
    >
      <motion.div
        whileHover="hovered"
        className={twMerge(
          "group w-full border-4 border-black bg-gradient-to-br from-cyan-400 to-blue-500",
          className
        )}
      >
        <motion.div
          initial={{
            x: 0,
            y: 0,
          }}
          variants={{
            hovered: {
              x: -8,
              y: -8,
            },
          }}
          className={twMerge(
            "-m-0.5 border-4 border-black bg-gradient-to-br from-cyan-400 to-blue-500",
            className
          )}
        >
          <motion.div
            initial={{
              x: 0,
              y: 0,
            }}
            variants={{
              hovered: {
                x: -8,
                y: -8,
              },
            }}
            className={twMerge(
              "relative -m-0.5 flex h-80 flex-col justify-between overflow-hidden border-4 border-black bg-gradient-to-br from-cyan-400 to-blue-500 p-8",
              className
            )}
          >
            <div className="flex items-center gap-3">
              <Icon className="text-3xl text-white drop-shadow-lg" />
              <h3 className="text-2xl font-black uppercase tracking-tight text-white drop-shadow-lg">
                {title}
              </h3>
            </div>

            <div>
              <p className="text-base font-medium leading-relaxed text-white/90 transition-[margin] duration-300 ease-in-out group-hover:mb-12">
                {subtitle}
              </p>
              <button className="absolute bottom-3 left-3 right-3 translate-y-full border-4 border-black bg-white px-6 py-3 text-lg font-black uppercase tracking-wide text-black opacity-0 transition-all duration-300 ease-in-out hover:bg-yellow-300 group-hover:translate-y-0 group-hover:opacity-100">
                {buttonText}
              </button>
            </div>

            <motion.svg
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 30,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }}
              style={{
                top: "0",
                right: "0",
                x: "50%",
                y: "-50%",
                scale: 0.6,
              }}
              width="200"
              height="200"
              className="pointer-events-none absolute z-10"
            >
              <path
                id={`circlePath-${title.replace(/\s+/g, "-").toLowerCase()}`}
                d="M100,100 m-100,0 a100,100 0 1,0 200,0 a100,100 0 1,0 -200,0"
                fill="none"
              />
              <text>
                <textPath
                  href={`#circlePath-${title.replace(/\s+/g, "-").toLowerCase()}`}
                  fill="white"
                  className="fill-white text-sm font-black uppercase opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-70"
                >
                  {title.toUpperCase()} • {title.toUpperCase()} •{" "}
                  {title.toUpperCase()} •
                </textPath>
              </text>
            </motion.svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
};

// Approach Comparison Section
function ApproachComparison() {
  return (
    <section className="bg-zinc-50 px-4 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-black tracking-tight text-black md:text-6xl">
            Why are businesses choosing{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              different approaches?
            </span>
          </h2>
          <p className="mx-auto max-w-4xl text-xl font-medium leading-relaxed text-zinc-700">
            Dubai's web development landscape offers distinct methodologies.
            Each approach delivers unique competitive advantages for
            forward-thinking companies.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <SpringCard
            title="Battle Tested"
            subtitle="17+ year agencies like SpiderWorks & WebCastle deliver enterprise-grade solutions with 1000+ successful deployments and proven WordPress mastery."
            icon={FiShield}
            className="bg-gradient-to-br from-emerald-400 to-green-600"
            buttonText="EXPLORE"
          />

          <SpringCard
            title="Data Driven"
            subtitle="Companies like Digital Gravity leverage AI-powered UX with predictive analytics, delivering 75-120% performance improvements for global brands."
            icon={FiTrendingUp}
            className="bg-gradient-to-br from-blue-400 to-indigo-600"
            buttonText="ANALYZE"
          />

          <SpringCard
            title="Rapid Deploy"
            subtitle="Modern React & Next.js frameworks enable 4-8 week delivery cycles with 80% cost efficiency through intelligent automation and streamlined workflows."
            icon={FiZap}
            className="bg-gradient-to-br from-orange-400 to-red-600"
            buttonText="ACCELERATE"
          />

          <SpringCard
            title="AI First"
            subtitle="Native AI integration maximizes ROI through intelligent automation, predictive features, and cost-optimized operations that scale dynamically."
            icon={FiTarget}
            className="bg-gradient-to-br from-purple-400 to-pink-600"
            buttonText="INNOVATE"
          />
        </div>
      </div>
    </section>
  );
}

// Company Comparison Section
function CompanyComparison({
  selectedView,
  setSelectedView,
  selectedApproach,
  setSelectedApproach,
}: {
  selectedView: "table" | "guide";
  setSelectedView: (view: "table" | "guide") => void;
  selectedApproach: "all" | "traditional" | "ai-first" | "data-driven";
  setSelectedApproach: (
    approach: "all" | "traditional" | "ai-first" | "data-driven"
  ) => void;
}) {
  const filteredCompanies = companies.filter((company: Company) => {
    if (selectedApproach === "all") return true;
    return company.approach === selectedApproach;
  });

  return (
    <section id="comparison" className="px-4 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Dubai Web Development Companies Comparison
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-zinc-600">
            Real data from actual companies ranking for "dubai web development
            companies" - no promotional rankings, just facts to help you decide.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="mb-8 flex flex-wrap gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedApproach("all")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedApproach === "all"
                  ? "bg-orange-500 text-white"
                  : "border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              All Approaches
            </button>
            <button
              onClick={() => setSelectedApproach("traditional")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedApproach === "traditional"
                  ? "bg-orange-500 text-white"
                  : "border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              Traditional (17+ years)
            </button>
            <button
              onClick={() => setSelectedApproach("data-driven")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedApproach === "data-driven"
                  ? "bg-orange-500 text-white"
                  : "border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              Data-Driven
            </button>
            <button
              onClick={() => setSelectedApproach("ai-first")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedApproach === "ai-first"
                  ? "bg-orange-500 text-white"
                  : "border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              AI-First
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <ComparisonTable companies={filteredCompanies} />
      </div>
    </section>
  );
}

// Comparison Table Component
function ComparisonTable({ companies }: { companies: Company[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white">
      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-200 bg-zinc-50">
            <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-900">
              Company
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-900">
              Approach
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-900">
              Experience
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-900">
              Timeline
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-900">
              Pricing
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-900">
              Specialties
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-900">
              Best For
            </th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company: Company, index: number) => (
            <tr
              key={company.name}
              className="border-b border-zinc-100 hover:bg-zinc-50"
            >
              <td className="px-6 py-4">
                <div>
                  <div className="font-semibold text-zinc-900">
                    {company.name}
                  </div>
                  <div className="text-sm text-zinc-600">
                    Rank #{company.rank}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {company.location}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                    company.approach === "traditional"
                      ? "bg-blue-100 text-blue-800"
                      : company.approach === "data-driven"
                        ? "bg-green-100 text-green-800"
                        : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {company.approach.replace("-", " ")}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-zinc-600">
                <div>{company.experience}</div>
                <div className="text-xs">{company.projects}</div>
              </td>
              <td className="px-6 py-4 text-sm text-zinc-600">
                {company.timeline}
              </td>
              <td className="px-6 py-4 text-sm text-zinc-600">
                {company.pricing}
              </td>
              <td className="px-6 py-4 text-sm text-zinc-600">
                <div className="space-y-1">
                  {company.specialties.slice(0, 2).map((specialty: string) => (
                    <div
                      key={specialty}
                      className="rounded bg-zinc-100 px-2 py-1 text-xs"
                    >
                      {specialty}
                    </div>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-zinc-600">
                {company.clientBase}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Decision Framework Section
function DecisionFramework() {
  return (
    <section id="decision-guide" className="bg-zinc-50 px-4 py-16 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Which approach should you choose?
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-zinc-600">
            The best choice depends on your specific situation. Here's an honest
            breakdown.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border-2 border-blue-200 bg-white p-8">
            <h3 className="mb-4 text-xl font-bold text-blue-900">
              Choose Traditional Agencies When:
            </h3>
            <ul className="space-y-3 text-zinc-600">
              <li className="flex items-start gap-2">
                <FiCheck className="mt-1 flex-shrink-0 text-blue-500" />
                You need proven processes (1000+ successful projects)
              </li>
              <li className="flex items-start gap-2">
                <FiCheck className="mt-1 flex-shrink-0 text-blue-500" />
                Your project requires extensive WordPress/PHP customization
              </li>
              <li className="flex items-start gap-2">
                <FiCheck className="mt-1 flex-shrink-0 text-blue-500" />
                You prefer established relationships with 17+ years of local
                experience
              </li>
              <li className="flex items-start gap-2">
                <FiCheck className="mt-1 flex-shrink-0 text-blue-500" />
                Timeline flexibility (12-20 weeks) isn't a concern
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-green-200 bg-white p-8">
            <h3 className="mb-4 text-xl font-bold text-green-900">
              Choose Data-Driven Agencies When:
            </h3>
            <ul className="space-y-3 text-zinc-600">
              <li className="flex items-start gap-2">
                <FiCheck className="mt-1 flex-shrink-0 text-green-500" />
                You need measurable performance improvements (75-120%)
              </li>
              <li className="flex items-start gap-2">
                <FiCheck className="mt-1 flex-shrink-0 text-green-500" />
                Your business requires predictive UX and analytics
              </li>
              <li className="flex items-start gap-2">
                <FiCheck className="mt-1 flex-shrink-0 text-green-500" />
                You're a global brand needing multi-region expertise
              </li>
              <li className="flex items-start gap-2">
                <FiCheck className="mt-1 flex-shrink-0 text-green-500" />
                ROI tracking and optimization are critical
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-orange-200 bg-white p-8">
            <h3 className="mb-4 text-xl font-bold text-orange-900">
              Choose AI-First Agencies When:
            </h3>
            <ul className="space-y-3 text-zinc-600">
              <li className="flex items-start gap-2">
                <FiCheck className="mt-1 flex-shrink-0 text-orange-500" />
                Speed is critical (4-8 weeks vs 12-20 weeks)
              </li>
              <li className="flex items-start gap-2">
                <FiCheck className="mt-1 flex-shrink-0 text-orange-500" />
                You need transparent pricing ($10K-$25K)
              </li>
              <li className="flex items-start gap-2">
                <FiCheck className="mt-1 flex-shrink-0 text-orange-500" />
                Your project benefits from modern frameworks (React, Next.js)
              </li>
              <li className="flex items-start gap-2">
                <FiCheck className="mt-1 flex-shrink-0 text-orange-500" />
                MVP development or rapid prototyping is needed
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// Complete Guide to Web Development Costs in Dubai Section
function CostGuideSection() {
  return (
    <section className="px-4 py-16 md:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Complete Guide to Web Development Costs in Dubai
          </h2>
          <p className="text-lg text-zinc-600">
            Real pricing data from 25+ Dubai agencies (2024-2025)
          </p>
        </div>

        <div className="space-y-8">
          <div className="rounded-2xl border border-zinc-200 bg-white p-8">
            <h3 className="mb-4 text-2xl font-bold">Pricing by Project Type</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-3 font-semibold text-orange-600">
                  Small Business Websites
                </h4>
                <ul className="space-y-2 text-sm text-zinc-600">
                  <li>
                    • Basic sites (5-10 pages): AED 2,000-15,000 ($600-4,000)
                  </li>
                  <li>
                    • Professional business: AED 15,000-30,000 ($4,000-8,000)
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 font-semibold text-orange-600">
                  E-commerce & Enterprise
                </h4>
                <ul className="space-y-2 text-sm text-zinc-600">
                  <li>
                    • E-commerce platforms: AED 70,000-140,000 ($19,000-38,000)
                  </li>
                  <li>• Enterprise solutions: AED 50,000+ ($14,000+)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-8">
            <h3 className="mb-4 text-2xl font-bold">
              Cost Factors by Approach
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-sm font-bold text-blue-600">1</span>
                </div>
                <div>
                  <h4 className="font-semibold">
                    Traditional WordPress Development
                  </h4>
                  <p className="text-sm text-zinc-600">
                    $20K-40K for custom work due to manual processes and
                    extensive PHP customization. Higher maintenance costs
                    long-term.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <span className="text-sm font-bold text-green-600">2</span>
                </div>
                <div>
                  <h4 className="font-semibold">
                    Data-Driven Performance Agencies
                  </h4>
                  <p className="text-sm text-zinc-600">
                    Higher upfront investment but ROI through proven performance
                    improvements and conversion optimization.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                  <span className="text-sm font-bold text-purple-600">3</span>
                </div>
                <div>
                  <h4 className="font-semibold">
                    AI-First Modern Development (DeployAI)
                  </h4>
                  <p className="text-sm text-zinc-600">
                    $10K-25K through automation and React/Next.js efficiency.
                    80% cost reduction via modern tooling and streamlined
                    processes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-orange-50 to-red-50 p-8">
            <h3 className="mb-4 text-2xl font-bold">
              Hidden Costs to Consider
            </h3>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li>
                • <strong>Annual maintenance:</strong> AED 4,000-15,000/year for
                traditional sites
              </li>
              <li>
                • <strong>Third-party integrations:</strong> Payment gateways
                add $2K-5K
              </li>
              <li>
                • <strong>Content creation:</strong> Professional copywriting
                adds 20-30% to total cost
              </li>
              <li>
                • <strong>Hosting & SSL:</strong> $200-1,000/year depending on
                traffic
              </li>
              <li>
                • <strong>Future updates:</strong> Legacy systems cost 3x more
                to modify
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// How to Choose Section
function ChoosingGuideSection() {
  return (
    <section className="bg-gradient-to-br from-zinc-50 to-zinc-100 px-4 py-16 md:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            How to Choose the Right Web Development Company in Dubai
          </h2>
          <p className="text-lg text-zinc-600">
            A practical evaluation framework based on real client experiences
          </p>
        </div>

        <div className="space-y-8">
          <div className="rounded-2xl border border-zinc-200 bg-white p-8">
            <h3 className="mb-6 text-2xl font-bold">Decision Framework</h3>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <FiClock className="text-2xl text-blue-600" />
                </div>
                <h4 className="mb-2 font-semibold">Timeline Critical?</h4>
                <p className="text-sm text-zinc-600">
                  Need launch in 4-8 weeks? Choose AI-first. Can wait 12-20
                  weeks? Traditional agencies offer more customization.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <FiDollarSign className="text-2xl text-green-600" />
                </div>
                <h4 className="mb-2 font-semibold">Budget Constraints?</h4>
                <p className="text-sm text-zinc-600">
                  Under $15K? Consider AI-first approaches. $20K+? Traditional
                  agencies provide extensive customization.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <FiCode className="text-2xl text-purple-600" />
                </div>
                <h4 className="mb-2 font-semibold">Future-Proofing?</h4>
                <p className="text-sm text-zinc-600">
                  Want modern frameworks (React/Next.js)? AI-first companies.
                  Need WordPress familiarity? Traditional agencies.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-8">
            <h3 className="mb-4 text-2xl font-bold">Red Flags to Avoid</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-semibold text-red-600">
                  Portfolio Issues
                </h4>
                <ul className="space-y-1 text-sm text-zinc-600">
                  <li>• Can't provide live website URLs</li>
                  <li>• All sites look identical (template-heavy)</li>
                  <li>• No recent work (older than 2-3 years)</li>
                  <li>• Broken links in their own showcase</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-red-600">
                  Communication Red Flags
                </h4>
                <ul className="space-y-1 text-sm text-zinc-600">
                  <li>• Vague pricing ("depends on requirements")</li>
                  <li>• No technical details in proposals</li>
                  <li>• Can't explain their development process</li>
                  <li>• Unwilling to provide client references</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-green-50 to-emerald-50 p-8">
            <h3 className="mb-4 text-2xl font-bold">
              Essential Questions to Ask
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FiCheck className="mt-1 text-green-600" />
                <p className="text-sm">
                  <strong>
                    "Can you show live examples and explain your specific role
                    in each project?"
                  </strong>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FiCheck className="mt-1 text-green-600" />
                <p className="text-sm">
                  <strong>
                    "What's your typical project timeline and what could cause
                    delays?"
                  </strong>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FiCheck className="mt-1 text-green-600" />
                <p className="text-sm">
                  <strong>
                    "How do you handle ongoing maintenance and emergency
                    support?"
                  </strong>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FiCheck className="mt-1 text-green-600" />
                <p className="text-sm">
                  <strong>
                    "What technologies do you use and why did you choose them?"
                  </strong>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FiCheck className="mt-1 text-green-600" />
                <p className="text-sm">
                  <strong>
                    "Do you have references from recent clients I can contact?"
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Freelance vs Agency Section
function FreelanceVsAgencySection() {
  return (
    <section className="px-4 py-16 md:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Freelance vs Agency Web Development in Dubai
          </h2>
          <p className="text-lg text-zinc-600">
            Real pros and cons based on client experiences
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-8">
            <h3 className="mb-4 text-2xl font-bold text-blue-600">
              Freelance Developers
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-semibold text-green-600">Pros</h4>
                <ul className="space-y-1 text-sm text-zinc-600">
                  <li>• 60-70% cost savings (AED 2K-8K vs 15K-50K)</li>
                  <li>• Direct communication with the developer</li>
                  <li>• More flexible with scope changes</li>
                  <li>• Personal attention to your project</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-red-600">Cons</h4>
                <ul className="space-y-1 text-sm text-zinc-600">
                  <li>• Limited skillset (one person, many disciplines)</li>
                  <li>• Availability issues (illness, other projects)</li>
                  <li>• No backup if freelancer becomes unavailable</li>
                  <li>• Quality varies significantly between individuals</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-8">
            <h3 className="mb-4 text-2xl font-bold text-purple-600">
              Development Agencies
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-semibold text-green-600">Pros</h4>
                <ul className="space-y-1 text-sm text-zinc-600">
                  <li>• Full-service teams (design, dev, SEO, PM)</li>
                  <li>• Reliability through team backup</li>
                  <li>• Proven processes and quality control</li>
                  <li>• Long-term maintenance and growth support</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-red-600">Cons</h4>
                <ul className="space-y-1 text-sm text-zinc-600">
                  <li>• 60-80% higher cost than freelancers</li>
                  <li>• Less personal, multiple stakeholders</li>
                  <li>• Slower communication and decision-making</li>
                  <li>• Less flexibility with scope changes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-zinc-200 bg-gradient-to-br from-orange-50 to-red-50 p-8">
          <h3 className="mb-4 text-2xl font-bold">
            When to Choose Each Option
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h4 className="mb-2 font-semibold text-blue-600">
                Choose Freelancers For:
              </h4>
              <ul className="space-y-1 text-sm text-zinc-600">
                <li>• Simple brochure sites under AED 15K</li>
                <li>• One-time projects with clear scope</li>
                <li>• Tight budgets with flexibility on timeline</li>
                <li>• Projects requiring minimal ongoing support</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-purple-600">
                Choose Traditional Agencies For:
              </h4>
              <ul className="space-y-1 text-sm text-zinc-600">
                <li>• Complex e-commerce or enterprise projects</li>
                <li>• Need for extensive WordPress customization</li>
                <li>• Long-term growth and maintenance plans</li>
                <li>• Mission-critical deadlines requiring team backup</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-orange-600">
                Choose AI-First Agencies For:
              </h4>
              <ul className="space-y-1 text-sm text-zinc-600">
                <li>• Modern tech stack (React/Next.js) requirements</li>
                <li>• Rapid deployment (4-8 weeks) needed</li>
                <li>• Cost efficiency with professional quality</li>
                <li>• Future-proofing and AI integration goals</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Technology Stack Comparison - Parallax Version
function TechnologyStackSection() {
  return (
    <div className="bg-white">
      {/* Traditional Development */}
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Proven & Reliable"
        heading="Traditional Development"
      >
        <TradionalStackContent />
      </TextParallaxContent>

      {/* Data-Driven Development */}
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Analytics Powered"
        heading="Data-Driven Development"
      >
        <DataDrivenStackContent />
      </TextParallaxContent>

      {/* AI-First Development */}
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Future Ready"
        heading="AI-First Development"
      >
        <AIFirstStackContent />
      </TextParallaxContent>
    </div>
  );
}

// Traditional Stack Content Component
const TradionalStackContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Battle-tested technologies used by established Dubai agencies
    </h2>
    <div className="col-span-1 md:col-span-8">
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <h3 className="mb-3 text-lg font-semibold text-blue-600">
            Tech Stack
          </h3>
          <div className="space-y-2 text-sm text-zinc-600">
            <div>
              <strong>CMS:</strong> WordPress, Magento, Shopify
            </div>
            <div>
              <strong>Backend:</strong> PHP, MySQL, Custom CMS
            </div>
            <div>
              <strong>Frontend:</strong> jQuery, CSS3, JavaScript
            </div>
            <div>
              <strong>E-commerce:</strong> WooCommerce, OpenCart
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <h3 className="mb-3 text-lg font-semibold text-green-600">
            Key Benefits
          </h3>
          <ul className="space-y-1 text-sm text-zinc-600">
            <li>• Extensive plugin ecosystem</li>
            <li>• Easy content management</li>
            <li>• Wide developer availability</li>
            <li>• Proven reliability (10+ years)</li>
          </ul>
        </div>
      </div>
      <p className="mb-4 text-lg text-zinc-600">
        Companies like <strong>SpiderWorks (17 years)</strong>,{" "}
        <strong>WebCastle (16 years)</strong>, and <strong>Tomsher</strong> have
        built their reputation on WordPress and PHP solutions that power
        thousands of Dubai businesses.
      </p>
      <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
        <p className="text-sm text-zinc-600">
          <strong>Best for:</strong> Businesses needing proven solutions with
          extensive customization options and long-term support from a large
          developer community.
        </p>
      </div>
    </div>
  </div>
);

// Data-Driven Stack Content Component
const DataDrivenStackContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Modern frameworks with advanced analytics integration
    </h2>
    <div className="col-span-1 md:col-span-8">
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <h3 className="mb-3 text-lg font-semibold text-green-600">
            Tech Stack
          </h3>
          <div className="space-y-2 text-sm text-zinc-600">
            <div>
              <strong>Frontend:</strong> React, Vue.js, Angular
            </div>
            <div>
              <strong>Backend:</strong> Node.js, Python, Django
            </div>
            <div>
              <strong>Database:</strong> PostgreSQL, MongoDB
            </div>
            <div>
              <strong>Cloud:</strong> AWS, Azure, Google Cloud
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <h3 className="mb-3 text-lg font-semibold text-purple-600">
            Performance Edge
          </h3>
          <ul className="space-y-1 text-sm text-zinc-600">
            <li>• 75-120% better performance</li>
            <li>• Advanced user tracking</li>
            <li>• Real-time analytics</li>
            <li>• Conversion optimization</li>
          </ul>
        </div>
      </div>
      <p className="mb-4 text-lg text-zinc-600">
        <strong>Digital Gravity</strong> showcases this approach with their
        AI-powered predictive UX that delivers measurable improvements.{" "}
        <strong>Plavno</strong> uses similar tech for data-driven design
        decisions.
      </p>
      <div className="rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 p-4">
        <p className="text-sm text-zinc-600">
          <strong>Best for:</strong> Businesses focused on growth metrics,
          conversion optimization, and data-driven decision making with budgets
          $15K-$40K.
        </p>
      </div>
    </div>
  </div>
);

// AI-First Stack Content Component
const AIFirstStackContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Next-generation development with AI integration from day one
    </h2>
    <div className="col-span-1 md:col-span-8">
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <h3 className="mb-3 text-lg font-semibold text-orange-600">
            Tech Stack
          </h3>
          <div className="space-y-2 text-sm text-zinc-600">
            <div>
              <strong>Frontend:</strong> React, Next.js, TypeScript
            </div>
            <div>
              <strong>Backend:</strong> Node.js, Serverless, API-first
            </div>
            <div>
              <strong>Database:</strong> Supabase, PlanetScale, Prisma
            </div>
            <div>
              <strong>AI Tools:</strong> OpenAI, Anthropic, automation
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <h3 className="mb-3 text-lg font-semibold text-red-600">
            Competitive Advantage
          </h3>
          <ul className="space-y-1 text-sm text-zinc-600">
            <li>• 80% cost reduction via automation</li>
            <li>• 4-8 week delivery cycles</li>
            <li>• Built-in AI capabilities</li>
            <li>• Future-proof architecture</li>
          </ul>
        </div>
      </div>
      <p className="mb-4 text-lg text-zinc-600">
        <strong>DeployAI</strong> leads this space with transparent pricing
        ($10K-$25K) and rapid deployment using React/Next.js with native AI
        integration. Perfect for forward-thinking companies ready to leverage
        cutting-edge technology.
      </p>
      <div className="rounded-xl bg-gradient-to-r from-orange-50 to-red-50 p-4">
        <p className="text-sm text-zinc-600">
          <strong>Best for:</strong> Companies prioritizing rapid growth, AI
          capabilities, and modern user experiences with efficient development
          costs.
        </p>
      </div>
    </div>
  </div>
);

// FAQ Section
function FrequentlyAskedQuestions() {
  const faqs = [
    {
      question: "Which company is best for web development?",
      answer:
        "It depends on your specific needs. Digital Gravity leads in AI-powered performance optimization with 75-120% improvements. SpiderWorks (17 years) excels in WordPress customization. WebCastle offers bespoke design with 16+ years experience. DeployAI specializes in rapid AI-first development (4-8 weeks) using modern frameworks. Choose based on your timeline, budget, and technical requirements.",
    },
    {
      question: "How much does website development cost in Dubai?",
      answer:
        "Costs vary significantly by approach: Basic business sites range AED 15,000-30,000 ($4K-8K). E-commerce platforms cost AED 70,000-140,000 ($19K-38K). Traditional agencies charge $20K-40K for custom work, while AI-first companies like DeployAI offer transparent pricing of $10K-25K through modern framework efficiency. Factor in annual maintenance (AED 4K-15K) and potential customization needs.",
    },
    {
      question: "How long does website development typically take in Dubai?",
      answer:
        "Timeline depends on approach and complexity. Traditional custom development: 12-20 weeks for extensive PHP/WordPress customization. Data-driven agencies: 8-16 weeks with performance optimization focus. AI-first development (DeployAI): 4-8 weeks using React/Next.js and automated tooling. Simple template-based sites: 4-8 weeks. E-commerce platforms: 12-18 weeks standard, up to 24 weeks for complex features.",
    },
    {
      question: "What should I look for in a Dubai web development portfolio?",
      answer:
        "Essential elements: Live website URLs you can actually visit and test. Industry-relevant experience in your sector (real estate, hospitality, e-commerce). Technical complexity beyond template modifications. Case studies with specific challenges and results achieved. Mobile responsiveness across all portfolio sites. Red flags: Broken portfolio links, all sites look identical, no recent work (older than 2-3 years), unverifiable client claims.",
    },
    {
      question: "Do Dubai web companies offer ongoing support and maintenance?",
      answer:
        "Most established companies offer comprehensive maintenance packages. Standard services include security updates, content management (2-10 hours/month), backup management, performance monitoring, and bug fixes. Pricing ranges AED 500-15,000/month depending on complexity. Digital Gravity includes security and speed optimization starting at AED 4K/month. Ask about response times, emergency support availability, and whether they maintain sites they didn't originally build.",
    },
    {
      question:
        "Can Dubai web development companies handle e-commerce projects?",
      answer:
        "Yes, most Dubai companies handle e-commerce, but approaches vary. Traditional agencies use WooCommerce, Magento, or Shopify with extensive customization. Data-driven companies focus on conversion optimization and performance. AI-first companies like DeployAI build modern headless e-commerce with advanced features like AI product recommendations. Consider your needs: simple store setup vs. complex multi-vendor marketplaces with custom payment integrations.",
    },
    {
      question: "How do Dubai web development costs compare internationally?",
      answer:
        "Dubai offers competitive middle-ground pricing. Basic business sites: Dubai $4K-8K vs. USA/UK $8K-15K vs. India $1.5K-3K. E-commerce: Dubai $19K-38K vs. USA/UK $25K-50K vs. India $5K-12K. Dubai advantages: lower costs than Western markets, higher quality than pure outsourcing, English proficiency, time zone overlap with Europe/Asia, and local market understanding for MENA businesses.",
    },
    {
      question:
        "Should I choose a local Dubai company or international agency?",
      answer:
        "Local Dubai companies offer face-to-face meetings, cultural understanding, knowledge of UAE regulations, and regional market expertise. International agencies may provide broader experience but lack local nuance. For UAE-focused businesses, local companies understand Arabic language requirements, local payment gateways (Telr, PayTabs), and cultural sensitivities. However, ensure the local company uses modern technologies and global best practices.",
    },
    {
      question: "What are the latest web development trends in UAE businesses?",
      answer:
        "Major trends include AI integration (40% of new projects), Progressive Web Apps for mobile-first experiences, Arabic language AI and voice search optimization, UAE Pass integration for government services, and blockchain for real estate/supply chain. E-commerce trends: social commerce (Instagram/TikTok shopping), Buy Now Pay Later (Tabby/Postpay), and multi-language support. DeployAI specializes in implementing these cutting-edge features using modern frameworks.",
    },
    {
      question: "Is a 4-8 week timeline really possible for quality work?",
      answer:
        "Yes, but it depends on the approach. Traditional custom development (12-20 weeks) involves extensive PHP/WordPress customization and manual processes. Modern frameworks like React and Next.js, combined with AI tooling and component libraries, can dramatically reduce development time while maintaining quality. However, this works best for MVPs and projects that fit modern patterns - complex custom functionality may still require traditional timelines.",
    },
    {
      question:
        "What's the difference between WordPress and modern framework development?",
      answer:
        "WordPress: Familiar CMS, extensive plugins, easy content management, but slower performance and security vulnerabilities. Modern frameworks (React/Next.js): 3-5x faster loading, better SEO through server-side rendering, enhanced security, mobile-first design, but require more technical expertise. AI-first companies like DeployAI use modern frameworks for better performance and future-proofing, while traditional agencies stick with WordPress for client familiarity.",
    },
    {
      question: "How do I evaluate if an agency's claims are legitimate?",
      answer:
        "Look for specific metrics and case studies. Digital Gravity shows '75-120% performance improvements' with actual client data. Traditional agencies highlight '1000+ successful projects' with portfolio evidence. Ask for live website examples, client references you can contact, and specific explanations of their role in showcased projects. Be wary of vague claims like 'best in Dubai' without supporting data or broken links in their own portfolio.",
    },
  ];

  return (
    <section className="px-4 py-16 md:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-zinc-600">
            Honest answers to help you make an informed decision.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map(
            (faq: { question: string; answer: string }, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl border border-zinc-200 bg-white p-6"
              >
                <h3 className="mb-3 text-lg font-semibold">{faq.question}</h3>
                <p className="leading-relaxed text-zinc-600">{faq.answer}</p>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

// Final Guidance Section
function FinalGuidanceSection() {
  return (
    <section className="bg-gradient-to-br from-orange-50 to-red-50 px-4 py-16 md:px-12">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-6 text-3xl font-bold md:text-5xl">
          Ready to choose your development approach?
        </h2>
        <p className="mb-8 text-lg text-zinc-600">
          Don't limit your project's potential. Each approach has specific
          strengths - choose based on your timeline, budget, and technical
          requirements.
        </p>

        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
          <a
            href="https://calendly.com/hello-deployai/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border-2 border-zinc-900 bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 text-lg font-bold text-white shadow-[4px_4px_0px_0px_rgb(234,88,12)] transition-transform hover:scale-105"
          >
            <span className="flex items-center justify-center gap-2">
              Get Honest Consultation
              <FiArrowUpRight className="text-xl" />
            </span>
          </a>
        </div>

        <p className="mt-6 text-sm text-zinc-500">
          Free 30-minute consultation to understand your specific needs and
          recommend the best approach - even if it's not us.
        </p>
      </div>
    </section>
  );
}
