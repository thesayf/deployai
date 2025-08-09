import { QuizResponseData, ScoreCalculation, ScoreCategory, SCORE_RANGES, QuizQuestion } from '@/types/quiz';
import quizData from '@/data/quiz-questions.json';

/**
 * Calculate the total score from quiz responses
 */
export function calculateQuizScore(responses: QuizResponseData): ScoreCalculation {
  const breakdown: { questionId: string; score: number }[] = [];
  let totalScore = 0;

  // Process each question
  quizData.questions.forEach((question) => {
    const response = responses[question.id as keyof QuizResponseData];
    
    if (response === undefined || response === null) {
      return; // Skip unanswered questions
    }

    let questionScore = 0;

    // Skip questions without scoring (AI assessment questions)
    if (!('scoring' in question) || !question.scoring) {
      return; // Use return instead of continue in forEach
    }

    // Type guard to ensure scoring exists and has type property
    const scoring = question.scoring as { type: string; maxPoints?: number };
    
    switch (scoring.type) {
      case 'points':
        if (question.type === 'single-select') {
          // Find the selected option and get its points
          const selectedOption = question.options?.find(opt => opt.value === response);
          if (selectedOption && 'points' in selectedOption && selectedOption.points) {
            questionScore = selectedOption.points as number;
          }
        } else if (question.type === 'multi-select' && Array.isArray(response)) {
          // Sum points for all selected options
          response.forEach((value: string) => {
            const option = question.options?.find(opt => opt.value === value);
            if (option && 'points' in option && option.points) {
              questionScore += option.points as number;
            }
          });
        }
        break;

      case 'contextual':
        // Contextual scoring is handled by AI analysis
        // No points awarded here
        questionScore = 0;
        break;
    }

    if (questionScore > 0) {
      breakdown.push({ questionId: question.id, score: questionScore });
      totalScore += questionScore;
    }
  });

  // Determine category based on score
  const category = getScoreCategory(totalScore);

  return {
    totalScore,
    category,
    breakdown
  };
}

/**
 * Determine the score category based on total score
 */
export function getScoreCategory(totalScore: number): ScoreCategory {
  if (totalScore >= SCORE_RANGES.HIGH.min && totalScore <= SCORE_RANGES.HIGH.max) {
    return 'High AI Readiness';
  } else if (totalScore >= SCORE_RANGES.MEDIUM.min && totalScore <= SCORE_RANGES.MEDIUM.max) {
    return 'Medium AI Readiness';
  } else {
    return 'Early Stage';
  }
}

/**
 * Get a descriptive message for the score category
 */
export function getScoreCategoryDescription(category: ScoreCategory): string {
  switch (category) {
    case 'High AI Readiness':
      return 'Your organization is well-positioned for AI transformation with strong foundations in place.';
    case 'Medium AI Readiness':
      return 'Your organization has good potential for AI adoption with some areas needing development.';
    case 'Early Stage':
      return 'Your organization is in the early stages of AI readiness. We\'ll help you build a strong foundation.';
    default:
      return '';
  }
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
 * Get question by step number
 */
export function getQuestionByStep(step: number): QuizQuestion | undefined {
  return quizData.questions.find(q => q.questionNumber === step) as QuizQuestion | undefined;
}

/**
 * Get question by ID
 */
export function getQuestionById(id: string) {
  return quizData.questions.find(q => q.id === id);
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