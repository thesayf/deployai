import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QuizQuestion } from '@/types/quiz';

interface SingleSelectQuestionProps {
  question: QuizQuestion;
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

export const SingleSelectQuestion: React.FC<SingleSelectQuestionProps> = ({
  question,
  value,
  onChange,
  error,
}) => {
  const [showGradient, setShowGradient] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const hasOverflow = container.scrollHeight > container.clientHeight;
      const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 5;
      setShowGradient(hasOverflow && !isAtBottom);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [question.options]);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Scrollable container for options */}
      <div className="flex-1 overflow-y-auto" ref={scrollContainerRef}>
        <div className="space-y-2 pr-2">
        {question.options?.map((option, index) => (
        <label
          key={option.value}
          className={`
            block cursor-pointer p-4 border-3 border-black
            transition-all duration-200
            ${value === option.value 
              ? 'bg-[#FF6B35] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
              : 'bg-white hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
            }
          `}
        >
          <div className="flex">
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="sr-only"
            />
            
            {/* Custom Radio Button */}
            <div className={`
              w-5 h-5 border-2 border-black mr-4 flex-shrink-0 transition-colors mt-1
              ${value === option.value ? 'bg-white' : 'bg-gray-200'}
            `}>
              {value === option.value && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-black" />
                </motion.div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-start gap-3">
                {/* Icon if available */}
                {option.icon && (
                  <span className="text-2xl flex-shrink-0">{option.icon}</span>
                )}
                
                <div className="flex-1">
                  <div className={`
                    text-base leading-relaxed font-bold ${value === option.value ? 'text-white' : 'text-gray-900'}
                  `}>
                    {option.label}
                  </div>
                  
                  {/* Description if available */}
                  {option.description && (
                    <div className={`text-sm mt-1 ${value === option.value ? 'text-white/90' : 'text-gray-600'}`}>
                      {option.description}
                    </div>
                  )}
                  
                  {/* Examples if available */}
                  {option.examples && (
                    <div className={`text-xs mt-2 font-medium ${value === option.value ? 'text-white/80' : 'text-gray-500'}`}>
                      {option.examples}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </label>
        ))}
        </div>
      </div>
      
      {/* Reserve space for error message to prevent content shift */}
      <div className="h-6 mt-2 flex-shrink-0">
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm"
          >
            {error}
          </motion.p>
        )}
      </div>
    </div>
  );
};