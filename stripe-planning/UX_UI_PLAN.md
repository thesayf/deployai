# Stripe Billing UX/UI Implementation Plan

## Overview

Complete UX enhancement plan for Stripe billing integration. This document outlines all required pages, components, and user flows to provide a complete billing experience using **shadcn/ui components** for a clean, consistent SaaS design.

## Design System

**Using shadcn/ui components for clean, consistent SaaS design:**

### Required Components
Install these shadcn/ui components (if not already installed):
```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add button
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add alert
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add table
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add scroll-area
```

### Design Principles
- **Consistency:** Use shadcn variants (default, secondary, outline, destructive, ghost)
- **Typography:** Follow shadcn text utilities (text-muted-foreground, font-semibold, etc.)
- **Spacing:** Standard Tailwind spacing scale (space-y-6, gap-4, p-6)
- **Colors:** Leverage CSS variables from shadcn theme (primary, destructive, muted)
- **Icons:** lucide-react for all icons (already installed)
- **Accessibility:** Built-in ARIA, keyboard navigation, focus states
- **Mobile:** Responsive by default, touch-friendly targets

---

## Missing Pages & Components

### 1. Main Billing Dashboard (`/[tenant]/admin/billing/index.tsx`)

**Purpose:** Central hub for viewing and managing subscription details

**Content Requirements:**
- **Page Header**
  - Title: "Billing" (text-3xl font-bold)
  - Subtitle: "Manage your subscription and payment details" (text-muted-foreground)

- **Trial Status Banner** (if user is trialing)
  - Component: `<Alert>` with variant="default" (yellow/amber theme)
  - Icon: Clock icon from lucide-react
  - Trial countdown: "X days remaining"
  - Assessments remaining: "X assessments left"
  - Trial end date: Format as "MMM d, yyyy"
  - Auto-charge warning: "You'll be charged $X/month after trial ends"
  - Action: `<Button variant="outline">` "Cancel Trial" → Stripe Customer Portal

- **Current Plan Card**
  - Component: `<Card>` with `<CardHeader>`, `<CardContent>`, `<CardFooter>`
  - Plan tier: `<Badge variant="default">` (Starter/Professional/Scale)
  - Badge colors:
    - Starter: bg-orange-500
    - Professional: bg-blue-500
    - Scale: bg-purple-500
  - Monthly price: text-4xl font-bold
  - Plan details grid (3 columns):
    - Assessments: "X / month" or "∞"
    - Status: `<Badge>` with color-coded variants
    - Next billing date: Format as "MMM d, yyyy"
  - Action: `<Button>` "Change Plan" → `/billing/plans`
  - Cancellation notice (if cancel_at_period_end = true):
    - `<Alert variant="destructive">` with warning icon

- **Payment Method Card**
  - Component: `<Card>` with card icon from lucide-react
  - Card brand: Display with CreditCard icon
  - Last 4 digits: "•••• 1234"
  - Label: "Primary payment method" (text-sm text-muted-foreground)
  - Action: `<Button variant="secondary">` "Update" → Stripe Customer Portal

- **Quick Actions Grid** (3 columns)
  - Each as clickable `<Card>` with hover effect
  - **Billing History**
    - Icon: FileText from lucide-react
    - Title: "Billing History"
    - Description: "View invoices and receipts"
    - Links to: `/billing/history`
  - **Manage Subscription**
    - Icon: Settings from lucide-react
    - Title: "Manage Subscription"
    - Description: "Update, pause, or cancel"
    - Action: Opens Stripe Customer Portal
  - **Upgrade Plan**
    - Icon: Rocket from lucide-react
    - Title: "Upgrade Plan"
    - Description: "Get more assessments"
    - Links to: `/billing/plans`

- **Usage Section**
  - Component: `<Card>`
  - Title: "Usage This Month" (CardHeader)
  - Progress bar: `<Progress>` component
    - Shows assessments_used / assessments_limit
    - Color: primary (blue/indigo)
  - Labels: "X used" and "X limit" (or "∞ limit")
  - Limit reached warning (if used >= limit):
    - `<Alert variant="destructive">`
    - "⚠️ You've reached your monthly limit. Upgrade to get more assessments."

**shadcn Components Used:**
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- `Button` (variants: default, secondary, outline, destructive)
- `Badge` (variants: default, secondary, destructive, outline)
- `Alert`, `AlertDescription`, `AlertTitle`
- `Progress`
- Icons from `lucide-react`

**API Requirements:**
- Fetch tenant billing data from Supabase tenants table
- Fields: stripe_customer_id, subscription_status, subscription_tier, trial_end_date, current_period_end, payment_method_brand, payment_method_last4, assessments_used, assessments_limit, cancel_at_period_end

---

### 2. Plan Selection/Upgrade Page (`/[tenant]/admin/billing/plans.tsx`)

**Purpose:** Allow users to view all plans and upgrade/downgrade their subscription

**Content Requirements:**

- **Page Header**
  - Title: "Choose Your Plan" (text-3xl font-bold)
  - Subtitle: "Upgrade or downgrade anytime. No commitments." (text-muted-foreground)

- **Current Plan Indicator**
  - `<Badge>` showing: "Current Plan: [TIER]"
  - Positioned above the relevant pricing card

- **Pricing Cards Grid** (3 columns, responsive)
  - Components: `<Card>` for each plan
  - Layout: `grid grid-cols-1 md:grid-cols-3 gap-6`

  **Starter Plan Card:**
  - `<Card>` with border-orange-500 if current
  - Plan name: `<CardTitle>` "Starter"
  - Price: `<span className="text-4xl font-bold">$199</span>/month`
  - Features list with Check icons from lucide-react:
    - ✓ 5 AI Assessments/month
    - ✓ Full platform access
    - ✓ Email support
    - ✓ Export reports (PDF)
    - ✓ 14-day free trial
  - Action: `<Button>` with appropriate variant
    - If current: variant="outline" disabled "Current Plan"
    - If higher tier: variant="secondary" "Downgrade"
    - If no plan: variant="default" "Start Trial"

  **Professional Plan Card:**
  - `<Card className="border-2 border-primary">` (emphasized)
  - `<Badge className="absolute -top-3 right-4">` "Most Popular"
  - Plan name: "Professional"
  - Price: "$499/month"
  - Features list:
    - ✓ 20 AI Assessments/month
    - ✓ Priority support
    - ✓ Advanced analytics
    - ✓ Custom branding
    - ✓ API access
    - ✓ Team collaboration
  - Action: `<Button>` with conditional variant
    - If current: variant="outline" disabled
    - If lower tier: variant="default" "Upgrade"
    - If higher tier: variant="secondary" "Downgrade"

  **Scale Plan Card:**
  - `<Card>` with border-purple-500 if current
  - `<Badge>` "Enterprise"
  - Plan name: "Scale"
  - Price: "$997/month"
  - Features list:
    - ✓ Unlimited Assessments
    - ✓ Dedicated account manager
    - ✓ White-label options
    - ✓ Custom integrations
    - ✓ SLA guarantee
    - ✓ Training & onboarding
  - Action: `<Button>` with conditional variant

- **Single Assessment Option**
  - `<Card>` (separate section below plans)
  - Title: "Need Just One Assessment?"
  - Price: "$99" (one-time)
  - Description: "Perfect for trying out the platform or one-off projects"
  - Action: `<Button variant="outline">` "Purchase Single Assessment"

- **Proration Notice** (if upgrading/downgrading)
  - `<Alert>` with Lightbulb icon from lucide-react
  - Text: "Proration applied: You'll be charged/credited the difference for the remainder of your billing period"

- **FAQ Section**
  - Component: `<Accordion>` from shadcn/ui
  - `<AccordionItem>` for each question
  - Questions:
    - "Can I change plans anytime?"
    - "What happens to unused assessments?"
    - "How does proration work?"

**shadcn Components Used:**
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- `Button` (variants: default, secondary, outline)
- `Badge`
- `Alert`, `AlertDescription`
- `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`
- Icons: Check, Lightbulb from lucide-react

**API Requirements:**
- POST `/api/stripe/create-checkout-session` for upgrades (new subscriptions)
- POST `/api/stripe/update-subscription` for plan changes (existing subscriptions)
- Fetch current subscription tier from Supabase

---

### 3. Billing History Page (`/[tenant]/admin/billing/history.tsx`)

**Purpose:** Display invoice history and allow downloading receipts

**Content Requirements:**

- **Page Header**
  - Title: "Billing History" (text-3xl font-bold)
  - Subtitle: "View and download your invoices" (text-muted-foreground)

- **Invoices Table**
  - Component: `<Table>` from shadcn/ui
  - Wrapper: `<Card>` containing the table
  - Columns:
    - **Date:** Format as "MMM d, yyyy" (e.g., "Jan 15, 2025")
    - **Description:** "Starter Plan - Monthly subscription" or "Single Assessment"
    - **Amount:** "$199.00" (font-medium)
    - **Status:** `<Badge>` with color coding:
      - Paid: `<Badge variant="success">` "Paid"
      - Pending: `<Badge variant="secondary">` "Pending"
      - Failed: `<Badge variant="destructive">` "Failed"
    - **Actions:**
      - `<Button variant="ghost" size="sm">` with ExternalLink icon "View"
      - `<Button variant="ghost" size="sm">` with Download icon "PDF"

  - Table structure:
    - `<TableHeader>`, `<TableBody>`, `<TableRow>`, `<TableCell>`
    - Responsive: Use `<ScrollArea>` for mobile horizontal scroll
    - Hover: `hover:bg-muted/50` on rows

- **Empty State** (if no invoices)
  - Component: `<Card>` with centered content
  - Icon: FileText from lucide-react (large, text-muted-foreground)
  - Message: "No invoices yet"
  - Description: "Your billing history will appear here once you have transactions"

- **Failed Payment Alert** (if any failed payments exist)
  - Component: `<Alert variant="destructive">` at top of page
  - Icon: AlertCircle from lucide-react
  - Message: "Payment failed on [date]. Please update your payment method."
  - Action: `<Button variant="outline" size="sm">` "Update Payment Method"

- **Pagination** (if >10 invoices)
  - Component: `<Pagination>` from shadcn/ui (if available) or custom
  - `<Button variant="outline" size="sm">` for Previous/Next
  - Page indicator: text-sm text-muted-foreground "Page X of Y"

**shadcn Components Used:**
- `Card`, `CardHeader`, `CardContent`
- `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`
- `Badge` (variants: default, secondary, destructive)
- `Button` (variants: ghost, outline)
- `Alert`, `AlertDescription`
- `ScrollArea` for responsive table
- Icons: FileText, ExternalLink, Download, AlertCircle from lucide-react

**API Requirements:**
- GET `/api/stripe/invoices?customerId=[id]` → fetch from Stripe API
- Use `stripe.invoices.list({ customer: customerId, limit: 100 })`
- Return: id, created (date), amount_paid, status, invoice_pdf, description

---

### 4. Payment Method Update Page (`/[tenant]/admin/billing/payment-method.tsx`)

**Purpose:** Allow users to update their credit card without canceling subscription

**Content Requirements:**

- **Page Header**
  - Title: "Update Payment Method" (text-3xl font-bold)
  - Subtitle: "Keep your subscription active with a valid payment method" (text-muted-foreground)

- **Current Payment Method Display**
  - Component: `<Card>`
  - Icon: CreditCard from lucide-react
  - Last 4 digits: "•••• 1234"
  - Label: "Current card on file" (text-sm text-muted-foreground)
  - Card brand badge (e.g., `<Badge>` "Visa")

- **New Payment Method Form**
  - Wrapper: `<Card>` with `<CardContent>`
  - Uses Stripe Elements for PCI compliance
  - Fields wrapped in `<Label>` components:
    - **Card Number:** Stripe CardNumberElement
    - **Expiry Date:** Stripe CardExpiryElement
    - **CVC:** Stripe CardCvcElement
    - **Billing ZIP:** `<Input>` component (optional)

  - Field styling:
    - Use shadcn `<Input>` styling as base
    - Stripe Elements themed to match
    - Focus state: ring-2 ring-primary
    - Error state: border-destructive with error text

- **Security Notice**
  - Component: `<Alert>` with Lock icon from lucide-react
  - Text: "Your payment information is encrypted and secure. We never store your card details."

- **Action Buttons**
  - Wrapper: `<CardFooter>` or form footer
  - **Update Payment Method:**
    - `<Button type="submit">` (variant="default")
    - Loading state: `<Button disabled>` with Loader2 icon spinning
  - **Cancel:**
    - `<Button variant="outline">` "Cancel"
    - Returns to billing dashboard

- **Success State** (after successful update)
  - Component: `<Alert variant="success">` (custom variant or use default with green styling)
  - Icon: CheckCircle2 from lucide-react
  - Message: "Payment method updated successfully!"
  - Auto-redirect to billing dashboard after 2 seconds

- **Error State** (if update fails)
  - Component: `<Alert variant="destructive">`
  - Icon: AlertCircle from lucide-react
  - Message: Display Stripe error message
  - Retry button visible

**shadcn Components Used:**
- `Card`, `CardHeader`, `CardContent`, `CardFooter`
- `Button` (variants: default, outline)
- `Input`, `Label`
- `Alert`, `AlertDescription`
- `Badge`
- Icons: CreditCard, Lock, CheckCircle2, AlertCircle, Loader2 from lucide-react

**API Requirements:**
- POST `/api/stripe/update-payment-method`
- Body: { customerId, paymentMethodId }
- Use Stripe.js to create payment method token
- Update default payment method via Stripe API

---

## Dashboard Enhancements

### 5. Trial Status Banner (Admin Dashboard Integration)

**Location:** `/[tenant]/admin/index.tsx` (Dashboard component)

**Content Requirements:**

- **Banner Placement:**
  - Top of dashboard, above all other content
  - Full-width, 3px black border, 6px shadow
  - Background: Yellow (#FFF5F0) for trial, Red (#FEE2E2) for expiring soon

- **Trial Active State** (>3 days remaining)
  - Icon: 🎉
  - Heading: "You're on a Free Trial!" (uppercase, font-black)
  - Content:
    - "X days remaining in your trial"
    - "Y assessments left of Z"
    - "Trial ends on [date]"
  - Action buttons:
    - Primary: "Start Subscription Now" → `/billing/plans`
    - Secondary: "Dismiss" (hides banner for 24 hours)

- **Trial Expiring Soon** (<3 days remaining)
  - Icon: ⚠️
  - Heading: "Trial Ending Soon!" (uppercase, font-black)
  - Content:
    - "Only X days left!"
    - "You'll be charged $Y on [date]"
    - "Cancel anytime before then to avoid charges"
  - Action buttons:
    - Primary: "Manage Subscription" → Stripe Customer Portal
    - Secondary: "View Plans" → `/billing/plans`

- **Trial Ended (grace period)**
  - Icon: ❌
  - Heading: "Trial Expired" (uppercase, font-black)
  - Content:
    - "Your trial ended on [date]"
    - "Start a subscription to continue using the platform"
  - Action button:
    - "Choose a Plan" → `/billing/plans`

- **Dismiss Behavior:**
  - Store dismissal in localStorage: `trial_banner_dismissed_at`
  - Re-show after 24 hours
  - Always show if <3 days remaining (can't dismiss)

**Implementation Notes:**
- Component: `<TrialBanner />` in `/components/billing/TrialBanner.tsx`
- Conditionally render based on subscription_status === 'trialing'
- Calculate days remaining from trial_end_date
- Use React state for dismiss functionality

---

### 6. Usage Meter Enhancement

**Location:** `/components/admin/dashboard/UsageMeter.tsx`

**Required Changes:**

- **Trial Indicator Addition:**
  - Show "TRIAL" badge if subscription_status === 'trialing'
  - Badge styling: Yellow bg, black text, uppercase, 3px border
  - Position: Top-right corner of usage meter card

- **Upgrade Button Link:**
  - Change button destination from generic to specific:
    - Current: Generic "Upgrade Plan" button
    - New: Link to `/[tenant]/admin/billing/plans`
  - Button should pass current tier as URL param for highlighting

- **Trial-Specific Messaging:**
  - If trialing: "Trial usage: X of Y assessments"
  - If active: "Monthly usage: X of Y assessments"
  - If unlimited: "Unlimited assessments • X used this month"

- **Visual States:**
  - **Normal** (0-79% used): Green progress bar (#10B981)
  - **Warning** (80-99% used): Yellow progress bar (#F59E0B)
    - Show message: "Running low on assessments"
  - **Limit Reached** (100% used): Red progress bar (#EF4444)
    - Show message: "Monthly limit reached"
    - Prominent "Upgrade Now" button (orange bg)

- **Additional Info Section:**
  - Show next reset date if active subscription
  - "Resets on [date]" (monthly billing period end)
  - If trialing: "Converts to paid on [trial_end_date]"

**Implementation Notes:**
- Accept subscription_status as prop
- Calculate percentage: (used / limit) * 100
- Conditionally render trial vs. paid messaging
- Link upgrade button with proper tenant context

---

## Edge Case Flows

### 7. Deferred Trial Flow

**Scenario:** User clicks "Explore Dashboard First" and doesn't start trial

**Implementation:**

- **Persistent Trial Setup Banner**
  - Location: Top of admin dashboard
  - Only shows if: stripe_customer_id === null AND subscription_status !== 'trialing'
  - Background: Blue (#DBEAFE), 3px border
  - Content:
    - Icon: 💳
    - Heading: "Complete Your Setup"
    - Message: "Start your 14-day free trial to create assessments"
    - Action: "Start Free Trial" → `/[tenant]/admin/billing/trial-setup`
  - Dismiss option: "Remind me later" (dismisses for 24 hours)

- **Feature Limitation**
  - Assessment creation blocked until trial started
  - Show modal on "Create Assessment" click:
    - Title: "Trial Required"
    - Message: "Start your free trial to create assessments"
    - Action: "Start Trial Now" → trial setup page

- **Re-engagement Logic**
  - Banner reappears daily until trial started
  - Cannot be permanently dismissed
  - Incremental urgency: "You're missing out on X days of your trial"

**Implementation Files:**
- `/components/billing/TrialSetupBanner.tsx`
- `/components/billing/TrialRequiredModal.tsx`
- Update assessment creation flow to check subscription status

---

### 8. Payment Failure Flow

**Scenario:** First charge fails on day 15 (or any subscription payment fails)

**Implementation:**

- **Payment Failed Banner** (Dashboard)
  - Location: Top of dashboard (takes priority over trial banner)
  - Background: Red (#FEE2E2), 3px black border
  - Content:
    - Icon: ❌
    - Heading: "Payment Failed"
    - Message: "We couldn't process your payment. Update your payment method to avoid service interruption."
    - Details: Show last 4 digits of failed card
    - Countdown: "X days remaining until service suspension"
  - Action buttons:
    - Primary: "Update Payment Method" → Stripe Customer Portal
    - Secondary: "View Details" → `/billing/history`

- **Email Notification**
  - Trigger: webhook `invoice.payment_failed`
  - Send via Resend API
  - Subject: "Payment Failed - Action Required"
  - Content:
    - Failed amount and date
    - Link to update payment method
    - Grace period information (3 days)
    - Consequences of non-payment

- **Grace Period Handling**
  - Day 1-3: Show warning banner, service continues
  - Day 4+: Suspend service (subscription_status → 'past_due')
  - Blocked actions: Creating new assessments
  - Allowed actions: Viewing existing data, updating payment

- **Service Suspension State**
  - Full-screen modal (cannot dismiss)
  - Message: "Your subscription is suspended due to payment failure"
  - Action: "Update Payment to Restore Access"
  - Links to Stripe Customer Portal

**Implementation Files:**
- `/components/billing/PaymentFailedBanner.tsx`
- `/components/billing/ServiceSuspendedModal.tsx`
- Webhook handler enhancement for payment_failed event
- Email template: `/emails/payment-failed.tsx`

---

### 9. Trial Expiration Warnings

**Scenario:** 3 days before trial ends

**Implementation:**

- **In-App Warning Banner**
  - Trigger: trial_end_date <= NOW() + 3 days
  - Location: Top of dashboard
  - Background: Orange gradient
  - Content:
    - Icon: ⏰
    - Heading: "Trial Ending Soon!"
    - Message: "Your trial ends in X days. You'll be charged $Y on [date]."
    - Options: "Continue with plan" or "Cancel subscription"
  - Action buttons:
    - Primary: "Keep Subscription" (dismisses banner)
    - Secondary: "Cancel Before Charge" → Stripe Customer Portal

- **Email Notification (3 days before)**
  - Trigger: webhook `customer.subscription.trial_will_end`
  - Subject: "Your Trial Ends in 3 Days"
  - Content:
    - Trial end date and next charge amount
    - Summary of what they'll lose if they cancel
    - Link to manage subscription
    - Highlight: "Cancel anytime before [date] to avoid charges"

- **Final Reminder (1 day before)**
  - In-app banner changes to red background
  - Email subject: "Final Reminder: Trial Ends Tomorrow"
  - Push notification if enabled

- **Conversion Success**
  - After first successful charge (day 15):
  - Show success banner: "Welcome to [Plan Name]!"
  - Confetti animation (optional, fun touch)
  - Thank you message

**Implementation Files:**
- `/components/billing/TrialExpiringBanner.tsx`
- Webhook handler for `customer.subscription.trial_will_end`
- Email templates:
  - `/emails/trial-ending-3-days.tsx`
  - `/emails/trial-ending-1-day.tsx`
  - `/emails/subscription-active.tsx`

---

## API Endpoints Required

### New Endpoints to Create:

1. **POST `/api/stripe/create-portal-session`**
   - Purpose: Generate Stripe Customer Portal session URL
   - Input: { customerId, returnUrl }
   - Output: { url: string }
   - Usage: Manage subscription, update payment method, view invoices

2. **POST `/api/stripe/update-subscription`**
   - Purpose: Change subscription tier (upgrade/downgrade)
   - Input: { subscriptionId, newPriceId }
   - Output: { success: boolean, subscription: Stripe.Subscription }
   - Usage: Plan changes from plans page

3. **GET `/api/stripe/invoices`**
   - Purpose: Fetch invoice history for customer
   - Input: query param `customerId`
   - Output: { invoices: Stripe.Invoice[] }
   - Usage: Billing history page

4. **POST `/api/stripe/update-payment-method`**
   - Purpose: Update default payment method
   - Input: { customerId, paymentMethodId }
   - Output: { success: boolean }
   - Usage: Payment method update page

5. **POST `/api/stripe/purchase-single-assessment`**
   - Purpose: One-time payment for single assessment
   - Input: { tenantId, email }
   - Output: { checkoutUrl: string }
   - Usage: Single assessment purchase from plans page

### Endpoint Implementation Details:

**`create-portal-session.ts`:**
```typescript
// Create Stripe Customer Portal session
const session = await stripe.billingPortal.sessions.create({
  customer: customerId,
  return_url: returnUrl,
});
```

**`update-subscription.ts`:**
```typescript
// Update subscription to new price
const subscription = await stripe.subscriptions.update(subscriptionId, {
  items: [{
    id: subscription.items.data[0].id,
    price: newPriceId,
  }],
  proration_behavior: 'always_invoice', // Charge/credit immediately
});
```

**`invoices.ts`:**
```typescript
// Fetch invoices for customer
const invoices = await stripe.invoices.list({
  customer: customerId,
  limit: 100,
});
```

---

## Design System Constants

### shadcn/ui Theme Configuration

**Tier Color Badges:**
```typescript
export const TIER_BADGE_COLORS = {
  starter: 'bg-orange-500 hover:bg-orange-600',
  professional: 'bg-blue-500 hover:bg-blue-600',
  scale: 'bg-purple-500 hover:bg-purple-600',
} as const;
```

**Status Badge Variants:**
```typescript
// Use shadcn Badge component with these variants
export const STATUS_VARIANTS = {
  trialing: 'default',      // Blue/primary
  active: 'success',        // Green (custom variant if needed)
  past_due: 'destructive',  // Red
  canceled: 'secondary',    // Gray
  incomplete: 'secondary',  // Gray
} as const;
```

**Typography Classes:**
```typescript
// Consistent with shadcn/ui typography
export const TEXT_STYLES = {
  pageTitle: 'text-3xl font-bold tracking-tight',
  pageSubtitle: 'text-muted-foreground',
  cardTitle: 'text-xl font-semibold',
  price: 'text-4xl font-bold',
  label: 'text-sm font-medium',
  description: 'text-sm text-muted-foreground',
} as const;
```

**Layout Spacing:**
```typescript
export const SPACING = {
  pageGap: 'space-y-6',
  cardGap: 'space-y-4',
  gridGap: 'gap-6',
  sectionPadding: 'p-6',
} as const;
```

**Component Defaults:**
```typescript
// Use these as base configurations
export const COMPONENT_CONFIG = {
  button: {
    default: 'default',    // Primary actions
    secondary: 'outline',  // Secondary actions
    ghost: 'ghost',        // Subtle actions
  },
  card: {
    className: 'transition-all duration-200 hover:shadow-md',
  },
  alert: {
    trial: 'default',      // Yellow/amber for trial info
    error: 'destructive',  // Red for errors/failures
    success: 'default',    // Custom green styling
  },
} as const;
```

---

## Implementation Phases

### Phase 1: MVP Critical (Day 1) - PRIORITY
**Goal:** Users can view and manage their subscription

✅ **Files to Create:**
1. `/pages/[tenant]/admin/billing/index.tsx` - Main billing dashboard
2. `/components/billing/TrialBanner.tsx` - Trial status banner for dashboard
3. `/api/stripe/create-portal-session.ts` - Stripe portal session creation

✅ **Files to Modify:**
1. `/components/admin/dashboard/UsageMeter.tsx` - Link upgrade button
2. `/pages/[tenant]/admin/index.tsx` - Add TrialBanner component

**Testing Checklist:**
- [ ] Trial banner shows when trialing
- [ ] Billing dashboard displays all subscription details
- [ ] Customer portal opens correctly
- [ ] Usage meter links to billing pages
- [ ] All data fetched correctly from Supabase

---

### Phase 2: Plan Management (Day 2)
**Goal:** Users can upgrade/downgrade subscription

✅ **Files to Create:**
1. `/pages/[tenant]/admin/billing/plans.tsx` - Plan selection page
2. `/pages/[tenant]/admin/billing/history.tsx` - Invoice history
3. `/api/stripe/update-subscription.ts` - Subscription tier changes
4. `/api/stripe/invoices.ts` - Fetch invoice list

**Testing Checklist:**
- [ ] All 3 plans display correctly
- [ ] Current plan highlighted
- [ ] Upgrade/downgrade buttons work
- [ ] Proration calculated correctly
- [ ] Invoice history loads and displays

---

### Phase 3: Edge Cases & Polish (Day 3)
**Goal:** Handle all edge cases gracefully

✅ **Files to Create:**
1. `/pages/[tenant]/admin/billing/payment-method.tsx` - Update payment
2. `/components/billing/TrialSetupBanner.tsx` - Deferred trial reminder
3. `/components/billing/PaymentFailedBanner.tsx` - Payment failure alerts
4. `/components/billing/TrialExpiringBanner.tsx` - Trial expiration warnings
5. `/api/stripe/update-payment-method.ts` - Payment method updates

✅ **Webhook Enhancements:**
- Add email notifications for:
  - `invoice.payment_failed`
  - `customer.subscription.trial_will_end`
  - `customer.subscription.updated`

**Testing Checklist:**
- [ ] Deferred trial flow works
- [ ] Payment failures show appropriate warnings
- [ ] Trial expiration warnings appear on time
- [ ] All email notifications send correctly
- [ ] Payment method updates successfully

---

## User Journey Flows

### Flow 1: New User Trial Signup
```
1. OAuth signup → auth/redirect.tsx
2. Check billing status (no stripe_customer_id)
3. Redirect to /billing/trial-setup
4. User clicks "Start Free Trial"
5. Stripe Checkout → enters card
6. Redirect to /billing/success
7. Auto-redirect to /admin (dashboard)
8. See trial banner with countdown
9. Can create up to 5 assessments
10. On day 15: auto-charged, becomes active subscriber
```

### Flow 2: Trial User Explores Dashboard First
```
1. OAuth signup → redirect to trial-setup
2. User clicks "Explore Dashboard First"
3. Lands on /admin dashboard
4. Sees persistent "Complete Your Setup" banner
5. Attempts to create assessment → blocked
6. Modal: "Trial Required - Start Free Trial"
7. Clicks → redirects to trial-setup
8. Completes trial signup
9. Returns to dashboard, can now create assessments
```

### Flow 3: Active User Upgrades Plan
```
1. User on Starter plan, running low on assessments
2. Usage meter shows warning: "Approaching limit"
3. Clicks "Upgrade Now" button
4. Redirects to /billing/plans
5. Sees current plan (Starter) highlighted
6. Clicks "Upgrade" on Professional plan
7. Confirmation modal shows proration details
8. Confirms → API updates subscription
9. Success message → redirect to /billing
10. Billing dashboard shows new plan immediately
```

### Flow 4: Payment Failure Recovery
```
1. Subscription renewal fails on day 15
2. Webhook: invoice.payment_failed
3. Email sent: "Payment Failed - Action Required"
4. User logs in → sees red banner on dashboard
5. "Payment Failed - Update payment method"
6. Clicks "Update Payment Method"
7. Opens Stripe Customer Portal
8. Updates card → portal confirms success
9. Returns to app → banner gone
10. Next attempt succeeds → subscription active
```

### Flow 5: Trial Expiration & Cancellation
```
1. Day 11 (3 days before trial ends)
2. User sees "Trial Ending Soon" banner
3. Email: "Your trial ends in 3 days"
4. User decides to cancel
5. Clicks "Cancel Before Charge" button
6. Opens Stripe Customer Portal
7. Confirms cancellation
8. Subscription: cancel_at_period_end = true
9. Can still use platform until trial_end_date
10. After trial ends: limited to view-only access
```

---

## Success Metrics

### UX Metrics to Track:
1. **Trial Conversion Rate**
   - Target: >40% of trials convert to paid
   - Track: trial_started → active_subscription

2. **Upgrade Rate**
   - Target: >15% of Starter users upgrade within 3 months
   - Track: plan_change events from Stripe

3. **Payment Failure Recovery**
   - Target: >80% of failed payments recovered within 3 days
   - Track: payment_failed → payment_succeeded

4. **Cancellation Rate**
   - Target: <10% monthly churn
   - Track: subscription_deleted events

5. **Support Tickets**
   - Target: <5% of users contact support about billing
   - Track: Ticket categories in support system

---

## Accessibility & Responsiveness

### Accessibility Requirements:
- [ ] All buttons have clear labels and aria-labels
- [ ] Color isn't the only indicator (use icons + text)
- [ ] Keyboard navigation works for all flows
- [ ] Screen reader friendly (semantic HTML)
- [ ] Focus states visible on all interactive elements
- [ ] Error messages announced to screen readers

### Responsive Breakpoints:
- **Mobile** (<640px): Stack all cards, full-width buttons
- **Tablet** (640-1024px): 2-column grids, larger touch targets
- **Desktop** (>1024px): 3-column grids, hover states

### Mobile-Specific Considerations:
- Larger tap targets (min 44px height)
- Sticky CTA buttons on mobile
- Simplified tables (horizontal scroll or cards)
- Bottom sheet modals instead of center modals
- Stripe Elements optimized for mobile keyboards

---

## Testing Scenarios

### Manual Testing Checklist:

**Billing Dashboard:**
- [ ] Loads with trial data correctly
- [ ] Loads with active subscription correctly
- [ ] Shows past_due status if payment failed
- [ ] Displays payment method correctly
- [ ] All quick action buttons work
- [ ] Usage meter accurate and responsive

**Plans Page:**
- [ ] Current plan highlighted
- [ ] Can upgrade from Starter → Professional
- [ ] Can upgrade from Professional → Scale
- [ ] Can downgrade from Scale → Professional
- [ ] Proration preview shown before confirm
- [ ] Single assessment purchase works

**Billing History:**
- [ ] Invoice table populates correctly
- [ ] Can download PDF invoices
- [ ] Failed payments highlighted
- [ ] Pagination works if >10 invoices
- [ ] Empty state shows if no invoices

**Payment Method:**
- [ ] Stripe Elements render correctly
- [ ] Form validation works
- [ ] Can update payment method
- [ ] Success/error states show properly
- [ ] Redirects after successful update

**Trial Flows:**
- [ ] Trial banner shows countdown correctly
- [ ] Deferred trial banner appears
- [ ] Trial expiration warnings show on time
- [ ] Can cancel trial from Customer Portal
- [ ] Auto-converts to paid on day 15

**Payment Failures:**
- [ ] Failed payment banner shows
- [ ] Email notification sent
- [ ] Can update payment from banner
- [ ] Service suspended after grace period
- [ ] Service restored after payment update

---

## Notes & Considerations

### Stripe Customer Portal Configuration:
- Enable in Stripe Dashboard → Settings → Customer Portal
- Features to enable:
  - ✅ Subscription cancellation (with retention flow)
  - ✅ Update payment method
  - ✅ View invoice history
  - ❌ Disable plan changes (handle in-app instead)
- Set return URL: `https://deployai.studio/[tenant]/admin/billing`

### Email Notification Setup:
- Use Resend API (already configured)
- Create email templates in `/emails/` directory:
  - `payment-failed.tsx`
  - `trial-ending.tsx`
  - `subscription-updated.tsx`
  - `invoice-receipt.tsx`
- Trigger from webhook handler
- Use React Email for templates (neubrutalist styling)

### Webhook Event Handling:
- Add to existing webhook.ts:
  - `invoice.payment_failed` → Send email, update status
  - `customer.subscription.trial_will_end` → Send reminder email
  - `customer.subscription.updated` → Send confirmation email
  - `invoice.finalized` → Send invoice receipt

### Security Considerations:
- All billing pages require authentication (ProtectedRoute)
- Verify user owns tenant before showing billing data
- Use Stripe Customer Portal for sensitive operations
- Never expose Stripe secret key to client
- Rate limit billing API endpoints
- Log all billing events for audit trail

---

## File Structure Summary

```
src/
├── pages/
│   └── [tenant]/admin/billing/
│       ├── index.tsx                  # Main billing dashboard
│       ├── plans.tsx                  # Plan selection/upgrade
│       ├── history.tsx                # Invoice history
│       ├── payment-method.tsx         # Update payment
│       ├── trial-setup.tsx            # ✅ Already created
│       └── success.tsx                # ✅ Already created
│
├── components/
│   └── billing/
│       ├── TrialBanner.tsx            # Trial status for dashboard
│       ├── TrialSetupBanner.tsx       # Deferred trial reminder
│       ├── TrialExpiringBanner.tsx    # Trial expiration warning
│       ├── PaymentFailedBanner.tsx    # Payment failure alert
│       └── PricingCard.tsx            # Reusable pricing card
│
├── pages/api/stripe/
│   ├── create-portal-session.ts       # New: Customer Portal
│   ├── update-subscription.ts         # New: Plan changes
│   ├── invoices.ts                    # New: Invoice list
│   ├── update-payment-method.ts       # New: Payment updates
│   ├── webhook.ts                     # ✅ Enhance with emails
│   ├── create-trial-session.ts        # ✅ Already created
│   └── test-connection.ts             # ✅ Already created
│
└── emails/
    ├── payment-failed.tsx             # Payment failure email
    ├── trial-ending.tsx               # Trial expiration email
    ├── subscription-updated.tsx       # Plan change confirmation
    └── invoice-receipt.tsx            # Invoice receipt email
```

---

## Next Steps

**Immediate Actions:**
1. ✅ Review this plan with stakeholders
2. ✅ Get approval on design mockups (use existing neubrutalist examples)
3. ✅ Confirm Stripe Customer Portal settings
4. ✅ Set up email templates infrastructure
5. ✅ Begin Phase 1 implementation

**Questions to Answer:**
- [ ] Do we want to allow in-app plan changes or force Stripe Customer Portal?
  - **Recommendation:** In-app for upgrades, Customer Portal for cancellations
- [ ] What's the grace period for failed payments?
  - **Recommendation:** 3 days, then suspend (industry standard)
- [ ] Should we offer annual billing discounts?
  - **Recommendation:** Post-MVP, adds complexity
- [ ] Do we want to track marketing attribution for trials?
  - **Recommendation:** Yes, add `utm_` params to metadata

---

**Last Updated:** 2025-01-06
**Version:** 2.0 (shadcn/ui)
**Status:** Ready for Implementation

## Summary of Changes (v2.0)

**Design System Update:**
- Replaced neubrutalist design with shadcn/ui components
- Standardized on clean, professional SaaS aesthetic
- All pages now use Card, Button, Badge, Alert, Table, Progress components
- Consistent typography and spacing using Tailwind utilities
- Color-coded tier badges (orange/blue/purple)
- Icons from lucide-react throughout
- Mobile-responsive and accessible by default

**Benefits:**
- ✅ Faster development with pre-built components
- ✅ Consistent design language across entire app
- ✅ Built-in accessibility (ARIA, keyboard nav)
- ✅ Mobile-optimized by default
- ✅ Easy to maintain and extend
- ✅ Professional SaaS appearance
