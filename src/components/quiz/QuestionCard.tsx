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
      className="bg-white border-3 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 md:p-10"
    >
      {/* Question Header */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          {question.title}
        </h2>
        {question.subtitle && (
          <p className="text-gray-600 text-lg">
            {question.subtitle}
          </p>
        )}
      </div>

      {/* Question Input */}
      <div className="mb-8">
        {renderQuestionInput()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <div>
          {!isFirst && (
            <Button
              intent="outline"
              size="medium"
              onClick={onPrevious}
              type="button"
            >
              Previous
            </Button>
          )}
        </div>
        
        <div>
          <Button
            intent="primary"
            size="medium"
            onClick={onNext}
            disabled={!isValid}
            type="button"
          >
            {isLast ? 'Complete Assessment' : 'Next'}
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {validationError && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-4 text-center"
        >
          {validationError}
        </motion.p>
      )}
    </motion.div>
  );
};