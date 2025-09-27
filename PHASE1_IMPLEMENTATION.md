# Phase 1: Multi-Tenant Foundation - Implementation Complete

## Overview
Phase 1 establishes the multi-tenant foundation for the deployAI white-label platform. This implementation enables consultants to have their own isolated environments accessed via subdomains.

## What Was Built

### 1. Database Schema (✅ Complete)
**File:** `supabase/migrations/005_add_multi_tenant_support.sql`

Created three new tables:
- `tenants` - Stores consultant/tenant information
- `tenant_members` - User-tenant relationships
- `tenant_invitations` - Pending invitations with tokens

Modified existing tables:
- Added `tenant_id` column to all assessment tables
- Created indexes for performance
- Implemented Row Level Security (RLS) policies

**To Apply Migration:**
1. Go to Supabase Dashboard
2. Navigate to SQL Editor
3. Paste contents of `005_add_multi_tenant_support.sql`
4. Run the migration

### 2. Subdomain Routing (✅ Complete)
**File:** `src/middleware.ts`

- Extracts subdomain from request headers
- Handles both production (`*.deployai.studio`) and local development
- Injects `x-tenant-subdomain` header for downstream processing
- Ignores `www` and main domain traffic

### 3. Tenant Service Layer (✅ Complete)
**File:** `src/services/tenant.ts`

Core functions:
- `getTenantBySubdomain()` - Fetch tenant by subdomain
- `validateTenantAccess()` - Check user permissions
- `getTenantContext()` - Full tenant context with usage
- `incrementAssessmentUsage()` - Track assessment usage
- `createTenant()` - Create new tenant account
- `updateSubscription()` - Handle tier changes

### 4. Tenant Context Provider (✅ Complete)
**File:** `src/contexts/TenantContext.tsx`

React context that:
- Provides tenant data throughout the app
- Auto-fetches tenant based on subdomain
- Exposes `useTenant()` hook for components
- Handles loading and error states

### 5. Helper Functions (✅ Complete)
**File:** `src/utils/tenant-helpers.ts`

Utilities for API routes:
- `getTenantFromRequest()` - Extract tenant from API request
- `requireTenantContext()` - Enforce tenant requirements
- `addTenantIdToData()` - Add tenant_id to database operations

### 6. Updated API Routes (✅ Complete)

**Quiz Submit:** `src/pages/api/quiz/submit.ts`
- Checks tenant assessment limits
- Adds tenant_id to quiz responses and reports
- Increments usage counter

**MVP Planner Submit:** `src/pages/api/mvp-planner/submit.ts`
- Same tenant isolation as quiz
- Tracks usage across both assessment types

**Tenant Usage:** `src/pages/api/tenant/usage.ts`
- New endpoint to check current usage
- Returns remaining assessments

### 7. App Integration (✅ Complete)
**File:** `src/pages/_app.tsx`
- Wrapped app with `TenantProvider`
- Tenant context available globally

## Testing Phase 1

### Local Testing Setup

1. **Apply the database migration** (see above)

2. **Create a test tenant** via Supabase SQL Editor:
```sql
INSERT INTO tenants (
  subdomain,
  company_name,
  email,
  subscription_tier,
  assessments_limit
) VALUES (
  'testconsultant',
  'Test Consulting Inc',
  'test@example.com',
  'starter',
  5
);
```

3. **Add yourself as a member:**
```sql
INSERT INTO tenant_members (
  tenant_id,
  user_email,
  role
) VALUES (
  (SELECT id FROM tenants WHERE subdomain = 'testconsultant'),
  'your-email@example.com',
  'admin'
);
```

4. **Test subdomain routing locally:**
   - Add to `/etc/hosts`: `127.0.0.1 testconsultant.localhost`
   - Visit `http://testconsultant.localhost:3000`
   - Check browser console for tenant context

5. **Test API isolation:**
```bash
# Check tenant usage
curl http://testconsultant.localhost:3000/api/tenant/usage \
  -H "x-tenant-subdomain: testconsultant"
```

### Verification Checklist

- [ ] Subdomain routing works (`testconsultant.localhost:3000`)
- [ ] Tenant context loads in React components
- [ ] API routes check tenant limits
- [ ] Assessment submissions include tenant_id
- [ ] Usage increments after submission
- [ ] Limits enforced (try submitting 6th assessment on starter)

## Next Steps: Phase 2

### Consultant Admin Portal
- Dashboard at `/[subdomain]/admin`
- Assessment history view
- Usage tracking UI
- Export functionality

### Stripe Integration
- Subscription management
- Payment processing
- Tier upgrades/downgrades

### White-label Customization
- Custom logos
- Custom assessment titles
- Branded email templates

## Environment Variables

Add to `.env.local`:
```bash
NEXT_PUBLIC_BASE_DOMAIN=deployai.studio
```

## Troubleshooting

### Subdomain not working locally?
- Check `/etc/hosts` file
- Ensure middleware is running (check console)
- Verify `x-tenant-subdomain` header in Network tab

### Tenant not found?
- Verify tenant exists in database
- Check subdomain spelling
- Ensure RLS policies aren't blocking access

### Assessment limit not enforced?
- Check `assessments_used` vs `assessments_limit` in database
- Verify `incrementAssessmentUsage()` is called
- Check tenant context in API route

## Architecture Decisions

1. **Why subdomains?** Clean separation, better branding for consultants
2. **Why RLS?** Simpler than separate databases, cost-effective
3. **Why tenant_id on existing tables?** Minimal changes, backwards compatible
4. **Why middleware?** Centralized subdomain extraction, works with all routes

## Security Considerations

- RLS policies enforce data isolation
- Tenant context validated on each request
- User email must match tenant_members record
- Invitations expire after 7 days
- Admin role required for tenant management

## Performance Notes

- Indexes on all foreign keys
- Tenant lookup cached in React context
- Subdomain extraction happens once in middleware
- RLS policies use efficient subqueries

## Migration Rollback

If needed, rollback with:
```sql
-- Remove columns from existing tables
ALTER TABLE quiz_responses DROP COLUMN IF EXISTS tenant_id;
ALTER TABLE ai_reports DROP COLUMN IF EXISTS tenant_id;
ALTER TABLE mvp_planner_responses DROP COLUMN IF EXISTS tenant_id;
ALTER TABLE mvp_planner_reports DROP COLUMN IF EXISTS tenant_id;

-- Drop new tables
DROP TABLE IF EXISTS tenant_invitations;
DROP TABLE IF EXISTS tenant_members;
DROP TABLE IF EXISTS tenants;
```

## Contact

For questions about Phase 1 implementation, check:
- This documentation
- Code comments in implemented files
- Supabase dashboard for database state