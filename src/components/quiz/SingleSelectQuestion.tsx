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
      <div className="relative flex-1 min-h-0">
        <div 
          ref={scrollContainerRef}
          className="absolute inset-0 overflow-y-auto pr-2 space-y-2" 
          style={{ scrollbarWidth: 'thin' }}
        >
        {question.options?.map((option, index) => (
        <motion.div
          key={option.value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onChange(option.value)}
          className={`
            block cursor-pointer p-4 rounded-lg
            transition-all duration-200
            ${value === option.value 
              ? 'bg-blue-100' 
              : 'bg-gray-100 hover:bg-gray-200'
            }
          `}
        >
          <div className="flex">
            {/* Custom Radio Button */}
            <div className={`
              w-5 h-5 rounded-full mr-4 flex-shrink-0 transition-colors mt-1
              ${value === option.value ? 'bg-[#457B9D]' : 'bg-gray-300'}
            `}>
              {value === option.value && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-full h-full rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 rounded-full bg-white" />
                </motion.div>
              )}
            </div>
            
            <div className="flex-1">
              <div className={`
                text-base leading-relaxed ${value === option.value ? 'font-semibold text-gray-900' : 'text-gray-700'}
              `}>
                {option.label}
              </div>
            </div>
          </div>
        </motion.div>
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
            className="text-red-500 text-sm"
          >
            {error}
          </motion.p>
        )}
      </div>
    </div>
  );
};