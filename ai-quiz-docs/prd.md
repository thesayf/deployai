# AI Business Quiz Integration - Product Requirements Document

**Product Name:** AI Business Readiness Assessment Integration  
**Version:** 1.0  
**Integration Target:** deployAI Studio Website  
**Timeline:** 3-4 weeks  
**Document Date:** July 2025

---

## Executive Summary

Integration of a comprehensive AI business readiness assessment into the existing deployAI Studio website. The assessment will capture leads through a strategic quiz experience, generate personalized AI-powered reports, and seamlessly integrate with the current design system and infrastructure.

### Key Business Objectives
- Generate qualified leads through engaging assessment experience
- Demonstrate AI expertise and thought leadership
- Build email list for nurturing campaigns
- Create high-value content that drives conversions
- Establish authority in AI business transformation

---

## Product Flow Overview

```
Landing Page → Email Modal → Quiz (14 Questions) → Processing → Report Delivery
     ↓              ↓            ↓                 ↓           ↓
 Value Prop    Lead Capture   1 Q/Page        AI Generation  Email + View
```

---

## User Experience & Flow Design

### 1. Landing Page (`/ai-assessment`)
**Purpose:** Present value proposition and initiate assessment

**Components:**
- Hero section explaining assessment value
- Benefits of taking the assessment  
- Social proof/testimonials
- Clear CTA button "Start Your AI Assessment"
- Expected time: "Takes 3-4 minutes"

**Design Integration:**
- Use existing deployAI hero components
- Leverage current orange/red gradient theme
- Maintain neubrutalist design consistency
- Mobile-responsive using existing patterns

### 2. Email Collection Modal
**Trigger:** Click "Start Your AI Assessment" button

**Content:**
- Modal overlay with form
- Value reinforcement ("Get your personalized AI roadmap")
- Simple form: Email, First Name, Last Name, Company (optional)
- Privacy assurance
- "Begin Assessment" submit button

**Technical:**
- React Hook Form with Zod validation
- Email format validation
- Required field handling
- Smooth modal animations using existing Framer Motion

### 3. Quiz Flow (`/ai-assessment/quiz/[step]`)
**Structure:** 14 questions, 1 per page

**Question Navigation:**
- Progress bar (Question X of 14)
- Question title and content
- Answer options (radio, checkbox, or textarea)
- Previous/Next navigation
- Auto-save progress to prevent data loss

**Question Types:**
- **Single Select** (9 questions): Radio buttons
- **Multi-Select** (2 questions): Checkboxes with max limit
- **Open Text** (3 questions): Textarea inputs

**Design Consistency:**
- Use existing SectionHeading components
- Leverage current Button variants
- Maintain color scheme and typography
- Responsive design for mobile

### 4. Processing Stage (`/ai-assessment/processing`)
**Purpose:** Manage user expectations during AI report generation

**Content:**
- Loading animation/spinner
- Progress messages ("Analyzing your responses...", "Generating recommendations...")
- Expected wait time (60-90 seconds)
- Company information or testimonials to maintain engagement

**Technical:**
- Real-time status updates
- Fallback handling for API delays
- Graceful error messaging

### 5. Report Delivery (`/ai-assessment/complete`)
**Immediate Response:**
- Success confirmation
- "Report sent to your email" message
- Preview of score/category
- Option to view report immediately
- Next steps/CTA for consultation

**Email Delivery:**
- Automated email with report link
- Personalized content based on score
- Professional email template
- 30-day access link validity

---

## Technical Specifications

### Database Schema (Supabase Extensions)

```sql
-- Quiz responses table
CREATE TABLE quiz_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_email TEXT NOT NULL,
    user_first_name TEXT NOT NULL,
    user_last_name TEXT NOT NULL,
    user_company TEXT,
    responses JSONB NOT NULL,
    total_score INTEGER CHECK (total_score >= 15 AND total_score <= 50),
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
    stage_1_analysis JSONB, -- Structured AI analysis
    stage_2_report TEXT,    -- Final HTML report
    report_status TEXT DEFAULT 'generating' CHECK (
        report_status IN ('generating', 'completed', 'failed')
    ),
    access_token TEXT UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_quiz_responses_email ON quiz_responses(user_email);
CREATE INDEX idx_quiz_responses_completed ON quiz_responses(completed_at);
CREATE INDEX idx_ai_reports_access_token ON ai_reports(access_token);
CREATE INDEX idx_ai_reports_status ON ai_reports(report_status);
```

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

### Route Structure

```
src/pages/
├── ai-assessment/
│   ├── index.tsx                    # Landing page
│   ├── quiz/
│   │   ├── [step].tsx              # Dynamic question pages (1-14)
│   │   ├── processing.tsx          # AI generation loading
│   │   └── complete.tsx            # Success confirmation
└── api/
    └── quiz/
        ├── start.ts                 # Initialize quiz session
        ├── save-progress.ts         # Save question responses
        ├── submit.ts                # Submit completed quiz
        ├── generate-report.ts       # AI report generation
        └── status/[id].ts          # Check generation status

src/report/
└── [token].tsx                      # Public report viewing page
```

---

## Component Architecture

### New Components Required (7 Total)

#### 1. AssessmentLanding Component
```tsx
interface AssessmentLandingProps {
  onStartAssessment: () => void;
}
```
**Purpose:** Landing page hero and value proposition  
**Reuses:** Existing hero components, Button, SectionHeading

#### 2. EmailCaptureModal Component  
```tsx
interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserInfo) => void;
}
```
**Purpose:** Modal for lead capture  
**Features:** Form validation, loading states, error handling

#### 3. QuestionCard Component
```tsx
interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  question: QuizQuestion;
  currentAnswer?: any;
  onNext: (answer: any) => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}
```
**Purpose:** Individual question display and interaction  
**Reuses:** Button, SectionHeading components

#### 4. ProgressBar Component
```tsx
interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}
```
**Purpose:** Visual progress indicator  
**Styling:** Uses existing gradient theme

#### 5. ProcessingScreen Component
```tsx
interface ProcessingScreenProps {
  stage: 'analyzing' | 'generating' | 'complete';
  estimatedTime?: number;
}
```
**Purpose:** AI generation loading experience  
**Features:** Dynamic messaging, progress animation

#### 6. ScoreDisplay Component
```tsx
interface ScoreDisplayProps {
  score: number;
  maxScore: number;
  category: string;
  description: string;
}
```
**Purpose:** Visual score presentation  
**Styling:** Leverages existing gradient and typography

#### 7. ReportViewer Component
```tsx
interface ReportViewerProps {
  reportContent: string;
  userInfo: UserInfo;
  score: number;
  generatedAt: Date;
}
```
**Purpose:** Display generated AI report  
**Features:** Print-friendly, sharing options

### Existing Components to Leverage

- **Button.tsx** - Quiz navigation, CTAs
- **SectionHeading.tsx** - Question titles, section headers  
- **SectionSubheading.tsx** - Descriptions, progress text
- **Existing layout components** - Page structure, navigation
- **Typography classes** - Consistent text styling

---

## Quiz Question Specifications

### Question Structure
```typescript
interface QuizQuestion {
  id: number;
  title: string;
  type: 'single' | 'multiple' | 'text';
  options?: string[];
  maxSelections?: number;
  required: boolean;
  scoring: {
    type: 'points' | 'contextual';
    values?: Record<string, number>;
  };
}
```

### Scoring System
- **Total Score Range:** 15-50 points
- **Score Categories:**
  - 35-50: High AI Readiness
  - 25-34: Medium AI Readiness  
  - 15-24: Early Stage

### Complete Question Set

#### Q1: Industry (Contextual Analysis)
- **Type:** Single select
- **Purpose:** Industry-specific recommendations
- **Options:** Tech, Healthcare, Manufacturing, Professional Services, etc.

#### Q2: Company Size (1-5 points)
- **Type:** Single select  
- **Scoring:** 1-10 employees (1pt) → 1000+ employees (5pts)

#### Q3: Primary Goals (Multi-select, max 3)
- **Type:** Multiple select
- **Scoring:** 1-3 points per selection based on AI opportunity

#### Q4: Biggest Challenge (Contextual)
- **Type:** Text input
- **Purpose:** Personalized recommendations

#### Q5: Problem Areas (Multi-select)
- **Type:** Multiple select
- **Scoring:** Points based on automation potential

#### Q6-Q13: Readiness Assessment (1-5 points each)
- Manual work percentage
- Decision-making data usage
- Current data setup
- Technology level
- AI experience
- Team technical skills
- Budget considerations
- Timeline expectations

#### Q14: Success Vision (Contextual)
- **Type:** Text input
- **Purpose:** Implementation strategy customization

---

## AI Integration Architecture

### Two-Stage Report Generation

#### Stage 1: Context Analysis (30-45 seconds)
```typescript
const stage1Prompt = `
Analyze this business assessment for AI readiness:

Industry: ${responses.industry}
Company Size: ${responses.companySize}
Score: ${totalScore}/50
Responses: ${JSON.stringify(responses)}

Provide structured analysis:
- Industry AI landscape
- Readiness assessment
- Key opportunities
- Risk factors
- Technology recommendations
- Competitive positioning
`;
```

#### Stage 2: Report Generation (30-45 seconds)
```typescript
const stage2Prompt = `
Generate a professional HTML report for ${userInfo.firstName} ${userInfo.lastName}:

Analysis: ${stage1Results}
Score: ${totalScore}/50

Include:
1. Executive Summary
2. Current State Assessment  
3. AI Readiness Score Analysis
4. Personalized Recommendations (4-6 items)
5. Implementation Roadmap (3 phases)
6. Next Steps

Format as professional HTML with inline CSS compatible with email.
`;
```

### API Endpoints

#### POST /api/quiz/start
```typescript
interface StartQuizRequest {
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
}

interface StartQuizResponse {
  success: boolean;
  quizId: string;
  error?: string;
}
```

#### PUT /api/quiz/save-progress
```typescript
interface SaveProgressRequest {
  quizId: string;
  questionId: number;
  answer: any;
}
```

#### POST /api/quiz/submit
```typescript
interface SubmitQuizRequest {
  quizId: string;
  finalResponses: QuizResponses;
}

interface SubmitQuizResponse {
  success: boolean;
  reportId: string;
  processingTime: string;
}
```

---

## Redux Store Architecture

### Quiz State Management

```typescript
interface QuizState {
  // User Information
  userInfo: {
    email: string;
    firstName: string;
    lastName: string;
    company?: string;
  };
  
  // Quiz Progress
  currentStep: number;
  responses: Record<number, any>;
  totalScore: number;
  quizId: string | null;
  
  // UI State
  isModalOpen: boolean;
  isSubmitting: boolean;
  processingStage: 'analyzing' | 'generating' | 'complete' | null;
  
  // Error Handling
  error: string | null;
}

// Actions
const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    openEmailModal: (state) => { state.isModalOpen = true; },
    closeEmailModal: (state) => { state.isModalOpen = false; },
    setUserInfo: (state, action) => { state.userInfo = action.payload; },
    setCurrentStep: (state, action) => { state.currentStep = action.payload; },
    saveResponse: (state, action) => { 
      const { questionId, answer } = action.payload;
      state.responses[questionId] = answer;
    },
    updateScore: (state, action) => { state.totalScore = action.payload; },
    setProcessingStage: (state, action) => { state.processingStage = action.payload; },
    resetQuiz: () => initialState,
  }
});
```

---

## Email Integration (Resend)

### Report Delivery Email Template

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your AI Business Readiness Report</title>
  <style>
    /* Use deployAI brand colors and styling */
    .gradient-bg { background: linear-gradient(135deg, #FF6B35 0%, #E63946 100%); }
    .score-circle { border: 3px solid #FF6B35; border-radius: 50%; }
  </style>
</head>
<body>
  <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
    
    <!-- Header with brand styling -->
    <div class="gradient-bg" style="padding: 40px 30px; text-align: center; color: white;">
      <h1>Your AI Readiness Report is Ready!</h1>
      <p style="font-size: 18px; margin: 0;">Personalized insights for {{firstName}} at {{company}}</p>
    </div>
    
    <!-- Score Display -->
    <div style="padding: 30px; text-align: center; background: #f9f9f9;">
      <div class="score-circle" style="width: 120px; height: 120px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; background: white;">
        <div>
          <div style="font-size: 36px; font-weight: bold; color: #FF6B35;">{{score}}</div>
          <div style="font-size: 14px; color: #666;">out of 50</div>
        </div>
      </div>
      <h2 style="color: #333; margin: 0;">{{scoreCategory}}</h2>
      <p style="color: #666; font-size: 16px;">AI Readiness Level</p>
    </div>
    
    <!-- Report Access -->
    <div style="padding: 30px; text-align: center;">
      <h3>Your Complete Report Includes:</h3>
      <ul style="text-align: left; max-width: 400px; margin: 0 auto;">
        <li>Industry-specific AI opportunities</li>
        <li>Personalized implementation roadmap</li>
        <li>Technology recommendations</li>
        <li>Competitive advantage strategies</li>
        <li>Next steps and action items</li>
      </ul>
      
      <a href="{{reportUrl}}" 
         style="display: inline-block; margin: 30px 0; padding: 15px 40px; 
                background: linear-gradient(135deg, #FF6B35 0%, #E63946 100%); 
                color: white; text-decoration: none; border-radius: 8px; 
                font-weight: bold; font-size: 18px;">
        VIEW YOUR COMPLETE REPORT
      </a>
      
      <p style="color: #666; font-size: 14px;">
        This report is available for 30 days. 
        <a href="{{reportUrl}}">Bookmark this link</a> for future reference.
      </p>
    </div>
    
    <!-- Footer CTA -->
    <div style="padding: 30px; background: #1a1a1a; color: white; text-align: center;">
      <h3>Ready to Implement AI in Your Business?</h3>
      <p>Our team specializes in custom AI solutions for businesses like yours.</p>
      <a href="https://deployai.studio/contact" 
         style="display: inline-block; padding: 12px 30px; 
                border: 2px solid #FF6B35; color: #FF6B35; 
                text-decoration: none; border-radius: 6px; 
                font-weight: bold;">
        Schedule a Consultation
      </a>
    </div>
    
  </div>
</body>
</html>
```

### Email Sending Implementation

```typescript
// Extend existing Resend configuration
export async function sendReportEmail(data: {
  reportId: string;
  accessToken: string;
  userEmail: string;
  firstName: string;
  lastName: string;
  company?: string;
  score: number;
  scoreCategory: string;
}) {
  const reportUrl = `${process.env.NEXT_PUBLIC_APP_URL}/report/${data.accessToken}`;
  
  const result = await resend.emails.send({
    from: 'AI Reports <reports@deployai.studio>',
    to: [data.userEmail],
    subject: `Your AI Business Readiness Report is Ready! (Score: ${data.score}/50)`,
    html: reportEmailTemplate(data, reportUrl),
    tags: [
      { name: 'campaign', value: 'ai-assessment' },
      { name: 'score', value: data.score.toString() },
      { name: 'score_category', value: data.scoreCategory.toLowerCase().replace(' ', '_') }
    ]
  });
  
  return result;
}
```

---

## Development Timeline

### Week 1: Foundation & Core Flow
**Days 1-2: Setup & Architecture**
- [ ] Install new dependencies (Redux, RHF, Zod, Anthropic SDK)
- [ ] Create database schema extensions
- [ ] Set up Redux store and quiz slice
- [ ] Create route structure

**Days 3-5: Core Components**
- [ ] AssessmentLanding component
- [ ] EmailCaptureModal with validation
- [ ] QuestionCard component with all question types
- [ ] ProgressBar component
- [ ] Basic quiz navigation

### Week 2: Quiz Flow & Validation  
**Days 1-3: Question Implementation**
- [ ] All 14 quiz questions with proper validation
- [ ] Scoring algorithm implementation
- [ ] Progress saving and recovery
- [ ] Mobile responsiveness

**Days 4-5: Processing & State Management**
- [ ] ProcessingScreen component
- [ ] Redux state management completion
- [ ] Error handling and edge cases
- [ ] Local storage backup

### Week 3: AI Integration & Reports
**Days 1-3: Claude API Integration**
- [ ] Two-stage AI analysis implementation
- [ ] Report generation API endpoints
- [ ] Database integration for reports
- [ ] Error handling and retries

**Days 4-5: Report Display & Email**
- [ ] ReportViewer component
- [ ] Email template creation
- [ ] Public report access page
- [ ] Email delivery testing

### Week 4: Polish & Testing
**Days 1-2: Storybook & Testing**
- [ ] Storybook stories for all new components
- [ ] Component unit testing
- [ ] Integration testing
- [ ] Mobile testing

**Days 3-4: Integration & Polish**
- [ ] Navigation integration
- [ ] Landing page optimization
- [ ] Performance optimization
- [ ] Analytics tracking

**Day 5: Launch Preparation**
- [ ] Production deployment
- [ ] Monitoring setup  
- [ ] Documentation
- [ ] Team training

---

## Success Metrics & KPIs

### Primary Metrics
- **Assessment Completion Rate:** Target 75%
- **Email Capture Rate:** Target 85%
- **Report Generation Success:** Target 98%
- **Email Delivery Rate:** Target 95%

### Secondary Metrics  
- **Time to Complete Assessment:** Target < 4 minutes
- **Mobile Completion Rate:** Target 70%
- **Report View Rate:** Target 80%
- **Consultation Booking Rate:** Target 15%

### Technical Performance
- **Page Load Time:** < 2 seconds
- **Question Navigation:** < 300ms
- **Report Generation:** < 90 seconds
- **Mobile Performance:** Same as desktop

---

## Risk Mitigation

### Technical Risks
1. **Claude API Rate Limits**
   - **Mitigation:** Queue system, retry logic, fallback prompts
   
2. **Report Generation Failures**
   - **Mitigation:** Error handling, manual generation option, status tracking

3. **High Traffic Spikes**
   - **Mitigation:** Vercel auto-scaling, database connection pooling

### Business Risks  
1. **Low Conversion Rates**
   - **Mitigation:** A/B testing, UX optimization, value proposition refinement

2. **Poor Report Quality**
   - **Mitigation:** Prompt optimization, user feedback collection, manual review

---

## Post-Launch Enhancements

### Phase 2 (Month 2)
- Industry-specific report variations
- Advanced analytics dashboard
- Integration with existing CRM
- Automated follow-up email sequences

### Phase 3 (Month 3)
- Multi-language support
- White-label version for partners  
- Advanced scoring algorithms
- Report sharing features

---

## Environment Setup

### New Environment Variables
```bash
# Add to existing .env.local
ANTHROPIC_API_KEY=your_anthropic_api_key

# Existing variables (already configured)
# NEXT_PUBLIC_SUPABASE_URL=already_configured
# NEXT_PUBLIC_SUPABASE_ANON_KEY=already_configured
# SUPABASE_SERVICE_ROLE_KEY=already_configured
# RESEND_API_KEY=already_configured
```

### Package Installation
```bash
npm install @reduxjs/toolkit react-redux react-hook-form @hookform/resolvers zod @anthropic-ai/sdk
```

---

## Quality Assurance

### Testing Strategy
1. **Component Testing:** Jest + React Testing Library
2. **Integration Testing:** API endpoint testing
3. **E2E Testing:** Complete quiz flow testing
4. **Performance Testing:** Load testing for AI generation
5. **Mobile Testing:** Responsive design validation

### Acceptance Criteria
- [ ] All quiz questions display correctly on mobile and desktop
- [ ] Email validation prevents invalid submissions
- [ ] Progress is saved and recoverable
- [ ] Reports generate consistently within 90 seconds
- [ ] Emails deliver reliably
- [ ] Public report links work correctly
- [ ] Integration maintains existing site performance

---

## Launch Strategy

### Soft Launch (Week 4)
- Deploy to production
- Add navigation link to existing site
- Test with internal team and select users
- Monitor performance and error rates

### Marketing Integration
- Add assessment CTA to homepage
- Include in existing email campaigns
- Create social media promotion
- Add to existing content marketing

### Success Measurement
- Track completion rates daily
- Monitor report generation success
- Analyze user feedback
- Measure impact on lead generation

---

This PRD provides a complete roadmap for integrating the AI Business Quiz into the existing deployAI Studio website, leveraging all current infrastructure and maintaining design consistency while delivering a high-value lead generation tool.