# Required Environment Variables for Vercel Production

## Critical for Upstash Workflow

Due to a known issue with Upstash auto-detection on Vercel, you MUST set the UPSTASH_WORKFLOW_URL environment variable:

### Required: UPSTASH_WORKFLOW_URL
```
UPSTASH_WORKFLOW_URL=https://deployai.studio
```
(Replace with your actual domain - MUST include https://)

Set this to your BASE URL only (not the full workflow endpoint path). The workflow will use this as the base URL for all API calls.

### Optional Fallback: NEXT_PUBLIC_APP_URL
```
NEXT_PUBLIC_APP_URL=https://deployai.studio
```
This serves as a fallback if UPSTASH_WORKFLOW_URL is not set.

## QStash Configuration (Required)
```
QSTASH_TOKEN=your_actual_token_here
QSTASH_CURRENT_SIGNING_KEY=sig_xxxxx
QSTASH_NEXT_SIGNING_KEY=sig_xxxxx
```

## Supabase (Required)
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## AI APIs (Required)
```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
OPENAI_API_KEY=sk-proj-xxxxx
```

## Email (Required)
```
RESEND_API_KEY=re_xxxxx
```

## Other Settings
```
AI_PROVIDER=openai
WRITE_UP_MODEL=gpt-5
GPT5_REASONING_EFFORT_STEP1=minimal
GPT5_REASONING_EFFORT_STEP2=medium
GPT5_REASONING_EFFORT_STEP3=medium
GPT5_REASONING_EFFORT_STEP4=high
GPT5_VERBOSITY=medium
INTERNAL_API_KEY=your-secure-key
CRON_SECRET=your-cron-secret
```

## Vercel Automatic Variables (Don't set these)
- `VERCEL_URL` - Automatically provided
- `VERCEL_ENV` - Automatically provided

## Debugging Steps

1. Check Function Logs in Vercel for `[Workflow]` messages
2. Verify QSTASH_TOKEN is valid in Upstash Console
3. Ensure your domain is correctly configured
4. Check that the workflow endpoint is accessible: `curl -X POST https://your-domain.com/api/workflow/process-pipeline`