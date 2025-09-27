import type { NextApiRequest, NextApiResponse } from 'next';
import { getTenantFromRequest } from '@/utils/tenant-helpers';

export interface TenantUsageResponse {
  success: boolean;
  usage?: {
    assessments_used: number;
    assessments_limit: number | null;
    remaining_assessments: number | null;
    subscription_tier: string;
    can_use_assessment: boolean;
  };
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TenantUsageResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    const tenantContext = await getTenantFromRequest(req);

    if (!tenantContext) {
      return res.status(404).json({
        success: false,
        error: 'No tenant context found',
      });
    }

    const { tenant } = tenantContext;

    res.status(200).json({
      success: true,
      usage: {
        assessments_used: tenant.assessments_used,
        assessments_limit: tenant.assessments_limit,
        remaining_assessments: tenantContext.remainingAssessments || null,
        subscription_tier: tenant.subscription_tier || 'starter',
        can_use_assessment: tenantContext.canUseAssessment,
      },
    });
  } catch (error) {
    console.error('Error fetching tenant usage:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch usage data',
    });
  }
}