import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionSubheading } from "../shared/SectionSubheading";

interface FAQProps {
  variant?: "default" | "customSoftware" | "inventory" | "webapp" | "ai";
}

interface QuestionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const FAQ = ({ variant = "default" }: FAQProps) => {
  const { heading, subheading, questions } = getFAQContent(variant);

  return (
    <section className="relative mx-auto max-w-4xl px-4 py-24">
      <SectionHeading>{heading}</SectionHeading>
      <SectionSubheading>{subheading}</SectionSubheading>

      <div className="mx-auto max-w-3xl">
        {questions.map((faq, index) => (
          <Question key={index} title={faq.question} defaultOpen={index === 0}>
            <div className="leading-relaxed text-zinc-600">{faq.answer}</div>
          </Question>
        ))}
      </div>
    </section>
  );
};

const Question = ({ title, children, defaultOpen = false }: QuestionProps) => {
  const [ref, { height }] = useMeasure();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      animate={open ? "open" : "closed"}
      className="border-b-2 border-zinc-200 last:border-b-0"
    >
      <button
        onClick={() => setOpen((pv) => !pv)}
        className="flex w-full items-center justify-between gap-4 py-6 text-left"
      >
        <motion.span
          variants={{
            open: {
              color: "rgb(234 88 12)", // orange-600
            },
            closed: {
              color: "rgb(24 24 27)", // zinc-900
            },
          }}
          className="text-lg font-semibold md:text-xl"
        >
          {title}
        </motion.span>
        <motion.span
          variants={{
            open: {
              rotate: "180deg",
              color: "rgb(234 88 12)", // orange-600
            },
            closed: {
              rotate: "0deg",
              color: "rgb(113 113 122)", // zinc-500
            },
          }}
          className="flex-shrink-0"
        >
          <FiChevronDown className="text-2xl" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? height : "0px",
          marginBottom: open ? "24px" : "0px",
        }}
        className="overflow-hidden"
      >
        <div ref={ref}>{children}</div>
      </motion.div>
    </motion.div>
  );
};

function getFAQContent(variant: FAQProps["variant"]) {
  switch (variant) {
    case "customSoftware":
      return {
        heading: "Frequently Asked Questions",
        subheading:
          "Everything you need to know about custom software development in Dubai.",
        questions: [
          {
            question:
              "How long does custom software development take in Dubai?",
            answer: (
              <div>
                <p className="mb-3">
                  Our custom software development timelines are designed around
                  Dubai's fast-paced business environment:
                </p>
                <ul className="ml-4 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      <strong>Simple Solutions:</strong> 4-8 weeks for basic
                      automation and workflows
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      <strong>Standard Projects:</strong> 2-4 months for full
                      business applications
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      <strong>Enterprise Solutions:</strong> 4-8 months for
                      complex, scalable systems
                    </span>
                  </li>
                </ul>
                <p className="mt-3">
                  We deliver in 30-day milestones, so you see progress every
                  month and can provide feedback early and often.
                </p>
              </div>
            ),
          },
          {
            question:
              "What makes your team familiar with UAE business requirements?",
            answer: (
              <div>
                <p className="mb-3">
                  Our team has been developing software for UAE businesses since
                  2019, giving us deep expertise in local requirements:
                </p>
                <ul className="ml-4 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      UAE regulatory compliance (DIFC, ADGM, Free Zones)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      Multi-currency support (AED, USD, EUR) with real-time
                      exchange rates
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      VAT calculation and reporting for UAE businesses
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      Integration with local payment gateways (Network
                      International, PayTabs)
                    </span>
                  </li>
                </ul>
              </div>
            ),
          },
          {
            question:
              "How do you ensure compliance with UAE data protection laws?",
            answer: (
              <div>
                <p className="mb-3">
                  We implement enterprise-grade security from day one, ensuring
                  full compliance with UAE data protection requirements:
                </p>
                <ul className="ml-4 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      <strong>Data Residency:</strong> All data stored within
                      UAE borders when required
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      <strong>Encryption:</strong> AES-256 encryption for data
                      at rest and in transit
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      <strong>Access Controls:</strong> Role-based permissions
                      and audit trails
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      <strong>GDPR Ready:</strong> Compliant with both UAE and
                      international standards
                    </span>
                  </li>
                </ul>
              </div>
            ),
          },
          {
            question: "What post-launch support do you provide?",
            answer: (
              <div>
                <p className="mb-3">
                  We provide comprehensive post-launch support to ensure your
                  software continues performing optimally:
                </p>
                <ul className="ml-4 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      <strong>3 Months Free:</strong> Bug fixes and minor
                      updates included
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      <strong>24/7 Monitoring:</strong> Proactive system health
                      checks
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      <strong>Team Training:</strong> Complete documentation and
                      user training
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      <strong>Ongoing Maintenance:</strong> Optional monthly
                      support packages available
                    </span>
                  </li>
                </ul>
              </div>
            ),
          },
          {
            question: "Can you integrate with Emirates ID and UAE Pass?",
            answer: (
              <div>
                <p className="mb-3">
                  Absolutely! We have extensive experience integrating with
                  UAE's national identity systems:
                </p>
                <ul className="ml-4 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      <strong>Emirates ID Integration:</strong> Full citizen
                      verification and data retrieval
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      <strong>UAE Pass Authentication:</strong> Seamless single
                      sign-on for government services
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      <strong>Digital Signature:</strong> Legally binding
                      document signing through UAE Pass
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      <strong>KYC Compliance:</strong> Automated customer
                      verification for financial services
                    </span>
                  </li>
                </ul>
              </div>
            ),
          },
          {
            question: "Do you provide Arabic language interfaces?",
            answer: (
              <div>
                <p className="mb-3">
                  Yes, we specialize in building truly bilingual applications
                  for the UAE market:
                </p>
                <ul className="ml-4 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      <strong>RTL Support:</strong> Full right-to-left layout
                      and text rendering
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      <strong>Cultural Adaptation:</strong> UI/UX designed for
                      Arabic-speaking users
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      <strong>Dynamic Switching:</strong> Users can toggle
                      between Arabic and English
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      <strong>Arabic Data Entry:</strong> Forms and inputs
                      optimized for Arabic text
                    </span>
                  </li>
                </ul>
              </div>
            ),
          },
          {
            question: "What's your experience with UAE banking integrations?",
            answer: (
              <div>
                <p className="mb-3">
                  We have deep experience with UAE's banking ecosystem and
                  financial technology requirements:
                </p>
                <ul className="ml-4 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      <strong>Major Banks:</strong> Direct integrations with
                      Emirates NBD, ADCB, FAB, and Mashreq
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      <strong>Payment Gateways:</strong> Network International,
                      PayTabs, and local processors
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      <strong>Open Banking:</strong> Account aggregation and
                      transaction data APIs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      <strong>CBUAE Compliance:</strong> Full regulatory
                      compliance with Central Bank requirements
                    </span>
                  </li>
                </ul>
              </div>
            ),
          },
          {
            question: "How do you handle Ramadan and Eid project timelines?",
            answer: (
              <div>
                <p className="mb-3">
                  We respect and plan around UAE's cultural calendar to ensure
                  smooth project delivery:
                </p>
                <ul className="ml-4 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      <strong>Cultural Planning:</strong> Project timelines
                      account for reduced hours during Ramadan
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      <strong>Flexible Scheduling:</strong> Adjusted work hours
                      and extended deadlines during holy months
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      <strong>Holiday Preparation:</strong> Critical tasks
                      completed before Eid celebrations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-500">•</span>
                    <span>
                      <strong>Continuous Support:</strong> Emergency support
                      available throughout religious holidays
                    </span>
                  </li>
                </ul>
              </div>
            ),
          },
        ],
      };

    default:
      return {
        heading: "Frequently Asked Questions",
        subheading:
          "Everything you need to know about our AI deployment services.",
        questions: [
          {
            question: "How long does AI deployment take?",
            answer:
              "Our AI deployment typically takes 4-12 weeks depending on complexity, with most projects delivering ROI within the first month of deployment.",
          },
        ],
      };
  }
}
