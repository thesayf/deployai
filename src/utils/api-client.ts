import { 
  StartQuizRequest, 
  StartQuizResponse, 
  SaveProgressRequest, 
  SaveProgressResponse,
  SubmitQuizRequest,
  SubmitQuizResponse,
  QuizStatusResponse,
  QuizResponseData
} from '@/types/quiz';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchWithError(url: string, options?: RequestInit) {
  const response = await fetch(url, options);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new ApiError(response.status, error.error || 'Request failed');
  }
  
  return response.json();
}

export const quizApi = {
  /**
   * Start a new quiz session
   */
  async startQuiz(data: StartQuizRequest): Promise<StartQuizResponse> {
    return fetchWithError('/api/quiz/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },

  /**
   * Save progress for a question
   */
  async saveProgress(data: SaveProgressRequest): Promise<SaveProgressResponse> {
    return fetchWithError('/api/quiz/save-progress', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },

  /**
   * Submit the completed quiz
   */
  async submitQuiz(quizId: string, finalResponses: QuizResponseData): Promise<SubmitQuizResponse> {
    return fetchWithError('/api/quiz/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quizId,
        finalResponses,
      } as SubmitQuizRequest),
    });
  },

  /**
   * Check quiz and report status
   */
  async checkStatus(quizId: string): Promise<QuizStatusResponse> {
    return fetchWithError(`/api/quiz/status/${quizId}`);
  },

  /**
   * Poll for report completion
   */
  async pollForReport(
    quizId: string, 
    options: {
      interval?: number;
      maxAttempts?: number;
      onProgress?: (status: QuizStatusResponse) => void;
    } = {}
  ): Promise<QuizStatusResponse> {
    const { 
      interval = 5000, // 5 seconds
      maxAttempts = 36, // 3 minutes max
      onProgress 
    } = options;

    let attempts = 0;

    const poll = async (): Promise<QuizStatusResponse> => {
      attempts++;
      
      try {
        const status = await this.checkStatus(quizId);
        
        if (onProgress) {
          onProgress(status);
        }

        if (status.status === 'completed' || status.status === 'error') {
          return status;
        }

        if (attempts >= maxAttempts) {
          throw new Error('Report generation timed out');
        }

        // Wait and poll again
        await new Promise(resolve => setTimeout(resolve, interval));
        return poll();
      } catch (error) {
        if (attempts >= maxAttempts) {
          throw error;
        }
        // Retry on network errors
        await new Promise(resolve => setTimeout(resolve, interval));
        return poll();
      }
    };

    return poll();
  }
};

/**
 * Format API errors for display
 */
export function formatApiError(error: unknown): string {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 400:
        return error.message || 'Invalid request. Please check your input.';
      case 404:
        return 'The requested resource was not found.';
      case 500:
        return 'A server error occurred. Please try again later.';
      default:
        return error.message || 'An unexpected error occurred.';
    }
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred.';
}

/**
 * Retry failed API calls with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    initialDelay?: number;
    maxDelay?: number;
    shouldRetry?: (error: unknown) => boolean;
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    shouldRetry = (error) => {
      if (error instanceof ApiError) {
        return error.status >= 500 || error.status === 429;
      }
      return true;
    }
  } = options;

  let lastError: unknown;
  let delay = initialDelay;

  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (i === maxRetries || !shouldRetry(error)) {
        throw error;
      }

      // Wait with exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay));
      delay = Math.min(delay * 2, maxDelay);
    }
  }

  throw lastError;
}