import React from 'react';
import { motion } from 'framer-motion';
import { QuizQuestion } from '@/types/quiz';

interface TextInputQuestionProps {
  question: QuizQuestion;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const TextInputQuestion: React.FC<TextInputQuestionProps> = ({
  question,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="flex flex-col justify-center h-full">
      {/* Always reserve space for subtitle - consistent spacing */}
      <div className="h-12 mb-3">
        {question.subtitle && (
          <p className="text-sm text-gray-600 leading-relaxed italic">
            {question.subtitle}
          </p>
        )}
      </div>
      
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder?.split(',')[0] + '...' || 'Type your answer here...'}
        maxLength={question.maxLength}
        className={`
          w-full px-6 py-4 text-lg
          bg-gray-100 rounded-lg
          focus:bg-gray-200
          transition-all duration-200
          outline-none
          placeholder-gray-500
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