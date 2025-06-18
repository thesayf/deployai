import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiClock, FiDollarSign, FiTrendingUp, FiUsers } from "react-icons/fi";

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: {
    id: string;
    service: string;
    metric: string;
    subMetric: string;
    orderCount: string;
    description: string;
    bgUrl: string;
    company: string;
    industry: string;
    timeline: string;
    challenge: string;
    solution: string;
    results: string[];
    techStack: string[];
    testimonial: string;
    testimonialAuthor: string;
  } | null;
}

export const CaseStudyModal = ({ isOpen, onClose, caseStudy }: CaseStudyModalProps) => {
  if (!caseStudy) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300
            }}
            className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden border-2 border-zinc-900 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative flex items-center justify-between border-b-2 border-zinc-900 bg-white p-6">
              <div>
                <h2 className="text-2xl font-black text-zinc-900">{caseStudy.service}</h2>
                <p className="text-sm text-zinc-600">{caseStudy.company} • {caseStudy.industry}</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg border-2 border-zinc-900 bg-white p-2 shadow-[2px_2px_0px_#18181b] transition-all hover:scale-105 hover:shadow-[3px_3px_0px_#18181b]"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 max-h-[calc(90vh-100px)] overflow-y-auto">
              {/* Left Column - Image & Metrics */}
              <div className="p-6">
                <div 
                  className="mb-6 h-64 w-full rounded-2xl border-2 border-zinc-900 bg-cover bg-center shadow-[4px_4px_0px_#18181b]"
                  style={{ backgroundImage: `url(${caseStudy.bgUrl})` }}
                />
                
                {/* Key Metrics */}
                <div className="mb-6 rounded-2xl border-2 border-zinc-900 bg-zinc-100 p-6 shadow-[4px_4px_0px_#18181b]">
                  <h3 className="mb-4 text-lg font-bold text-zinc-900">Key Results</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="mb-1 text-2xl font-black text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text">
                        {caseStudy.metric}
                      </div>
                      <div className="text-sm text-zinc-600">{caseStudy.subMetric}</div>
                    </div>
                    <div className="text-center">
                      <div className="mb-1 text-2xl font-black text-zinc-900">
                        {caseStudy.orderCount}
                      </div>
                      <div className="text-sm text-zinc-600">Orders Automated</div>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="rounded-2xl border-2 border-zinc-900 bg-white p-4 shadow-[4px_4px_0px_#18181b]">
                  <div className="flex items-center gap-2">
                    <FiClock className="text-orange-500" />
                    <span className="font-bold text-zinc-900">Timeline:</span>
                    <span className="text-zinc-600">{caseStudy.timeline}</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="border-l-2 border-zinc-900 p-6">
                {/* Challenge */}
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-bold text-zinc-900">The Challenge</h3>
                  <p className="text-zinc-700">{caseStudy.challenge}</p>
                </div>

                {/* Solution */}
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-bold text-zinc-900">Our Solution</h3>
                  <p className="text-zinc-700">{caseStudy.solution}</p>
                </div>

                {/* Results */}
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-bold text-zinc-900">Results Achieved</h3>
                  <ul className="space-y-2">
                    {caseStudy.results.map((result, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FiTrendingUp className="mt-1 h-4 w-4 flex-shrink-0 text-orange-500" />
                        <span className="text-zinc-700">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-bold text-zinc-900">Technology Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="rounded border border-zinc-300 bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="rounded-2xl border-2 border-zinc-900 bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white shadow-[4px_4px_0px_#18181b]">
                  <FiUsers className="mb-3 h-6 w-6" />
                  <blockquote className="mb-3 text-sm italic">
                    "{caseStudy.testimonial}"
                  </blockquote>
                  <cite className="text-xs text-orange-100">— {caseStudy.testimonialAuthor}</cite>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};