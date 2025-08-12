# Upstash Workflow Environment Variables

## Required Environment Variables for Production

Add these to your Vercel environment variables:

### 1. UPSTASH_WORKFLOW_URL (REQUIRED)
```
UPSTASH_WORKFLOW_URL=https://deployai.studio
```
(Replace with your actual domain - MUST include https://)
**Important:** Set this to your BASE URL only, not the full workflow endpoint path.

### 2. NEXT_PUBLIC_APP_URL (Optional fallback)
```
NEXT_PUBLIC_APP_URL=https://deployai.studio
```
(Used as fallback if UPSTASH_WORKFLOW_URL is not set)

### 3. QSTASH_URL
```
QSTASH_URL=https://qstash.upstash.io
```

### 4. QSTASH_TOKEN
```
QSTASH_TOKEN=your_actual_token_here
```

### 5. QSTASH_CURRENT_SIGNING_KEY
```
QSTASH_CURRENT_SIGNING_KEY=sig_xxxxx
```

### 6. QSTASH_NEXT_SIGNING_KEY
```
QSTASH_NEXT_SIGNING_KEY=sig_xxxxx
```

## Vercel Automatic Variables

Vercel provides these automatically:
- `VERCEL_URL` - The domain of your deployment (without protocol)
- `VERCEL_ENV` - The environment (production, preview, development)

## Debugging Workflow URL Issues

If you see the error:
```
WorkflowError: Workflow URL should start with 'http://' or 'https://'. Received is '/api/workflow/process-pipeline'
```

This means the workflow can't determine its own URL. Check:

1. **NEXT_PUBLIC_APP_URL** is set correctly with protocol
2. The workflow endpoint logs show which URL is being used
3. Your domain is correctly configured in Vercel

## Testing

After setting environment variables:
1. Redeploy your application
2. Check the logs for `[Workflow Config]` messages
3. Verify the workflow URL is correct