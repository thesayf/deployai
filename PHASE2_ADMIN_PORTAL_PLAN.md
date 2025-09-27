# Phase 2: Consultant Admin Portal Implementation Plan

## Overview
Build the consultant dashboard where they can manage assessments, view reports, and track usage.

## User Stories
As a consultant, I want to:
1. See my assessment usage at a glance
2. View all assessments my clients have taken
3. Access individual reports
4. Export data for my records
5. See my subscription details

## Technical Architecture

### Routes Structure
```
/admin                    - Dashboard (usage, recent activity)
/admin/assessments       - All assessments table
/admin/assessments/[id]  - View specific report
/admin/settings          - Account settings
/admin/billing           - Subscription management (Phase 4)
```

### Components Needed

#### 1. Admin Layout Component
`src/components/admin/AdminLayout.tsx`
- Sidebar navigation
- Header with tenant name
- Protected route wrapper

#### 2. Dashboard Components
`src/components/admin/Dashboard.tsx`
- Usage meter (visual progress bar)
- Recent assessments list
- Quick stats cards

#### 3. Assessment Table
`src/components/admin/AssessmentTable.tsx`
- Sortable columns
- Search/filter
- Pagination
- Export button

#### 4. Report Viewer
`src/components/admin/ReportViewer.tsx`
- Reuse existing report component
- Add admin-specific actions (export, resend)

## Implementation Steps

### Day 3: Dashboard & Navigation

**Morning: Admin Layout**
1. Create AdminLayout with sidebar
2. Add navigation menu items
3. Style with neubrutalist design
4. Add tenant context display

**Afternoon: Dashboard Page**
1. Create usage visualization component
2. Build recent assessments widget
3. Add statistics cards (total, this month, conversion rate)
4. Connect to real data via API

**API Endpoints Needed:**
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/assessments` - List all assessments
- `GET /api/admin/assessments/[id]` - Get specific assessment

### Day 4: Assessment Management

**Morning: Assessment Table**
1. Create data table component
2. Add sorting functionality
3. Implement search/filters
4. Add pagination

**Afternoon: Report Access & Export**
1. Create report detail view
2. Add CSV export functionality
3. Implement bulk export
4. Add date range filters

## Database Queries Needed

### Dashboard Stats
```sql
-- Get usage stats for tenant
SELECT
  t.assessments_used,
  t.assessments_limit,
  t.subscription_tier,
  COUNT(qr.id) as total_assessments,
  COUNT(CASE WHEN qr.created_at > NOW() - INTERVAL '30 days' THEN 1 END) as monthly_assessments
FROM tenants t
LEFT JOIN quiz_responses qr ON qr.tenant_id = t.id
WHERE t.id = $1
GROUP BY t.id;
```

### Recent Assessments
```sql
-- Get recent assessments for tenant
SELECT
  qr.id,
  qr.user_email,
  qr.user_company,
  qr.completed_at,
  ar.report_status,
  ar.access_token
FROM quiz_responses qr
LEFT JOIN ai_reports ar ON ar.quiz_response_id = qr.id
WHERE qr.tenant_id = $1
ORDER BY qr.created_at DESC
LIMIT 10;
```

## UI/UX Specifications

### Dashboard Layout
```
┌─────────────────────────────────────────────┐
│  [Logo] Consultant Dashboard    [Settings]  │
├──────────┬──────────────────────────────────┤
│          │                                  │
│ Dashboard│   Usage This Month               │
│          │   ████████░░░░░░ 3 of 5         │
│ Assess.  │                                  │
│          │   Recent Assessments             │
│ Reports  │   ┌──────────────────────────┐  │
│          │   │ • Acme Corp - 2 hrs ago │  │
│ Settings │   │ • Beta Inc - 5 hrs ago  │  │
│          │   │ • Gamma LLC - 1 day ago │  │
│          │   └──────────────────────────┘  │
│          │                                  │
└──────────┴──────────────────────────────────┘
```

### Design Tokens (Neubrutalist)
- Black borders: 3px solid
- Box shadows: 6px 6px 0 black
- No rounded corners
- High contrast colors
- Bold typography

## Success Criteria

### Functional Requirements
- [ ] Consultant can view usage in real-time
- [ ] All assessments are listed with details
- [ ] Reports are accessible from dashboard
- [ ] Data can be exported to CSV
- [ ] Navigation between sections works

### Performance Requirements
- [ ] Dashboard loads in <2 seconds
- [ ] Table handles 1000+ rows smoothly
- [ ] Export works for large datasets

### Security Requirements
- [ ] Only tenant's data is visible
- [ ] No cross-tenant data leaks
- [ ] Reports require tenant context

## Testing Checklist

### Manual Testing
1. Access dashboard with testconsultant subdomain
2. Verify usage numbers match database
3. Click through to individual reports
4. Test export functionality
5. Check responsive design

### Edge Cases
- Empty state (no assessments)
- At limit (5 of 5 used)
- Over limit handling
- Invalid report IDs
- Network errors

## Dependencies

### External
- None (using existing Supabase)

### Internal
- TenantContext must be working
- Existing report viewer component
- Assessment data in database

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Complex table performance | High | Use virtual scrolling if needed |
| Export memory issues | Medium | Stream CSV for large exports |
| Report access security | High | Double-check tenant isolation |

## Next Phase Preview

After Admin Portal is complete, Phase 3 (Authentication) will:
- Add magic link login
- Protect admin routes
- Add logout functionality
- Remember user sessions

This sets us up for Phase 4 (Stripe) where we'll:
- Add payment processing
- Enforce limits with real subscriptions
- Enable tier upgrades

## Estimated Timeline

**Day 3:**
- Morning: Admin layout and navigation (4 hours)
- Afternoon: Dashboard with real data (4 hours)

**Day 4:**
- Morning: Assessment table with filters (4 hours)
- Afternoon: Report viewing and export (4 hours)

Total: 2 days (16 hours)