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
    <div className="space-y-3">
      {question.options?.map((option, index) => (
        <motion.label
          key={option.value}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`
            block cursor-pointer p-4 border-3 border-black
            transition-all duration-200
            ${value === option.value 
              ? 'bg-gradient-to-r from-orange-100 to-red-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
              : 'bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
            }
            ${error ? 'border-red-500' : ''}
          `}
        >
          <div className="flex items-center">
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
              w-5 h-5 rounded-full border-3 border-black mr-4 flex-shrink-0
              ${value === option.value ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-white'}
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
            
            <span className={`
              text-lg ${value === option.value ? 'font-semibold' : ''}
            `}>
              {option.label}
            </span>
          </div>
        </motion.label>
      ))}
      
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
  );
};