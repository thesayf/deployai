import React from 'react';
import { motion } from 'framer-motion';
import { QuizQuestion } from '@/types/quiz';

interface TextAreaQuestionProps {
  question: QuizQuestion;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  previousSelections?: { label: string; items: string[] };
}

export const AITextAreaQuestion: React.FC<TextAreaQuestionProps> = ({
  question,
  value,
  onChange,
  error,
  previousSelections,
}) => {
  const rows = question.maxLength && question.maxLength > 200 ? 6 : 4;
  
  return (
    <div className="flex flex-col justify-center h-full overflow-y-auto">
      {/* Display previous selections if provided */}
      {previousSelections && previousSelections.items.length > 0 && (
        <div className="mb-3 p-2 sm:p-3 bg-blue-50 border border-blue-200 rounded-lg max-h-32 sm:max-h-40 overflow-y-auto">
          <p className="text-xs font-semibold text-blue-900 mb-1.5 sm:mb-2">{previousSelections.label}</p>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {previousSelections.items.map((item, index) => (
              <span 
                key={index}
                className="inline-block px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-white text-blue-800 border border-blue-300 rounded"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Always reserve space for subtitle - consistent spacing */}
      <div className="min-h-[2rem] sm:h-12 mb-2 sm:mb-3">
        {question.subtitle && (
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic">
            {question.subtitle}
          </p>
        )}
      </div>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder || 'Type your answer here...'}
        maxLength={question.maxLength}
        rows={rows}
        className={`
          w-full px-3 sm:px-6 py-3 sm:py-4 text-sm sm:text-lg
          bg-gray-100 rounded-lg
          focus:bg-gray-200
          transition-all duration-200
          outline-none
          resize-none sm:resize-y min-h-[100px] sm:min-h-[120px]
          placeholder-gray-500 placeholder:text-sm sm:placeholder:text-base
        `}
      />
      
      {/* Only show character count when approaching limit */}
      {question.maxLength && value.length > question.maxLength * 0.8 && (
        <div className="flex justify-end mt-2">
          <p className={`text-sm ${value.length > question.maxLength * 0.9 ? 'text-orange-600' : 'text-gray-600'}`}>
            {value.length}/{question.maxLength}
          </p>
        </div>
      )}
      
      {/* Reserve space for error message to prevent content shift */}
      <div className="h-6 mt-2">
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