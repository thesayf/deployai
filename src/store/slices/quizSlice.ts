import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizState, UserInfo, QuizResponseData } from '@/types/quiz';

// Load state from localStorage
const loadState = (): Partial<QuizState> => {
  if (typeof window === 'undefined') return {};
  
  try {
    const serializedState = localStorage.getItem('quizState');
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading quiz state from localStorage:', err);
    return {};
  }
};

// Save state to localStorage
const saveState = (state: QuizState) => {
  if (typeof window === 'undefined') return;
  
  try {
    const serializedState = JSON.stringify({
      userInfo: state.userInfo,
      currentStep: state.currentStep,
      responses: state.responses,
      quizId: state.quizId,
    });
    localStorage.setItem('quizState', serializedState);
  } catch (err) {
    console.error('Error saving quiz state to localStorage:', err);
  }
};

// Initial state - don't load from localStorage during SSR
const getInitialState = (): QuizState => {
  const baseState: QuizState = {
    userInfo: null,
    quizId: null,
    currentStep: 1,
    responses: {},
    totalScore: 0, // Not used in AI assessment but required by interface
    isModalOpen: false,
    isSubmitting: false,
    processingStage: null,
    reportId: null,
    reportContent: null,
    error: null,
  };
  
  // Only load from localStorage on client side
  if (typeof window !== 'undefined') {
    return { ...baseState, ...loadState() };
  }
  
  return baseState;
};

const initialState = getInitialState();

// Quiz slice
const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    // Modal actions
    openEmailModal: (state) => {
      state.isModalOpen = true;
    },
    closeEmailModal: (state) => {
      state.isModalOpen = false;
    },
    
    // User info actions
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      saveState(state);
    },
    
    // Quiz navigation
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
      saveState(state);
    },
    nextStep: (state) => {
      if (state.currentStep < 17) {
        state.currentStep += 1;
        saveState(state);
      }
    },
    previousStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
        saveState(state);
      }
    },
    
    // Response management
    saveResponse: (state, action: PayloadAction<{ questionId: string; answer: any }>) => {
      const { questionId, answer } = action.payload;
      // Store responses with the actual question ID as key
      // This ensures consistency with what the API expects
      (state.responses as any)[questionId] = answer;
      saveState(state);
    },
    
    // Quiz session management
    setQuizId: (state, action: PayloadAction<string>) => {
      state.quizId = action.payload;
      saveState(state);
    },
    
    // Processing state
    setProcessingStage: (state, action: PayloadAction<QuizState['processingStage']>) => {
      state.processingStage = action.payload;
    },
    
    // Submission state
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    
    // Report management
    setReportId: (state, action: PayloadAction<string>) => {
      state.reportId = action.payload;
    },
    setReportContent: (state, action: PayloadAction<string>) => {
      state.reportContent = action.payload;
    },
    
    // Error handling
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    // Reset quiz
    resetQuiz: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('quizState');
      }
      return initialState;
    },
    
    // Clear progress (but keep user info)
    clearProgress: (state) => {
      state.currentStep = 1;
      state.responses = {};
      state.quizId = null;
      state.error = null;
      saveState(state);
    },
  },
});

// No longer needed - we store responses directly with question IDs

// Export actions
export const {
  openEmailModal,
  closeEmailModal,
  setUserInfo,
  setCurrentStep,
  nextStep,
  previousStep,
  saveResponse,
  setQuizId,
  setProcessingStage,
  setSubmitting,
  setReportId,
  setReportContent,
  setError,
  resetQuiz,
  clearProgress,
} = quizSlice.actions;

// Export reducer
export default quizSlice.reducer;

// Selectors
export const selectQuizState = (state: { quiz: QuizState }) => state.quiz;
export const selectUserInfo = (state: { quiz: QuizState }) => state.quiz.userInfo;
export const selectQuizId = (state: { quiz: QuizState }) => state.quiz.quizId;
export const selectCurrentStep = (state: { quiz: QuizState }) => state.quiz.currentStep;
export const selectResponses = (state: { quiz: QuizState }) => state.quiz.responses;
export const selectIsModalOpen = (state: { quiz: QuizState }) => state.quiz.isModalOpen;
export const selectProcessingStage = (state: { quiz: QuizState }) => state.quiz.processingStage;
export const selectIsSubmitting = (state: { quiz: QuizState }) => state.quiz.isSubmitting;
export const selectReportId = (state: { quiz: QuizState }) => state.quiz.reportId;
export const selectError = (state: { quiz: QuizState }) => state.quiz.error;