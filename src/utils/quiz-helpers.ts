import quizData from '@/data/quiz-questions.json';

/**
 * Get question by step number
 */
export function getQuestionByStep(step: number) {
  return quizData.questions.find(q => q.questionNumber === step);
}

/**
 * Get question by ID
 */
export function getQuestionById(id: string) {
  return quizData.questions.find(q => q.id === id);
}

/**
 * Calculate progress percentage
 */
export function calculateProgress(currentStep: number, totalSteps: number = 17): number {
  return Math.round((currentStep / totalSteps) * 100);
}

/**
 * Estimate completion time based on current progress
 */
export function estimateCompletionTime(currentStep: number, totalSteps: number = 17): string {
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

  // Type-specific validation
  switch (question.type) {
    case 'text':
    case 'textarea':
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