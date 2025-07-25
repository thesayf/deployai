# Technical Requirements Document: AI Business Quiz Integration

## Document Information

**Document Type:** Technical Requirements Document (TRD)  
**Version:** 1.0  
**Integration Target:** deployAI Studio Website  
**Based on PRD:** AI Business Quiz Integration v1.0  
**Created:** July 2025  
**Last Updated:** July 2025

---

## Table of Contents

1. [Integration Architecture](#integration-architecture)
2. [Technology Stack Extensions](#technology-stack-extensions)
3. [Database Schema Extensions](#database-schema-extensions)
4. [New Component Architecture](#new-component-architecture)
5. [API Specifications](#api-specifications)
6. [State Management Integration](#state-management-integration)
7. [AI Integration Specifications](#ai-integration-specifications)
8. [Email Integration Extensions](#email-integration-extensions)
9. [Development Workflow Integration](#development-workflow-integration)
10. [Testing Strategy](#testing-strategy)
11. [Performance Requirements](#performance-requirements)
12. [Integration Deployment](#integration-deployment)

---

## Integration Architecture

### High-Level Integration Diagram

```
Existing deployAI Studio
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌─ Existing Routes ─┐    ┌─── New AI Quiz Routes ───┐     │
│  │ /                 │    │ /ai-assessment           │     │
│  │ /ai.tsx           │    │ /ai-assessment/quiz/[n]  │     │
│  │ /automation.tsx   │    │ /ai-assessment/processing │     │
│  │ /blog/*           │    │ /ai-assessment/complete   │     │
│  └───────────────────┘    │ /report/[token]          │     │
│                           └──────────────────────────┘     │
│                                                             │
│  ┌─ Existing Components ─┐  ┌─── New Quiz Components ──┐   │
│  │ Button.tsx            │  │ QuestionCard            │   │
│  │ SectionHeading.tsx    │  │ ProgressBar             │   │
│  │ SectionSubheading.tsx │  │ EmailCaptureModal       │   │
│  │ 40+ other components  │  │ ProcessingScreen        │   │
│  └───────────────────────┘  │ ScoreDisplay            │   │
│                              │ ReportViewer            │   │
│                              │ AssessmentLanding       │   │
│                              └─────────────────────────┘   │
│                                                             │
│  ┌─ Existing Infrastructure ──────────────────────────┐     │
│  │ ✅ Supabase (configured)                          │     │
│  │ ✅ Resend (configured)                            │     │
│  │ ✅ Tailwind + Design System                       │     │
│  │ ✅ Storybook                                      │     │
│  │ ✅ TypeScript + Next.js                           │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─ New External Services ─┐
                    │ Claude Sonnet 4 API     │
                    │ (Anthropic)             │
                    └─────────────────────────┘
```

### Integration Points

**Leverage Existing:**
- Supabase database connection and configuration
- Resend email service and templates  
- Design system (colors, typography, components)
- Next.js routing and API structure
- Storybook component development workflow
- TypeScript configuration and build process

**Add New:**
- 7 quiz-specific components
- 4 API endpoints for quiz functionality
- Claude AI integration for report generation
- Redux store for quiz state management
- Database schema extensions (2 new tables)

---

## Technology Stack Extensions

### New Dependencies Required

```json
{
  "dependencies": {
    "@reduxjs/toolkit": "^2.0.0",
    "react-redux": "^9.0.0",
    "react-hook-form": "^7.47.0",
    "@hookform/resolvers": "^3.3.0", 
    "zod": "^3.22.0",
    "@anthropic-ai/sdk": "^0.9.0"
  }
}
```

### Existing Dependencies (Leveraged)
```json
{
  "existing": {
    "next": "14.2.1",
    "react": "^18",
    "typescript": "^5",
    "tailwindcss": "^3.4.1",
    "framer-motion": "^11.0.28",
    "resend": "^4.6.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1"
  }
}
```

### Integration Requirements
- **Node.js**: >= 18.0.0 (existing requirement)
- **TypeScript**: >= 5.0.0 (existing configuration) 
- **Next.js**: 14.2.1 (existing version)
- **Tailwind**: 3.4.1 (existing configuration)

---

## Database Schema Extensions

### Extend Existing Supabase Database

```sql
-- Extension to existing deployAI Supabase database
-- Add these tables to current schema

-- Quiz responses table
CREATE TABLE quiz_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_email TEXT NOT NULL,
    user_first_name TEXT NOT NULL,
    user_last_name TEXT NOT NULL,
    user_company TEXT,
    responses JSONB NOT NULL,
    total_score INTEGER NOT NULL CHECK (total_score >= 15 AND total_score <= 50),
    industry TEXT,
    company_size TEXT,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI reports table
CREATE TABLE ai_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    quiz_response_id UUID REFERENCES quiz_responses(id) ON DELETE CASCADE,
    stage_1_analysis JSONB,
    stage_2_report TEXT,
    report_status TEXT DEFAULT 'generating' CHECK (
        report_status IN ('generating', 'completed', 'failed')
    ),
    access_token TEXT UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Performance indexes
CREATE INDEX idx_quiz_responses_email ON quiz_responses(user_email);
CREATE INDEX idx_quiz_responses_completed ON quiz_responses(completed_at) WHERE completed_at IS NOT NULL;
CREATE INDEX idx_ai_reports_access_token ON ai_reports(access_token);
CREATE INDEX idx_ai_reports_status ON ai_reports(report_status);
CREATE INDEX idx_ai_reports_quiz_response ON ai_reports(quiz_response_id);

-- Updated timestamp trigger function (if not exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Updated timestamp trigger
CREATE TRIGGER update_ai_reports_updated_at 
    BEFORE UPDATE ON ai_reports 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Data Type Specifications

**Quiz Responses JSONB Structure:**
```typescript
interface QuizResponseData {
  1: string;      // Industry (contextual)
  2: string;      // Company size (1-5 points)
  3: string[];    // Primary goals (multi-select, max 3)
  4: string;      // Biggest challenge (contextual)
  5: string[];    // Problem areas (multi-select)
  6: string;      // Manual work percentage (1-5 points)
  7: string;      // Decision making (1-5 points)
  8: string;      // Data setup (1-5 points)
  9: string;      // Tech level (1-5 points)
  10: string;     // AI experience (1-5 points)
  11: string;     // Team skills (1-5 points)
  12: string;     // Budget range (1-5 points)
  13: string;     // Timeline (1-5 points)
  14: string;     // Success vision (contextual)
}
```

**Stage 1 AI Analysis JSONB Structure:**
```typescript
interface Stage1Analysis {
  industry_analysis: string;
  readiness_assessment: string;
  key_opportunities: string[];
  risk_factors: string[];
  market_benchmarks: {
    industry_average_score: number;
    best_practices: string[];
    competitive_advantages: string[];
  };
  technology_recommendations: string[];
  competitive_landscape: string;
  implementation_challenges: string[];
}
```

---

## New Component Architecture

### File Structure Extensions

```
src/
├── components/                    # Existing component directory
│   ├── shared/                   # Existing shared components (reuse)
│   │   ├── Button.tsx           # ✅ Reuse existing
│   │   ├── SectionHeading.tsx   # ✅ Reuse existing
│   │   └── SectionSubheading.tsx # ✅ Reuse existing
│   └── quiz/                    # 🆕 New component directory
│       ├── AssessmentLanding/
│       │   ├── AssessmentLanding.tsx
│       │   ├── AssessmentLanding.stories.tsx
│       │   └── index.ts
│       ├── EmailCaptureModal/
│       │   ├── EmailCaptureModal.tsx
│       │   ├── EmailCaptureModal.stories.tsx
│       │   └── index.ts
│       ├── QuestionCard/
│       │   ├── QuestionCard.tsx
│       │   ├── QuestionCard.stories.tsx
│       │   └── index.ts
│       ├── ProgressBar/
│       │   ├── ProgressBar.tsx
│       │   ├── ProgressBar.stories.tsx
│       │   └── index.ts
│       ├── ProcessingScreen/
│       │   ├── ProcessingScreen.tsx
│       │   ├── ProcessingScreen.stories.tsx
│       │   └── index.ts
│       ├── ScoreDisplay/
│       │   ├── ScoreDisplay.tsx
│       │   ├── ScoreDisplay.stories.tsx
│       │   └── index.ts
│       └── ReportViewer/
│           ├── ReportViewer.tsx
│           ├── ReportViewer.stories.tsx
│           └── index.ts
├── store/                        # 🆕 New Redux store
│   ├── index.ts                 # Store configuration
│   └── slices/
│       └── quizSlice.ts         # Quiz state management
├── lib/                         # Existing lib directory
│   ├── utils.ts                 # ✅ Existing utility functions
│   ├── supabase.ts              # 🆕 Supabase client extensions
│   ├── anthropic.ts             # 🆕 Claude API client
│   └── quiz/
│       ├── questions.ts         # Quiz question definitions
│       ├── scoring.ts           # Scoring algorithm
│       └── validation.ts        # Form validation schemas
├── pages/                       # Existing pages directory
│   ├── ai-assessment/           # 🆕 New quiz routes
│   │   ├── index.tsx           # Landing page
│   │   └── quiz/
│   │       ├── [step].tsx      # Dynamic question pages
│   │       ├── processing.tsx   # AI generation loading
│   │       └── complete.tsx    # Success confirmation
│   ├── report/                  # 🆕 Public report routes
│   │   └── [token].tsx         # Token-based report viewing
│   └── api/                     # Existing API directory
│       └── quiz/                # 🆕 New quiz API endpoints
│           ├── start.ts
│           ├── save-progress.ts
│           ├── submit.ts
│           └── generate-report.ts
└── types/                       # 🆕 New type definitions
    └── quiz.ts                  # Quiz-related TypeScript interfaces
```

### Component Specifications

#### 1. AssessmentLanding Component
```typescript
interface AssessmentLandingProps {
  onStartAssessment: () => void;
}

// Dependencies: 
// - Existing Button component
// - Existing SectionHeading component
// - Existing hero section patterns
```

#### 2. EmailCaptureModal Component
```typescript
interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserRegistrationData) => Promise<void>;
  isLoading?: boolean;
}

// Dependencies:
// - React Portal for modal overlay
// - React Hook Form for form handling
// - Zod for validation
// - Existing Button component
// - Framer Motion for animations
```

#### 3. QuestionCard Component
```typescript
interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  question: QuizQuestion;
  currentAnswer?: QuizAnswer;
  onNext: (answer: QuizAnswer) => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  isSubmitting?: boolean;
}

// Dependencies:
// - Existing Button component
// - Existing SectionHeading component
// - React Hook Form for question validation
// - ProgressBar component
```

#### 4. ProgressBar Component
```typescript
interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
  showSteps?: boolean;
}

// Dependencies:
// - Existing design system colors
// - Tailwind CSS classes
// - Optional Framer Motion for progress animation
```

#### 5. ProcessingScreen Component
```typescript
interface ProcessingScreenProps {
  stage: 'analyzing' | 'generating' | 'complete';
  estimatedTime?: number;
  onComplete?: () => void;
}

// Dependencies:
// - Existing SectionHeading component
// - Framer Motion for animations
// - Optional progress estimation logic
```

#### 6. ScoreDisplay Component
```typescript
interface ScoreDisplayProps {
  score: number;
  maxScore: number;
  category: 'High AI Readiness' | 'Medium AI Readiness' | 'Early Stage';
  description?: string;
  showDetails?: boolean;
}

// Dependencies:
// - Existing gradient color system
// - Existing typography classes
// - Optional chart library for score visualization
```

#### 7. ReportViewer Component
```typescript
interface ReportViewerProps {
  reportContent: string;
  userInfo: {
    firstName: string;
    lastName: string;
    company?: string;
  };
  score: number;
  generatedAt: Date;
  onPrint?: () => void;
  onShare?: () => void;
}

// Dependencies:
// - Existing typography system
// - HTML sanitization library
// - Print CSS styles
// - Optional sharing functionality
```

---

## API Specifications

### New API Endpoints (4 Total)

#### POST /api/quiz/start
```typescript
// Request
interface StartQuizRequest {
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
}

// Response
interface StartQuizResponse {
  success: boolean;
  quizId: string;
  message?: string;
  error?: string;
}

// Implementation Notes:
// - Validate email format and required fields
// - Create new quiz_responses record in Supabase
// - Return quiz ID for subsequent API calls
// - Handle duplicate email scenarios
```

#### PUT /api/quiz/save-progress
```typescript
// Request
interface SaveProgressRequest {
  quizId: string;
  questionNumber: number;
  answer: QuizAnswer;
  currentScore?: number;
}

// Response
interface SaveProgressResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// Implementation Notes:
// - Update responses JSONB field in quiz_responses table
// - Validate question number and answer format
// - Calculate and update running score
// - Handle concurrent updates gracefully
```

#### POST /api/quiz/submit
```typescript
// Request
interface SubmitQuizRequest {
  quizId: string;
  finalResponses: QuizResponseData;
  totalScore: number;
}

// Response
interface SubmitQuizResponse {
  success: boolean;
  reportId: string;
  processingEstimate: string;
  message?: string;
  error?: string;
}

// Implementation Notes:
// - Mark quiz as completed in quiz_responses table
// - Create new ai_reports record with 'generating' status
// - Trigger async report generation process
// - Return report ID and processing estimate
```

#### POST /api/quiz/generate-report
```typescript
// Request (Internal API)
interface GenerateReportRequest {
  reportId: string;
  quizData: QuizResponseData;
  userInfo: UserInfo;
  totalScore: number;
}

// Response
interface GenerateReportResponse {
  success: boolean;
  reportId: string;
  accessToken: string;
  error?: string;
}

// Implementation Notes:
// - Execute two-stage Claude API integration
// - Store stage 1 analysis in stage_1_analysis JSONB field
// - Store final HTML report in stage_2_report TEXT field
// - Update report_status to 'completed' or 'failed'
// - Send email notification via existing Resend setup
```

---

## State Management Integration

### Redux Store Configuration

```typescript
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import quizSlice from './slices/quizSlice';

export const store = configureStore({
  reducer: {
    quiz: quizSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['quiz/setUserInfo', 'quiz/saveResponse'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Quiz Slice Specification

```typescript
// store/slices/quizSlice.ts
interface QuizState {
  // User registration
  userInfo: {
    email: string;
    firstName: string;
    lastName: string;
    company?: string;
  } | null;
  
  // Quiz session
  quizId: string | null;
  currentStep: number;
  responses: Partial<QuizResponseData>;
  totalScore: number;
  
  // UI state
  isModalOpen: boolean;
  isSubmitting: boolean;
  processingStage: 'analyzing' | 'generating' | 'complete' | null;
  
  // Report data
  reportId: string | null;
  reportContent: string | null;
  
  // Error handling
  error: string | null;
}

// Action creators
const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    userInfo: null,
    quizId: null,
    currentStep: 1,
    responses: {},
    totalScore: 15, // Minimum score
    isModalOpen: false,
    isSubmitting: false,
    processingStage: null,
    reportId: null,
    reportContent: null,
    error: null,
  } as QuizState,
  reducers: {
    // Modal management
    openEmailModal: (state) => {
      state.isModalOpen = true;
      state.error = null;
    },
    closeEmailModal: (state) => {
      state.isModalOpen = false;
    },
    
    // User registration
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      state.isModalOpen = false;
    },
    
    // Quiz navigation
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = Math.max(1, Math.min(14, action.payload));
    },
    nextStep: (state) => {
      if (state.currentStep < 14) state.currentStep += 1;
    },
    previousStep: (state) => {
      if (state.currentStep > 1) state.currentStep -= 1;
    },
    
    // Response management
    saveResponse: (state, action: PayloadAction<{ questionNumber: number; answer: QuizAnswer }>) => {
      const { questionNumber, answer } = action.payload;
      state.responses[questionNumber as keyof QuizResponseData] = answer;
    },
    updateScore: (state, action: PayloadAction<number>) => {
      state.totalScore = Math.max(15, Math.min(50, action.payload));
    },
    
    // Quiz session
    setQuizId: (state, action: PayloadAction<string>) => {
      state.quizId = action.payload;
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    
    // Processing states
    setProcessingStage: (state, action: PayloadAction<'analyzing' | 'generating' | 'complete' | null>) => {
      state.processingStage = action.payload;
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
    clearError: (state) => {
      state.error = null;
    },
    
    // Reset functionality
    resetQuiz: (state) => {
      state.currentStep = 1;
      state.responses = {};
      state.totalScore = 15;
      state.quizId = null;
      state.isSubmitting = false;
      state.processingStage = null;
      state.error = null;
    },
    resetAll: () => {
      return initialState;
    },
  },
});
```

---

## AI Integration Specifications

### Claude Sonnet 4 Integration

#### Anthropic Client Configuration
```typescript
// lib/anthropic.ts
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

interface AIAnalysisRequest {
  responses: QuizResponseData;
  userInfo: UserInfo;
  totalScore: number;
}

interface Stage1Analysis {
  industry_analysis: string;
  readiness_assessment: string;
  key_opportunities: string[];
  risk_factors: string[];
  market_benchmarks: object;
  technology_recommendations: string[];
  competitive_landscape: string;
  implementation_challenges: string[];
}
```

#### Stage 1: Business Analysis (15-30 seconds)
```typescript
export async function generateBusinessAnalysis(data: AIAnalysisRequest): Promise<Stage1Analysis> {
  const prompt = `
You are an expert AI business consultant analyzing a company's AI readiness assessment.

BUSINESS CONTEXT:
- Industry: ${data.responses[1]}
- Company Size: ${data.responses[2]} 
- AI Readiness Score: ${data.totalScore}/50
- Primary Challenge: ${data.responses[4]}
- Success Vision: ${data.responses[14]}

COMPLETE ASSESSMENT DATA:
${JSON.stringify(data.responses, null, 2)}

Provide a comprehensive business analysis in the following JSON structure:

{
  "industry_analysis": "Detailed analysis of AI adoption trends and opportunities in this industry",
  "readiness_assessment": "Assessment of the company's current AI readiness state",
  "key_opportunities": ["List of 4-6 specific AI opportunities for this business"],
  "risk_factors": ["List of 3-5 potential risks or challenges"],
  "market_benchmarks": {
    "industry_average_score": 30,
    "best_practices": ["Industry best practices for AI adoption"],
    "competitive_advantages": ["Potential competitive advantages from AI"]
  },
  "technology_recommendations": ["Specific AI technologies and tools recommended"],
  "competitive_landscape": "Analysis of how AI could impact competitive positioning",
  "implementation_challenges": ["Specific challenges this company may face"]
}

Ensure all recommendations are specific, actionable, and relevant to the provided context.
`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.content[0].type === 'text' ? response.content[0].text : '';
    return JSON.parse(content) as Stage1Analysis;
  } catch (error) {
    console.error('Stage 1 AI analysis failed:', error);
    throw new Error('Failed to generate business analysis');
  }
}
```

#### Stage 2: Report Generation (15-30 seconds)
```typescript
export async function generateHtmlReport(
  analysis: Stage1Analysis,
  userInfo: UserInfo,
  score: number
): Promise<string> {
  const scoreCategory = score >= 35 ? 'High AI Readiness' : score >= 25 ? 'Medium AI Readiness' : 'Early Stage';
  
  const prompt = `
Create a professional HTML report for ${userInfo.firstName} ${userInfo.lastName}${userInfo.company ? ` at ${userInfo.company}` : ''}.

ANALYSIS DATA:
${JSON.stringify(analysis, null, 2)}

REPORT DETAILS:
- AI Readiness Score: ${score}/50
- Score Category: ${scoreCategory}
- Generated for: ${userInfo.firstName} ${userInfo.lastName}
- Company: ${userInfo.company || 'Not specified'}

Create a professional HTML report with inline CSS that includes:

1. EXECUTIVE SUMMARY (2-3 paragraphs)
   - Overall assessment and score interpretation
   - Key findings and primary opportunities
   - Strategic recommendations overview

2. CURRENT STATE ASSESSMENT (3-4 paragraphs)
   - Technology infrastructure analysis
   - Team capabilities evaluation
   - Process maturity assessment
   - Data readiness review

3. AI READINESS SCORE BREAKDOWN (2-3 paragraphs)
   - Score interpretation and meaning
   - Comparison to industry benchmarks
   - Strengths and improvement areas

4. PERSONALIZED RECOMMENDATIONS (4-6 specific items)
   Each recommendation should include:
   - Specific action item
   - Expected business impact
   - Implementation timeline
   - Required resources/investment

5. IMPLEMENTATION ROADMAP (3-phase approach)
   - Phase 1: Foundation Building (0-3 months)
   - Phase 2: Pilot Implementation (3-9 months)  
   - Phase 3: Scale & Optimize (9-18 months)

6. NEXT STEPS (3-4 immediate actions)
   - Prioritized action items for next 30 days
   - Success metrics to track
   - Key stakeholders to involve

STYLING REQUIREMENTS:
- Use professional color scheme (blues, grays, with accent colors)
- Responsive design that works in email clients
- Clean typography with proper hierarchy
- Include deployAI branding colors where appropriate (#FF6B35, #E63946)
- Print-friendly layout
- Mobile-responsive design

The report should be highly personalized, actionable, and demonstrate clear value for the recipient.
`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 6000,
      messages: [{ role: 'user', content: prompt }],
    });

    return response.content[0].type === 'text' ? response.content[0].text : '';
  } catch (error) {
    console.error('Stage 2 report generation failed:', error);
    throw new Error('Failed to generate HTML report');
  }
}
```

### Error Handling & Retry Logic
```typescript
export async function generateReportWithRetry(
  reportId: string,
  data: AIAnalysisRequest,
  maxRetries: number = 3
): Promise<void> {
  let attempt = 0;
  
  while (attempt < maxRetries) {
    try {
      // Update status to 'generating'
      await updateReportStatus(reportId, 'generating');
      
      // Stage 1: Business analysis
      const analysis = await generateBusinessAnalysis(data);
      await saveStage1Analysis(reportId, analysis);
      
      // Stage 2: HTML report generation
      const htmlReport = await generateHtmlReport(analysis, data.userInfo, data.totalScore);
      await saveStage2Report(reportId, htmlReport);
      
      // Update status to 'completed'
      await updateReportStatus(reportId, 'completed');
      
      // Send email notification
      await sendReportNotification(reportId, data.userInfo, data.totalScore);
      
      return; // Success - exit retry loop
      
    } catch (error) {
      attempt++;
      console.error(`Report generation attempt ${attempt} failed:`, error);
      
      if (attempt >= maxRetries) {
        await updateReportStatus(reportId, 'failed');
        throw error;
      }
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
}
```

---

## Email Integration Extensions

### Extend Existing Resend Configuration

```typescript
// lib/email/reportNotification.ts
import { resend } from '../resend'; // Use existing Resend configuration

interface ReportEmailData {
  reportId: string;
  accessToken: string;
  userEmail: string;
  firstName: string;
  lastName: string;
  company?: string;
  score: number;
  scoreCategory: string;
}

export async function sendReportNotification(data: ReportEmailData): Promise<void> {
  const reportUrl = `${process.env.NEXT_PUBLIC_APP_URL}/report/${data.accessToken}`;
  
  const htmlTemplate = generateReportEmailTemplate(data, reportUrl);
  
  try {
    const result = await resend.emails.send({
      from: 'AI Assessment <noreply@deployai.studio>',
      to: [data.userEmail],
      subject: `Your AI Business Readiness Report is Ready! (Score: ${data.score}/50)`,
      html: htmlTemplate,
      tags: [
        { name: 'campaign', value: 'ai-assessment' },
        { name: 'score', value: data.score.toString() },
        { name: 'score_category', value: data.scoreCategory.toLowerCase().replace(' ', '_') },
        { name: 'company_size', value: 'unknown' }, // Could be extracted from quiz data
      ],
    });
    
    console.log('Report email sent successfully:', result.id);
  } catch (error) {
    console.error('Failed to send report email:', error);
    throw new Error('Email delivery failed');
  }
}
```

### Email Template with deployAI Branding

```typescript
function generateReportEmailTemplate(data: ReportEmailData, reportUrl: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your AI Business Readiness Report</title>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      line-height: 1.6; 
      color: #333; 
      margin: 0; 
      padding: 0; 
      background-color: #f4f4f4;
    }
    .container { 
      max-width: 600px; 
      margin: 0 auto; 
      background-color: white;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header { 
      background: linear-gradient(135deg, #FF6B35 0%, #E63946 100%); 
      color: white; 
      padding: 40px 30px; 
      text-align: center; 
    }
    .header h1 { 
      margin: 0 0 10px 0; 
      font-size: 28px; 
      font-weight: bold; 
    }
    .header p { 
      margin: 0; 
      font-size: 18px; 
      opacity: 0.9; 
    }
    .content { 
      padding: 40px 30px; 
    }
    .score-section { 
      text-align: center; 
      margin: 30px 0; 
      padding: 30px; 
      background: #f9f9f9; 
      border-radius: 8px; 
    }
    .score-circle { 
      width: 120px; 
      height: 120px; 
      border: 4px solid #FF6B35; 
      border-radius: 50%; 
      margin: 0 auto 20px; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      background: white; 
    }
    .score-number { 
      font-size: 36px; 
      font-weight: bold; 
      color: #FF6B35; 
    }
    .score-total { 
      font-size: 14px; 
      color: #666; 
    }
    .score-category { 
      font-size: 20px; 
      font-weight: bold; 
      color: #333; 
      margin: 10px 0 5px 0; 
    }
    .score-label { 
      color: #666; 
      font-size: 16px; 
    }
    .cta-section { 
      text-align: center; 
      margin: 40px 0; 
    }
    .cta-button { 
      display: inline-block; 
      background: linear-gradient(135deg, #FF6B35 0%, #E63946 100%); 
      color: white; 
      text-decoration: none; 
      padding: 18px 40px; 
      border-radius: 8px; 
      font-weight: bold; 
      font-size: 18px; 
      text-transform: uppercase; 
      box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
      transition: all 0.2s ease;
    }
    .report-features { 
      margin: 30px 0; 
    }
    .report-features h3 { 
      color: #333; 
      font-size: 20px; 
      margin-bottom: 15px; 
    }
    .report-features ul { 
      list-style: none; 
      padding: 0; 
      margin: 0; 
    }
    .report-features li { 
      padding: 8px 0 8px 25px; 
      position: relative; 
      color: #555; 
    }
    .report-features li:before { 
      content: "✓"; 
      position: absolute; 
      left: 0; 
      color: #FF6B35; 
      font-weight: bold; 
    }
    .footer-cta { 
      background: #1a1a1a; 
      color: white; 
      padding: 40px 30px; 
      text-align: center; 
    }
    .footer-cta h3 { 
      color: white; 
      margin: 0 0 15px 0; 
    }
    .footer-cta p { 
      margin: 0 0 25px 0; 
      opacity: 0.9; 
    }
    .footer-button { 
      display: inline-block; 
      border: 2px solid #FF6B35; 
      color: #FF6B35; 
      text-decoration: none; 
      padding: 12px 30px; 
      border-radius: 6px; 
      font-weight: bold; 
      text-transform: uppercase; 
    }
    .report-access-note { 
      background: #f0f9ff; 
      border: 1px solid #bfdbfe; 
      border-radius: 6px; 
      padding: 15px; 
      margin: 20px 0; 
      color: #1e40af; 
      font-size: 14px; 
    }
    @media (max-width: 600px) {
      .container { margin: 0; }
      .header, .content, .footer-cta { padding: 20px; }
      .score-circle { width: 100px; height: 100px; }
      .score-number { font-size: 28px; }
      .cta-button { padding: 15px 25px; font-size: 16px; }
    }
  </style>
</head>
<body>
  <div class="container">
    
    <div class="header">
      <h1>Your AI Readiness Report is Ready!</h1>
      <p>Personalized insights for ${data.firstName}${data.company ? ` at ${data.company}` : ''}</p>
    </div>
    
    <div class="content">
      <div class="score-section">
        <div class="score-circle">
          <div>
            <div class="score-number">${data.score}</div>
            <div class="score-total">out of 50</div>
          </div>
        </div>
        <div class="score-category">${data.scoreCategory}</div>
        <div class="score-label">AI Readiness Level</div>
      </div>
      
      <div class="report-features">
        <h3>Your Complete Report Includes:</h3>
        <ul>
          <li>Industry-specific AI opportunity analysis</li>
          <li>Personalized implementation roadmap</li>
          <li>Technology recommendations for your business</li>
          <li>Competitive advantage strategies</li>
          <li>Phase-by-phase implementation guide</li>
          <li>Immediate next steps and action items</li>
        </ul>
      </div>
      
      <div class="cta-section">
        <a href="${reportUrl}" class="cta-button">View Your Complete Report</a>
      </div>
      
      <div class="report-access-note">
        <strong>📌 Important:</strong> This report is available for 30 days. 
        <a href="${reportUrl}" style="color: #1e40af;">Bookmark this link</a> for future reference. 
        You can also print or save the report as a PDF for your records.
      </div>
      
    </div>
    
    <div class="footer-cta">
      <h3>Ready to Implement AI in Your Business?</h3>
      <p>Our team specializes in custom AI solutions for businesses like yours. Let's discuss how we can help you achieve your AI transformation goals.</p>
      <a href="https://deployai.studio/contact" class="footer-button">Schedule a Consultation</a>
    </div>
    
  </div>
</body>
</html>
`;
}
```

---

## Development Workflow Integration

### Storybook Integration

```typescript
// .storybook/main.ts (extend existing configuration)
const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/components/quiz/**/*.stories.@(js|jsx|ts|tsx)" // Add quiz stories
  ],
  // ... existing configuration
};
```

### Component Story Examples

```typescript
// src/components/quiz/ProgressBar/ProgressBar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Quiz/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Progress indicator for the AI Business Quiz showing current step out of total steps.'
      }
    }
  },
  argTypes: {
    current: {
      control: { type: 'number', min: 1, max: 14 },
      description: 'Current step number'
    },
    total: {
      control: { type: 'number' },
      description: 'Total number of steps'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Beginning: Story = {
  args: {
    current: 1,
    total: 14
  }
};

export const Middle: Story = {
  args: {
    current: 7,
    total: 14
  }
};

export const NearEnd: Story = {
  args: {
    current: 12,
    total: 14
  }
};

export const Complete: Story = {
  args: {
    current: 14,
    total: 14
  }
};
```

### Testing Integration with Existing Setup

```typescript
// src/components/quiz/QuestionCard/QuestionCard.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { QuestionCard } from './QuestionCard';
import quizSlice from '../../../store/slices/quizSlice';

// Test store setup
const createTestStore = () => {
  return configureStore({
    reducer: {
      quiz: quizSlice,
    },
  });
};

describe('QuestionCard', () => {
  const mockOnNext = jest.fn();
  const mockOnPrevious = jest.fn();
  
  const defaultProps = {
    questionNumber: 1,
    totalQuestions: 14,
    question: {
      id: 1,
      title: 'What industry best describes your business?',
      type: 'single' as const,
      options: ['Technology', 'Healthcare', 'Manufacturing'],
      required: true,
      scoring: { type: 'contextual' as const }
    },
    onNext: mockOnNext,
    onPrevious: mockOnPrevious,
    isFirst: true,
    isLast: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders question title and options correctly', () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <QuestionCard {...defaultProps} />
      </Provider>
    );

    expect(screen.getByText('What industry best describes your business?')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('Healthcare')).toBeInTheDocument();
    expect(screen.getByText('Manufacturing')).toBeInTheDocument();
  });

  it('validates required question before allowing next', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <QuestionCard {...defaultProps} />
      </Provider>
    );

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(/please select an option/i)).toBeInTheDocument();
    });

    expect(mockOnNext).not.toHaveBeenCalled();
  });

  it('calls onNext with selected answer when valid', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <QuestionCard {...defaultProps} />
      </Provider>
    );

    const technologyOption = screen.getByLabelText('Technology');
    fireEvent.click(technologyOption);

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(mockOnNext).toHaveBeenCalledWith('Technology');
    });
  });
});
```

---

## Performance Requirements

### Performance Targets

**Core Web Vitals:**
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s  
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1

**Application Performance:**
- Question navigation: < 300ms (leveraging existing component performance)
- Form validation: < 100ms
- Quiz submission: < 2 seconds
- Report generation: 45-90 seconds total
- Report viewing: < 3 seconds

### Optimization Strategies

**Bundle Optimization:**
```typescript
// next.config.mjs (extend existing configuration)
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... existing config
  experimental: {
    optimizePackageImports: [
      '@reduxjs/toolkit',
      'react-hook-form',
      '@anthropic-ai/sdk'
    ]
  },
  webpack: (config, { isServer }) => {
    // Quiz-specific optimizations
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@quiz': path.resolve(__dirname, 'src/components/quiz'),
      };
    }
    return config;
  }
};
```

**Component Performance:**
```typescript
// Lazy loading for quiz components
const QuestionCard = lazy(() => import('@/components/quiz/QuestionCard'));
const ProcessingScreen = lazy(() => import('@/components/quiz/ProcessingScreen'));
const ReportViewer = lazy(() => import('@/components/quiz/ReportViewer'));

// Memoized scoring calculations
const calculateScore = useMemo(() => {
  return (responses: QuizResponseData) => {
    // Scoring logic here
  };
}, []);
```

---

## Integration Deployment

### Environment Configuration

```bash
# .env.local (add to existing environment variables)

# AI Integration
ANTHROPIC_API_KEY=your_anthropic_api_key

# Quiz Configuration
NEXT_PUBLIC_QUIZ_MAX_QUESTIONS=14
QUIZ_REPORT_EXPIRY_DAYS=30

# Existing variables (already configured)
# NEXT_PUBLIC_SUPABASE_URL=already_configured
# NEXT_PUBLIC_SUPABASE_ANON_KEY=already_configured
# SUPABASE_SERVICE_ROLE_KEY=already_configured
# RESEND_API_KEY=already_configured
```

### Database Migration Script

```sql
-- Run this migration on your existing Supabase database
-- migrations/001_add_quiz_tables.sql

BEGIN;

-- Create quiz_responses table
CREATE TABLE IF NOT EXISTS quiz_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_email TEXT NOT NULL,
    user_first_name TEXT NOT NULL,
    user_last_name TEXT NOT NULL,
    user_company TEXT,
    responses JSONB NOT NULL,
    total_score INTEGER NOT NULL CHECK (total_score >= 15 AND total_score <= 50),
    industry TEXT,
    company_size TEXT,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ai_reports table
CREATE TABLE IF NOT EXISTS ai_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    quiz_response_id UUID REFERENCES quiz_responses(id) ON DELETE CASCADE,
    stage_1_analysis JSONB,
    stage_2_report TEXT,
    report_status TEXT DEFAULT 'generating' CHECK (
        report_status IN ('generating', 'completed', 'failed')
    ),
    access_token TEXT UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_quiz_responses_email ON quiz_responses(user_email);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_completed ON quiz_responses(completed_at) WHERE completed_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_ai_reports_access_token ON ai_reports(access_token);
CREATE INDEX IF NOT EXISTS idx_ai_reports_status ON ai_reports(report_status);
CREATE INDEX IF NOT EXISTS idx_ai_reports_quiz_response ON ai_reports(quiz_response_id);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for ai_reports updated_at
DROP TRIGGER IF EXISTS update_ai_reports_updated_at ON ai_reports;
CREATE TRIGGER update_ai_reports_updated_at 
    BEFORE UPDATE ON ai_reports 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

COMMIT;
```

### Deployment Checklist

```markdown
## Pre-Deployment Checklist

### Infrastructure
- [ ] Anthropic API key configured in environment
- [ ] Database migration executed successfully
- [ ] Existing Supabase connection tested
- [ ] Existing Resend email service verified

### Code Integration
- [ ] New dependencies installed via npm
- [ ] Redux store provider added to _app.tsx
- [ ] New routes accessible via navigation
- [ ] All new components have Storybook stories
- [ ] TypeScript compilation successful

### Testing
- [ ] All quiz components render correctly
- [ ] Form validation working for all question types
- [ ] Email modal integration functional
- [ ] API endpoints respond correctly
- [ ] Report generation tested with sample data
- [ ] Email delivery confirmed
- [ ] Mobile responsiveness verified

### Performance
- [ ] Bundle size increase acceptable (< 100KB)
- [ ] Page load times within targets
- [ ] No existing functionality broken
- [ ] Memory usage acceptable

### Monitoring
- [ ] Error tracking configured for new routes
- [ ] Analytics events for quiz interactions
- [ ] API endpoint monitoring
- [ ] Email delivery monitoring
```

### Production Deployment Steps

1. **Database Migration**
   ```bash
   # Run migration on production Supabase
   psql -h your-supabase-host -d postgres -c "$(cat migrations/001_add_quiz_tables.sql)"
   ```

2. **Environment Variables**
   ```bash
   # Set in production environment (Vercel/deployment platform)
   ANTHROPIC_API_KEY=prod_api_key
   NEXT_PUBLIC_QUIZ_MAX_QUESTIONS=14
   QUIZ_REPORT_EXPIRY_DAYS=30
   ```

3. **Build & Deploy**
   ```bash
   npm run build
   npm run start
   ```

4. **Post-Deployment Verification**
   - Test complete quiz flow
   - Verify email delivery
   - Check report generation
   - Monitor error rates

---

## Risk Mitigation

### Technical Risks

**Claude API Rate Limits**
- **Risk**: API quotas exceeded during high traffic
- **Mitigation**: Implement queue system, retry logic with exponential backoff
- **Monitoring**: Track API usage and set alerts

**Report Generation Failures**  
- **Risk**: AI generation fails or times out
- **Mitigation**: Retry logic, fallback prompts, manual generation capability
- **Monitoring**: Track generation success rates

**Database Performance**
- **Risk**: New tables impact existing performance
- **Mitigation**: Proper indexing, query optimization, connection pooling
- **Monitoring**: Database performance metrics

### Business Risks

**Integration Issues**
- **Risk**: New functionality breaks existing features
- **Mitigation**: Comprehensive testing, gradual rollout, feature flags
- **Monitoring**: User behavior analytics, error tracking

**User Experience**
- **Risk**: Quiz flow doesn't match existing site UX
- **Mitigation**: Consistent design system usage, user testing
- **Monitoring**: Completion rates, user feedback

---

## Conclusion

This TRD provides comprehensive technical specifications for integrating the AI Business Quiz into the existing deployAI Studio website. The integration approach leverages 80% of existing infrastructure while adding focused new functionality through 7 components and 4 API endpoints.

### Key Integration Benefits:
1. **Rapid Development**: 3-4 weeks vs 6-8 weeks standalone
2. **Design Consistency**: Leverages existing design system
3. **Infrastructure Reuse**: Uses proven Supabase + Resend setup  
4. **Component Reuse**: Builds on existing component library
5. **Workflow Integration**: Uses existing Storybook + testing setup

### Development Approach:
- Task-based development with 39 discrete deliverables
- Each task completable by LLM in 1-2 hours
- Clear dependencies and integration points
- Comprehensive testing and documentation

**Ready for Implementation**: All architectural decisions made, dependencies identified, and integration points specified for immediate development start.

---

**Document Version**: 1.0  
**Last Updated**: July 2025  
**Next Review**: Post Phase 1 Completion  
**Technical Lead**: [Name]  
**Approved By**: [Technical Lead], [Product Owner]