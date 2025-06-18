import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { CaseStudyModal } from "./CaseStudyModal";

export const CaseStudies = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudyData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCaseStudyClick = (caseStudy: CaseStudyData) => {
    setSelectedCaseStudy(caseStudy);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCaseStudy(null);
  };

  return (
    <section id="case-studies" className="bg-white py-32">
      <div className="mx-4 sm:mx-6 md:mx-36">
        <div className="rounded-2xl border-4 border-zinc-900 bg-zinc-100 px-8 py-12 shadow-[0px_8px_0px_#18181b] shadow-[inset_0px_0px_20px_rgba(0,0,0,0.3),inset_0px_2px_8px_rgba(0,0,0,0.4)] md:px-12 md:py-16 lg:px-16 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center"
        > 
          <h2 className="mb-4 text-7xl font-black text-zinc-900">
            Real Results. Real Impact
          </h2>
          <p className="mx-auto max-w-4xl text-2xl text-zinc-600">
            See how we've transformed operations for companies just like yours.
          </p>
        </motion.div>

        <div className="mx-auto max-w-5xl grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-9">
          {CASE_STUDIES_DATA.map((caseStudy) => (
            <CaseStudyCard
              key={caseStudy.id}
              {...caseStudy}
              onClick={() => handleCaseStudyClick(caseStudy)}
            />
          ))}
        </div>
        </div>
      </div>
      
      <CaseStudyModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        caseStudy={selectedCaseStudy}
      />
    </section>
  );
};

interface CaseStudyData {
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
}

interface CaseStudyCardProps extends CaseStudyData {
  onClick: () => void;
}

const CaseStudyCard = ({ 
  service, 
  metric, 
  subMetric, 
  orderCount, 
  description, 
  bgUrl,
  onClick
}: CaseStudyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-2xl border-4 border-zinc-900 bg-zinc-100 shadow-[0px_6px_0px_#18181b] shadow-[inset_0px_3px_6px_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-[0px_8px_0px_#18181b] hover:scale-105"
    >
      {/* Background Image - only visible by default */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-110 group-hover:blur-sm"
        style={{ backgroundImage: `url(${bgUrl})` }}
      />
      
      {/* Overlay that becomes visible on hover */}
      <div className="absolute inset-0 bg-white/95 opacity-0 transition-all duration-300 group-hover:opacity-100" />
      
      {/* Content - hidden by default, shown on hover */}
      <div className="relative flex h-full flex-col justify-between p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {/* Top content */}
        <div>
          <div className="mb-3 inline-block rounded border border-zinc-300 bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
            {service}
          </div>
          
          {/* Metrics display */}
          <div className="mb-3">
            <h3 className="mb-2 text-2xl font-black text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text leading-tight">
              {metric} {subMetric}
            </h3>
            <div className="text-sm font-semibold text-zinc-600">{orderCount} orders automated monthly</div>
          </div>
          
          <p className="text-base font-medium text-zinc-700">{description}</p>
        </div>
        
        {/* Bottom content */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs font-medium text-zinc-500">
            30-day delivery
          </span>
          
          {/* CTA Button with brand styling */}
          <a
            href="https://calendly.com/hello-deployai/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border-2 border-zinc-900 bg-gradient-to-r from-orange-500 to-red-500 px-3 py-2 text-sm font-bold text-white shadow-[2px_2px_0px_#18181b] transition-all hover:scale-105 hover:shadow-[3px_3px_0px_#18181b]"
          >
            Get Similar Results
            <FiArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const CASE_STUDIES_DATA: CaseStudyData[] = [
  {
    id: "automated-logistics",
    service: "Automated Logistics",
    metric: "$347,000",
    subMetric: "saved in 6 months",
    orderCount: "2,400+",
    description: "Global shipping company eliminated manual dispatch processes entirely",
    bgUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2940&auto=format&fit=crop",
    company: "GlobalShip Logistics",
    industry: "Logistics & Supply Chain",
    timeline: "4 months implementation",
    challenge: "Manual dispatch processes were causing 3-hour delays per shipment, leading to customer complaints and lost revenue. The team was processing 50+ orders daily through spreadsheets and phone calls.",
    solution: "Implemented AI-powered dispatch automation with real-time route optimization, automated customer notifications, and seamless integration with existing tracking systems.",
    results: [
      "87% reduction in dispatch processing time",
      "$347,000 annual cost savings through efficiency gains",
      "99.2% on-time delivery rate achieved",
      "2,400+ orders now processed automatically monthly",
      "Zero customer complaints about dispatch delays"
    ],
    techStack: ["Python", "FastAPI", "PostgreSQL", "React", "AWS Lambda", "Twilio API"],
    testimonial: "deployAI transformed our entire logistics operation. What used to take our team hours now happens automatically in minutes. The ROI was evident within the first month.",
    testimonialAuthor: "Sarah Mitchell, Operations Director at GlobalShip"
  },
  {
    id: "ai-customer-service",
    service: "AI Customer Service",
    metric: "87%",
    subMetric: "faster response time",
    orderCount: "3,200+",
    description: "SaaS startup eliminated support backlog completely",
    bgUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop",
    company: "TechStart Solutions",
    industry: "SaaS Technology",
    timeline: "6 weeks implementation",
    challenge: "Growing customer base led to 24-48 hour response times, 40% of tickets required escalation, and support team burnout. Customer satisfaction scores were declining rapidly.",
    solution: "Deployed intelligent AI assistant with natural language processing, automated ticket routing, sentiment analysis, and seamless handoff to human agents for complex issues.",
    results: [
      "Response time reduced from 24 hours to 3 hours",
      "3,200+ customer queries handled automatically monthly",
      "75% of tickets resolved without human intervention", 
      "Customer satisfaction score increased from 3.2 to 4.7/5",
      "Support team can focus on complex, high-value interactions"
    ],
    techStack: ["OpenAI GPT-4", "Node.js", "MongoDB", "React", "Slack API", "Zendesk API"],
    testimonial: "Our support team went from overwhelmed to empowered. The AI handles routine questions perfectly, and our team can focus on helping customers with complex needs.",
    testimonialAuthor: "Michael Chen, CEO at TechStart Solutions"
  },
  {
    id: "process-optimization",
    service: "Process Optimization",
    metric: "$2.4M",
    subMetric: "annual savings",
    orderCount: "95%",
    description: "Manufacturing firm automated order-to-delivery pipeline",
    bgUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2940&auto=format&fit=crop",
    company: "IndustrialTech Manufacturing",
    industry: "Manufacturing",
    timeline: "8 months implementation",
    challenge: "Complex order-to-delivery process involved 12 manual handoffs, paper-based tracking, and frequent communication gaps leading to 30% of orders experiencing delays.",
    solution: "Built end-to-end automation system connecting order management, inventory, production scheduling, quality control, and shipping with real-time visibility and predictive analytics.",
    results: [
      "$2.4M in annual operational cost savings",
      "95% of orders now flow through automated pipeline",
      "60% reduction in order-to-delivery time",
      "99.1% order accuracy rate achieved",
      "Real-time visibility across entire production chain"
    ],
    techStack: ["Python", "Django", "PostgreSQL", "Redis", "Docker", "Kubernetes", "Tableau"],
    testimonial: "This system found efficiencies we never knew existed. The data insights alone have transformed how we make operational decisions. The ROI exceeded our wildest expectations.",
    testimonialAuthor: "David Rodriguez, COO at IndustrialTech"
  }
];