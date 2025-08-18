import quizData from '@/data/quiz-questions.json';
import { QuizQuestion } from '@/types/quiz';

// Debug: Log the number of questions loaded
if (typeof window !== 'undefined') {
  console.log('[Quiz] Loaded questions from JSON:', quizData.questions.length);
  console.log('[Quiz] Question IDs:', quizData.questions.map(q => `${q.questionNumber}: ${q.id}`));
}

/**
 * Get question by step number
 */
export function getQuestionByStep(step: number): QuizQuestion | undefined {
  const question = quizData.questions.find(q => q.questionNumber === step) as QuizQuestion | undefined;
  if (typeof window !== 'undefined') {
    console.log(`[Quiz] Getting question for step ${step}:`, question ? question.id : 'NOT FOUND');
  }
  return question;
}

/**
 * Get question by ID
 */
export function getQuestionById(id: string): QuizQuestion | undefined {
  return quizData.questions.find(q => q.id === id) as QuizQuestion | undefined;
}

/**
 * Calculate progress percentage
 */
export function calculateProgress(currentStep: number, totalSteps: number = 13): number {
  return Math.round((currentStep / totalSteps) * 100);
}

/**
 * Estimate completion time based on current progress
 */
export function estimateCompletionTime(currentStep: number, totalSteps: number = 13): string {
  const remainingSteps = totalSteps - currentStep;
  const avgTimePerQuestion = 20; // seconds
  const totalSeconds = remainingSteps * avgTimePerQuestion;
  
  if (totalSeconds < 60) {
    return 'Less than 1 minute';
  } else {
    const minutes = Math.ceil(totalSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }
}

/**
 * Validate response based on question requirements
 */
export function validateResponse(questionId: string, response: any): { valid: boolean; error?: string } {
  const question = quizData.questions.find(q => q.id === questionId);
  
  if (!question) {
    return { valid: false, error: 'Question not found' };
  }

  // Check if required
  if (question.required && (response === undefined || response === null || response === '')) {
    return { valid: false, error: 'This field is required' };
  }
  
  // If not required and empty, it's valid
  if (!question.required && (response === undefined || response === null || response === '')) {
    return { valid: true };
  }

  // Type-specific validation
  switch (question.type) {
    case 'text':
      if (typeof response !== 'string') {
        return { valid: false, error: 'Invalid response type' };
      }
      if (question.minLength && response.length < question.minLength) {
        return { valid: false, error: `Minimum ${question.minLength} characters required` };
      }
      if (question.maxLength && response.length > question.maxLength) {
        return { valid: false, error: `Maximum ${question.maxLength} characters allowed` };
      }
      break;

    case 'textarea':
      // Handle both string (legacy) and object (metrics) formats
      if (questionId === 'weeklyTimeBreakdown' || questionId === 'monthlyCostBreakdown') {
        // Metrics questions - accept object with at least one selection (excluding _notes)
        if (typeof response === 'object' && response !== null) {
          const hasSelections = Object.keys(response).some(key => key !== '_notes' && response[key] && response[key] !== 'none' && response[key] !== '$0');
          if (!hasSelections) {
            return { valid: false, error: 'Please quantify at least one item' };
          }
          return { valid: true };
        } else if (typeof response === 'string') {
          // Legacy text format - still valid
          if (question.minLength && response.length < question.minLength) {
            return { valid: false, error: `Minimum ${question.minLength} characters required` };
          }
          return { valid: true };
        }
        return { valid: false, error: 'Invalid response format' };
      } else {
        // Regular textarea questions
        if (typeof response !== 'string') {
          return { valid: false, error: 'Invalid response type' };
        }
        if (question.minLength && response.length < question.minLength) {
          return { valid: false, error: `Minimum ${question.minLength} characters required` };
        }
        if (question.maxLength && response.length > question.maxLength) {
          return { valid: false, error: `Maximum ${question.maxLength} characters allowed` };
        }
      }
      break;

    case 'multi-select':
      if (!Array.isArray(response)) {
        return { valid: false, error: 'Invalid response type' };
      }
      if (question.minSelections && response.length < question.minSelections) {
        return { valid: false, error: `Please select at least ${question.minSelections} option${question.minSelections > 1 ? 's' : ''}` };
      }
      if (question.maxSelections && response.length > question.maxSelections) {
        return { valid: false, error: `Please select no more than ${question.maxSelections} option${question.maxSelections > 1 ? 's' : ''}` };
      }
      break;

    case 'single-select':
      if (typeof response !== 'string') {
        return { valid: false, error: 'Invalid response type' };
      }
      const validOption = question.options?.some(opt => opt.value === response);
      if (!validOption) {
        return { valid: false, error: 'Please select a valid option' };
      }
      break;
  }

  return { valid: true };
}

/**
 * Format response for display
 */
export function formatResponseForDisplay(questionId: string, response: any): string {
  const question = getQuestionById(questionId);
  
  if (!question) return '';

  switch (question.type) {
    case 'single-select':
      const option = question.options?.find(opt => opt.value === response);
      return option?.label || response;

    case 'multi-select':
      if (Array.isArray(response)) {
        return response
          .map(value => {
            const opt = question.options?.find(o => o.value === value);
            return opt?.label || value;
          })
          .join(', ');
      }
      return '';

    case 'text':
    case 'textarea':
      return response || '';

    default:
      return String(response);
  }
}