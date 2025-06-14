import React, { useState } from "react";
import {
  FiStar,
  FiTrendingUp,
  FiDollarSign,
  FiClock,
  FiArrowRight,
  FiUsers,
  FiShield,
} from "react-icons/fi";
import {
  SiGoogle,
  SiAmazon,
  SiMeta,
  SiTesla,
  SiNetflix,
  SiSpotify,
  SiAirbnb,
  SiStripe,
} from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { CLIENTS } from "../client-portfolio/ClientPortfolioCarousel";

interface Client {
  name: string;
  logo: React.ComponentType<{ className?: string }>;
  industry: string;
  size: string;
}

interface Testimonial {
  id: number;
  name: string;
  company: string;
  role: string;
  avatar: string;
  testimonial: string;
  isAnonymous?: boolean;
}

type PortfolioClient = {
  name: string;
  logo: React.ComponentType<{ className?: string }>;
  projectImages: string[];
  projectTitle: string;
  description: string;
  achievements: string[];
  color: string;
};

const bigClients: Client[] = [
  {
    name: "Google",
    logo: SiGoogle,
    industry: "Technology",
    size: "100K+ employees",
  },
  {
    name: "Amazon",
    logo: SiAmazon,
    industry: "E-commerce",
    size: "1M+ employees",
  },
  {
    name: "Meta",
    logo: SiMeta,
    industry: "Social Media",
    size: "70K+ employees",
  },
  {
    name: "Tesla",
    logo: SiTesla,
    industry: "Automotive",
    size: "100K+ employees",
  },
  {
    name: "Netflix",
    logo: SiNetflix,
    industry: "Entertainment",
    size: "12K+ employees",
  },
  {
    name: "Spotify",
    logo: SiSpotify,
    industry: "Music",
    size: "8K+ employees",
  },
  {
    name: "Airbnb",
    logo: SiAirbnb,
    industry: "Travel",
    size: "6K+ employees",
  },
  {
    name: "Stripe",
    logo: SiStripe,
    industry: "Fintech",
    size: "7K+ employees",
  },
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Director of Operations",
    company: "Fortune 500 Technology Company",
    role: "Director of Operations",
    avatar: "DO",
    testimonial:
      "The AI automation system they built eliminated our manual processes completely. We're seeing significant cost savings and our team can focus on strategic initiatives instead of repetitive tasks.",
    isAnonymous: true,
  },
  {
    id: 2,
    name: "VP of Technology",
    company: "Major Financial Institution",
    role: "VP of Technology",
    avatar: "VP",
    testimonial:
      "They delivered exactly what they promised - custom AI solutions that we own 100%. No more vendor dependencies or monthly subscription fees. The results speak for themselves.",
    isAnonymous: true,
  },
  {
    id: 3,
    name: "Chief Technology Officer",
    company: "Healthcare Technology Company",
    role: "Chief Technology Officer",
    avatar: "CTO",
    testimonial:
      "Working with them transformed our operations. They built AI solutions that replaced expensive SaaS tools while giving us complete ownership and control.",
    isAnonymous: true,
  },
];

// For demo: add more images to each project if only one exists
const demoClients = CLIENTS.map((client) => ({
  ...client,
  projectImages:
    client.projectImages.length > 1
      ? client.projectImages
      : [
          client.projectImages[0],
          "https://placehold.co/400x250/orange/white?text=Second+Image",
          "https://placehold.co/400x250/blue/white?text=Third+Image",
        ],
}));

export const TestimonialsPortfolio = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const total = testimonials.length;
  const prevTestimonial = () =>
    setActiveTestimonial((i) => (i - 1 + total) % total);
  const nextTestimonial = () => setActiveTestimonial((i) => (i + 1) % total);

  // Portfolio pagination logic
  const [portfolioPage, setPortfolioPage] = useState(0);
  const projectsPerPage = 3;
  const totalPages = Math.ceil(demoClients.length / projectsPerPage);
  const paginatedClients: PortfolioClient[] = demoClients.slice(
    portfolioPage * projectsPerPage,
    portfolioPage * projectsPerPage + projectsPerPage
  );

  // Modal state for portfolio project
  const [modalOpen, setModalOpen] = useState(false);
  const [modalClient, setModalClient] = useState<PortfolioClient | null>(null);
  const [modalImgIdx, setModalImgIdx] = useState(0);

  const openModal = (client: PortfolioClient, imgIdx = 0) => {
    setModalClient(client);
    setModalImgIdx(imgIdx);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  return (
    <section id="testimonials" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-5xl font-black md:text-6xl">
            Trusted By Industry
            <br />
            <span className="text-orange-600">Leaders</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-zinc-600 md:text-2xl">
            From Fortune 500 companies to growing startups, we've helped
            businesses eliminate SaaS costs and deploy custom AI solutions.
          </p>
        </div>

        {/* Client Logos Grid */}
        <div className="mb-20">
          <h3 className="mb-8 text-center text-2xl font-bold">
            🏢 Our Clients Include
          </h3>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {bigClients.map((client, index) => (
              <ClientCard key={index} client={client} />
            ))}
          </div>
        </div>

        {/* Portfolio Projects Grid */}
        <div className="mb-20">
          <h3 className="mb-8 text-center text-2xl font-bold">
            🚀 Portfolio Projects
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            {paginatedClients.map((client: PortfolioClient, idx: number) => (
              <button
                key={client.name}
                className={`flex flex-col items-center rounded-3xl border-4 border-zinc-900 bg-white p-8 shadow-[8px_8px_0px_0px_rgb(234,88,12)] ${client.color} transition-transform hover:scale-105 focus:outline-none`}
                onClick={() => openModal(client, 0)}
                aria-label={`View more about ${client.name}`}
              >
                <client.logo className={`mb-4 text-5xl`} />
                <div className="mb-2 text-xl font-extrabold text-zinc-900">
                  {client.name}
                </div>
                <div className="mb-2 text-lg font-bold text-orange-600">
                  {client.projectTitle}
                </div>
                <img
                  src={client.projectImages[0]}
                  alt={client.name + " project main image"}
                  className="mb-4 h-32 w-full rounded-lg border border-zinc-200 bg-zinc-50 object-contain"
                />
                <p className="mb-2 text-base text-zinc-700">
                  {client.description}
                </p>
                <ul className="mb-2 space-y-1">
                  {client.achievements.map((ach: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-zinc-800"
                    >
                      <span className="inline-block h-2 w-2 rounded-full bg-orange-500"></span>
                      {ach}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
          {/* Pagination Controls */}
          <div className="mt-6 flex justify-center gap-2">
            <button
              onClick={() => setPortfolioPage((p) => Math.max(0, p - 1))}
              disabled={portfolioPage === 0}
              className="rounded-full border-2 border-zinc-900 bg-white px-4 py-2 font-bold text-zinc-900 shadow hover:bg-orange-100 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2 font-bold">
              Page {portfolioPage + 1} of {totalPages}
            </span>
            <button
              onClick={() =>
                setPortfolioPage((p) => Math.min(totalPages - 1, p + 1))
              }
              disabled={portfolioPage === totalPages - 1}
              className="rounded-full border-2 border-zinc-900 bg-white px-4 py-2 font-bold text-zinc-900 shadow hover:bg-orange-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* Portfolio Modal */}
        <AnimatePresence>
          {modalOpen && modalClient && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 40 }}
                transition={{ duration: 0.25 }}
                className="relative flex w-full max-w-3xl flex-col items-center rounded-3xl border-4 border-orange-500 bg-white p-0 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute right-4 top-4 z-10 text-2xl font-black text-zinc-400 hover:text-orange-600"
                  onClick={closeModal}
                  aria-label="Close modal"
                >
                  ×
                </button>
                {/* Main image with border and shadow */}
                <div className="flex w-full flex-col items-center rounded-t-3xl border-b-4 border-orange-500 bg-zinc-50 p-6">
                  <div className="relative mb-4 flex items-center justify-center">
                    <button
                      onClick={() =>
                        setModalImgIdx(
                          (i) =>
                            (i - 1 + modalClient.projectImages.length) %
                            modalClient.projectImages.length
                        )
                      }
                      className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full border border-zinc-200 bg-white px-2 py-1 shadow-sm transition-all hover:bg-zinc-100"
                      aria-label="Previous image"
                      style={{ left: "-2.5rem" }}
                    >
                      ‹
                    </button>
                    <img
                      src={modalClient.projectImages[modalImgIdx]}
                      alt={
                        modalClient.name + " project image " + (modalImgIdx + 1)
                      }
                      className="h-64 w-96 rounded-xl border-2 border-orange-400 bg-white object-cover shadow-lg"
                    />
                    <button
                      onClick={() =>
                        setModalImgIdx(
                          (i) => (i + 1) % modalClient.projectImages.length
                        )
                      }
                      className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full border border-zinc-200 bg-white px-2 py-1 shadow-sm transition-all hover:bg-zinc-100"
                      aria-label="Next image"
                      style={{ right: "-2.5rem" }}
                    >
                      ›
                    </button>
                  </div>
                  {/* Thumbnails */}
                  <div className="mb-2 flex items-center justify-center gap-2">
                    {modalClient.projectImages.map((img, idx) => (
                      <button
                        key={img}
                        onClick={() => setModalImgIdx(idx)}
                        className={`h-12 w-20 rounded border-2 ${modalImgIdx === idx ? "border-orange-500" : "border-zinc-200"} bg-white object-cover p-0.5 transition-all focus:outline-none`}
                        aria-label={`Show image ${idx + 1}`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="h-full w-full rounded object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
                {/* Info section */}
                <div className="w-full px-8 py-6 text-left">
                  <h3 className="mb-2 text-2xl font-bold text-zinc-900">
                    {modalClient.projectTitle}
                  </h3>
                  <p className="mb-4 text-base text-zinc-700">
                    {modalClient.description}
                  </p>
                  <ul className="mb-2 space-y-2">
                    {modalClient.achievements.map((ach: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-zinc-800"
                      >
                        <span className="inline-block h-2 w-2 rounded-full bg-orange-500"></span>
                        {ach}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials Carousel */}
        <div className="relative mb-20 flex flex-col items-center">
          {/* Left Arrow */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border-4 border-zinc-900 bg-white p-3 shadow-[4px_4px_0px_0px_rgb(39,39,42)] hover:bg-orange-100"
            aria-label="Previous testimonial"
          >
            ‹
          </button>

          {/* Testimonial Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mx-auto w-full max-w-xl rounded-3xl border-4 border-zinc-900 bg-white p-10 shadow-[8px_8px_0px_0px_rgb(234,88,12)]"
            >
              <div className="flex flex-col items-center">
                <div className="mb-4 flex items-center justify-center">
                  <span className="text-5xl font-bold text-orange-500">
                    {testimonials[activeTestimonial].avatar}
                  </span>
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-lg font-bold">
                    {testimonials[activeTestimonial].name}
                  </span>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="mb-1 text-sm text-zinc-600">
                  {testimonials[activeTestimonial].role}
                </p>
                <p className="mb-4 text-sm text-zinc-500">
                  {testimonials[activeTestimonial].company}
                </p>
              </div>
              <div className="mb-6 text-6xl text-orange-500">"</div>
              <p className="mb-6 text-center text-lg leading-relaxed text-zinc-700">
                {testimonials[activeTestimonial].testimonial}
              </p>
              <div className="rounded-2xl border-4 border-zinc-900 bg-white p-6 text-center shadow-[4px_4px_0px_0px_rgb(39,39,42)]">
                <p className="mb-4 text-lg font-semibold">
                  Ready to join our satisfied clients?
                </p>
                <a
                  href="https://calendly.com/hello-deployai/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-block" }}
                >
                  <button className="mx-auto flex items-center gap-2 rounded-full border-2 border-orange-400 bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-semibold text-white transition-transform hover:scale-105">
                    Book Your Free Strategy Call
                    <FiArrowRight />
                  </button>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right Arrow */}
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border-4 border-zinc-900 bg-white p-3 shadow-[4px_4px_0px_0px_rgb(39,39,42)] hover:bg-orange-100"
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>

        {/* Bottom Stats */}
        <div className="grid gap-8 md:grid-cols-3">
          <StatCard
            number="8+"
            label="AI Systems Deployed"
            icon={FiTrendingUp}
            color="bg-green-500"
          />
          <StatCard
            number="F500"
            label="Fortune 500 Clients"
            icon={FiUsers}
            color="bg-blue-500"
          />
          <StatCard
            number="100%"
            label="Client Satisfaction"
            icon={FiShield}
            color="bg-purple-500"
          />
        </div>
      </div>
    </section>
  );
};

const ClientCard = ({ client }: { client: Client }) => {
  const Icon = client.logo;
  const getLogoColor = (logoName: string) => {
    const colors: Record<string, string> = {
      Google: "text-blue-500",
      Amazon: "text-orange-500",
      Meta: "text-blue-600",
      Tesla: "text-red-600",
      Netflix: "text-red-600",
      Spotify: "text-green-500",
      Airbnb: "text-red-500",
      Stripe: "text-indigo-600",
    };
    return colors[client.name] || "text-zinc-600";
  };
  return (
    <div className="flex flex-col items-center rounded-2xl border-2 border-zinc-200 bg-white p-6 shadow-[2px_2px_0px_#18181b]">
      <Icon className={`mb-2 text-5xl ${getLogoColor(client.name)}`} />
      <div className="mb-1 text-lg font-bold text-zinc-900">{client.name}</div>
      <div className="mb-1 text-xs text-zinc-500">{client.industry}</div>
      <div className="text-xs text-zinc-400">{client.size}</div>
    </div>
  );
};

const StatCard = ({
  number,
  label,
  icon: Icon,
  color,
}: {
  number: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) => {
  return (
    <div className="rounded-2xl border-4 border-zinc-900 bg-white p-8 text-center shadow-[8px_8px_0px_0px_rgb(39,39,42)] transition-transform hover:scale-105">
      <div
        className={`h-16 w-16 ${color} mx-auto mb-4 flex items-center justify-center rounded-full`}
      >
        <Icon className="h-8 w-8 text-white" />
      </div>
      <div className="mb-2 text-4xl font-black text-zinc-900">{number}</div>
      <div className="font-semibold text-zinc-600">{label}</div>
    </div>
  );
};
