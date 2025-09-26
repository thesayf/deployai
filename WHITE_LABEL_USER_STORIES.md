# User Stories for White-Label AI Assessment MVP

## Overview
This document contains user stories for transforming the AI assessment tool into a white-label platform for consultants. The stories are organized by epic and include acceptance criteria for each feature.

## Epic 1: Consultant Onboarding & Signup

### US-1.1: Initial Signup
**As a** consultant  
**I want to** sign up for the platform  
**So that** I can offer AI assessments to my clients  
**Acceptance Criteria:**
- Form captures: name, company, email, subdomain choice
- Email validation
- Terms of service acceptance checkbox

### US-1.2: Subdomain Selection
**As a** consultant  
**I want to** choose my subdomain  
**So that** I have a personalized URL for my clients  
**Acceptance Criteria:**
- Real-time availability check
- Preview shown: "yourconsulting.deployai.studio"
- Validation for allowed characters (letters, numbers, hyphens)
- Reserved subdomains list (admin, api, www, etc.)

### US-1.3: Subscription Tier Selection
**As a** consultant  
**I want to** select my subscription tier  
**So that** I can choose based on my expected volume  
**Acceptance Criteria:**
- Clear display of 3 tiers:
  - Starter: $199/mo - 5 assessments ($40 each)
  - Professional: $499/mo - 20 assessments ($25 each) 
  - Scale: $997/mo - Unlimited assessments
- Single assessment option: $99 (one-time, no subscription)
- Tier comparison table showing per-assessment savings
- Default selection on Professional
- Clear value messaging: "Save 38%" on Professional vs Starter

### US-1.4: Payment Processing
**As a** consultant  
**I want to** enter payment details securely  
**So that** I can start my subscription  
**Acceptance Criteria:**
- Stripe Checkout integration
- SSL/secure payment
- Immediate confirmation
- 3D Secure support where required

### US-1.5: Welcome Communication
**As a** consultant  
**I want to** receive a welcome email after signup  
**So that** I know how to access my admin portal  
**Acceptance Criteria:**
- Email sent within 1 minute
- Contains admin portal URL
- Includes magic link for first login
- Getting started guide attached

## Epic 2: Authentication & Access

### US-2.1: Magic Link Authentication
**As a** consultant  
**I want to** login via magic link  
**So that** I don't need to remember another password  
**Acceptance Criteria:**
- Enter email → receive link within 30 seconds
- Link valid for 15 minutes
- One-time use only
- Deep linking to intended page after auth

### US-2.2: Session Persistence
**As a** consultant  
**I want** my session to persist for 30 days  
**So that** I don't need to login frequently  
**Acceptance Criteria:**
- JWT token with 30-day expiry
- Automatic refresh on activity
- "Remember me" option
- Secure httpOnly cookies

### US-2.3: Secure Logout
**As a** consultant  
**I want to** logout securely  
**So that** others can't access my data on shared computers  
**Acceptance Criteria:**
- Clear all session tokens
- Invalidate JWT server-side
- Redirect to login page
- Success message displayed

## Epic 3: Assessment Distribution

### US-3.1: Share Assessment URL
**As a** consultant  
**I want to** share my assessment URL with clients  
**So that** they can complete it under my brand  
**Acceptance Criteria:**
- Copy button for URL
- Format: "yourconsulting.deployai.studio/ai-assessment"
- QR code generation option
- Share via email button

### US-3.2: Branded Assessment Display
**As a** business owner  
**I want to** see the consultant's company name on the assessment  
**So that** I know who's providing this service  
**Acceptance Criteria:**
- "AI Assessment by [Consultant Company]" in header
- Consultant company visible on all pages
- No deployAI branding visible to end user

### US-3.3: Frictionless Assessment Completion
**As a** business owner  
**I want to** complete the assessment without creating an account  
**So that** it's frictionless  
**Acceptance Criteria:**
- Same flow as current public assessment
- No login required
- Progress saved in localStorage
- Email capture only at end

### US-3.4: Branded Report Delivery
**As a** business owner  
**I want to** receive my report from the consultant's brand  
**So that** it feels personalized  
**Acceptance Criteria:**
- Email from: "Consultant Name via deployAI"
- Reply-to: consultant's email
- Consultant branding in email template
- Report shows consultant company

## Epic 4: Consultant Admin Portal

### US-4.1: Usage Dashboard
**As a** consultant  
**I want to** see my usage dashboard  
**So that** I know how many assessments I've used this month  
**Acceptance Criteria:**
- Visual display: "3 of 5 assessments used" (Starter) or "15 of 20 assessments used" (Professional)
- Progress bar with color coding (green <60%, yellow 60-80%, red >80%)
- Days remaining in billing period
- Historical usage graph
- "Buy single assessment" button when near/at limit
- Upgrade prompt when at 80% usage

### US-4.2: Assessment List View
**As a** consultant  
**I want to** see a list of all assessments  
**So that** I can track my client engagement  
**Acceptance Criteria:**
- Sortable table with columns:
  - Company name
  - Contact name
  - Date submitted
  - Status (completed/in-progress)
  - Actions (view/download)
- Search functionality
- Filter by date range
- Pagination (20 per page)

### US-4.3: Individual Report Access
**As a** consultant  
**I want to** view individual assessment reports  
**So that** I can discuss results with clients  
**Acceptance Criteria:**
- Full report view with all 4 stages
- Print-friendly format
- Download as PDF option
- Share link generation

### US-4.4: Tool Recommendations Access
**As a** consultant  
**I want to** see the AI tool recommendations from Stage 2  
**So that** I can advise on implementation  
**Acceptance Criteria:**
- Expandable section in report view
- All researched tools with descriptions
- Links to tool websites
- Implementation complexity indicators

### US-4.5: Data Export
**As a** consultant  
**I want to** export assessment data  
**So that** I can use it in proposals  
**Acceptance Criteria:**
- CSV export with columns:
  - Company details
  - Assessment scores
  - Key insights
  - Recommended tools
- Date range selection
- Include/exclude options for data types

## Epic 5: Usage Limits & Enforcement

### US-5.1: Usage Warnings
**As a** consultant on Starter plan  
**I want to** be warned when approaching my limit  
**So that** I can upgrade if needed  
**Acceptance Criteria:**
- Warning banner after using 4 of 5: "1 assessment remaining"
- For Professional, warning at 16 of 20: "4 assessments remaining"
- Dashboard alert changes color (yellow at 80%, red at 100%)
- "Buy single for $99" or "Upgrade to Professional" CTA buttons
- Email notification when limit reached

### US-5.2: Limit Reached Handling
**As a** consultant who hit the limit  
**I want to** see upgrade options  
**So that** I can continue serving clients  
**Acceptance Criteria:**
- Modal shows three options:
  - Buy single assessment for $99
  - Upgrade to next tier (show monthly savings)
  - Contact support
- Comparison: "You'll save $60 by upgrading to Professional"
- One-click upgrade or purchase
- Immediate access after purchase

### US-5.3: Monthly Reset
**As a** consultant  
**I want** my usage to reset monthly  
**So that** I get fresh allocation each billing period  
**Acceptance Criteria:**
- Reset at midnight UTC on billing date
- Stripe webhook triggers reset
- Email confirmation of reset
- Previous month's usage archived

### US-5.4: Unlimited Plan Experience
**As a** consultant on Scale plan  
**I want** no usage tracking UI  
**So that** I can focus on clients  
**Acceptance Criteria:**
- No usage progress bar shown
- "Unlimited" badge displayed
- No warning emails
- No "buy single" prompts
- Full historical data still available
- Usage count for analytics but not limits

## Epic 6: Subscription Management

### US-6.1: Plan Upgrades
**As a** consultant  
**I want to** upgrade my plan mid-cycle  
**So that** I can handle growth  
**Acceptance Criteria:**
- Immediate upgrade activation
- Prorated billing calculation
- Confirmation email with new limits
- Invoice generated

### US-6.2: Plan Downgrades
**As a** consultant  
**I want to** downgrade at next renewal  
**So that** I can reduce costs if needed  
**Acceptance Criteria:**
- Scheduled for end of current period
- Warning about reduced limits
- Current assessments preserved
- Confirmation required if over new limit

### US-6.3: Payment Method Updates
**As a** consultant  
**I want to** update payment methods  
**So that** I can maintain service  
**Acceptance Criteria:**
- Stripe Customer Portal access
- Multiple payment methods supported
- Default payment selection
- Immediate confirmation

### US-6.4: Subscription Cancellation
**As a** consultant  
**I want to** cancel my subscription  
**So that** I have control  
**Acceptance Criteria:**
- End of period cancellation
- Data retained for 90 days
- Export all data option
- Re-activation possible within 90 days

## Epic 7: Branding Customization (MVP Level)

### US-7.1: Assessment Title Customization
**As a** consultant  
**I want to** customize the assessment title  
**So that** it reflects my service  
**Acceptance Criteria:**
- Text field in settings (max 60 chars)
- Live preview
- Updates immediately across all pages
- Default: "AI Business Assessment"

### US-7.2: Company Name Display
**As a** consultant  
**I want** my company name shown prominently  
**So that** clients know it's my service  
**Acceptance Criteria:**
- Displayed in:
  - Assessment header
  - Email templates
  - Report headers
  - Thank you page
- Consistent formatting throughout

## Development Phases

### Phase 1: Foundation (Days 1-2)
**Goal:** Multi-tenant infrastructure
- Subdomain routing implementation
- Database schema creation (tenants table)
- Add tenant_id to quiz_responses
- Subdomain middleware
- Basic tenant isolation

### Phase 2: Authentication (Day 3)
**Goal:** Secure consultant access
- Magic link authentication system
- JWT session management
- Logout functionality
- tenant_sessions table
- Protected route middleware

### Phase 3: Subscription & Payment (Days 4-5)
**Goal:** Revenue generation
- Stripe product/price creation
- Checkout integration
- Webhook handlers (payment, renewal, cancellation)
- Usage reset automation
- Customer portal integration

### Phase 4: Admin Portal (Days 6-7)
**Goal:** Consultant dashboard
- Dashboard layout and navigation
- Usage tracking display
- Assessment list with filters
- Report viewing interface
- Stage 2 tools display

### Phase 5: Limits & Branding (Day 8)
**Goal:** Enforcement and customization
- Usage limit enforcement
- Upgrade/downgrade flows
- Custom title settings
- Company name injection
- Email template customization

### Phase 6: Polish & Testing (Days 9-10)
**Goal:** Production ready
- Complete signup flow
- Welcome email automation
- Share functionality
- CSV export
- End-to-end testing
- Error handling
- Loading states

## Epic 8: Single Assessment Purchase

### US-8.1: One-Time Assessment Purchase
**As a** consultant who needs just one more assessment  
**I want to** buy a single assessment without upgrading  
**So that** I can serve an unexpected client  
**Acceptance Criteria:**
- Purchase option available when at limit
- Price: $99 per assessment (same for all tiers)
- Clear comparison to subscription savings
- Show: "Starter: $40/assessment, Professional: $25/assessment"
- Instant availability after purchase
- Does not count toward subscription limit (pure add-on)

### US-8.2: Single Assessment Upsell
**As a** consultant buying single assessments  
**I want to** see how much I could save with a subscription  
**So that** I make informed decisions  
**Acceptance Criteria:**
- Show savings calculation: "You'd save $59/assessment with Starter, $74/assessment with Professional"
- After 2 singles purchased: "You've spent $198 - Starter is $199 for 5 assessments"
- After 5 singles purchased: "You've spent $495 - Professional is $499 for 20 assessments"
- Persistent upgrade prompt in dashboard
- Email after 3rd single purchase suggesting upgrade

## Success Metrics

### Launch Metrics (Month 1)
- 30 consultant signups
- 50% move from Starter to Professional
- < 5 minute onboarding time
- 0 payment failures

### Growth Metrics (Month 3)
- 75 active consultants
- 400 assessments completed
- < 5% monthly churn
- 4.5+ satisfaction score
- 60% on Professional tier

### Scale Metrics (Month 6)
- 150 active consultants
- $55K MRR
- < 3% monthly churn
- Distribution: 20% Starter, 60% Professional, 20% Scale

## Technical Considerations

### Performance Requirements
- Page load < 2 seconds
- Assessment submission < 1 second
- Report generation < 60 seconds
- 99.9% uptime

### Security Requirements
- All data encrypted in transit (HTTPS)
- Tenant data isolation (RLS)
- GDPR compliant data handling
- Regular security audits

### Scalability Requirements
- Support 1000+ tenants
- Handle 100 concurrent assessments
- Database indexing optimized
- CDN for static assets

## Risks & Mitigations

### Risk 1: Subdomain Complexity
**Risk:** Subdomain routing on Vercel may have limitations  
**Mitigation:** Test early, have fallback to URL paths (/c/consultantname)

### Risk 2: Stripe Integration Delays
**Risk:** Webhook reliability, subscription edge cases  
**Mitigation:** Implement retry logic, manual override admin tools

### Risk 3: Usage Limit Gaming
**Risk:** Consultants creating multiple accounts to bypass limits  
**Mitigation:** Email verification, IP tracking, manual review of suspicious patterns

### Risk 4: Brand Confusion
**Risk:** End users confused about deployAI vs consultant relationship  
**Mitigation:** Clear "Powered by" in footer, terms of service, consultant agreement

## Next Steps
1. Review and approve user stories with stakeholders
2. Create technical design document
3. Set up Stripe test environment
4. Begin Phase 1 development
5. Daily standups during 10-day sprint