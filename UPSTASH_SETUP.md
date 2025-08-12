# Upstash Workflow Setup Guide

## Overview
This guide will help you set up Upstash QStash to enable long-running AI operations that bypass Vercel's 10-second timeout limit.

## 1. Create Upstash Account

1. Go to [https://console.upstash.com](https://console.upstash.com)
2. Sign up for a free account (GitHub, Google, or email)
3. Verify your email if needed

## 2. Set Up QStash

1. Once logged in, click on **QStash** in the sidebar
2. You'll see your QStash dashboard with:
   - **QStash Token** (starts with `qstash_`)
   - **Current Request URL** (https://qstash.upstash.io)
   - Usage metrics

3. Copy your **QStash Token** - you'll need this for the environment variables

## 3. Update Environment Variables

Add these to your `.env.local` file:

```env
# Upstash QStash Configuration
QSTASH_TOKEN=qstash_xxxxxxxxxxxxxx  # Your actual token from Upstash console
QSTASH_URL=https://qstash.upstash.io
```

## 4. Deploy to Vercel

### Option A: Via Vercel Dashboard

1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:
   - `QSTASH_TOKEN` - Your QStash token from Upstash
   - `QSTASH_URL` - https://qstash.upstash.io
4. Redeploy your application

### Option B: Via Vercel CLI

```bash
vercel env add QSTASH_TOKEN
vercel env add QSTASH_URL
vercel --prod
```

## 5. Testing the Workflow

### Local Testing with ngrok

1. Install ngrok:
```bash
brew install ngrok  # macOS
# or download from https://ngrok.com
```

2. Start your dev server:
```bash
npm run dev
```

3. In another terminal, expose your local server:
```bash
ngrok http 3002
```

4. Copy the ngrok URL (e.g., `https://abc123.ngrok.io`)

5. Update your workflow client temporarily:
```typescript
// In src/lib/workflow/client.ts
const baseUrl = "https://abc123.ngrok.io"; // Your ngrok URL
```

6. Test the pipeline:
```bash
node test-final.js
```

### Production Testing

1. Deploy to a preview branch first:
```bash
git checkout -b test-workflow
git add .
git commit -m "Add Upstash Workflow integration"
git push origin test-workflow
```

2. Create a pull request and get the preview URL

3. Test with a single report submission

4. Monitor in Upstash Console:
   - Go to QStash dashboard
   - Click on **Events** to see workflow executions
   - Check **Logs** for detailed execution info

## 6. Monitoring and Debugging

### Upstash Console

- **Events Tab**: Shows all workflow runs with status
- **DLQ (Dead Letter Queue)**: Failed messages that couldn't be delivered
- **Logs**: Detailed execution logs for each workflow run

### Check Workflow Status

```bash
# Using the status endpoint
curl https://your-app.vercel.app/api/workflow/status/report-123
```

### View Logs in Code

```typescript
import { workflowClient } from '@/lib/workflow/client';

const { runs } = await workflowClient.logs({
  workflowRunId: "report-123"
});
```

## 7. Cost Analysis

### Free Tier Limits
- **Messages**: 50,000/month
- **Max Duration**: 15 minutes per request
- **Retries**: 3 automatic retries with exponential backoff

### Your Usage
- Each report uses ~10 messages:
  - 1 trigger
  - 4 AI calls (context.call)
  - 4 database saves (context.run)
  - 1 email send
- 100 reports/month = 1,000 messages = 2% of free tier

### Monitoring Usage
1. Go to QStash dashboard
2. Check the usage meter at the top
3. Set up alerts if approaching limits

## 8. Troubleshooting

### Common Issues

#### 1. "Failed to authenticate Workflow request"
- Ensure QSTASH_TOKEN is set correctly
- Check token doesn't have extra spaces or quotes

#### 2. Workflow not triggering
- Verify ngrok URL is accessible (for local testing)
- Check Vercel environment variables are set
- Look for errors in Vercel Function logs

#### 3. Timeout errors
- Individual AI calls can run up to 15 minutes
- If still timing out, break into smaller steps

#### 4. Failed workflows in DLQ
- Check Dead Letter Queue in QStash console
- Can manually retry failed workflows
- Review error messages for root cause

### Debug Commands

```bash
# Check if QStash token is valid
curl -H "Authorization: Bearer YOUR_QSTASH_TOKEN" \
  https://qstash.upstash.io/v2/messages

# Manually trigger workflow
curl -X POST https://your-app.vercel.app/api/workflow/process-pipeline \
  -H "Content-Type: application/json" \
  -d '{"reportId": "test-123"}'
```

## 9. Architecture Overview

```
Quiz Submit (2s timeout)
    ↓
Trigger Workflow → QStash
    ↓
Workflow Orchestrator
    ├── Stage 1: Problem Analysis (context.call → up to 15 min)
    ├── Stage 2: Tool Research (context.call → up to 15 min)
    ├── Stage 3: Tool Curation (context.call → up to 15 min)
    ├── Stage 4: Report Generation (context.call → up to 15 min)
    └── Send Email & Update Status
```

## 10. Rollback Plan

If you need to rollback to the old pipeline:

1. In `src/pages/api/quiz/submit.ts`, revert the workflow trigger to direct pipeline call
2. In `src/pages/api/cron/process-reports.ts`, revert to direct pipeline calls
3. The old `/api/ai-analysis/process-pipeline` endpoint still exists as backup

## Support

- **Upstash Discord**: [discord.gg/upstash](https://discord.gg/upstash)
- **Upstash Docs**: [upstash.com/docs/qstash](https://upstash.com/docs/qstash)
- **GitHub Issues**: Report issues in your repository