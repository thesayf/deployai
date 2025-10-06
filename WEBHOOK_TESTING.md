# Webhook Testing Guide

## Setup

### 1. Install Stripe CLI

```bash
# Mac
brew install stripe/stripe-cli/stripe

# Or download from https://stripe.com/docs/stripe-cli
```

### 2. Login to Stripe CLI

```bash
stripe login
```

This will open your browser to authenticate.

### 3. Get Webhook Secret

The webhook secret is automatically provided when you use `stripe listen`. You'll need to add it to your `.env.local` file.

## Local Testing

### Step 1: Start Your Dev Server

```bash
npm run dev
```

Server should be running on `http://localhost:3000` (or 3001, etc.)

### Step 2: Start Stripe CLI Listener

In a new terminal:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

**Expected Output:**
```
> Ready! You are using Stripe API Version [2025-09-30]. Your webhook signing secret is whsec_xxx (^C to quit)
```

**Copy the webhook secret** (`whsec_xxx`) and add it to `.env.local`:

```env
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET_HERE
```

**Restart your dev server** to pick up the new environment variable.

### Step 3: Trigger Test Events

In another terminal:

```bash
# Test checkout completion
stripe trigger checkout.session.completed

# Test subscription creation
stripe trigger customer.subscription.created

# Test payment success
stripe trigger invoice.payment_succeeded

# Test payment failure
stripe trigger invoice.payment_failed

# Test trial ending warning
stripe trigger customer.subscription.trial_will_end
```

### Step 4: Verify Webhook Processing

**Watch the logs in your dev server terminal:**

You should see:
```
[WEBHOOK] Received event: checkout.session.completed (evt_xxx)
[WEBHOOK] Processing event: checkout.session.completed (evt_xxx)
[WEBHOOK] Syncing data for customer: cus_xxx
[STRIPE SYNC] Starting sync for customer: cus_xxx
[WEBHOOK] ✓ Sync successful for checkout.session.completed
```

**Check your database:**

```sql
SELECT
  subdomain,
  stripe_customer_id,
  stripe_subscription_id,
  subscription_status,
  subscription_tier,
  trial_end_date
FROM tenants
WHERE stripe_customer_id IS NOT NULL;
```

## Testing Complete Flow

### End-to-End Trial Subscription Test

1. **Create a test checkout session:**

```bash
curl -X POST http://localhost:3000/api/stripe/create-trial-session \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": "YOUR_TENANT_ID",
    "email": "test@example.com",
    "successUrl": "http://localhost:3000/success",
    "cancelUrl": "http://localhost:3000/cancel"
  }'
```

2. **Open the checkout URL** in your browser (from the response)

3. **Use Stripe test card:**
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

4. **Complete the checkout**

5. **Watch webhook fire:**

```
[WEBHOOK] Received event: checkout.session.completed
[WEBHOOK] Received event: customer.subscription.created
[WEBHOOK] Received event: invoice.payment_succeeded
```

6. **Check database updated:**

```sql
SELECT * FROM tenants WHERE stripe_customer_id = 'cus_xxx';
```

Should show:
- `stripe_subscription_id`: `sub_xxx`
- `subscription_status`: `trialing`
- `subscription_tier`: `starter`
- `trial_end_date`: 14 days from now
- `assessments_limit`: 5

## Troubleshooting

### Webhook Secret Not Working

**Symptom:** `[WEBHOOK] Signature verification failed`

**Solution:**
1. Make sure you copied the secret from `stripe listen` output
2. Restart your dev server after adding `STRIPE_WEBHOOK_SECRET`
3. Check for typos in `.env.local`

### Events Not Processing

**Symptom:** Webhook receives event but doesn't sync

**Check:**
1. Is the event in the `TRACKED_EVENTS` list?
2. Does the event have a customer ID?
3. Check the logs for error details

### Database Not Updating

**Symptom:** Webhook processes but DB unchanged

**Check:**
1. Is the customer ID in the tenants table?
2. Check `stripe_customer_id` field matches
3. Look for errors in sync function logs

## Production Setup

### Configure Stripe Webhook Endpoint

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. URL: `https://yourdomain.com/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `customer.subscription.trial_will_end`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `invoice.payment_action_required`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`

5. Copy the signing secret and add to production environment variables

## Test Checklist

- [ ] Webhook receives events from Stripe
- [ ] Signature verification works
- [ ] Checkout completion syncs subscription
- [ ] Trial subscription created correctly
- [ ] Payment success updates status
- [ ] Payment failure logs properly
- [ ] Untracked events ignored
- [ ] Invalid signatures rejected
- [ ] Database updates are atomic
- [ ] Bonus assessments increment correctly

## Monitoring

**Watch for:**
- Webhook success rate (should be >99%)
- Sync function errors
- Missing customer IDs
- Signature verification failures

**Check regularly:**
```sql
SELECT
  COUNT(*) as total_subscriptions,
  subscription_status,
  subscription_tier
FROM tenants
WHERE stripe_customer_id IS NOT NULL
GROUP BY subscription_status, subscription_tier;
```