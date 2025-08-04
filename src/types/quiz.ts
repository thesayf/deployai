// Quiz Question Types
export type QuestionType = 'single-select' | 'multi-select' | 'text' | 'textarea';
export type ScoringType = 'points' | 'contextual';

// Question Option Interface
export interface QuestionOption {
  value: string;
  label: string;
  description?: string;
  examples?: string;
  icon?: string;
  points?: number;
  aiCategory?: string;
  integrationComplexity?: string;
}

// Quiz Question Interface
export interface QuizQuestion {
  id: string;
  questionNumber: number;
  title: string;
  subtitle?: string;
  type: QuestionType;
  options?: QuestionOption[];
  maxSelections?: number;
  minSelections?: number;
  required: boolean;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  validation?: string;
  scoring: {
    type: ScoringType;
    values?: Record<string, number>;
  };
  aiAnalysis?: string;
}

// User Information
export interface UserInfo {
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
}

// Quiz Response Data
export interface QuizResponseData {
  // Q1-5
  industry?: string;
  companySize?: string;
  businessObjectives?: string[];
  biggestChallenge?: string;
  problemAreas?: string[];
  
  // Q6-10
  costImpact?: string;
  manualWork?: string;
  decisionMaking?: string;
  currentSystems?: string[];
  integrationChallenges?: string;
  
  // Q11-15
  aiFocus?: string;
  aiExperience?: string;
  teamSkills?: string;
  budget?: string;
  timeline?: string;
  
  // Q16-17
  successMetrics?: string;
  leadership?: string;
}

// Score Categories (Updated ranges: 60-85, 40-59, 15-39)
export type ScoreCategory = 'High AI Readiness' | 'Medium AI Readiness' | 'Early Stage';

// Database Models
export interface QuizResponse {
  id: string;
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  userCompany?: string;
  responses: QuizResponseData;
  totalScore: number;
  industry?: string;
  companySize?: string;
  startedAt: Date;
  completedAt?: Date;
  createdAt: Date;
}

export interface AIReport {
  id: string;
  quizResponseId: string;
  stage1Analysis?: {
    industryLandscape: string;
    readinessAssessment: string;
    keyOpportunities: string[];
    riskFactors: string[];
    technologyRecommendations: string[];
    competitivePositioning: string;
  };
  stage2Report?: string; // HTML content
  reportStatus: 'generating' | 'completed' | 'failed';
  accessToken: string;
  createdAt: Date;
  updatedAt: Date;
}

// Redux State
export interface QuizState {
  // User Information
  userInfo: UserInfo | null;
  
  // Quiz Progress
  quizId: string | null;
  currentStep: number;
  responses: Partial<QuizResponseData>;
  totalScore: number;
  
  // UI State
  isModalOpen: boolean;
  isSubmitting: boolean;
  processingStage: 'analyzing' | 'generating' | 'complete' | null;
  
  // Report Data
  reportId: string | null;
  reportContent: string | null;
  
  // Error Handling
  error: string | null;
}

// API Request/Response Types
export interface StartQuizRequest {
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
}

export interface StartQuizResponse {
  success: boolean;
  quizId: string;
  error?: string;
}

export interface SaveProgressRequest {
  quizId: string;
  questionId: string;
  answer: any;
}

export interface SaveProgressResponse {
  success: boolean;
  error?: string;
}

export interface SubmitQuizRequest {
  quizId: string;
  finalResponses: QuizResponseData;
}

export interface SubmitQuizResponse {
  success: boolean;
  reportId: string;
  processingTime: string;
  error?: string;
}

export interface GenerateReportRequest {
  quizResponseId: string;
}

export interface GenerateReportResponse {
  success: boolean;
  reportId: string;
  accessToken: string;
  error?: string;
}

export interface ReportStatusResponse {
  status: 'generating' | 'completed' | 'failed';
  reportContent?: string;
  error?: string;
}

// Scoring Helpers
export interface ScoreCalculation {
  totalScore: number;
  category: ScoreCategory;
  breakdown: {
    questionId: string;
    score: number;
  }[];
}

// Score Range Configuration
export const SCORE_RANGES = {
  HIGH: { min: 60, max: 85, label: 'High AI Readiness' },
  MEDIUM: { min: 40, max: 59, label: 'Medium AI Readiness' },
  EARLY: { min: 15, max: 39, label: 'Early Stage' }
} as const;

// Form Validation Schemas (for use with Zod)
export interface EmailCaptureFormData {
  email: string;
  firstName: string;
  projectName: string;
}

// Quiz Navigation
export interface QuizNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

// Report Display Props
export interface ReportViewerProps {
  reportContent: string;
  userInfo: UserInfo;
  score: number;
  generatedAt: Date;
}

// Processing Screen Props
export interface ProcessingScreenProps {
  stage: 'analyzing' | 'generating' | 'complete';
  estimatedTime?: number;
}

// Score Display Props
export interface ScoreDisplayProps {
  score: number;
  maxScore: number;
  category: ScoreCategory;
  description: string;
}