import React from 'react';
import { motion } from 'framer-motion';
import { QuizQuestion } from '@/types/quiz';

interface MultiSelectQuestionProps {
  question: QuizQuestion;
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}

export const MultiSelectQuestion: React.FC<MultiSelectQuestionProps> = ({
  question,
  value = [],
  onChange,
  error,
}) => {
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
    <div className="space-y-3">
      {question.maxSelections && (
        <p className="text-sm text-gray-600 mb-4">
          Select up to {question.maxSelections} options ({value.length} selected)
        </p>
      )}
      
      {question.options?.map((option, index) => (
        <motion.label
          key={option.value}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`
            block cursor-pointer p-4 border-3 border-black
            transition-all duration-200
            ${value.includes(option.value) 
              ? 'bg-gradient-to-r from-orange-100 to-red-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
              : 'bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
            }
            ${isOptionDisabled(option.value) ? 'opacity-50 cursor-not-allowed' : ''}
            ${error ? 'border-red-500' : ''}
          `}
        >
          <div className="flex items-center">
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
              w-5 h-5 border-3 border-black mr-4 flex-shrink-0
              ${value.includes(option.value) ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-white'}
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
            
            <span className={`
              text-lg ${value.includes(option.value) ? 'font-semibold' : ''}
              ${isOptionDisabled(option.value) ? 'text-gray-400' : ''}
            `}>
              {option.label}
            </span>
          </div>
        </motion.label>
      ))}
      
      {question.minSelections && value.length < question.minSelections && (
        <p className="text-sm text-gray-600 mt-2">
          Please select at least {question.minSelections} option{question.minSelections > 1 ? 's' : ''}
        </p>
      )}
      
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