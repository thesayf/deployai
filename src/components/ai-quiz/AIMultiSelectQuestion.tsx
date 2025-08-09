import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QuizQuestion } from '@/types/quiz';

interface MultiSelectQuestionProps {
  question: QuizQuestion;
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}

export const AIMultiSelectQuestion: React.FC<MultiSelectQuestionProps> = ({
  question,
  value = [],
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
  const handleOptionToggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      // Remove the option
      onChange(value.filter(v => v !== optionValue));
    } else {
      // Add the option (check max selections)
      if (question.maxSelections && value.length >= question.maxSelections) {
        return; // Don't add if at max
      }
      onChange([...value, optionValue]);
    }
  };

  const isOptionDisabled = (optionValue: string) => {
    return !value.includes(optionValue) && 
           question.maxSelections !== undefined && 
           value.length >= question.maxSelections;
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Always reserve space for subtitle - consistent spacing */}
      <div className="h-12 mb-3 flex-shrink-0">
        {question.subtitle ? (
          <p className="text-sm text-gray-600 leading-relaxed italic">
            {question.subtitle}
          </p>
        ) : question.maxSelections ? (
          <p className="text-sm text-gray-600 leading-relaxed italic">
            Select up to {question.maxSelections} options ({value.length} selected)
          </p>
        ) : null}
      </div>
      
      {/* Scrollable container for options */}
      <div className="relative flex-1 min-h-0">
        <div 
          ref={scrollContainerRef}
          className="absolute inset-0 overflow-y-auto pr-2 space-y-2" 
          style={{ scrollbarWidth: 'thin' }}
        >
        {question.options?.map((option, index) => (
        <motion.label
          key={option.value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`
            block cursor-pointer p-4 rounded-lg
            transition-all duration-200
            ${value.includes(option.value) 
              ? 'bg-blue-100' 
              : 'bg-gray-100 hover:bg-gray-200'
            }
            ${isOptionDisabled(option.value) ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <div className="flex">
            <input
              type="checkbox"
              value={option.value}
              checked={value.includes(option.value)}
              onChange={() => handleOptionToggle(option.value)}
              disabled={isOptionDisabled(option.value)}
              className="sr-only"
            />
            
            {/* Custom Checkbox */}
            <div className={`
              w-5 h-5 rounded mr-4 flex-shrink-0 mt-1
              ${value.includes(option.value) ? 'bg-[#457B9D]' : 'bg-gray-300'}
            `}>
              {value.includes(option.value) && (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-full h-full p-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              )}
            </div>
            
            <div className="flex-1">
              <div className={`
                text-base leading-relaxed ${value.includes(option.value) ? 'font-semibold' : ''}
                ${isOptionDisabled(option.value) ? 'text-gray-400' : 'text-gray-700'}
              `}>
                {option.label}
              </div>
            </div>
          </div>
        </motion.label>
        ))}
        </div>
        
        {/* Scroll indicator gradient */}
        <div 
          className={`absolute bottom-0 left-0 right-0 h-16 pointer-events-none transition-opacity duration-300 ${showGradient ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.9))'
          }}
        />
      </div>
      
      {/* Reserve space for error message to prevent content shift */}
      <div className="h-6 mt-2 flex-shrink-0">
        {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-2"
        >
          {error}
        </motion.p>
        )}
      </div>
    </div>
  );
};