# Stripe Billing Implementation Tracker

## Overview

Comprehensive implementation plan for MVP Stripe billing integration in deployAI multi-tenant SaaS platform. This tracker ensures systematic progress with thorough testing at each stage.

**Key Requirements (Aligned with STRIPE_BILLING_EPIC_REVISED.md):**
- 14-day free trial with **credit card required UPFRONT**
- Auto-enrollment to paid plan on day 15
- Trial setup **immediately after OAuth signup**
- Stripe handles auto-conversion using `trial_period_days`

## Implementation Timeline

**Target Completion**: 5 days
**Current Status**: Step 4 - Trial Onboarding Flow (REVISED)
**Progress**: 30% Complete (plan revised)

## Phase 1: Foundation (COMPLETED ✅)

### Step 1: Environment Setup ✅
- [x] Install Stripe packages (`stripe`, `@stripe/stripe-js`)
- [x] Create environment variables template (`.env.local.example`)
- [x] Initialize Stripe client with 2025 API version
- [x] Create subscription tier configuration
- [x] Test Stripe connection endpoint
- **Files Created**: `src/lib/stripe.ts`, `src/pages/api/stripe/test-connection.ts`
- **Tested**: ✅ Stripe connection successful

### Step 2: Database Schema ✅
- [x] Create billing fields migration (`007_add_stripe_billing_fields.sql`)
- [x] Add tenant billing columns (subscription_status, tier, limits, etc.)
- [x] Create helper functions (`increment_assessment_usage`, `can_create_assessment`)
- [x] Create `billing_status` view for dashboard
- [x] Add indexes and constraints
- **Files Created**: `supabase/migrations/007_add_stripe_billing_fields.sql`
- **Tested**: ✅ Migration applied, billing_status view working

### Step 3: Core Synchronization ✅
- [x] Build master sync function (`syncStripeDataToSupabase`)
- [x] Handle subscription states, trial periods, payment methods
- [x] Implement usage reset on new billing periods
- [x] Create test endpoints for sync verification
- [x] Fix TypeScript compatibility issues
- **Files Created**: `src/lib/stripe/sync.ts`, test endpoints
- **Tested**: ✅ Build passing, sync function working

## Phase 2: Trial Onboarding Flow (COMPLETED ✅)

### Step 4: Trial Setup After OAuth ✅
- [x] **4.1**: Modify OAuth callback to redirect to trial setup
- [x] **4.2**: Create trial setup page with clear messaging
- [x] **4.3**: Create trial checkout session API (with trial_period_days)
- [x] **4.4**: Build billing success page

#### Step 4.1: OAuth Callback Modification ✅
**File**: `src/pages/auth/redirect.tsx`
**Implementation**:
- Added tenant billing status check
- Redirects new users (no stripe_customer_id) to `/[tenant]/admin/billing/trial-setup`
- Redirects existing users to dashboard
- Handles error states gracefully

#### Step 4.2: Trial Setup Page ✅
**File**: `src/pages/[tenant]/admin/billing/trial-setup.tsx`
**Implementation**:
- Neubrutalist design with clear trial messaging
- Trial benefits cards (5 assessments, full access, auto-upgrade)
- Primary CTA: "Start Free Trial" button
- Secondary option: "Explore Dashboard First" button
- Error handling and loading states
- Credit card requirement notice

#### Step 4.3: Trial Checkout Session API ✅
**File**: `src/pages/api/stripe/create-trial-session.ts`
**Implementation**:
- Creates/retrieves Stripe customer
- Creates checkout session with trial_period_days: 14
- Uses Starter plan ($199/mo after trial)
- Includes tenant metadata for tracking
- Proper error handling and logging

#### Step 4.4: Billing Success Page ✅
**File**: `src/pages/[tenant]/admin/billing/success.tsx`
**Implementation**:
- Success confirmation with trial details
- 5-second auto-redirect to dashboard
- Manual redirect button option
- Matches neubrutalist design system

**Build Status**: ✅ All files compile successfully

### Step 5: Checkout Session Creation (PENDING)
- [ ] **5.1**: Create checkout session API
- [ ] **5.2**: Build billing UI components
- [ ] **5.3**: Create success/cancel handlers

#### Step 5.1: Checkout Session API
**File**: `src/pages/api/stripe/create-checkout-session.ts`
**Features**:
- Create checkout session with trial period
- Link to existing customer (never ephemeral)
- Support all subscription tiers
- Include proper metadata

#### Step 5.2: Billing UI Components
**Files**:
- `src/components/billing/PricingCards.tsx`
- `src/components/billing/CheckoutButton.tsx`
- `src/components/billing/BillingDashboard.tsx`

#### Step 5.3: Success/Cancel Handlers
**Files**:
- `src/pages/billing/success.tsx`
- `src/pages/billing/cancel.tsx`

### Step 6: Webhook Handler (PENDING)
**File**: `src/pages/api/stripe/webhook.ts`
**Features**:
- Handle all critical webhook events
- Signature verification
- Trigger sync function
- Idempotent processing

### Step 7: Usage Enforcement Integration (PENDING)
**Integration Points**:
- Assessment creation flow
- Dashboard usage display
- Upgrade prompts
- Trial expiration handling

## Testing Framework

### Unit Tests
- [ ] Stripe client initialization
- [ ] Sync function logic
- [ ] Customer creation
- [ ] Webhook processing

### Integration Tests
- [ ] End-to-end subscription flow
- [ ] Trial to paid conversion
- [ ] Usage limit enforcement
- [ ] Webhook → Database sync

### Manual Test Scenarios

#### Customer Creation Flow
1. **New Customer**: First-time signup
2. **Existing Customer**: Returning user
3. **Error Handling**: Invalid data, network failures
4. **Database Consistency**: Customer-tenant linking

#### Subscription Flow
1. **Trial Signup**: 14-day trial creation
2. **Payment Collection**: Credit card requirement
3. **Auto-Conversion**: Trial to paid transition
4. **Cancellation**: Immediate and end-of-period

#### Usage Tracking
1. **Limit Enforcement**: Block over-limit actions
2. **Usage Reset**: New billing period handling
3. **Upgrade Flow**: Tier change scenarios

## File Structure

```
src/
├── lib/
│   └── stripe/
│       ├── index.ts          ✅ Stripe client
│       └── sync.ts           ✅ Sync function
├── pages/
│   └── api/
│       └── stripe/
│           ├── test-connection.ts     ✅ Test endpoint
│           ├── test-sync.ts           ✅ Sync test
│           ├── create-customer.ts     ✅ Customer creation
│           ├── create-checkout-session.ts  ⏳ Pending
│           └── webhook.ts             ⏳ Pending
├── components/
│   └── billing/
│       ├── CustomerSetup.tsx          ⏳ Pending
│       ├── PricingCards.tsx           ⏳ Pending
│       ├── CheckoutButton.tsx         ⏳ Pending
│       └── BillingDashboard.tsx       ⏳ Pending
└── pages/
    └── billing/
        ├── success.tsx                ⏳ Pending
        └── cancel.tsx                 ⏳ Pending
```

## Environment Variables Required

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Product Price IDs
STRIPE_PRICE_STARTER_ID=price_...
STRIPE_PRICE_PROFESSIONAL_ID=price_...
STRIPE_PRICE_SCALE_ID=price_...
STRIPE_PRICE_SINGLE_ID=price_...
```

## Critical Success Metrics

- [ ] Zero orphaned Stripe customers
- [ ] 100% webhook event processing
- [ ] Accurate usage tracking and limits
- [ ] Seamless trial to paid conversion
- [ ] Proper error handling and recovery
- [ ] Mobile-responsive billing UI

## Risk Mitigation

### Race Conditions
- Atomic database operations
- Idempotent webhook processing
- Proper transaction handling

### Data Consistency
- Single source of truth (sync function)
- Regular reconciliation
- Error logging and alerts

### Payment Failures
- Retry logic for failed webhooks
- Graceful degradation
- Clear user communication

## Next Actions

1. **Immediate**: Test customer creation API endpoint
2. **Today**: Build customer creation UI component
3. **Tomorrow**: Create checkout session API
4. **This Week**: Complete full billing flow

## Notes

- Using Pages Router for API routes (not App Router)
- Stripe API version: `2025-09-30.clover`
- Trial period: 14 days with credit card required
- Single subscription per customer enforced
- All webhook events logged for debugging