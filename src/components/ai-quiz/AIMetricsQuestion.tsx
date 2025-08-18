import React from 'react';
import { motion } from 'framer-motion';
import { QuizQuestion } from '@/types/quiz';
import quizData from '@/data/quiz-questions.json';

interface MetricsQuestionProps {
  question: QuizQuestion;
  value: Record<string, string> | string;
  onChange: (value: Record<string, string>) => void;
  error?: string;
  previousSelections: string[];
  questionType: 'time' | 'cost';
}

const TIME_RANGES = [
  { value: 'none', label: 'None', displayLabel: 'None' },
  { value: '<0.25fte', label: '<0.25 FTE', displayLabel: '<0.25 FTE' },
  { value: '0.25-1fte', label: '0.25-1 FTE', displayLabel: '0.25-1 FTE' },
  { value: '1-3fte', label: '1-3 FTE', displayLabel: '1-3 FTE' },
  { value: '3-10fte', label: '3-10 FTE', displayLabel: '3-10 FTE' },
  { value: '10-25fte', label: '10-25 FTE', displayLabel: '10-25 FTE' },
  { value: '25+fte', label: '25+ FTE', displayLabel: '25+ FTE' },
];

const COST_RANGES = [
  { value: '$0', label: '$0', displayLabel: '$0' },
  { value: '<$2k', label: '<$2k', displayLabel: '<$2K' },
  { value: '$2-10k', label: '$2-10k', displayLabel: '$2-10K' },
  { value: '$10-50k', label: '$10-50k', displayLabel: '$10-50K' },
  { value: '$50-200k', label: '$50-200k', displayLabel: '$50-200K' },
  { value: '$200-500k', label: '$200-500k', displayLabel: '$200-500K' },
  { value: '$500k+', label: '$500k+', displayLabel: '$500K+' },
];

export const AIMetricsQuestion: React.FC<MetricsQuestionProps> = ({
  question,
  value,
  onChange,
  error,
  previousSelections,
  questionType,
}) => {
  // Initialize or parse existing value
  const metricsData = typeof value === 'string' ? {} : (value || {});
  const [localData, setLocalData] = React.useState<Record<string, string>>(metricsData);
  const [notes, setNotes] = React.useState(metricsData._notes || '');

  const ranges = questionType === 'time' ? TIME_RANGES : COST_RANGES;

  // Get labels for previous selections
  const getSelectionLabel = (selectionId: string) => {
    // Try to find the label from the previous question
    const previousQuestions = quizData.questions;
    for (const q of previousQuestions) {
      const option = q.options?.find(opt => opt.value === selectionId);
      if (option) return option.label;
    }
    return selectionId;
  };

  const handleRangeSelect = (itemId: string, rangeValue: string) => {
    const newData = {
      ...localData,
      [itemId]: rangeValue,
    };
    
    if (notes) {
      newData._notes = notes;
    }
    
    setLocalData(newData);
    onChange(newData);
  };

  const handleNotesChange = (newNotes: string) => {
    setNotes(newNotes);
    const newData = {
      ...localData,
      _notes: newNotes,
    };
    onChange(newData);
  };

  // Check if all items have been quantified
  const allQuantified = previousSelections.every(id => localData[id]);
  const quantifiedCount = previousSelections.filter(id => localData[id]).length;

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Progress indicator */}
      <div className="mb-4 text-center">
        <p className="text-sm text-gray-600">
          Quantified {quantifiedCount} of {previousSelections.length} items
        </p>
        {allQuantified && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-green-600 mt-1"
          >
            ✓ All items quantified!
          </motion.p>
        )}
      </div>

      {/* Subtitle with FTE explanation */}
      <div className="mb-4">
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic text-center">
          {questionType === 'time' 
            ? 'FTE = Full-Time Equivalent (1 FTE = 40 hrs/week). Think total team hours across all staff.'
            : 'Estimate monthly impact including direct costs, lost opportunities, and inefficiencies.'
          }
        </p>
      </div>

      {/* Metrics selection grid */}
      <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto">
        {previousSelections.map((selectionId, index) => {
          const label = getSelectionLabel(selectionId);
          const selectedValue = localData[selectionId];
          
          return (
            <motion.div
              key={selectionId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`border border-gray-200 rounded-lg p-3 bg-white ${
                selectedValue ? 'shadow-md border-blue-400' : 'shadow-sm'
              }`}
            >
              <div className="mb-2">
                <p className="text-sm sm:text-base font-semibold text-gray-800 leading-tight">
                  {label}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {ranges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => handleRangeSelect(selectionId, range.value)}
                    className={`
                      px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium
                      border rounded transition-all
                      ${selectedValue === range.value
                        ? 'bg-gray-800 text-white border-gray-800'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                      }
                    `}
                  >
                    {range.displayLabel}
                  </button>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Optional notes field */}
      <div className="mt-4">
        <label className="block text-xs sm:text-sm text-gray-600 mb-2">
          Additional context (optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => handleNotesChange(e.target.value)}
          placeholder="Any additional details about these estimates..."
          maxLength={200}
          rows={2}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:border-gray-500 focus:outline-none resize-none"
        />
      </div>

      {/* Error message */}
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