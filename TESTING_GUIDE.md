# Testing Guide - Assessment Pause & Email Features

This document outlines all features implemented in this session and how to test them.

---

## 1. PARTNER SEND REPORT CONTROL

### What Was Built:
- Added "Send Report" button to assessment detail page
- Modal with two options: resend to original email or send to different email
- Uses existing API endpoint

### Where to Test:
`/{tenant}/admin/assessments/{assessmentId}`

### Test Scenarios:

**Scenario 1: Resend to Original Email**
1. Navigate to any completed assessment
2. Click "Send Report" button (top right, next to "View Report")
3. Modal opens with two options
4. Select "Resend to Original Email"
5. Verify original email is displayed
6. Click "Send Report"
7. ✅ Should show success alert with recipient email
8. ✅ Page refreshes and shows updated timestamp

**Scenario 2: Send to Different Email**
1. Click "Send Report" on completed assessment
2. Select "Send to Different Email"
3. Form appears with:
   - Email (required)
   - First Name (optional)
   - Last Name (optional)
4. Enter new recipient details
5. Click "Send Report"
6. ✅ Success alert shows new email address
7. ✅ Email sent to new recipient

**Scenario 3: Validation**
1. Select "Send to Different Email"
2. Try sending without email
3. ✅ Should show "Please enter a valid email address"

---

## 2. LOGIN PAGE DESIGN UPDATE

### What Was Built:
- Updated tenant login page to match signup page design
- Gradient background (orange-50 to blue-50)
- Orange accent colors
- Rounded corners and modern styling

### Where to Test:
`/{tenant}/admin/login`

### Test Scenarios:

**Visual Verification**
1. Navigate to `localhost:3000/{yourtenant}/admin/login`
2. ✅ Background should have orange-to-blue gradient
3. ✅ White card with rounded corners and shadow
4. ✅ Orange focus rings on inputs
5. ✅ Orange submit button
6. ✅ Orange links
7. ✅ Should look identical to `/signup` page design

---

## 3. PAUSE/RESUME ASSESSMENTS FEATURE

### What Was Built:
- Pause/Resume toggle in billing settings
- API endpoint to change subscription_status
- Paused banner on admin dashboard
- Smart assessment blocking
- Different messaging for paused vs limit-reached

### Where to Test:

#### A. Billing Settings Control
`/{tenant}/admin/settings/billing`

**Test Scenario 1: Pause Assessments**
1. Login as partner admin
2. Navigate to Settings > Billing
3. Scroll to "Assessment Controls" card
4. Click "Pause Assessments"
5. ✅ Confirmation dialog appears: "Are you sure you want to pause assessments? No new assessments can be taken until you resume."
6. Click OK
7. ✅ Button changes to "Resume Assessments"
8. ✅ Amber warning box appears: "Assessments Paused"
9. ✅ Status updates immediately

**Test Scenario 2: Resume Assessments**
1. While paused, click "Resume Assessments"
2. ✅ Confirmation dialog: "Are you sure you want to resume assessments? New assessments will be allowed."
3. Click OK
4. ✅ Button changes back to "Pause Assessments"
5. ✅ Warning box disappears

#### B. Admin Dashboard Banner
`/{tenant}/admin`

**Test Scenario 3: Paused Banner**
1. Pause assessments (from billing settings)
2. Navigate to admin dashboard
3. ✅ Large amber banner appears below trial banner (if applicable)
4. ✅ Shows: "⏸️ Assessments Paused"
5. ✅ Message: "Your assessment portal is currently paused. Clients cannot take new assessments until you resume..."
6. ✅ "Resume Assessments" button links to billing settings

**Test Scenario 4: Banner Disappears When Resumed**
1. Resume assessments
2. Return to dashboard
3. ✅ Paused banner should be gone

#### C. End User Experience (Paused)
`/{tenant}/assessment`

**Test Scenario 5: End User Sees Waitlist Page**
1. Pause assessments
2. Open incognito/private window
3. Navigate to `localhost:3000/{yourtenant}/assessment`
4. ✅ Redirects to `/assessment/request?reason=paused`
5. ✅ Blue banner with 🌟 emoji
6. ✅ Header: "We're Taking a Short Break"
7. ✅ Message: "We're not accepting new assessments right now, but we don't want you to miss out!"
8. ✅ Green checkmark box with 3 benefits
9. ✅ Form title: "Join the Waitlist"
10. ✅ Button text: "JOIN THE WAITLIST"

**Test Scenario 6: Submit Waitlist Request**
1. Fill out form with test data
2. Click "JOIN THE WAITLIST"
3. ✅ Success page: "You're on the waitlist!"
4. ✅ Message: "You'll be the first to know when {company} resumes assessments..."

#### D. End User Experience (At Limit)
**Test Scenario 7: At Limit Shows Different Message**
1. Resume assessments (if paused)
2. Use up all assessments in your plan
3. Try to access assessment page
4. ✅ Redirects to `/assessment/request?reason=limit_reached`
5. ✅ Orange banner with ⚠️ emoji
6. ✅ Header: "Assessment Limit Reached"
7. ✅ Different message about billing period
8. ✅ Shows upgrade link

---

## 4. WAITLIST MANAGEMENT & SEND FEATURE

### What Was Built:
- Unified assessments list showing waitlist items
- "Send Assessment - $X" button for waitlist items
- Confirmation modal with cost breakdown
- Overage charging when sending while paused
- Changed "Requested" badge to "⏳ Waitlist"

### Where to Test:
`/{tenant}/admin/assessments`

#### A. Unified Assessments List

**Test Scenario 1: Waitlist Items Display**
1. Pause assessments
2. Have someone join the waitlist (or manually create request in DB)
3. Navigate to admin assessments list
4. ✅ Waitlist items show "⏳ Waitlist" badge (amber with border)
5. ✅ Action column shows: "Send Assessment - $4" button (price varies by tier)
6. ✅ Completed assessments still show "View" and report icon
7. ✅ All items in one unified list

**Test Scenario 2: Filter by Waitlist**
1. In assessments list, use status filter dropdown
2. Select "⏳ Waitlist"
3. ✅ Shows only waitlist items
4. ✅ Filter updates correctly

#### B. Send Assessment Modal

**Test Scenario 3: Send from Waitlist (Account Paused)**
1. Ensure account is paused
2. Click "Send Assessment - $4" on a waitlist item
3. ✅ Modal opens with title "Send Assessment"
4. ✅ Amber warning box: "⏸️ Your account is paused"
5. ✅ Shows recipient details:
   - Name: John Doe
   - Email: john@example.com
   - Company: Acme Inc
6. ✅ Cost section shows:
   - "Cost (overage rate): $4.00" (or $3/$2 based on tier)
   - "Your account will remain paused after sending"
7. ✅ Two buttons: "Cancel" and "Send for $4"

**Test Scenario 4: Send Confirmation**
1. Click "Send for $4"
2. ✅ Button text changes to "Sending..."
3. ✅ Success alert: "Assessment sent successfully to {email}!"
4. ✅ Modal closes
5. ✅ List refreshes
6. ✅ Item status changes from "⏳ Waitlist" to "APPROVED"

**Test Scenario 5: Send from Waitlist (Account Active)**
1. Resume assessments (account active)
2. Click "Send Assessment - $4" on a waitlist item
3. ✅ Modal opens WITHOUT paused warning
4. ✅ Message: "One-time charge as overage assessment"
5. Works the same way, charges overage

**Test Scenario 6: Cancel Modal**
1. Click "Send Assessment" on waitlist item
2. Click "Cancel" button
3. ✅ Modal closes
4. ✅ No charges made
5. ✅ Status unchanged

#### C. Overage Charging

**Test Scenario 7: Verify Overage Charges**
1. Note your current overage count and charges (check billing settings)
2. Send assessment from waitlist while paused
3. Navigate to Settings > Billing
4. ✅ `assessments_overage` incremented by 1
5. ✅ `overage_charges_current_period` increased by $4 (or tier rate)
6. ✅ Charges appear in billing dashboard

**Test Scenario 8: Tier-Based Pricing**
- Starter tier: ✅ Shows "$4" everywhere
- Professional tier: ✅ Shows "$3" everywhere
- Scale tier: ✅ Shows "$2" everywhere

#### D. Email Delivery

**Test Scenario 9: Assessment Link Email Sent**
1. Send assessment from waitlist
2. Check recipient's email inbox
3. ✅ Receives "Assessment Approved" email
4. ✅ Email contains assessment link
5. ✅ Link format: `/{tenant}/assessment?token={id}`
6. ✅ Clicking link allows them to start assessment

---

## 5. EMAIL SYSTEM (From Previous Work)

### What Was Built:
All 7 email categories completed:

1. **Billing/Subscription Emails** (6 templates)
2. **Usage Threshold Emails** (3 templates)
3. **Authentication Emails** (3 templates)
4. **Assessment Request Emails** (2 templates)
5. **Admin Notifications** (3 templates)
6. **Candidate Follow-up** (2 templates)
7. **Report-Ready Email** (updated)

### Where to Test:

#### Cron Jobs Created
These need to be added to `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/weekly-summary",
      "schedule": "0 9 * * 1"
    },
    {
      "path": "/api/cron/monthly-digest",
      "schedule": "0 9 1 * *"
    },
    {
      "path": "/api/cron/assessment-reminders",
      "schedule": "0 10 * * *"
    },
    {
      "path": "/api/cron/feedback-requests",
      "schedule": "0 11 * * *"
    }
  ]
}
```

**Test Manually:**
1. Navigate to `/api/cron/{endpoint}` with correct auth header
2. Set `CRON_SECRET` environment variable
3. Use Postman/curl with header: `Authorization: Bearer {CRON_SECRET}`

---

## DATABASE CHANGES NEEDED

### Missing Columns (Must Add):

```sql
-- For assessment reminders cron job
ALTER TABLE quiz_responses
ADD COLUMN IF NOT EXISTS reminder_sent_at TIMESTAMP WITH TIME ZONE;

-- For feedback requests cron job
ALTER TABLE ai_reports
ADD COLUMN IF NOT EXISTS first_viewed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS feedback_requested_at TIMESTAMP WITH TIME ZONE;
```

---

## ENVIRONMENT VARIABLES NEEDED

Add to `.env.local` or Vercel:

```bash
CRON_SECRET=your-random-secret-here-generate-something-secure
```

---

## TESTING CHECKLIST

### 🎯 Critical Path Tests

- [ ] Pause account from billing settings
- [ ] Verify paused banner shows on dashboard
- [ ] End user sees waitlist page when paused
- [ ] End user can submit waitlist request
- [ ] Waitlist item appears in admin assessments list with "⏳ Waitlist" badge
- [ ] Click "Send Assessment - $4" opens modal
- [ ] Modal shows correct pricing for tier
- [ ] Sending charges overage and sends email
- [ ] Resume account makes everything work normally again
- [ ] Send report feature works on completed assessments

### 🔧 Edge Cases

- [ ] Try pausing while already paused (should show error or be disabled)
- [ ] Try resuming while active (should show error or be disabled)
- [ ] Send assessment without email (validation)
- [ ] Multiple waitlist requests from same email
- [ ] Paused account with 0 assessments remaining
- [ ] Active account with waitlist items (still charges overage)

### 📧 Email Tests

- [ ] Report-ready email has new professional design
- [ ] Waitlist approval email sends with correct link
- [ ] Assessment reminder sends after 3 days (requires cron)
- [ ] Feedback request sends 3 days after report viewed (requires cron)
- [ ] All billing emails trigger on Stripe events

### 💰 Billing Tests

- [ ] Overage increments correctly
- [ ] Overage charges show in billing dashboard
- [ ] Different tiers have different overage prices
- [ ] Stripe webhook handles subscription events
- [ ] Trial ending email sends (3 days before)

---

## KNOWN LIMITATIONS

1. **Cron Jobs**: Require Vercel deployment and `vercel.json` config
2. **Database Columns**: `reminder_sent_at` and `feedback_requested_at` not in migrations yet
3. **Overage History Table**: May not exist, logs warning but doesn't fail
4. **Email Testing**: Requires Resend API key configured

---

## FILES MODIFIED

### Frontend Components:
- `src/pages/[tenant]/admin/settings/billing.tsx` - Pause/resume toggle
- `src/components/admin/Dashboard.tsx` - Paused banner
- `src/components/admin/AssessmentTable.tsx` - Waitlist UI & send modal
- `src/pages/[tenant]/admin/assessments/[id].tsx` - Send report button
- `src/pages/[tenant]/admin/login.tsx` - Design update
- `src/pages/[tenant]/assessment/request.tsx` - Waitlist messaging
- `src/pages/[tenant]/assessment/index.tsx` - Pass reason param

### Backend APIs:
- `src/pages/api/tenant/pause-assessments.ts` - NEW: Pause/resume endpoint
- `src/pages/api/tenant/can-create-assessment.ts` - Returns paused reason
- `src/pages/api/assessment-requests/[id]/approve.ts` - Charges overage when paused

### Email System (Previous Session):
- Created 19 email templates
- Added 19 email service functions
- Created 4 cron job endpoints
- Updated Stripe webhook handler

---

## DEPLOYMENT NOTES

### Before Deploying:

1. Add database migrations for missing columns
2. Add `CRON_SECRET` to environment variables
3. Update `vercel.json` with cron configuration
4. Test email service is configured (Resend API key)
5. Verify Stripe webhook is configured

### After Deploying:

1. Test cron jobs manually with auth header
2. Monitor Vercel logs for cron execution
3. Check Stripe webhooks are being received
4. Test email delivery in production

---

## QUESTIONS FOR QA

1. Should waitlist items expire after X days?
2. Should we send email to waitlist when account resumes?
3. Should there be a "bulk send" for all waitlist items?
4. Should overage charges sync to Stripe immediately or on billing cycle?
5. Maximum overage charges limit before blocking?

---

## SUCCESS METRICS

- [ ] Partners can pause/resume without issues
- [ ] End users understand waitlist vs limit messaging
- [ ] Overage charges calculate correctly
- [ ] Email delivery rate > 95%
- [ ] No errors in production logs
- [ ] Cron jobs run on schedule

---

*Last Updated: January 2025*
*Session: Assessment Pause & Waitlist Features*
