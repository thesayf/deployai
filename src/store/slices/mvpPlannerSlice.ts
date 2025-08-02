import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MVPPlannerState, MVPPlannerUserInfo, MVPPlannerResponseData } from '@/types/mvp-planner';

// Load state from localStorage
const loadState = (): Partial<MVPPlannerState> => {
  if (typeof window === 'undefined') return {};
  
  try {
    const serializedState = localStorage.getItem('mvpPlannerState');
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading MVP planner state from localStorage:', err);
    return {};
  }
};

// Save state to localStorage
const saveState = (state: MVPPlannerState) => {
  if (typeof window === 'undefined') return;
  
  try {
    const serializedState = JSON.stringify({
      userInfo: state.userInfo,
      currentStep: state.currentStep,
      responses: state.responses,
      quizId: state.quizId,
    });
    localStorage.setItem('mvpPlannerState', serializedState);
  } catch (err) {
    console.error('Error saving MVP planner state to localStorage:', err);
  }
};

// Initial state - don't load from localStorage during SSR
const getInitialState = (): MVPPlannerState => {
  const baseState: MVPPlannerState = {
    userInfo: null,
    quizId: null,
    currentStep: 1,
    responses: {},
    totalScore: 0,
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

// MVP Planner slice
const mvpPlannerSlice = createSlice({
  name: 'mvpPlanner',
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
    setUserInfo: (state, action: PayloadAction<MVPPlannerUserInfo>) => {
      state.userInfo = action.payload;
      saveState(state);
    },
    
    // Quiz navigation
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
      saveState(state);
    },
    nextStep: (state) => {
      // This will be dynamic based on your question count
      state.currentStep += 1;
      saveState(state);
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
      state.responses[questionId] = answer;
      saveState(state);
    },
    
    // Quiz session management
    setQuizId: (state, action: PayloadAction<string>) => {
      state.quizId = action.payload;
      saveState(state);
    },
    
    // Score management
    updateScore: (state, action: PayloadAction<number>) => {
      state.totalScore = action.payload;
    },
    
    // Processing state
    setProcessingStage: (state, action: PayloadAction<MVPPlannerState['processingStage']>) => {
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
        localStorage.removeItem('mvpPlannerState');
      }
      return initialState;
    },
    
    // Clear progress (but keep user info)
    clearProgress: (state) => {
      state.currentStep = 1;
      state.responses = {};
      state.totalScore = 0;
      state.quizId = null;
      state.error = null;
      saveState(state);
    },
  },
});

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
  updateScore,
  setProcessingStage,
  setSubmitting,
  setReportId,
  setReportContent,
  setError,
  resetQuiz,
  clearProgress,
} = mvpPlannerSlice.actions;

// Export reducer
export default mvpPlannerSlice.reducer;

// Selectors
export const selectMVPPlannerState = (state: { mvpPlanner: MVPPlannerState }) => state.mvpPlanner;
export const selectUserInfo = (state: { mvpPlanner: MVPPlannerState }) => state.mvpPlanner.userInfo;
export const selectQuizId = (state: { mvpPlanner: MVPPlannerState }) => state.mvpPlanner.quizId;
export const selectCurrentStep = (state: { mvpPlanner: MVPPlannerState }) => state.mvpPlanner.currentStep;
export const selectResponses = (state: { mvpPlanner: MVPPlannerState }) => state.mvpPlanner.responses;
export const selectTotalScore = (state: { mvpPlanner: MVPPlannerState }) => state.mvpPlanner.totalScore;
export const selectIsModalOpen = (state: { mvpPlanner: MVPPlannerState }) => state.mvpPlanner.isModalOpen;
export const selectProcessingStage = (state: { mvpPlanner: MVPPlannerState }) => state.mvpPlanner.processingStage;
export const selectIsSubmitting = (state: { mvpPlanner: MVPPlannerState }) => state.mvpPlanner.isSubmitting;
export const selectReportId = (state: { mvpPlanner: MVPPlannerState }) => state.mvpPlanner.reportId;
export const selectError = (state: { mvpPlanner: MVPPlannerState }) => state.mvpPlanner.error;