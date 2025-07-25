import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/shared/Button';
import { QuizQuestion } from '@/types/quiz';
import { SingleSelectQuestion } from './SingleSelectQuestion';
import { MultiSelectQuestion } from './MultiSelectQuestion';
import { TextInputQuestion } from './TextInputQuestion';
import { TextAreaQuestion } from './TextAreaQuestion';

interface QuestionCardProps {
  question: QuizQuestion;
  currentAnswer?: any;
  onAnswer: (answer: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  isValid: boolean;
  validationError?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentAnswer,
  onAnswer,
  onNext,
  onPrevious,
  isFirst,
  isLast,
  isValid,
  validationError,
}) => {
  const renderQuestionInput = () => {
    switch (question.type) {
      case 'single-select':
        return (
          <SingleSelectQuestion
            question={question}
            value={currentAnswer}
            onChange={onAnswer}
            error={validationError}
          />
        );
      
      case 'multi-select':
        return (
          <MultiSelectQuestion
            question={question}
            value={currentAnswer || []}
            onChange={onAnswer}
            error={validationError}
          />
        );
      
      case 'text':
        return (
          <TextInputQuestion
            question={question}
            value={currentAnswer || ''}
            onChange={onAnswer}
            error={validationError}
          />
        );
      
      case 'textarea':
        return (
          <TextAreaQuestion
            question={question}
            value={currentAnswer || ''}
            onChange={onAnswer}
            error={validationError}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      {/* Question Input - Fixed viewport height container */}
      <div className="h-[50vh] max-h-[500px] flex items-center">
        <div className="w-full h-full">
          {renderQuestionInput()}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 pt-4 flex-shrink-0">
        {!isFirst && (
          <button
            onClick={onPrevious}
            className="px-8 py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Previous
          </button>
        )}
        
        <button
          onClick={onNext}
          disabled={!isValid}
          className="px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLast ? 'Complete' : 'Next'}
        </button>
      </div>
    </motion.div>
  );
};