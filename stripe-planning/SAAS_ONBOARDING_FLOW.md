# SaaS User Onboarding & Pricing Flow - Implementation Plan

**Last Updated:** 2025-10-08
**Status:** Phase 1 Complete (Domain Config, Plan Selection Page)

---

## Overview

This document outlines the complete user journey from landing page to dashboard for our multi-tenant SaaS platform, with integrated Stripe billing and trial management.

---

## Current State Analysis

### ✅ Completed

1. **Global Signup** (`/src/pages/signup.tsx`)
   - Creates tenant + user account
   - Auto-generates subdomain from company name
   - Validates subdomain uniqueness
   - Auto-confirms email (dev mode)

2. **Tenant Login** (`/src/pages/[tenant]/admin/login.tsx`)
   - Tenant-specific authentication
   - Email/password + Google OAuth

3. **Trial Setup Page** (`/src/pages/[tenant]/admin/billing/trial-setup.tsx`)
   - Stripe Checkout integration
   - 14-day trial with Starter plan
   - Captures payment method

4. **Success Page** (`/src/pages/[tenant]/admin/billing/success.tsx`)
   - Post-payment confirmation
   - Auto-redirects to dashboard

5. **Admin Dashboard** (`/src/pages/[tenant]/admin/index.tsx`)
   - Main app interface
   - Protected route

6. **Billing Page** (`/src/pages/[tenant]/admin/settings/billing.tsx`)
   - Current plan display
   - Payment method management
   - Invoice history
   - Cancel subscription

7. **Domain Configuration** (`/src/config/site.ts`)
   - Domain-agnostic settings
   - Environment-based URLs
   - Helper functions for subdomain handling

8. **Plan Selection Page** (`/src/pages/[tenant]/admin/billing/select-plan.tsx`)
   - Custom neobrutalist design
   - 3 plan tiers (Starter, Professional, Scale)
   - Trial terms display
   - Explore dashboard option

9. **TypeScript Support** (`/src/types/stripe-pricing-table.d.ts`)
   - Stripe Pricing Table web component types

### ⚠️ Missing/In Progress

1. **Landing Page** (`/src/pages/index.tsx`)
   - CTAs still point to Calendly instead of `/signup`
   - Needs update to new signup flow

2. **Auth Redirect Logic** (`/src/pages/auth/redirect.tsx`)
   - Doesn't route to plan selection for new users
   - Only checks for trial-setup (old flow)

3. **Signup Page**
   - Hardcoded domain references
   - Needs to use `siteConfig`

4. **Public Pricing Page**
   - Optional standalone page for marketing
   - Could use Stripe Pricing Table embed

---

## User Journey Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      LANDING PAGE (/)                           │
│  - View pricing section                                          │
│  - Click "Start Free Trial" CTA                                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                   GLOBAL SIGNUP (/signup)                       │
│  - Enter: Email, Password, Company Name, Subdomain              │
│  - Creates: User + Tenant (status: 'trialing')                  │
│  - Auto-confirm email (dev) or send confirmation (prod)         │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│            LOGIN PAGE (/[tenant]/admin/login)                   │
│  - User logs in with email/password or Google OAuth             │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│              AUTH REDIRECT (/auth/redirect)                     │
│  - Checks subscription status                                   │
│  - Routes user based on account state                           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
         ┌───────────────┴───────────────┐
         │                               │
         ↓                               ↓
┌──────────────────┐            ┌──────────────────┐
│ Has Subscription?│            │ No Subscription? │
│ (active/trialing)│            │ No Payment Setup │
└────────┬─────────┘            └────────┬─────────┘
         │                               │
         ↓                               ↓
┌──────────────────┐            ┌──────────────────────────────┐
│    DASHBOARD     │            │  PLAN SELECTION              │
│ /[tenant]/admin  │            │  /[tenant]/admin/billing/    │
│                  │            │  select-plan                 │
│ - Full access    │            │                              │
│ - All features   │            │  - Choose plan               │
└──────────────────┘            │  - Start trial               │
                                │  - OR explore first          │
                                └──────────┬───────────────────┘
                                           │
                                           ↓
                                ┌────────────────────┐
                                │ STRIPE CHECKOUT    │
                                │ (hosted by Stripe) │
                                │                    │
                                │ - Enter card       │
                                │ - Billing address  │
                                │ - 14-day trial     │
                                └──────────┬─────────┘
                                           │
                                           ↓
                                ┌────────────────────┐
                                │  SUCCESS PAGE      │
                                │  /[tenant]/admin/  │
                                │  billing/success   │
                                │                    │
                                │  - Confirms trial  │
                                │  - Auto-redirect   │
                                └──────────┬─────────┘
                                           │
                                           ↓
                                ┌────────────────────┐
                                │    DASHBOARD       │
                                │  /[tenant]/admin   │
                                │                    │
                                │  - Full access     │
                                │  - Trial active    │
                                └────────────────────┘
```

---

## Implementation Phases

### Phase 1: Foundation ✅ COMPLETE

**Files Created:**
- `/src/config/site.ts` - Domain configuration
- `/src/types/stripe-pricing-table.d.ts` - TypeScript definitions
- `/src/pages/[tenant]/admin/billing/select-plan.tsx` - Plan selection page
- `/stripe-planning/DESIGN_GUIDELINES.md` - Design system documentation

**Outcome:** Infrastructure ready for complete flow

---

### Phase 2: Auth Redirect Enhancement

**File to Modify:** `/src/pages/auth/redirect.tsx`

**Current Logic:**
```typescript
// If no stripe_customer_id AND no subscription_status → trial-setup
if (!tenant.stripe_customer_id && !tenant.subscription_status) {
  router.push(`/${storedSubdomain}/admin/billing/trial-setup`);
}
```

**New Logic:**
```typescript
// Check subscription status more thoroughly
const hasActiveSubscription =
  tenant.subscription_status === 'active' ||
  tenant.subscription_status === 'trialing';

const hasPaymentMethod = !!tenant.stripe_customer_id;
a
if (!hasActiveSubscription || !hasPaymentMethod) {
  // New user OR expired trial → Plan Selection
  console.log('No active subscription - redirecting to plan selection');
  router.push(`/${storedSubdomain}/admin/billing/select-plan`);
  return;
}

// Existing customer with active subscription → Dashboard
console.log('Active subscription - redirecting to dashboard');
router.push(`/${storedSubdomain}/admin`);
```

**Testing:**
- New user signup → should route to select-plan
- User with trial → should route to dashboard
- User with active subscription → should route to dashboard
- User with expired subscription → should route to select-plan

---

### Phase 3: Signup Page Domain Config

**File to Modify:** `/src/pages/signup.tsx`

**Changes:**
1. Import `siteConfig`
```typescript
import { siteConfig, formatSubdomainPreview } from '@/config/site';
```

2. Replace hardcoded domain preview (line ~181)
```typescript
// OLD
<p className="mt-2 text-xs text-gray-500">
  Your portal will be: <strong>{subdomain || 'yourcompany'}.deployai.studio</strong>
</p>

// NEW
<p className="mt-2 text-xs text-gray-500">
  Your portal will be: <strong>{formatSubdomainPreview(subdomain)}</strong>
</p>
```

3. Update success message references
```typescript
// Use siteConfig.domain instead of hardcoded values
```

---

### Phase 4: Update Landing Page CTAs

**File to Modify:** `/src/pages/index.tsx`

**Current CTAs:**
- Hero: Links to Calendly
- Pricing: Links to Calendly
- Final CTA: Links to Calendly

**New CTAs:**
```typescript
// Hero Section (line ~127)
<Button
  size="large"
  intent="cta"
  onClick={() => router.push('/signup')}
  className="transform hover:scale-105 transition-all w-full text-sm md:text-base"
>
  START YOUR FREE TRIAL
</Button>

// Pricing Section (line ~134)
// Either link to /signup or /pricing (if we create standalone pricing page)

// Final CTA (line ~233-239)
<CTABanner
  variant="default"
  title="Get Your Solution Built in 30 Days"
  subtitle="Start your free 14-day trial today. No credit card required."
  buttonText="Start Free Trial"
  buttonLink="/signup"  // Changed from Calendly
  accentColor="orange"
  alignment="center"
  showIcon={true}
/>
```

**Note:** Consider A/B testing - some businesses prefer direct booking vs self-serve signup

---

### Phase 5: Update API to Support Plan Selection

**File to Modify:** `/src/pages/api/stripe/create-trial-session.ts`

**Current:** Only supports Starter plan (hardcoded)

**Enhancement:** Accept `planId` parameter

```typescript
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tenantId, email, planId, successUrl, cancelUrl } = req.body;

  // Map planId to price ID
  const priceId = planId === 'professional'
    ? process.env.STRIPE_PRICE_PROFESSIONAL_ID
    : planId === 'scale'
    ? process.env.STRIPE_PRICE_SCALE_ID
    : process.env.STRIPE_PRICE_STARTER_ID; // default

  // Rest of session creation...
}
```

**Environment Variables Needed:**
```bash
STRIPE_PRICE_STARTER_ID=price_xxx
STRIPE_PRICE_PROFESSIONAL_ID=price_xxx
STRIPE_PRICE_SCALE_ID=price_xxx
```

---

### Phase 6: Optional - Public Pricing Page

**New File:** `/src/pages/pricing.tsx`

**Option A: Stripe Pricing Table (Fastest)**

```typescript
'use client';
import { useEffect } from 'react';
import { SectionWrapper } from '@/components/section-wrapper';

export default function PricingPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/pricing-table.js';
    script.async = true;
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  return (
    <>
      <SectionWrapper variant="dark" spacing="none">
        <div className="py-16 text-center">
          <h1 className="text-4xl font-black text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-300">
            14-day free trial • No credit card required
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="default" spacing="large">
        <stripe-pricing-table
          pricing-table-id={process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID}
          publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
        />
      </SectionWrapper>
    </>
  );
}
```

**Option B: Custom UI (More Control)**
- Replicate `select-plan.tsx` but without login requirement
- CTA goes to `/signup?plan=starter` with pre-selection

---

## Stripe Configuration

### Products to Create in Stripe Dashboard

1. **Starter Plan**
   - Price: $199/month
   - Trial: 14 days
   - Features: 5 assessments/month
   - Price ID → `STRIPE_PRICE_STARTER_ID`

2. **Professional Plan**
   - Price: $499/month
   - Trial: 14 days
   - Features: 20 assessments/month
   - Price ID → `STRIPE_PRICE_PROFESSIONAL_ID`

3. **Scale Plan**
   - Price: $997/month
   - Trial: 14 days
   - Features: Unlimited assessments
   - Price ID → `STRIPE_PRICE_SCALE_ID`

### Webhook Events to Handle

Already configured in `/src/pages/api/stripe/webhook.ts`:
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

### Stripe Pricing Table Setup (Optional)

1. Go to Stripe Dashboard → Product Catalog → Pricing Tables
2. Click "Create pricing table"
3. Add all 3 products
4. Configure trial period: 14 days
5. Set success URL: `https://[domain]/auth/callback?checkout_session_id={CHECKOUT_SESSION_ID}`
6. Copy pricing table ID → `NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID`

---

## Environment Variables

```bash
# Domain Configuration
NEXT_PUBLIC_DOMAIN=deployai.studio
NEXT_PUBLIC_SITE_NAME=DeployAI
NEXT_PUBLIC_SUPPORT_EMAIL=support@deployai.studio

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Stripe Price IDs
STRIPE_PRICE_STARTER_ID=price_xxx
STRIPE_PRICE_PROFESSIONAL_ID=price_xxx
STRIPE_PRICE_SCALE_ID=price_xxx

# Stripe Pricing Table (Optional)
NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID=prctbl_xxx
```

---

## Testing Checklist

### New User Flow
- [ ] Land on homepage
- [ ] Click "Start Free Trial"
- [ ] Fill out signup form
- [ ] Create account successfully
- [ ] Redirect to login page
- [ ] Login with new credentials
- [ ] Route to plan selection page
- [ ] View all 3 plans
- [ ] Click "Start Free Trial" on a plan
- [ ] Redirect to Stripe Checkout
- [ ] Enter test card (4242 4242 4242 4242)
- [ ] Complete checkout
- [ ] Redirect to success page
- [ ] Auto-redirect to dashboard
- [ ] See trial status in billing page

### Returning User Flow
- [ ] User with active trial logs in
- [ ] Routes directly to dashboard
- [ ] Can view billing page
- [ ] Can manage subscription

### Edge Cases
- [ ] User tries reserved subdomain
- [ ] User tries existing subdomain
- [ ] User cancels Stripe checkout (returns to select-plan)
- [ ] User explores dashboard without trial
- [ ] User with expired trial tries to login

---

## Database Schema

### Tenants Table Fields (Already Exist)

```sql
CREATE TABLE tenants (
  id UUID PRIMARY KEY,
  subdomain VARCHAR(255) UNIQUE NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  billing_email VARCHAR(255),
  owner_id UUID REFERENCES auth.users(id),

  -- Stripe fields
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  subscription_status VARCHAR(50) CHECK (subscription_status IN (
    'trialing', 'active', 'canceled', 'incomplete',
    'incomplete_expired', 'past_due', 'unpaid', 'paused'
  )),
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,

  -- Plan fields
  plan_name VARCHAR(50),
  assessments_limit INTEGER,
  assessments_used INTEGER DEFAULT 0,

  -- Payment method
  payment_method_brand VARCHAR(50),
  payment_method_last4 VARCHAR(4),
  payment_method_exp_month INTEGER,
  payment_method_exp_year INTEGER,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  trial_end TIMESTAMP WITH TIME ZONE
);
```

---

## Success Metrics

### Conversion Funnel
1. **Landing Page → Signup:** Track conversion rate
2. **Signup → Login:** Track completion rate
3. **Login → Plan Selection:** Track time to decision
4. **Plan Selection → Checkout:** Track plan distribution
5. **Checkout → Success:** Track completion rate
6. **Success → Dashboard:** Track activation

### Key Metrics to Monitor
- Signup conversion rate
- Trial start rate
- Trial-to-paid conversion
- Average time to first assessment
- Churn rate
- Plan distribution (Starter vs Professional vs Scale)

---

## Next Steps (Priority Order)

1. **Update auth redirect logic** - Route new users to plan selection
2. **Update signup page** - Use domain config
3. **Update landing page CTAs** - Point to `/signup`
4. **Update API** - Support plan selection parameter
5. **Test end-to-end flow** - All user journeys
6. **(Optional) Create pricing page** - If needed for SEO/marketing
7. **Deploy to production** - With environment variables configured

---

## Design Reference

All new pages should follow the design guidelines in `/DESIGN_GUIDELINES.md`:
- Clean, simple layouts
- Subtle neobrutalist accents (not heavy)
- Use `SectionWrapper` for sections
- Match AI Assessment landing page style
- Mobile-first responsive design

---

## Notes

- The current plan selection page (`select-plan.tsx`) is complete and follows the design system
- Domain configuration is ready for any domain deployment
- Stripe integration is ready, just needs price IDs configured
- Auth flow needs updating to route users correctly
- Consider A/B testing direct signup vs Calendly booking for enterprise leads

---

**End of Plan**
