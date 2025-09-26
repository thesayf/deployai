# Product Requirements Document: White-Label AI Assessment Platform

## Executive Summary

Transform the existing AI assessment tool into a multi-tenant, white-label SaaS platform that enables consultants to offer branded AI assessments to their clients. The platform will generate recurring revenue through tiered subscriptions while providing consultants with a sophisticated tool to demonstrate value and generate leads.

## Product Vision

Create a platform where consultants can leverage enterprise-grade AI assessment technology under their own brand, enabling them to:
- Offer sophisticated AI readiness assessments without technical expertise
- Generate qualified leads through valuable content
- Close more deals with data-driven insights
- Build recurring revenue streams

## Target Users

### Primary Persona: Professional Services Consultants
- **Demographics:** Independent consultants and small consulting firms (1-10 employees)
- **Industry:** Management, digital transformation, IT consulting
- **Pain Points:** 
  - Need to demonstrate expertise and value quickly
  - Lack technical resources to build assessment tools
  - Struggle to generate qualified leads
  - Want to appear more sophisticated to enterprise clients
- **Goals:**
  - Win more clients
  - Increase average deal size
  - Build thought leadership
  - Scale their practice

### User Segments

1. **The Reseller (30%):** Sells assessments directly for $497-997
2. **The Lead Generator (40%):** Uses assessments as free lead magnets
3. **The Enterprise Consultant (20%):** Mixed model for corporate clients
4. **The Experimenter (10%):** Testing the market with small volumes

## Core Features

### 1. Multi-Tenant Architecture

**Subdomain Routing**
- Each consultant gets: `consultantname.deployai.studio`
- Automatic SSL provisioning
- Subdomain availability checking during signup

**Data Isolation**
- Complete separation of consultant data
- Row-level security in Supabase
- Tenant context injection in all queries

### 2. Subscription Management

**Pricing Tiers**

| Tier | Price | Assessments | Per Assessment | Target User |
|------|-------|------------|----------------|-------------|
| **Starter** | $199/mo | 5 | $40 | Testing/New consultants |
| **Professional** | $499/mo | 20 | $25 | Active consultants |
| **Scale** | $997/mo | Unlimited | Variable | Agencies/High volume |
| **Single** | $99 | 1 | $99 | Emergency/One-off |

**Billing Features**
- Stripe Checkout integration
- Customer Portal for self-service
- Automatic usage reset monthly
- Prorated upgrades/downgrades

### 3. Consultant Admin Portal

**Dashboard (`/[subdomain]/admin`)**
- Usage tracking with visual progress bars
- Assessment list with filtering and search
- Individual report viewing
- AI tool recommendations access (Stage 2)
- CSV export functionality

**Analytics**
- Total assessments completed
- Conversion metrics
- Average completion time
- Industry breakdown
- Monthly trends

### 4. Assessment Experience

**Branded Assessment Flow**
- Consultant's company name in header
- Custom assessment title
- Same powerful 15-question assessment
- 4-stage AI analysis pipeline
- Professional report generation

**Public URL Approach**
- Single URL: `consultant.deployai.studio/assessment`
- Counts against quota when completed
- Automatic limit enforcement
- "Limit reached" messaging with upgrade options

### 5. Authentication System

**Magic Link Authentication**
- Email-based passwordless login
- 30-day session persistence
- JWT token management
- Secure logout functionality

### 6. Email Customization

**Branded Communications**
- From: "Consultant Name via deployAI"
- Reply-to: consultant's email address
- Consultant branding in templates
- Report delivery emails

## Technical Architecture

### Database Schema

```sql
-- Core tenant table
CREATE TABLE tenants (
  id UUID PRIMARY KEY,
  subdomain VARCHAR UNIQUE NOT NULL,
  company_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  custom_title VARCHAR,
  stripe_customer_id VARCHAR,
  stripe_subscription_id VARCHAR,
  subscription_tier ENUM('starter','professional','scale'),
  subscription_status ENUM('trialing','active','canceled','past_due'),
  assessments_used INTEGER DEFAULT 0,
  assessments_limit INTEGER, -- 5, 20, or NULL for unlimited
  billing_period_start TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tenant authentication
CREATE TABLE tenant_sessions (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id),
  token VARCHAR UNIQUE,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Update existing tables
ALTER TABLE quiz_responses ADD COLUMN tenant_id UUID REFERENCES tenants(id);
ALTER TABLE ai_reports ADD COLUMN tenant_id UUID REFERENCES tenants(id);

-- Indexes for performance
CREATE INDEX idx_quiz_responses_tenant ON quiz_responses(tenant_id);
CREATE INDEX idx_tenants_subdomain ON tenants(subdomain);
```

### Technology Stack

- **Frontend:** Next.js 14, TypeScript, TailwindCSS
- **Backend:** Next.js API routes, Upstash Workflow
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Magic links with JWT
- **Payments:** Stripe
- **Hosting:** Vercel
- **Email:** SendGrid

### Security Considerations

- Row-level security policies per tenant
- JWT authentication with secure httpOnly cookies
- Subdomain validation and sanitization
- Rate limiting on assessment creation
- Email deduplication (30-day cooldown)
- HTTPS enforcement
- GDPR compliance

## User Flows

### Consultant Onboarding Flow

1. Land on marketing page → Click "Start Free Trial"
2. Enter company details and choose subdomain
3. Select subscription tier (default: Professional)
4. Enter payment details via Stripe Checkout
5. Receive welcome email with magic link
6. Access admin dashboard
7. Share assessment URL with prospects

### Assessment Completion Flow

1. Prospect receives `consultant.deployai.studio/assessment`
2. Clicks link → Sees consultant branding
3. Completes 15-question assessment
4. Receives branded report via email
5. Consultant notified of completion
6. Report accessible in consultant dashboard

### Usage Limit Flow

1. Consultant approaches limit (80% used)
2. Warning banner appears in dashboard
3. At 100% limit, assessment URL shows "Limit Reached"
4. Options presented:
   - Buy single assessment ($99)
   - Upgrade to next tier
   - Wait for monthly reset

## Success Metrics

### Business Metrics
- **MRR Target:** $50K within 6 months
- **Customer Acquisition:** 150 consultants
- **Tier Distribution:** 20% Starter, 60% Professional, 20% Scale
- **Churn Rate:** <3% monthly
- **LTV:CAC Ratio:** >3:1

### Product Metrics
- **Activation Rate:** 80% complete first assessment within 7 days
- **Usage Rate:** Average 60% of allocated assessments used
- **Upgrade Rate:** 50% move from Starter to Professional within 3 months
- **NPS Score:** >50

### Technical Metrics
- **Page Load:** <2 seconds
- **Assessment Completion:** <60 seconds
- **Uptime:** 99.9%
- **Support Tickets:** <5% of active users

## Development Phases

### Phase 1: Foundation (Days 1-2)
- Multi-tenant database schema
- Subdomain routing middleware
- Tenant isolation policies
- Basic tenant CRUD operations

### Phase 2: Authentication (Day 3)
- Magic link system
- JWT session management
- Protected routes
- Logout functionality

### Phase 3: Payments (Days 4-5)
- Stripe product setup
- Checkout integration
- Webhook handlers
- Customer Portal integration

### Phase 4: Admin Portal (Days 6-7)
- Dashboard UI
- Assessment management
- Report viewing
- Usage tracking

### Phase 5: Enforcement (Day 8)
- Usage limits
- Upgrade flows
- Single assessment purchases
- Email customization

### Phase 6: Polish (Days 9-10)
- Complete testing
- Error handling
- Documentation
- Production deployment

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Subdomain complexity on Vercel | High | Test early, fallback to path-based routing |
| Stripe webhook reliability | Medium | Implement retry logic and manual controls |
| Usage limit gaming | Medium | Email verification, IP tracking |
| Viral abuse of public URLs | High | Usage limits auto-stop viral spread |
| Brand confusion | Low | Clear "Powered by" attribution |

## Future Enhancements

### Phase 2 (Months 2-3)
- Logo upload and visual branding
- Custom email templates
- Team member accounts
- API access for Enterprise

### Phase 3 (Months 4-6)
- Custom assessment questions
- White-label mobile app
- Advanced analytics dashboard
- Zapier integration
- Affiliate program

## Go-to-Market Strategy

### Pricing Psychology
- Single assessment at $99 drives subscription adoption
- Starter tier enables low-risk testing
- Professional tier positioned as best value
- Scale tier for serious operators

### Launch Strategy
1. Beta with 10 friendly consultants
2. Product Hunt launch
3. Content marketing (case studies)
4. Affiliate/referral program
5. Partnership with consulting communities

## Competitive Analysis

| Competitor | Price Point | Our Advantage |
|------------|------------|---------------|
| Typeform | $59/mo | No AI analysis |
| SurveyMonkey | $99/mo | No AI, not industry-specific |
| Custom Build | $10K+ | 50x more expensive |
| Manual Process | $2K per assessment | We're 10x faster |

## Conclusion

The white-label AI assessment platform represents a significant opportunity to transform a single product into a scalable SaaS business. With clear tier differentiation, strong unit economics, and natural upgrade paths, the platform can achieve $50K MRR within 6 months while providing genuine value to consultants and their clients.

**Investment Required:** 10 days development + $500/month infrastructure
**Break-even:** 10 customers
**Target ROI:** 20x within 12 months