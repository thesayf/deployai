# White-Label AI Assessment MVP for Consultants

## New Features Summary

### 🏢 Multi-Tenant Architecture
- Each consultant gets their own isolated workspace
- Subdomain-based routing (consultant.deployai.studio)
- Complete data isolation between tenants

### 💳 Subscription Management
- 3 tiers: Starter ($99), Professional ($299), Enterprise ($699)
- Stripe integration for automated billing
- Usage-based limits per tier (10/50/unlimited assessments)

### 👤 Tenant Admin Portal
- Dedicated admin dashboard at /[subdomain]/admin
- View all assessments and completion rates
- Access to AI-generated tool recommendations from Stage 2
- Export prospect data to CSV
- Track email delivery status

### 🎨 White-Label Branding
- Custom logo upload (stored in Supabase)
- Personalized subdomain URL
- Branded assessment pages
- Custom landing page (non-editable template)
- Consultant info display (name, contact)

### 🔒 Security & Access Control
- JWT authentication for tenant admins
- Role-based access (owner, admin, viewer)
- Row-level security (RLS) for data isolation
- Rate limiting based on subscription tier
- Password reset functionality

### 📊 Analytics & Insights
- Assessment completion metrics
- Industry breakdown of prospects
- Average time to complete
- Conversion tracking

### 📧 Communication Features
- Branded report delivery emails
- Assessment invitation links
- Custom thank you pages

### 🔗 Integration Capabilities
- Unique shareable links per assessment
- CSV export for CRM import
- Webhook support (Enterprise tier)
- API access (Enterprise tier)

## Executive Summary
Transform the AI assessment tool into a white-label SaaS product that consultants can use to offer branded assessments to their prospects.

## Core Architecture

### 1. Multi-Tenant Data Model

```sql
-- New tables needed
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  subdomain TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  stripe_customer_id TEXT,
  subscription_tier TEXT DEFAULT 'starter',
  subscription_status TEXT DEFAULT 'trialing',
  trial_ends_at TIMESTAMP,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE tenant_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  password_hash TEXT,
  role TEXT DEFAULT 'owner', -- owner, admin, viewer
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tenant_id, email)
);

-- Update existing tables
ALTER TABLE quiz_responses ADD COLUMN tenant_id UUID REFERENCES tenants(id);
ALTER TABLE ai_reports ADD COLUMN tenant_id UUID REFERENCES tenants(id);

-- Indexes for performance
CREATE INDEX idx_quiz_responses_tenant ON quiz_responses(tenant_id);
CREATE INDEX idx_ai_reports_tenant ON ai_reports(tenant_id);
CREATE INDEX idx_tenants_subdomain ON tenants(subdomain);
```

### 2. Subscription Tiers (Stripe Integration)

| Tier | Price | Assessments/Month | Features |
|------|-------|------------------|----------|
| **Starter** | $99/mo | 10 | Basic branding, CSV export |
| **Professional** | $299/mo | 50 | Full white-label, custom domain, priority support |
| **Enterprise** | $699/mo | Unlimited | API access, custom fields, webhooks |

### 3. Admin Dashboard Features

#### Tenant Admin Panel (`/[subdomain]/admin`)
- **Dashboard Overview**
  - Total assessments this month
  - Completion rate
  - Average time to complete
  - Top industries

- **Assessments View**
  - List all quiz responses with filters
  - Status (completed, abandoned)
  - View individual responses
  - Access generated reports

- **Tool Research Visibility**
  - View Stage 2 tool recommendations
  - See search queries used
  - Export tool lists

- **Prospect Management**
  - Export to CSV
  - Basic CRM view
  - Email status tracking

### 4. White-Label Features

#### Custom Branding
- **Logo Upload**: Max 2MB, stored in Supabase Storage
- **Brand Colors**: Primary and secondary color selection
- **Company Info**: Name, tagline, contact details

#### Custom URLs
- **Subdomain**: `consultant.deployai.studio`
- **Assessment URL**: `consultant.deployai.studio/assessment`
- **Report URLs**: `consultant.deployai.studio/report/[token]`

#### Landing Page
- Non-editable professional template
- Dynamic content:
  - Consultant logo
  - Company name
  - Custom headline (limited to 100 chars)
  - Contact information

### 5. Security (MVP Level)

#### Authentication
- JWT-based auth for tenant users
- Session management with refresh tokens
- Password reset flow

#### Authorization
- Row Level Security (RLS) policies:
```sql
-- Tenants can only see their own data
CREATE POLICY tenant_isolation ON quiz_responses
  FOR ALL USING (tenant_id = current_setting('app.current_tenant')::uuid);
```

#### Rate Limiting
- Starter: 10 assessments/month
- Professional: 50 assessments/month
- Enterprise: Unlimited
- API rate limiting: 100 requests/minute

#### Subdomain Validation
- Middleware to extract and validate subdomain
- Prevent subdomain hijacking
- Reserved subdomains list

### 6. Implementation Phases

## Phase 1: Database & Multi-tenancy (Week 1-2)
- [ ] Create migration files for new tables
- [ ] Implement RLS policies
- [ ] Create tenant service layer
- [ ] Add tenant context middleware
- [ ] Update existing queries to include tenant_id

## Phase 2: Authentication System (Week 2-3)
- [ ] Implement JWT authentication
- [ ] Create login/signup pages
- [ ] Password reset flow
- [ ] Session management
- [ ] Role-based access control

## Phase 3: White-Label Features (Week 3-4)
- [ ] Subdomain routing
- [ ] Logo upload functionality
- [ ] Dynamic branding system
- [ ] Custom landing page template
- [ ] Branded email templates

## Phase 4: Admin Dashboard (Week 4-5)
- [ ] Dashboard layout and navigation
- [ ] Assessments listing with filters
- [ ] Individual assessment viewer
- [ ] Tool recommendations display
- [ ] CSV export functionality
- [ ] Basic analytics charts

## Phase 5: Stripe Integration (Week 5-6)
- [ ] Stripe Customer creation
- [ ] Subscription management
- [ ] Webhook handlers
- [ ] Usage tracking
- [ ] Billing portal integration
- [ ] Trial management

## Phase 6: Public Assessment Flow (Week 6-7)
- [ ] Tenant-aware assessment routing
- [ ] Branded assessment pages
- [ ] Custom thank you pages
- [ ] Report generation with branding
- [ ] Shareable report links

## Additional Features to Consider

### Near-term Enhancements
1. **Custom Email Templates**
   - Branded assessment invites
   - Report delivery emails
   - Follow-up sequences

2. **Analytics Dashboard**
   - Funnel visualization
   - Conversion metrics
   - Time-to-complete analysis
   - Drop-off points

3. **CRM Integration**
   - Webhook for new leads
   - Zapier integration
   - Direct API endpoints

### Future Considerations
1. **Custom Questions**
   - Allow 1-2 custom questions per assessment
   - Question bank for reuse

2. **Report Customization**
   - Multiple report templates
   - Custom sections
   - Branded PDF export

3. **Referral System**
   - Consultant referral program
   - Commission tracking
   - Automated payouts

4. **API Access (Enterprise)**
   - RESTful API
   - API key management
   - Usage analytics
   - Webhook events

## Technical Stack

### Frontend
- Next.js (existing)
- TailwindCSS (existing)
- React Hook Form for tenant onboarding
- Recharts for analytics

### Backend
- Supabase (existing)
- Stripe for payments
- SendGrid for transactional emails
- Vercel for hosting

### File Structure
```
/src
  /pages
    /api
      /tenant
        /register.ts
        /login.ts
        /[id].ts
      /billing
        /webhook.ts
        /portal.ts
      /auth
        /tenant
          /login.ts
          /logout.ts
          /refresh.ts
    /[subdomain]
      /admin
        /index.tsx
        /assessments.tsx
        /settings.tsx
        /billing.tsx
      /assessment
        /index.tsx
      /report
        /[token].tsx
  /components
    /tenant
      /LogoUpload.tsx
      /BrandingPreview.tsx
      /AdminDashboard.tsx
      /AssessmentsList.tsx
      /TenantHeader.tsx
  /lib
    /tenant
      /context.ts
      /middleware.ts
      /service.ts
    /stripe
      /client.ts
      /webhooks.ts
    /auth
      /tenant.ts
  /middleware.ts (subdomain routing)
```

## Environment Variables
```env
# Existing
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

# New
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_STARTER=
STRIPE_PRICE_PROFESSIONAL=
STRIPE_PRICE_ENTERPRISE=
JWT_SECRET=
SENDGRID_API_KEY=
```

## Database Indexes & Performance
```sql
-- Performance optimizations
CREATE INDEX idx_tenant_users_email ON tenant_users(email);
CREATE INDEX idx_quiz_responses_tenant_created ON quiz_responses(tenant_id, created_at DESC);
CREATE INDEX idx_ai_reports_tenant_status ON ai_reports(tenant_id, report_status);
```

## Security Checklist
- [ ] Implement CORS properly for subdomains
- [ ] Add rate limiting per tenant
- [ ] Sanitize all user inputs
- [ ] Implement CSRF protection
- [ ] Add security headers
- [ ] Regular security audits
- [ ] Data encryption at rest
- [ ] GDPR compliance for EU customers

## MVP Success Metrics
- 10 consultant signups in first month
- 50% trial-to-paid conversion
- < 5 minute onboarding time
- 90% assessment completion rate
- < 2% churn rate

## Estimated Timeline
- **Total Development**: 6-7 weeks
- **Beta Testing**: 2 weeks
- **Launch**: Week 9-10

## Cost Estimates
- **Development**: 240-280 hours
- **Monthly Infrastructure**: ~$200-500
- **Break-even**: 5-10 customers