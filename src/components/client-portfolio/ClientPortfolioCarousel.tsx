import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const CLIENTS = [
  {
    name: "Google",
    logo: SiGoogle,
    projectImages: ["/logo.png", "/logo.png", "/logo.png"],
    projectTitle: "AI Reporting Automation",
    description:
      "We built a custom AI system to automate 90% of Google's manual reporting, integrating with their legacy ERP and delivering real-time dashboards.",
    achievements: [
      "Saved $200k/year in labor costs",
      "Reports generated 10x faster",
      "Zero manual data entry",
    ],
    color: "bg-blue-50 border-blue-200",
  },
  {
    name: "Amazon",
    logo: SiAmazon,
    projectImages: ["/logo.png", "/logo.png", "/logo.png"],
    projectTitle: "AI Onboarding & Risk Scoring",
    description:
      "Deployed an AI-powered onboarding flow that slashed churn and improved compliance for Amazon's new users.",
    achievements: [
      "Churn reduced by 40%",
      "Onboarding time cut from 3 days to 1 hour",
      "Automated KYC checks",
    ],
    color: "bg-orange-50 border-orange-200",
  },
  {
    name: "Meta",
    logo: SiMeta,
    projectImages: ["/logo.png", "/logo.png", "/logo.png"],
    projectTitle: "HIPAA AI Assistant",
    description:
      "Built a HIPAA-compliant AI assistant to answer patient queries and automate appointment scheduling for Meta.",
    achievements: [
      "Handled 80% of patient queries automatically",
      "Reduced call center load by 60%",
      "Improved patient satisfaction scores",
    ],
    color: "bg-blue-50 border-blue-200",
  },
  {
    name: "Tesla",
    logo: SiTesla,
    projectImages: ["/logo.png", "/logo.png", "/logo.png"],
    projectTitle: "AI Demand Forecasting",
    description:
      "Developed a demand forecasting engine that increased sell-through and reduced overstock for Tesla.",
    achievements: [
      "Sell-through up 22%",
      "Inventory costs down 18%",
      "Automated weekly forecasting",
    ],
    color: "bg-red-50 border-red-200",
  },
];

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
  return colors[logoName] || "text-zinc-600";
};

export { CLIENTS };
export const ClientPortfolioCarousel = () => {
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImgIdx, setModalImgIdx] = useState(0);
  const client = CLIENTS[index];

  const openModal = (imgIdx = 0) => {
    setModalImgIdx(imgIdx);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  const next = () => setIndex((i) => (i + 1) % CLIENTS.length);
  const prev = () => setIndex((i) => (i - 1 + CLIENTS.length) % CLIENTS.length);

  return (
    <section id="case-studies" className="py-12">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <div className="relative flex items-center justify-center">
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border-4 border-zinc-900 bg-white p-3 shadow-[4px_4px_0px_0px_rgb(39,39,42)] hover:bg-orange-100"
            aria-label="Previous client"
          >
            ‹
          </button>
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="mx-auto flex w-full max-w-xl flex-col items-center rounded-3xl border-4 border-zinc-900 bg-white p-10 shadow-[8px_8px_0px_0px_rgb(234,88,12)]"
              >
                {/* Logo & Name */}
                <div className="mb-4 flex flex-col items-center">
                  <client.logo
                    className={`mb-2 text-5xl ${getLogoColor(client.name)}`}
                  />
                  <div className="text-2xl font-extrabold tracking-tight text-zinc-900">
                    {client.name}
                  </div>
                </div>
                {/* Main project image */}
                <div className="mb-4 flex flex-col items-center">
                  <div className="relative rounded-xl border-4 border-zinc-900 bg-zinc-100 p-2 shadow-lg">
                    <img
                      src={client.projectImages[0]}
                      alt={client.name + " project main image"}
                      className="h-40 w-64 cursor-pointer rounded-lg object-contain"
                      onClick={() => openModal(0)}
                    />
                  </div>
                  <button
                    className="mt-2 text-sm font-bold text-orange-600 underline underline-offset-4 hover:text-orange-800"
                    onClick={() => openModal(0)}
                  >
                    See more
                  </button>
                </div>
                {/* Content */}
                <div className="mx-auto w-full max-w-md text-left">
                  <h3 className="mb-2 text-xl font-extrabold text-zinc-900">
                    {client.projectTitle}
                  </h3>
                  <p className="mb-4 text-base text-zinc-700">
                    {client.description}
                  </p>
                  <ul className="mb-2 space-y-2">
                    {client.achievements.map((ach, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-zinc-800"
                      >
                        <span className="inline-block h-3 w-3 rounded-full bg-orange-500"></span>
                        {ach}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border-4 border-zinc-900 bg-white p-3 shadow-[4px_4px_0px_0px_rgb(39,39,42)] hover:bg-orange-100"
            aria-label="Next client"
          >
            ›
          </button>
        </div>
      </div>
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative flex w-full max-w-2xl flex-col items-center rounded-2xl border border-zinc-200 bg-white p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 text-2xl font-black text-zinc-400 hover:text-orange-600"
                onClick={closeModal}
                aria-label="Close modal"
              >
                ×
              </button>
              {/* Modal image gallery */}
              <div className="mb-6 flex items-center gap-4">
                <button
                  onClick={() =>
                    setModalImgIdx(
                      (modalImgIdx - 1 + client.projectImages.length) %
                        client.projectImages.length
                    )
                  }
                  className="rounded-full border border-zinc-200 bg-white px-2 py-1 shadow-sm transition-all hover:bg-zinc-100"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <img
                  src={client.projectImages[modalImgIdx]}
                  alt={client.name + " project image " + (modalImgIdx + 1)}
                  className="h-64 w-96 rounded-xl border border-zinc-200 bg-white object-cover shadow-sm"
                />
                <button
                  onClick={() =>
                    setModalImgIdx(
                      (modalImgIdx + 1) % client.projectImages.length
                    )
                  }
                  className="rounded-full border border-zinc-200 bg-white px-2 py-1 shadow-sm transition-all hover:bg-zinc-100"
                  aria-label="Next image"
                >
                  ›
                </button>
              </div>
              <h3 className="mb-2 text-xl font-bold text-zinc-900">
                {client.projectTitle}
              </h3>
              <p className="mb-4 text-base text-zinc-700">
                {client.description}
              </p>
              <ul className="mb-2 space-y-2">
                {client.achievements.map((ach, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-zinc-800"
                  >
                    <span className="inline-block h-2 w-2 rounded-full bg-orange-500"></span>
                    {ach}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
