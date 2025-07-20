import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import useMeasure from 'react-use-measure';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface PeopleAlsoAskProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
  className?: string;
  defaultOpenIndex?: number;
  variant?: 'default' | 'compact';
}

export const PeopleAlsoAsk: React.FC<PeopleAlsoAskProps> = ({
  title = "People Also Ask",
  subtitle,
  items,
  className = "",
  defaultOpenIndex = 0,
  variant = 'default'
}) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(defaultOpenIndex);

  // Generate FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": typeof item.answer === 'string' 
          ? item.answer 
          : extractTextFromNode(item.answer)
      }
    }))
  };

  return (
    <section className={`w-full ${className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-8 text-center">
          {title && (
            <h2 className="text-3xl font-bold text-zinc-900 md:text-4xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-2 text-lg text-zinc-600">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Questions */}
      <div className={`mx-auto max-w-3xl space-y-4 ${variant === 'compact' ? 'space-y-2' : 'space-y-4'}`}>
        {items.map((item, index) => (
          <QuestionCard
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            variant={variant}
          />
        ))}
      </div>
    </section>
  );
};

interface QuestionCardProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  variant: 'default' | 'compact';
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
  variant
}) => {
  const [ref, { height }] = useMeasure();

  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      className={`
        overflow-hidden rounded-lg border transition-all duration-200
        ${isOpen 
          ? 'border-emerald-500 bg-emerald-50/30 shadow-md' 
          : 'border-zinc-200 bg-white shadow-sm hover:border-zinc-300'
        }
      `}
    >
      <button
        onClick={onToggle}
        className={`
          flex w-full items-center justify-between text-left transition-colors
          ${variant === 'compact' ? 'px-4 py-3' : 'px-6 py-4'}
          ${isOpen 
            ? 'bg-emerald-50 text-emerald-700' 
            : 'hover:bg-zinc-50'
          }
        `}
      >
        <span className={`
          font-medium
          ${variant === 'compact' ? 'text-base' : 'text-lg'}
          ${isOpen ? 'text-emerald-700' : 'text-zinc-900'}
        `}>
          {question}
        </span>
        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 }
          }}
          transition={{ duration: 0.2 }}
          className="ml-4 flex-shrink-0"
        >
          <FiChevronDown className={`
            h-5 w-5
            ${isOpen ? 'text-emerald-600' : 'text-zinc-400'}
          `} />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? height : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{
          height: { duration: 0.3, ease: "easeInOut" },
          opacity: { duration: 0.2, delay: isOpen ? 0.1 : 0 }
        }}
        className="overflow-hidden"
      >
        <div 
          ref={ref} 
          className={`
            ${variant === 'compact' ? 'px-4 pb-3 pt-2' : 'px-6 pb-6 pt-4'}
          `}
        >
          <div className="prose prose-zinc max-w-none text-zinc-600">
            {answer}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Helper function to extract text from React nodes for schema
function extractTextFromNode(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return node.toString();
  if (!node) return '';
  
  if (React.isValidElement(node)) {
    const children = (node.props as any).children;
    if (children) {
      if (Array.isArray(children)) {
        return children.map(extractTextFromNode).join(' ');
      }
      return extractTextFromNode(children);
    }
  }
  
  if (Array.isArray(node)) {
    return node.map(extractTextFromNode).join(' ');
  }
  
  return '';
}