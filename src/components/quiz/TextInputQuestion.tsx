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
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder}
        maxLength={question.maxLength}
        className={`
          w-full px-4 py-3 text-lg
          border-3 border-black
          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
          focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
          focus:-translate-x-0.5 focus:-translate-y-0.5
          transition-all duration-200
          outline-none
          ${error ? 'border-red-500' : ''}
        `}
      />
      
      <div className="flex justify-between items-center mt-2">
        {question.minLength && (
          <p className="text-sm text-gray-600">
            Minimum {question.minLength} characters
          </p>
        )}
        
        {question.maxLength && (
          <p className={`text-sm ${value.length > question.maxLength * 0.9 ? 'text-orange-600' : 'text-gray-600'}`}>
            {value.length}/{question.maxLength}
          </p>
        )}
      </div>
      
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