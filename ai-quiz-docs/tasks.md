# AI Quiz Development - Phases & Tasks Breakdown

*Tasks organized for LLM development - each task is self-contained and completable in one shot*

---

## **PHASE 1: Foundation & Setup** (Week 1)

### **Day 1-2: Infrastructure Setup**

#### Task 1.1: Package Dependencies
- **Scope**: Install and configure new npm packages
- **LLM Task**: Create package.json additions for Redux, React Hook Form, Zod, Anthropic SDK
- **Deliverable**: Updated package.json with version specifications

#### Task 1.2: Database Schema
- **Scope**: Create Supabase table definitions
- **LLM Task**: Write SQL migration script for quiz_responses and ai_reports tables
- **Deliverable**: Complete SQL file with tables, indexes, and constraints

#### Task 1.3: TypeScript Interfaces
- **Scope**: Define all type definitions for quiz system
- **LLM Task**: Create types file with QuizQuestion, QuizResponse, UserInfo, ReportData interfaces
- **Deliverable**: Complete types/quiz.ts file

#### Task 1.4: Redux Store Setup
- **Scope**: Basic Redux store configuration
- **LLM Task**: Create store/index.ts with quiz slice boilerplate
- **Deliverable**: Redux store with quiz state management

#### Task 1.5: Route Structure
- **Scope**: Create empty page files for new routes
- **LLM Task**: Generate folder structure and basic page shells for /ai-assessment routes
- **Deliverable**: Empty pages with proper Next.js structure

### **Day 3-5: Core UI Components**

#### Task 1.6: ProgressBar Component
- **Scope**: Visual progress indicator for quiz
- **LLM Task**: Create standalone ProgressBar component with Storybook story
- **Deliverable**: Component + story showing 1-14 progress states

#### Task 1.7: EmailCaptureModal Component
- **Scope**: Modal for lead capture with form validation
- **LLM Task**: Create modal component with React Hook Form and Zod validation
- **Deliverable**: Complete modal component with email, name, company fields

#### Task 1.8: AssessmentLanding Component
- **Scope**: Landing page hero section
- **LLM Task**: Create landing component using existing deployAI design patterns
- **Deliverable**: Landing page component with CTA button integration

#### Task 1.9: Basic Button Integration
- **Scope**: Extend existing Button component if needed
- **LLM Task**: Add any new button variants needed for quiz (if required)
- **Deliverable**: Updated Button component or confirmation existing is sufficient

---

## **PHASE 2: Quiz Flow Implementation** (Week 2)

### **Day 1-2: Question Infrastructure**

#### Task 2.1: Quiz Questions Data
- **Scope**: Complete question dataset
- **LLM Task**: Create quiz-questions.json with all 14 questions, options, and scoring rules
- **Deliverable**: JSON file with complete question set

#### Task 2.2: Scoring Algorithm
- **Scope**: Calculate total score from responses
- **LLM Task**: Create utility function to calculate score from quiz responses
- **Deliverable**: Scoring utility with tests for different response combinations

#### Task 2.3: QuestionCard Base Component
- **Scope**: Container component for displaying questions
- **LLM Task**: Create QuestionCard component shell with navigation
- **Deliverable**: Base component with Previous/Next navigation

### **Day 3-4: Question Types Implementation**

#### Task 2.4: Single Select Question UI
- **Scope**: Radio button question type
- **LLM Task**: Create single select question component with validation
- **Deliverable**: Component handling radio button questions

#### Task 2.5: Multiple Select Question UI
- **Scope**: Checkbox question type with max limits
- **LLM Task**: Create multi-select component with selection limits
- **Deliverable**: Component handling checkbox questions with max selection validation

#### Task 2.6: Text Input Question UI
- **Scope**: Textarea question type
- **LLM Task**: Create text input component with character validation
- **Deliverable**: Component handling textarea questions with proper validation

#### Task 2.7: Question Router Logic
- **Scope**: Dynamic routing for quiz steps
- **LLM Task**: Create [step].tsx page with question routing logic
- **Deliverable**: Dynamic page handling all question types

### **Day 5: State Management & Persistence**

#### Task 2.8: Redux Actions & Reducers
- **Scope**: Complete quiz state management
- **LLM Task**: Finish quiz slice with all actions for saving responses, navigation
- **Deliverable**: Complete Redux slice with full functionality

#### Task 2.9: Local Storage Backup
- **Scope**: Prevent data loss on browser refresh
- **LLM Task**: Add localStorage persistence for quiz progress
- **Deliverable**: Utility functions for save/restore quiz state

---

## **PHASE 3: API & Database Integration** (Week 2-3)

### **Day 1-2: Basic API Endpoints**

#### Task 3.1: Quiz Start API
- **Scope**: Initialize new quiz session
- **LLM Task**: Create /api/quiz/start.ts endpoint
- **Deliverable**: API endpoint to create quiz record in Supabase

#### Task 3.2: Save Progress API
- **Scope**: Save individual question responses
- **LLM Task**: Create /api/quiz/save-progress.ts endpoint
- **Deliverable**: API endpoint to update quiz responses

#### Task 3.3: Submit Quiz API
- **Scope**: Finalize quiz and trigger report generation
- **LLM Task**: Create /api/quiz/submit.ts endpoint
- **Deliverable**: API endpoint to complete quiz and start AI processing

#### Task 3.4: Quiz Status API
- **Scope**: Check quiz completion status
- **LLM Task**: Create /api/quiz/status/[id].ts endpoint
- **Deliverable**: API endpoint to check if quiz is complete

### **Day 3-4: AI Integration Foundation**

#### Task 3.5: Anthropic Client Setup
- **Scope**: Configure Claude API client
- **LLM Task**: Create lib/anthropic.ts with client configuration
- **Deliverable**: Anthropic client setup with error handling

#### Task 3.6: Stage 1 AI Prompt
- **Scope**: Business analysis prompt engineering
- **LLM Task**: Create Stage 1 prompt template for business analysis
- **Deliverable**: Prompt template with variable substitution

#### Task 3.7: Stage 2 AI Prompt
- **Scope**: Report generation prompt engineering
- **LLM Task**: Create Stage 2 prompt template for HTML report generation
- **Deliverable**: Prompt template for formatted report output

#### Task 3.8: AI Processing API
- **Scope**: Execute two-stage AI generation
- **LLM Task**: Create /api/reports/generate.ts with two-stage AI processing
- **Deliverable**: Complete AI processing endpoint

---

## **PHASE 4: Processing & Report Display** (Week 3)

### **Day 1-2: Processing Experience**

#### Task 4.1: ProcessingScreen Component
- **Scope**: Loading screen during AI generation
- **LLM Task**: Create processing component with progress states
- **Deliverable**: Component showing different processing stages

#### Task 4.2: Processing Page Implementation
- **Scope**: Full processing page experience
- **LLM Task**: Create /ai-assessment/quiz/processing.tsx page
- **Deliverable**: Page with real-time status updates

#### Task 4.3: Completion Page
- **Scope**: Success confirmation page
- **LLM Task**: Create /ai-assessment/quiz/complete.tsx page
- **Deliverable**: Success page with score display and next steps

### **Day 3-4: Report System**

#### Task 4.4: Report Display Component
- **Scope**: Render HTML report content
- **LLM Task**: Create ReportViewer component for displaying AI-generated reports
- **Deliverable**: Component that renders HTML report with proper styling

#### Task 4.5: Public Report Page
- **Scope**: Public report access via token
- **LLM Task**: Create /report/[token].tsx page for public report viewing
- **Deliverable**: Public page with token-based report access

#### Task 4.6: Score Display Component
- **Scope**: Visual score presentation
- **LLM Task**: Create ScoreDisplay component with score visualization
- **Deliverable**: Component showing score, category, and visual indicator

---

## **PHASE 5: Email Integration** (Week 3-4)

### **Day 1-2: Email Templates**

#### Task 5.1: Report Email HTML Template
- **Scope**: Professional email template for report delivery
- **LLM Task**: Create HTML email template matching deployAI branding
- **Deliverable**: Complete HTML email template with inline CSS

#### Task 5.2: Email Sending Function
- **Scope**: Integrate with existing Resend setup
- **LLM Task**: Create email sending utility using existing Resend configuration
- **Deliverable**: Function to send report emails with proper error handling

#### Task 5.3: Email Trigger Integration
- **Scope**: Connect email sending to report completion
- **LLM Task**: Add email sending to report generation workflow
- **Deliverable**: Automatic email dispatch when reports are ready

---

## **PHASE 6: Integration & Polish** (Week 4)

### **Day 1-2: Site Integration**

#### Task 6.1: Navigation Integration
- **Scope**: Add assessment link to existing navigation
- **LLM Task**: Update existing navigation component with assessment link
- **Deliverable**: Navigation showing AI Assessment option

#### Task 6.2: Landing Page Integration
- **Scope**: Connect landing page to existing site structure
- **LLM Task**: Integrate assessment landing page with existing layout
- **Deliverable**: Landing page using existing site layout and styling

#### Task 6.3: Mobile Responsiveness Check
- **Scope**: Ensure all components work on mobile
- **LLM Task**: Review and fix mobile responsiveness issues
- **Deliverable**: Mobile-optimized quiz experience

### **Day 3-4: Testing & Stories**

#### Task 6.4: Storybook Stories - Components
- **Scope**: Component documentation
- **LLM Task**: Create Storybook stories for all new components
- **Deliverable**: Complete Storybook documentation

#### Task 6.5: Error Handling
- **Scope**: Graceful error states throughout app
- **LLM Task**: Add error boundaries and error states to all components
- **Deliverable**: Comprehensive error handling

#### Task 6.6: Loading States
- **Scope**: Loading indicators for all async operations
- **LLM Task**: Add loading states to all API calls and transitions
- **Deliverable**: Proper loading UX throughout quiz

### **Day 5: Launch Preparation**

#### Task 6.7: Environment Configuration
- **Scope**: Production environment setup
- **LLM Task**: Create environment configuration checklist and validation
- **Deliverable**: Environment setup documentation

#### Task 6.8: Analytics Integration
- **Scope**: Track quiz completion and conversion
- **LLM Task**: Add analytics events for quiz interactions
- **Deliverable**: Analytics tracking for key quiz events

#### Task 6.9: Performance Optimization
- **Scope**: Optimize bundle size and loading
- **LLM Task**: Review and optimize component imports and bundle splitting
- **Deliverable**: Performance optimization recommendations

---

## **TASK COMPLETION GUIDELINES**

### **For Each LLM Task:**
- **Input Required**: Clear requirements and existing code context
- **Output Expected**: Complete, working code for the specific task
- **Dependencies**: List any tasks that must be completed first
- **Testing**: Include basic testing/validation approach
- **Integration**: Note how it connects to existing code

### **Task Size Guidelines:**
- **Single Component**: One component per task
- **Single API Endpoint**: One endpoint per task  
- **Single Feature**: One discrete feature per task
- **Maximum Complexity**: ~100-200 lines of code per task

### **Handoff Requirements:**
Each completed task should include:
1. **Working Code**: Complete implementation
2. **Integration Notes**: How to connect to existing system
3. **Testing Notes**: How to verify it works
4. **Dependencies**: What it needs to function
5. **Next Steps**: What task should follow

---

**Total Tasks: 39 discrete tasks**  
**Estimated LLM Development Time: 1-2 hours per task**  
**Total Development Effort: 39-78 hours across 4 weeks**

This breakdown ensures each task is manageable, self-contained, and can be completed by an LLM in a single focused session.