# Supabase Authentication Setup

## Current Configuration (Already Set Up)

### Site URL
- `http://localhost:3000`

### Redirect URLs
- `http://localhost:3000/auth/callback` ✅
- `http://localhost:3001/auth/callback` ✅
- `http://deployai.studio/auth/callback` ✅

### Google OAuth Setup
1. Go to Authentication > Providers
2. Enable Google
3. Add your Google OAuth Client ID and Secret
4. The redirect URL for Google Console should be: `https://nwddsjghbyrerhhnciuk.supabase.co/auth/v1/callback`

## How It Works
1. User clicks "Continue with Google" on login page
2. Supabase redirects to Google OAuth
3. Google redirects back to Supabase
4. Supabase redirects to Site URL (`http://localhost:3000`) with OAuth code
5. Home page detects OAuth code and redirects to `/auth/callback`
6. Callback page processes authentication and redirects to tenant admin

## For Production
Add these URLs when deploying:
```
https://deployai.app
https://deployai.app/auth/callback
https://*.deployai.app/auth/callback
```

## Testing Auth Flow
1. Navigate to any tenant login page: `http://localhost:3000/testconsultant/admin/login`
2. Click "Continue with Google"
3. Complete Google OAuth
4. Should redirect back to `/auth/callback` which then redirects to the tenant admin page

## Database Migration Required
Run the following SQL in Supabase SQL Editor:
```sql
-- See /supabase/migrations/006_add_admin_auth.sql
```