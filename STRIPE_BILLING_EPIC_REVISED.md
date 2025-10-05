# Epic: Stripe Subscription Billing Integration (MVP)

## Overview
Implement 14-day free trial + subscription billing for the white-label AI assessment platform using a robust, race-condition-free approach.

## Trial Model
- **14-day free trial** with Starter plan benefits (5 assessments)
- **Credit card required** upfront (not charged for 14 days)
- **Auto-enrollment** to Starter ($199/mo) on day 15
- **Cancel anytime** during trial, keep benefits until trial ends
- **Single assessment option**: $99 (available anytime)

## Core Philosophy (Updated 2025 Best Practices)
**Avoid Stripe's "split brain" problem** by:
1. **Creating customers BEFORE checkout** (never ephemeral) - Critical for avoiding orphaned sessions
2. **Using a single `syncStripeDataToSupabase` function** for ALL updates - Single source of truth pattern
3. **Storing complete subscription state in Supabase** (our KV equivalent) - Eliminates API dependency
4. **Using Stripe's `trial_period_days`** for automatic trial management - No manual trial tracking
5. **Implementing proper Next.js App Router webhook handling** - Raw body parsing required
6. **Enforcing single subscription per customer** - Prevents billing confusion

## Architecture Overview

### Data Flow
```
User signs up → Trial starts (14 days) → Auto-charge on day 15 → Monthly billing
                     ↓                           ↓
              Can use 5 assessments      Full Starter plan access
```

### Key Components
- **Single sync function**: `syncStripeDataToSupabase(customerId)`
- **Trial tracking**: `trial_end_date` field for client-side trial status
- **Auto-enrollment**: Stripe handles trial-to-paid transition
- **Usage enforcement**: Check trial status + usage limits

---

## Implementation Plan

### Phase 1: Database & Stripe Setup (Day 1)

#### 1.1 Database Schema
```sql
-- Update tenants table for 14-day trial model
ALTER TABLE tenants ADD COLUMN
  stripe_customer_id VARCHAR UNIQUE,
  stripe_subscription_id VARCHAR,
  subscription_status VARCHAR DEFAULT 'trialing',
  subscription_tier VARCHAR DEFAULT 'starter',
  trial_end_date TIMESTAMP DEFAULT (NOW() + INTERVAL '14 days'),
  assessments_used INTEGER DEFAULT 0,
  assessments_limit INTEGER DEFAULT 5, -- Starter plan benefits during trial
  single_assessments_purchased INTEGER DEFAULT 0,
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  payment_method_brand VARCHAR,
  payment_method_last4 VARCHAR;

-- Add indexes
CREATE INDEX idx_tenants_stripe_customer ON tenants(stripe_customer_id);
CREATE INDEX idx_tenants_subscription_status ON tenants(subscription_status);

-- Usage tracking function
CREATE OR REPLACE FUNCTION increment_assessment_usage(p_tenant_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE tenants
  SET assessments_used = assessments_used + 1
  WHERE id = p_tenant_id
  AND (assessments_limit IS NULL OR assessments_used < assessments_limit);
END;
$$ LANGUAGE plpgsql;
```

#### 1.2 Stripe Configuration (2025 Best Practices)
```typescript
// Products to create in Stripe Dashboard with trial_period_days
const products = {
  starter: {
    name: 'AI Assessment Platform - Starter',
    price: 19900, // $199.00
    recurring: {
      interval: 'month',
      trial_period_days: 14 // Built-in trial handling
    },
    metadata: {
      tier: 'starter',
      assessments_limit: '5'
    }
  },
  professional: {
    name: 'AI Assessment Platform - Professional',
    price: 49900, // $499.00
    recurring: {
      interval: 'month',
      trial_period_days: 14
    },
    metadata: {
      tier: 'professional',
      assessments_limit: '20'
    }
  },
  scale: {
    name: 'AI Assessment Platform - Scale',
    price: 99700, // $997.00
    recurring: {
      interval: 'month',
      trial_period_days: 14
    },
    metadata: {
      tier: 'scale',
      assessments_limit: 'unlimited'
    }
  },
  single: {
    name: 'Single Assessment',
    price: 9900, // $99.00
    metadata: {
      type: 'one_time',
      assessments_count: '1'
    }
  }
};

// CRITICAL Stripe Dashboard Settings (2025):
// 1. DISABLE Cash App Pay (Settings → Payment methods → Wallets)
// 2. ENABLE "Limit customers to one subscription" (Settings → Subscriptions → Multiple subscriptions)
// 3. Set up webhook endpoint: https://deployai.studio/api/stripe/webhook
// 4. Configure Customer Portal (Settings → Customer Portal)
// 5. Enable Smart Retries for failed payments (Settings → Retry logic)
// 6. Set invoice.auto_advance to true for automatic collection
```

### Phase 2: Core Sync Function (Day 2)

#### 2.1 The Master Sync Function
```typescript
// /src/lib/stripe/sync.ts
import { createClient } from '@/utils/supabase/server';
import { stripe } from '@/lib/stripe';

export async function syncStripeDataToSupabase(customerId: string) {
  const supabase = createClient();

  try {
    // Fetch latest subscription data from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1, // We limit to one subscription per customer in Stripe settings
      status: 'all',
      expand: ['data.default_payment_method', 'data.latest_invoice']
    });

    // Get tenant by stripe_customer_id
    const { data: tenant } = await supabase
      .from('tenants')
      .select('*')
      .eq('stripe_customer_id', customerId)
      .single();

    if (!tenant) {
      throw new Error(`No tenant found for Stripe customer ${customerId}`);
    }

    if (subscriptions.data.length === 0) {
      // No active subscription
      await supabase
        .from('tenants')
        .update({
          subscription_status: 'none',
          subscription_tier: null,
          stripe_subscription_id: null,
          price_id: null,
          assessments_limit: null,
          current_period_start: null,
          current_period_end: null,
          cancel_at_period_end: false
        })
        .eq('stripe_customer_id', customerId);

      return { status: 'none' };
    }

    const subscription = subscriptions.data[0];
    const priceId = subscription.items.data[0].price.id;

    // Map price ID to tier and limits
    const tierMapping = {
      [process.env.STRIPE_PRICE_STARTER_ID!]: { tier: 'starter', limit: 5 },
      [process.env.STRIPE_PRICE_PROFESSIONAL_ID!]: { tier: 'professional', limit: 20 },
      [process.env.STRIPE_PRICE_SCALE_ID!]: { tier: 'scale', limit: null }
    };

    const tierInfo = tierMapping[priceId];
    if (!tierInfo) {
      console.error('Unknown price ID:', priceId);
      throw new Error('Unknown subscription price');
    }

    // Extract payment method details
    let paymentMethod = null;
    if (subscription.default_payment_method &&
        typeof subscription.default_payment_method !== 'string') {
      paymentMethod = {
        brand: subscription.default_payment_method.card?.brand ?? null,
        last4: subscription.default_payment_method.card?.last4 ?? null
      };
    }

    // Check if this is a new billing period (for usage reset)
    const isNewPeriod = !tenant.current_period_end ||
      new Date(subscription.current_period_start * 1000) > new Date(tenant.current_period_end);

    // Update tenant with complete subscription state
    const updateData = {
      stripe_subscription_id: subscription.id,
      subscription_status: subscription.status,
      subscription_tier: tierInfo.tier,
      price_id: priceId,
      assessments_limit: tierInfo.limit,
      current_period_start: new Date(subscription.current_period_start * 1000),
      current_period_end: new Date(subscription.current_period_end * 1000),
      cancel_at_period_end: subscription.cancel_at_period_end,
      payment_method_brand: paymentMethod?.brand,
      payment_method_last4: paymentMethod?.last4,
      // Reset usage if new period
      ...(isNewPeriod && { assessments_used: 0 })
    };

    await supabase
      .from('tenants')
      .update(updateData)
      .eq('stripe_customer_id', customerId);

    return updateData;
  } catch (error) {
    console.error('[STRIPE SYNC ERROR]', error);
    throw error;
  }
}
```

### Phase 3: Checkout Flow (Day 3)

#### 3.1 Generate Checkout Session
```typescript
// /src/app/api/stripe/create-checkout-session/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  const { priceId, tenantId } = await req.json();
  const supabase = createClient();

  // Verify authenticated user owns this tenant
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get tenant
  const { data: tenant } = await supabase
    .from('tenants')
    .select('*')
    .eq('id', tenantId)
    .eq('owner_id', user.id)
    .single();

  if (!tenant) {
    return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
  }

  // CRITICAL: Create customer BEFORE checkout if doesn't exist
  let stripeCustomerId = tenant.stripe_customer_id;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        tenant_id: tenant.id,
        subdomain: tenant.subdomain,
        user_id: user.id // For debugging
      }
    });

    // Store the customer ID immediately
    await supabase
      .from('tenants')
      .update({ stripe_customer_id: customer.id })
      .eq('id', tenantId);

    stripeCustomerId = customer.id;
  }

  // Determine checkout type
  const isSubscription = priceId !== process.env.STRIPE_PRICE_SINGLE_ID;

  // Create checkout session with customer
  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerId, // ALWAYS use existing customer
    mode: isSubscription ? 'subscription' : 'payment',
    payment_method_types: ['card'], // NO Cash App Pay
    line_items: [{
      price: priceId,
      quantity: 1
    }],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${tenant.subdomain}/admin/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${tenant.subdomain}/admin/billing`,
    metadata: {
      tenant_id: tenant.id
    },
    ...(isSubscription && {
      subscription_data: {
        metadata: {
          tenant_id: tenant.id
        }
      }
    })
  });

  return NextResponse.json({ checkoutUrl: session.url });
}
```

#### 3.2 Success Handler
```typescript
// /src/app/[tenant]/admin/success/page.tsx
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { syncStripeDataToSupabase } from '@/lib/stripe/sync';

export default async function SuccessPage({
  params
}: {
  params: { tenant: string }
}) {
  const supabase = createClient();

  // Get tenant
  const { data: tenant } = await supabase
    .from('tenants')
    .select('stripe_customer_id')
    .eq('subdomain', params.tenant)
    .single();

  if (!tenant?.stripe_customer_id) {
    redirect(`/${params.tenant}/admin`);
  }

  // CRITICAL: Eagerly sync to avoid race conditions
  try {
    await syncStripeDataToSupabase(tenant.stripe_customer_id);
  } catch (error) {
    console.error('Failed to sync after checkout:', error);
    // Still redirect - webhook will eventually sync
  }

  redirect(`/${params.tenant}/admin`);
}
```

### Phase 4: Webhook Handler (Day 4)

#### 4.1 Webhook Endpoint (Next.js App Router 2025)
```typescript
// /src/app/api/stripe/webhook/route.ts
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { syncStripeDataToSupabase } from '@/lib/stripe/sync';

// Events we care about (Updated 2025)
const TRACKED_EVENTS = [
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'customer.subscription.paused',
  'customer.subscription.resumed',
  'customer.subscription.trial_will_end', // NEW: 3 days before trial ends
  'invoice.paid',
  'invoice.payment_failed',
  'invoice.payment_succeeded',
  'invoice.payment_action_required', // NEW: For SCA requirements
  'payment_intent.succeeded', // For single purchases
  'payment_intent.payment_failed',
  'customer.subscription.pending_update_applied', // NEW: For proration handling
] as const;

export async function POST(req: Request) {
  // CRITICAL: App Router requires raw body text, not JSON
  const body = await req.text();
  const headersList = headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    console.error('[WEBHOOK] Missing stripe-signature header');
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    // 2025 Best Practice: Always use raw body for signature verification
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('[WEBHOOK] Signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // 2025 Pattern: Return 200 immediately, process async with proper error handling
  setImmediate(() => {
    processWebhookEvent(event).catch(error => {
      console.error(`[WEBHOOK ERROR] Event ${event.id}:`, error);
      // TODO: Add dead letter queue or retry mechanism here
    });
  });

  return NextResponse.json({ received: true, event_id: event.id });
}

async function processWebhookEvent(event: Stripe.Event) {
  // Skip events we don't track
  if (!TRACKED_EVENTS.includes(event.type as any)) {
    return;
  }

  // Handle single assessment purchases separately
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    if (paymentIntent.metadata.type === 'single_assessment') {
      await handleSingleAssessmentPurchase(paymentIntent);
      return;
    }
  }

  // Extract customer ID from event
  const eventData = event.data.object as any;
  const customerId = eventData.customer || eventData.id;

  if (typeof customerId !== 'string') {
    console.error(`[WEBHOOK] No customer ID for event ${event.type}`);
    return;
  }

  // Sync all data for this customer
  await syncStripeDataToSupabase(customerId);
}

async function handleSingleAssessmentPurchase(paymentIntent: Stripe.PaymentIntent) {
  const { tenant_id } = paymentIntent.metadata;

  const supabase = createClient();
  await supabase
    .from('tenants')
    .update({
      bonus_assessments: supabase.raw('bonus_assessments + 1')
    })
    .eq('id', tenant_id);
}
```

### Phase 5: Usage Tracking & Limits (Day 5)

#### 5.1 Check Usage Before Assessment
```typescript
// /src/lib/assessment/check-limit.ts
export async function canCreateAssessment(tenantId: string): Promise<{
  allowed: boolean;
  reason?: string;
  upgradeOptions?: any;
}> {
  const supabase = createClient();

  const { data: tenant } = await supabase
    .from('tenants')
    .select('*')
    .eq('id', tenantId)
    .single();

  if (!tenant) {
    return { allowed: false, reason: 'Tenant not found' };
  }

  // Check subscription status
  if (tenant.subscription_status !== 'active' &&
      tenant.subscription_status !== 'trialing') {
    return {
      allowed: false,
      reason: 'No active subscription',
      upgradeOptions: {
        subscribe: true,
        tiers: ['starter', 'professional', 'scale']
      }
    };
  }

  // Check bonus assessments first
  if (tenant.bonus_assessments > 0) {
    return { allowed: true };
  }

  // Unlimited plan
  if (tenant.assessments_limit === null) {
    return { allowed: true };
  }

  // Check usage against limit
  if (tenant.assessments_used >= tenant.assessments_limit) {
    const daysUntilReset = Math.ceil(
      (new Date(tenant.current_period_end).getTime() - Date.now()) /
      (1000 * 60 * 60 * 24)
    );

    return {
      allowed: false,
      reason: `Monthly limit reached (${tenant.assessments_used}/${tenant.assessments_limit})`,
      upgradeOptions: {
        buySingle: true,
        singlePrice: '$99',
        upgrade: true,
        nextTier: tenant.subscription_tier === 'starter' ? 'professional' : 'scale',
        resetDate: tenant.current_period_end,
        daysUntilReset
      }
    };
  }

  return { allowed: true };
}
```

#### 5.2 Increment Usage on Completion
```typescript
// /src/app/api/assessment/complete/route.ts
export async function POST(req: Request) {
  const { assessmentId, tenantId } = await req.json();

  // Verify assessment belongs to tenant
  const { data: assessment } = await supabase
    .from('quiz_responses')
    .select('*')
    .eq('id', assessmentId)
    .eq('tenant_id', tenantId)
    .single();

  if (!assessment || assessment.completed) {
    return NextResponse.json({ error: 'Invalid assessment' }, { status: 400 });
  }

  // Get tenant to check bonus assessments
  const { data: tenant } = await supabase
    .from('tenants')
    .select('bonus_assessments')
    .eq('id', tenantId)
    .single();

  if (tenant?.bonus_assessments > 0) {
    // Use bonus assessment
    await supabase
      .from('tenants')
      .update({ bonus_assessments: tenant.bonus_assessments - 1 })
      .eq('id', tenantId);
  } else {
    // Increment regular usage
    await supabase.rpc('increment_assessment_usage', {
      p_tenant_id: tenantId
    });
  }

  // Mark assessment as completed
  await supabase
    .from('quiz_responses')
    .update({ completed: true, completed_at: new Date() })
    .eq('id', assessmentId);

  return NextResponse.json({ success: true });
}
```

### Phase 6: Customer Portal Integration (Day 6)

```typescript
// /src/app/api/stripe/create-portal-session/route.ts
export async function POST(req: Request) {
  const { tenantId } = await req.json();
  const supabase = createClient();

  // Verify user owns tenant
  const { data: { user } } = await supabase.auth.getUser();
  const { data: tenant } = await supabase
    .from('tenants')
    .select('stripe_customer_id, subdomain')
    .eq('id', tenantId)
    .eq('owner_id', user.id)
    .single();

  if (!tenant?.stripe_customer_id) {
    return NextResponse.json({ error: 'No subscription found' }, { status: 404 });
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: tenant.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${tenant.subdomain}/admin/billing`
  });

  return NextResponse.json({ portalUrl: session.url });
}
```

---

## Critical Configuration Checklist (2025 Updated)

### Stripe Dashboard Settings
- [ ] **DISABLE Cash App Pay** (Settings → Payment methods → Wallets → Disable "Cash App Pay")
- [ ] **ENABLE "Limit customers to one subscription"** (Settings → Subscriptions → Multiple subscriptions → Disable)
- [ ] **Configure webhook endpoint** with all tracked events (including new 2025 events)
- [ ] **Set up Customer Portal** with proper return URLs and allowed actions
- [ ] **Create products and prices** with `trial_period_days: 14` and proper metadata
- [ ] **Enable webhook signature verification** and store endpoint secret
- [ ] **Enable Smart Retries** (Settings → Retry logic → Enable smart retries)
- [ ] **Configure SCA handling** (Settings → Payment methods → 3D Secure → Adaptive)
- [ ] **Set invoice auto-advance** to true for automatic collection attempts

### Environment Variables
```env
# Stripe Keys
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Price IDs (from Stripe Dashboard)
STRIPE_PRICE_STARTER_ID=price_xxx
STRIPE_PRICE_PROFESSIONAL_ID=price_xxx
STRIPE_PRICE_SCALE_ID=price_xxx
STRIPE_PRICE_SINGLE_ID=price_xxx
```

### Database Validations
```sql
-- Ensure atomic operations
CREATE UNIQUE INDEX idx_tenants_stripe_customer_unique ON tenants(stripe_customer_id);

-- Prevent negative usage
ALTER TABLE tenants ADD CONSTRAINT check_assessments_positive
  CHECK (assessments_used >= 0 AND bonus_assessments >= 0);
```

---

## Testing Strategy

### Test Cases
1. **Happy Path Subscription**
   - Create account → Subscribe → Complete assessment → Hit limit → Upgrade

2. **Edge Cases**
   - Double-click subscribe button (prevented by single subscription limit)
   - Navigate away during checkout and return
   - Payment method fails on renewal
   - Upgrade mid-cycle with usage
   - Downgrade when over new limit

3. **Race Conditions**
   - User returns before webhook fires (handled by success page sync)
   - Multiple assessments started simultaneously at limit
   - Subscription update while assessment in progress

### Test Implementation
```typescript
// /src/lib/stripe/test-utils.ts
export async function simulateWebhook(eventType: string, customerId: string) {
  const testEvent = {
    type: eventType,
    data: {
      object: { customer: customerId }
    }
  };

  await processWebhookEvent(testEvent as any);
}
```

---

## Monitoring & Alerts

### Key Metrics
- Webhook success rate (target: >99.9%)
- Sync function execution time (target: <2s)
- Customer creation to first subscription time
- Usage reset accuracy (should be 100%)

### Alert Conditions
```typescript
// Monitor webhook failures
if (webhookFailures > 3 in last 10 minutes) {
  alert('Stripe webhook failing');
}

// Monitor sync consistency
const tenantCount = await supabase
  .from('tenants')
  .select('count')
  .eq('subscription_status', 'active')
  .is('stripe_subscription_id', null);

if (tenantCount > 0) {
  alert('Active subscription without Stripe ID');
}
```

---

## 2025 Stripe Documentation Research Summary

Based on our research of the latest Stripe documentation, here are the key findings that informed this updated plan:

### ✅ Verified Best Practices (2025)

1. **14-Day Trial Implementation**
   - **Finding**: Use `trial_period_days` on price objects for automatic trial management
   - **Source**: Stripe Billing documentation - trial periods are handled server-side
   - **Impact**: Eliminates need for manual trial tracking and reduces race conditions

2. **Single Subscription Enforcement**
   - **Finding**: "Limit customers to one subscription" setting prevents billing confusion
   - **Source**: Stripe Dashboard → Settings → Subscriptions
   - **Impact**: Prevents multiple subscriptions per customer automatically

3. **Cash App Pay Consideration**
   - **Finding**: Cash App Pay can be disabled for businesses wanting traditional payment methods only
   - **Source**: Stripe Payment Methods documentation
   - **Impact**: Reduces payment method complexity and potential issues

4. **Next.js App Router Webhook Handling**
   - **Finding**: App Router requires `await req.text()` for raw body parsing
   - **Source**: Next.js 14+ documentation and Stripe webhook verification
   - **Impact**: Critical for webhook signature verification

5. **Customer Creation Patterns**
   - **Finding**: Create customers before checkout sessions to avoid ephemeral customer issues
   - **Source**: Stripe best practices guide
   - **Impact**: Eliminates "split brain" state between Stripe and application

6. **Enhanced Webhook Events (2025)**
   - **New Events**: `customer.subscription.trial_will_end`, `invoice.payment_action_required`, `customer.subscription.pending_update_applied`
   - **Source**: Stripe Webhooks documentation
   - **Impact**: Better handling of SCA, trial endings, and proration

7. **Smart Retries & SCA**
   - **Finding**: Enable Smart Retries and Adaptive 3D Secure for better success rates
   - **Source**: Stripe Retry Logic and SCA documentation
   - **Impact**: Reduces false declines and improves payment success rates

### 🔧 Architecture Decisions Validated

- **Single sync function pattern**: Confirmed as best practice for avoiding state inconsistencies
- **Immediate webhook response**: Return 200 immediately, process async - validated approach
- **Trial period handling**: Using Stripe's built-in trial system eliminates custom logic
- **Customer portal integration**: Stripe handles all billing self-service requirements

---

## Potential Issues Not Yet Addressed

### 1. **Timezone Handling for Usage Reset**
- **Issue**: Current period dates are in UTC, but tenants may expect local timezone resets
- **Risk**: Customer confusion about when limits reset
- **Mitigation**: Display reset time in tenant's timezone, send reset notification emails

### 2. **Partial Assessment Completion**
- **Issue**: Assessment started but abandoned - should it count against limit?
- **Risk**: Users gaming the system by starting but not completing
- **Mitigation**: Only count on full completion + implement 24hr expiry for started assessments

### 3. **Refund Handling**
- **Issue**: No webhook handler for refunds
- **Risk**: Refunded subscription still shows as active
- **Mitigation**: Add `charge.refunded` to tracked events, update status accordingly

### 4. **Multi-User Tenant Access**
- **Issue**: Current design assumes single owner per tenant
- **Risk**: Team accounts can't share subscription
- **Mitigation**: Add team_members table with role-based access

### 5. **Currency & Tax Handling**
- **Issue**: Only USD pricing, no tax calculation
- **Risk**: International compliance issues
- **Mitigation**: Use Stripe Tax, support multiple currencies

### 6. **Subscription Pause/Resume**
- **Issue**: No UI for pausing subscriptions
- **Risk**: Users cancel instead of pausing during slow periods
- **Mitigation**: Add pause functionality through Customer Portal config

### 7. **Failed Payment Recovery**
- **Issue**: No automated dunning process beyond Stripe defaults
- **Risk**: Higher churn from payment failures
- **Mitigation**: Implement Smart Retries, send custom recovery emails

### 8. **Data Retention After Cancellation**
- **Issue**: No clear policy on data retention
- **Risk**: GDPR compliance, storage costs
- **Mitigation**: Implement 90-day retention with automatic cleanup

### 9. **Webhook Replay & Idempotency**
- **Issue**: Sync function not fully idempotent
- **Risk**: Double-processing of events
- **Mitigation**: Add event_id tracking table, check before processing

### 10. **Development vs Production Stripe Separation**
- **Issue**: Easy to accidentally use wrong keys
- **Risk**: Test data in production or vice versa
- **Mitigation**: Environment-specific key validation on startup

---

## Implementation Timeline

**Week 1:**
- Days 1-2: Database setup, Stripe configuration, core sync function
- Days 3-4: Checkout flow, success handler, webhook implementation
- Day 5: Usage tracking and enforcement

**Week 2:**
- Day 6: Customer Portal integration
- Day 7: Testing & edge case handling
- Day 8: Monitoring setup
- Days 9-10: Production deployment & verification

**Total: 10 working days** (accounting for testing and inevitable Stripe surprises)