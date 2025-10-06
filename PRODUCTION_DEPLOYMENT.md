# Production Deployment Checklist

## Prerequisites

- [ ] All code committed and pushed to `feature/white-label-platform` branch
- [ ] Build passing locally (`npm run build`)
- [ ] Environment variables documented
- [ ] Database migrations applied to production Supabase

## 1. Deployment Setup

### Deploy Application

- [ ] Deploy to production hosting (Vercel/Netlify/etc.)
- [ ] Verify deployment URL is live
- [ ] Test basic routes work:
  - [ ] Landing page loads
  - [ ] OAuth callback works
  - [ ] Admin portal accessible

### Production URL
```
https://deployai.studio
```

## 2. Stripe Configuration

### A. Configure Products & Prices

**Go to:** Stripe Dashboard → Products

- [ ] Create **Starter Plan**
  - Price: $199/month
  - Trial period: 14 days
  - Metadata: `tier: starter`, `assessments_limit: 5`
- [ ] Create **Professional Plan**
  - Price: $499/month
  - Trial period: 14 days
  - Metadata: `tier: professional`, `assessments_limit: 20`
- [ ] Create **Scale Plan**
  - Price: $997/month
  - Trial period: 14 days
  - Metadata: `tier: scale`, `assessments_limit: null`
- [ ] Create **Single Assessment**
  - Price: $99 one-time
  - Metadata: `type: single_assessment`

**Copy Price IDs:**
```
Starter: price_xxx
Professional: price_xxx
Scale: price_xxx
Single: price_xxx
```

### B. Configure Webhook Endpoint

**Go to:** Stripe Dashboard → Developers → Webhooks → Add endpoint

**Endpoint URL:**
```
https://deployai.studio/api/stripe/webhook
```

**Select Events to Listen:**
- [x] `checkout.session.completed`
- [x] `customer.subscription.created`
- [x] `customer.subscription.updated`
- [x] `customer.subscription.deleted`
- [x] `customer.subscription.paused`
- [x] `customer.subscription.resumed`
- [x] `customer.subscription.trial_will_end`
- [x] `invoice.paid`
- [x] `invoice.payment_succeeded`
- [x] `invoice.payment_failed`
- [x] `invoice.payment_action_required`
- [x] `payment_intent.succeeded`
- [x] `payment_intent.payment_failed`
- [x] `customer.subscription.pending_update_applied`

**After creating endpoint:**
- [ ] Copy Signing Secret: `whsec_xxx`
- [ ] Test endpoint with "Send test webhook" button
- [ ] Verify webhook shows "Succeeded" status

### C. Configure Stripe Settings

**Go to:** Stripe Dashboard → Settings

- [ ] **Payment Methods** → Disable "Cash App Pay"
- [ ] **Subscriptions** → Disable "Multiple subscriptions per customer"
- [ ] **Customer Portal** → Enable and configure:
  - [ ] Allow subscription cancellation
  - [ ] Show payment method update
  - [ ] Set return URL: `https://deployai.studio/[tenant]/admin/billing`
- [ ] **Billing** → Enable Smart Retries
- [ ] **Payment Methods** → Set 3D Secure to "Adaptive"

## 3. Environment Variables

### Production Environment Variables

Add these to your hosting platform (Vercel/Netlify/etc.):

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://nwddsjghbyrerhhnciuk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe (Test Mode - Start Here)
STRIPE_SECRET_KEY=sk_test_YOUR_TEST_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_TEST_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET

# Stripe Price IDs (Test Mode)
STRIPE_PRICE_STARTER_ID=price_xxx
STRIPE_PRICE_PROFESSIONAL_ID=price_xxx
STRIPE_PRICE_SCALE_ID=price_xxx
STRIPE_PRICE_SINGLE_ID=price_xxx

# Application
NEXT_PUBLIC_APP_URL=https://deployai.studio
NEXT_PUBLIC_SITE_URL=https://deployai.studio

# Email (Resend)
RESEND_API_KEY=re_YOUR_API_KEY

# AI Providers
ANTHROPIC_API_KEY=sk-ant-xxx
OPENAI_API_KEY=sk-proj-xxx
AI_PROVIDER=openai
WRITE_UP_MODEL=gpt-5

# Internal
INTERNAL_API_KEY=your-secure-random-key
CRON_SECRET=your-secure-random-key
```

### Verify Environment Variables Loaded

After deployment:
- [ ] Check deployment logs show correct environment
- [ ] Test API endpoint returns success
- [ ] Verify Stripe connection: `curl https://deployai.studio/api/stripe/test-connection`

## 4. Database Setup

### Verify Migrations Applied

Run in Supabase SQL Editor:

```sql
-- Check billing fields exist
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'tenants'
AND column_name LIKE '%stripe%' OR column_name LIKE '%subscription%';

-- Check helper functions exist
SELECT routine_name
FROM information_schema.routines
WHERE routine_name IN (
  'increment_assessment_usage',
  'can_create_assessment',
  'reset_assessment_usage'
);

-- Check billing_status view exists
SELECT table_name
FROM information_schema.views
WHERE table_name = 'billing_status';
```

**Expected Results:**
- [ ] All stripe/subscription columns present
- [ ] All 3 helper functions exist
- [ ] billing_status view exists

## 5. Testing Production Setup

### A. Test Stripe Connection

```bash
curl https://deployai.studio/api/stripe/test-connection
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Stripe connection successful!",
  "testMode": true
}
```

### B. Test Webhook Endpoint

**In Stripe Dashboard:**
1. Go to Webhooks → Your endpoint
2. Click "Send test webhook"
3. Select `checkout.session.completed`
4. Click "Send test webhook"

**Check:**
- [ ] Status shows "Succeeded"
- [ ] Response time < 3 seconds
- [ ] Check application logs for `[WEBHOOK] Received event`

### C. Test Trial Signup Flow

1. **Create Test Account:**
   - [ ] Sign up with Google OAuth
   - [ ] Redirected to trial setup page
   - [ ] See "Start Free Trial" CTA

2. **Complete Trial Checkout:**
   - [ ] Click "Start Free Trial"
   - [ ] Stripe Checkout opens
   - [ ] Use test card: `4242 4242 4242 4242`
   - [ ] Complete checkout
   - [ ] Redirected to success page
   - [ ] Redirected to admin dashboard

3. **Verify Database:**
   ```sql
   SELECT
     subdomain,
     stripe_customer_id,
     stripe_subscription_id,
     subscription_status,
     subscription_tier,
     trial_end_date,
     assessments_limit
   FROM tenants
   WHERE stripe_customer_id IS NOT NULL
   ORDER BY created_at DESC
   LIMIT 1;
   ```

   **Should show:**
   - [ ] `stripe_customer_id`: `cus_xxx`
   - [ ] `stripe_subscription_id`: `sub_xxx`
   - [ ] `subscription_status`: `trialing`
   - [ ] `subscription_tier`: `starter`
   - [ ] `trial_end_date`: 14 days from now
   - [ ] `assessments_limit`: 5

4. **Verify Stripe Dashboard:**
   - [ ] Customer created
   - [ ] Subscription in "Trialing" status
   - [ ] Trial end date set correctly

### D. Test Webhook Events

**In Stripe Dashboard → Webhooks → Your endpoint → Events:**

- [ ] `checkout.session.completed` received
- [ ] `customer.subscription.created` received
- [ ] All events show "Succeeded"
- [ ] Database updated correctly after each event

## 6. Monitoring Setup

### Stripe Dashboard Monitoring

**Go to:** Stripe Dashboard → Developers → Webhooks → Your endpoint

**Monitor:**
- [ ] Success rate (target: >99%)
- [ ] Response time (target: <3s)
- [ ] Failed events (investigate any failures)

### Application Monitoring

**Check logs for:**
- [ ] `[WEBHOOK] ✓ Sync successful` messages
- [ ] No `[WEBHOOK ERROR]` messages
- [ ] No signature verification failures

### Database Monitoring

**Run regularly:**
```sql
-- Check subscription distribution
SELECT
  subscription_status,
  subscription_tier,
  COUNT(*) as count
FROM tenants
WHERE stripe_customer_id IS NOT NULL
GROUP BY subscription_status, subscription_tier;

-- Check trial expirations
SELECT
  subdomain,
  trial_end_date,
  subscription_status,
  assessments_used,
  assessments_limit
FROM tenants
WHERE subscription_status = 'trialing'
AND trial_end_date < NOW() + INTERVAL '3 days'
ORDER BY trial_end_date;
```

## 7. Going Live (When Ready)

### Switch to Live Mode

**⚠️ Only do this when ready for real customers and real charges!**

1. **In Stripe Dashboard:**
   - [ ] Toggle to "Live mode" (top right)
   - [ ] Create products and prices again (live mode)
   - [ ] Create new webhook endpoint for live mode
   - [ ] Get new webhook signing secret

2. **Update Environment Variables:**
   ```env
   # LIVE KEYS
   STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
   STRIPE_WEBHOOK_SECRET=whsec_YOUR_LIVE_WEBHOOK_SECRET

   # LIVE PRICE IDs
   STRIPE_PRICE_STARTER_ID=price_live_xxx
   STRIPE_PRICE_PROFESSIONAL_ID=price_live_xxx
   STRIPE_PRICE_SCALE_ID=price_live_xxx
   STRIPE_PRICE_SINGLE_ID=price_live_xxx
   ```

3. **Redeploy Application:**
   - [ ] Deploy with live environment variables
   - [ ] Test with real card (small amount)
   - [ ] Verify webhooks fire correctly
   - [ ] Check real subscription created

## 8. Post-Launch Monitoring

### Week 1 Checklist

- [ ] Monitor webhook success rate daily
- [ ] Check for failed payments
- [ ] Verify trials converting correctly
- [ ] Review subscription metrics
- [ ] Check for any error logs

### Ongoing Monitoring

- **Daily:**
  - [ ] Webhook success rate
  - [ ] Failed payments

- **Weekly:**
  - [ ] Trial conversion rate
  - [ ] Subscription churn
  - [ ] Usage patterns

- **Monthly:**
  - [ ] Revenue metrics
  - [ ] Customer lifetime value
  - [ ] Platform usage trends

## 9. Rollback Plan

If issues arise:

1. **Immediate:**
   - [ ] Switch Stripe back to test mode
   - [ ] Deploy previous stable version
   - [ ] Disable webhook endpoint

2. **Investigation:**
   - [ ] Review webhook logs
   - [ ] Check database for inconsistencies
   - [ ] Review error tracking

3. **Fix & Redeploy:**
   - [ ] Fix identified issues
   - [ ] Test thoroughly in test mode
   - [ ] Redeploy to production

## Support Resources

- **Stripe Documentation**: https://stripe.com/docs
- **Stripe Dashboard**: https://dashboard.stripe.com
- **Webhook Testing**: `WEBHOOK_TESTING.md`
- **Implementation Tracker**: `STRIPE_IMPLEMENTATION_TRACKER.md`
- **Epic**: `STRIPE_BILLING_EPIC_REVISED.md`

---

## Notes

- Start in **Test Mode** and thoroughly test before going live
- Keep test and live environments separate
- Monitor webhook success rate closely
- Set up alerts for failed webhooks
- Regularly check database sync status