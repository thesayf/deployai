# Epic: Stripe Subscription Billing Integration

## Overview
Implement complete subscription billing infrastructure to monetize the white-label AI assessment platform through tiered monthly subscriptions and one-time purchases.

## Business Objective
Enable consultants to subscribe to the platform at different tiers ($199/mo, $499/mo, $997/mo) based on their assessment volume needs, with automatic billing, usage tracking, and upgrade/downgrade capabilities.

## Success Criteria
- Consultants can subscribe and pay via Stripe Checkout
- Usage automatically resets each billing period
- Limits enforced when quota exceeded
- Seamless upgrade/downgrade with proration
- Single assessment purchases for $99
- < 0.1% payment failure rate
- Zero billing-related support tickets in first month

---

## User Stories

### 1. Subscription Signup Flow
**As a** consultant
**I want to** subscribe to a pricing tier during signup
**So that** I can start using the platform immediately

**Acceptance Criteria:**
- Three tiers clearly presented:
  - **Starter**: $199/mo - 5 assessments ($40 each)
  - **Professional**: $499/mo - 20 assessments ($25 each)
  - **Scale**: $997/mo - Unlimited assessments
- Redirect to Stripe Checkout with pre-filled email
- Success URL returns to dashboard with "Welcome" message
- Cancel URL returns to pricing with retained form data
- Subscription activates immediately upon payment

**Technical Requirements:**
```typescript
// Stripe products to create
stripe.products.create({
  id: 'prod_ai_assessment_starter',
  name: 'AI Assessment Platform - Starter',
  metadata: {
    assessments_limit: '5',
    tier: 'starter'
  }
});

// Price objects
stripe.prices.create({
  product: 'prod_ai_assessment_starter',
  unit_amount: 19900, // $199.00
  currency: 'usd',
  recurring: { interval: 'month' }
});
```

### 2. Webhook Payment Processing
**As a** platform administrator
**I want** Stripe webhooks to update tenant records
**So that** subscription status is always accurate

**Acceptance Criteria:**
- Handle events:
  - `customer.subscription.created` - Activate tenant
  - `customer.subscription.updated` - Update tier/status
  - `customer.subscription.deleted` - Mark canceled
  - `invoice.payment_succeeded` - Reset usage counter
  - `invoice.payment_failed` - Send warning, pause access after 3 failures
- Idempotent processing (no duplicate handling)
- Webhook signature verification
- Failed webhook retry handling

**Database Updates Required:**
```sql
ALTER TABLE tenants ADD COLUMN
  stripe_customer_id VARCHAR,
  stripe_subscription_id VARCHAR,
  subscription_tier VARCHAR CHECK (subscription_tier IN ('starter', 'professional', 'scale')),
  subscription_status VARCHAR CHECK (subscription_status IN ('trialing', 'active', 'past_due', 'canceled')),
  assessments_used INTEGER DEFAULT 0,
  assessments_limit INTEGER, -- 5, 20, or NULL for unlimited
  billing_period_start TIMESTAMP,
  billing_period_end TIMESTAMP;
```

### 3. Usage Tracking & Reset
**As a** consultant
**I want** my usage to reset each month
**So that** I get fresh quota each billing period

**Acceptance Criteria:**
- Counter increments when assessment completed
- Reset triggered by `invoice.payment_succeeded` webhook
- Previous period usage archived for analytics
- Grace period of 3 days for failed payments
- Email notification when reset occurs

**Implementation Logic:**
```typescript
// On assessment completion
await supabase.rpc('increment_assessment_usage', {
  tenant_id: tenantId
});

// On billing renewal webhook
await supabase
  .from('tenants')
  .update({
    assessments_used: 0,
    billing_period_start: new Date(),
    billing_period_end: addMonths(new Date(), 1)
  })
  .eq('stripe_subscription_id', subscriptionId);
```

### 4. Usage Limit Enforcement
**As a** consultant at my limit
**I want** clear options to continue
**So that** I can serve unexpected clients

**Acceptance Criteria:**
- Assessment page shows "Limit Reached" when at cap
- Three options presented:
  1. Buy single for $99 (immediate access)
  2. Upgrade subscription (prorated)
  3. Wait for reset (show date)
- Single purchases don't count against subscription limit
- Comparison shown: "Save $59 per assessment with Professional"

### 5. Customer Portal Self-Service
**As a** consultant
**I want to** manage my subscription myself
**So that** I don't need to contact support

**Acceptance Criteria:**
- Link to Stripe Customer Portal from dashboard
- Portal allows:
  - Update payment method
  - Download invoices
  - Cancel subscription (end of period)
  - View billing history
- Changes reflect immediately in platform
- Return URL brings back to dashboard

**Portal Configuration:**
```typescript
const session = await stripe.billingPortal.sessions.create({
  customer: tenantContext.stripe_customer_id,
  return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${tenant}/admin/settings`,
});
// Redirect to session.url
```

### 6. Upgrade/Downgrade Flow
**As a** growing consultant
**I want to** upgrade my plan mid-cycle
**So that** I can handle increased demand

**Acceptance Criteria:**
- Upgrades apply immediately with proration
- Downgrades scheduled for end of period
- Clear cost breakdown shown before confirmation
- Warning if current usage exceeds downgrade limit
- Email confirmation of change

### 7. Single Assessment Purchase
**As a** consultant needing one more assessment
**I want to** buy just one without upgrading
**So that** I can handle edge cases

**Acceptance Criteria:**
- $99 one-time Stripe Checkout
- Immediate availability post-payment
- Added to `bonus_assessments` field (doesn't affect subscription)
- Receipt email sent
- After 2 singles: "You could save with a subscription" prompt

---

## Technical Architecture

### Stripe Configuration
```javascript
// Products & Prices Structure
Products:
- prod_ai_assessment_starter ($199/mo)
- prod_ai_assessment_professional ($499/mo)
- prod_ai_assessment_scale ($997/mo)
- prod_ai_assessment_single ($99 one-time)

// Metadata for automation
metadata: {
  tier: 'starter|professional|scale',
  assessments_limit: '5|20|unlimited',
  type: 'subscription|one-time'
}
```

### API Endpoints
```typescript
// /api/stripe/create-checkout-session
POST - Create checkout for subscription or single purchase

// /api/stripe/create-portal-session
POST - Create customer portal session

// /api/stripe/webhook
POST - Handle all Stripe webhooks

// /api/admin/billing/usage
GET - Current usage and limits
```

### Security Considerations
- Webhook signature verification mandatory
- Customer ID validation before portal access
- Rate limiting on checkout creation (5 per hour)
- Sanitize all metadata from Stripe
- PCI compliance through Stripe Checkout

---

## Implementation Phases

### Phase 1: Stripe Setup (Day 1)
- Create products and prices in Stripe
- Set up webhook endpoint
- Configure Customer Portal
- Add environment variables

### Phase 2: Checkout Integration (Day 2)
- Create checkout session API
- Build pricing page UI
- Handle success/cancel returns
- Test payment flows

### Phase 3: Webhook Processing (Day 3)
- Implement webhook handler
- Add signature verification
- Update tenant records
- Add idempotency checks
- Test all event types

### Phase 4: Usage Management (Day 4)
- Add usage tracking to assessment flow
- Implement reset logic
- Build enforcement UI
- Add single purchase flow
- Test limits and resets

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Webhook delivery failure | High - Billing state mismatch | Implement webhook replay, daily reconciliation |
| Race condition on usage increment | Medium - Over-usage | Database-level atomic increment |
| Subscription state sync issues | High - Access problems | Cache with TTL, verify on critical actions |
| Payment method failures | Medium - Churn | Grace period, payment retry emails |
| Proration calculation errors | Low - Revenue loss | Use Stripe's built-in proration |

---

## Monitoring & Analytics

### Key Metrics
- Conversion rate: Visitors → Subscribers
- Tier distribution (target: 20/60/20)
- Churn rate (target: <3% monthly)
- Payment failure rate (target: <2%)
- Single purchase → Subscription conversion (target: 50%)
- MRR growth rate

### Alerts
- Webhook failures > 3 in 10 minutes
- Payment success rate < 98%
- Subscription created without tenant record
- Usage exceeding limit despite enforcement

---

## Testing Requirements
- Unit tests for webhook handlers
- Integration tests with Stripe test mode
- Test all subscription states
- Test proration calculations
- Test usage reset timing
- Load test webhook endpoint
- Test payment failure flows

---

## Dependencies
- Stripe account with test/live keys
- Database migrations for tenant billing fields
- Email service for notifications
- Monitoring service for webhook health

---

## Definition of Done
- [ ] All user stories implemented and tested
- [ ] Stripe test mode fully functional
- [ ] Production Stripe keys configured
- [ ] Webhook endpoint secured and verified
- [ ] Usage tracking accurate to the second
- [ ] Customer Portal fully configured
- [ ] All email notifications sending
- [ ] Monitoring and alerts configured
- [ ] Documentation updated
- [ ] Team trained on Stripe dashboard

This epic will deliver a complete billing system that enables the platform to generate recurring revenue while providing consultants with flexible options to manage their subscriptions and usage.