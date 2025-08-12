// Quiz Question Types
export type QuestionType = 'single-select' | 'multi-select' | 'text' | 'textarea';

// Question Option Interface
export interface QuestionOption {
  value: string;
  label: string;
  description?: string;
  examples?: string;
  icon?: string;
  points?: number;
  aiCategory?: string;
  salesPriority?: 'high' | 'medium' | 'low';
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
  aiCategory?: string;
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
  // Existing fields that map to new questions
  industry?: string;              // q1
  efficiencyRating?: string;      // q2
  companySize?: string;           // q3
  repetitiveTasks?: string[];     // q4
  customerExperienceIssues?: string[]; // q5
  moneyLeaks?: string[];          // q6
  growthBottlenecks?: string[];   // q7
  currentSystems?: string[];      // q8
  desiredOutcome?: string[];     // q9
  pastAttempts?: string[];        // q10
  teamCapability?: string;        // q11
  monthlyBudget?: string;         // q12
  timeline?: string;              // q13
  additionalContext?: string;     // q14
  
  // Old fields (will be undefined, kept for backward compatibility)
  customerCommunication?: string;
  revenueOptimization?: string;
  dataDecisionMaking?: string;
  qualityConsistency?: string;
  responseSpeed?: string;
  businessObjectives?: string[];
  costImpact?: string;
  integrationChallenges?: string;
  aiExperience?: string;
  decisionAuthority?: string;
}

// Database Models
export interface QuizResponse {
  id: string;
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  userCompany?: string;
  responses: QuizResponseData;
  industry?: string;
  companySize?: string;
  startedAt: Date;
  completedAt?: Date;
  createdAt: Date;
}

import { ProblemAnalysis, ToolResearch, CuratedTools, FinalReport } from './ai-analysis-new';

export interface AIReport {
  id: string;
  quizResponseId: string;
  problemAnalysis?: ProblemAnalysis;
  toolResearch?: ToolResearch;
  curatedTools?: CuratedTools;
  finalReport?: FinalReport;
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

// Quiz Status Response
export interface QuizStatusResponse {
  status: 'pending' | 'processing' | 'completed' | 'error';
  stage?: string;
  reportId?: string;
  accessToken?: string;
  reportContent?: any;
  error?: string;
  message?: string;
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

// Form Validation Schemas (for use with Zod)
export interface EmailCaptureFormData {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
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
  generatedAt: Date;
}

// Processing Screen Props
export interface ProcessingScreenProps {
  stage: 'analyzing' | 'generating' | 'complete';
  estimatedTime?: number;
}