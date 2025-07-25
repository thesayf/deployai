import React from 'react';
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
  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Scrollable container for options */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-2" style={{ scrollbarWidth: 'thin' }}>
        {question.options?.map((option, index) => (
        <motion.label
          key={option.value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`
            block cursor-pointer p-4 rounded-lg
            transition-all duration-200
            ${value === option.value 
              ? 'bg-emerald-100' 
              : 'bg-gray-100 hover:bg-gray-200'
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
              w-5 h-5 rounded-full mr-4 flex-shrink-0 transition-colors mt-1
              ${value === option.value ? 'bg-emerald-400' : 'bg-gray-300'}
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
        </motion.label>
        ))}
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