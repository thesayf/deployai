// MVP Planner specific types

export interface MVPPlannerUserInfo {
  email: string;
  firstName: string;
  projectName: string;
}

export interface MVPPlannerResponseData {
  [key: string]: any; // Flexible to accommodate your custom questions
}

export interface MVPPlannerQuizResponse {
  id: string;
  user_email: string;
  user_first_name: string;
  user_last_name: string;
  user_company?: string;
  responses: MVPPlannerResponseData;
  total_score?: number;
  started_at: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface MVPPlannerReport {
  id: string;
  mvp_planner_response_id: string;
  report_content?: string;
  report_status: 'pending' | 'generating' | 'completed' | 'failed';
  access_token: string;
  email_sent_at?: string;
  created_at: string;
  updated_at: string;
}

export interface MVPPlannerState {
  userInfo: MVPPlannerUserInfo | null;
  quizId: string | null;
  currentStep: number;
  responses: MVPPlannerResponseData;
  totalScore: number;
  isModalOpen: boolean;
  isSubmitting: boolean;
  processingStage: 'submitting' | 'generating' | 'complete' | null;
  reportId: string | null;
  reportContent: string | null;
  error: string | null;
}

// API Request/Response types
export interface StartMVPPlannerRequest {
  email: string;
  firstName: string;
  projectName: string;
}

export interface StartMVPPlannerResponse {
  success: boolean;
  quizId: string;
  error?: string;
}

export interface SaveMVPPlannerProgressRequest {
  quizId: string;
  questionId: string;
  answer: any;
}

export interface SaveMVPPlannerProgressResponse {
  success: boolean;
  error?: string;
}

export interface SubmitMVPPlannerRequest {
  quizId: string;
  responses: MVPPlannerResponseData;
  totalScore: number;
}

export interface SubmitMVPPlannerResponse {
  success: boolean;
  reportId?: string;
  accessToken?: string;
  error?: string;
}

// Question types (same structure as AI assessment)
export type MVPPlannerQuestionType = 'single-select' | 'multi-select' | 'text' | 'textarea';

export interface MVPPlannerQuestionOption {
  value: string;
  label: string;
  description?: string;
  points?: number;
}

export interface MVPPlannerQuestion {
  id: string;
  questionNumber: number;
  title: string;
  subtitle?: string;
  type: MVPPlannerQuestionType;
  required: boolean;
  options?: MVPPlannerQuestionOption[];
  maxLength?: number;
  minLength?: number;
  maxSelections?: number;
  minSelections?: number;
  placeholder?: string;
  validation?: string;
  scoring?: {
    type: 'points' | 'contextual';
  };
}

export interface MVPPlannerEmailCaptureFormData {
  email: string;
  firstName: string;
  projectName: string;
}