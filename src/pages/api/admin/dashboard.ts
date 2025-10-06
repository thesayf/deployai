import type { NextApiRequest, NextApiResponse } from 'next';
import { getTenantFromRequest } from '@/utils/tenant-helpers';
import { AssessmentService } from '@/services/assessment';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const tenantContext = await getTenantFromRequest(req);

    if (!tenantContext) {
      return res.status(401).json({ error: 'No tenant context found' });
    }

    const assessmentService = new AssessmentService(tenantContext.tenant.id);
    const dashboardData = await assessmentService.getDashboardData();

    // Add billing data from tenant context
    const responseData = {
      ...dashboardData,
      billing: {
        subscription_status: tenantContext.tenant.subscription_status,
        trial_end_date: tenantContext.tenant.trial_end_date,
        subscription_tier: tenantContext.tenant.subscription_tier,
      },
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
}