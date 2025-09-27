import type { NextApiRequest, NextApiResponse } from 'next';
import { getTenantFromRequest } from '@/utils/tenant-helpers';
import { AssessmentService } from '@/services/assessment';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const tenantContext = await getTenantFromRequest(req);

  if (!tenantContext) {
    return res.status(401).json({ error: 'No tenant context found' });
  }

  const assessmentService = new AssessmentService(tenantContext.tenant.id);

  switch (req.method) {
    case 'GET':
      try {
        const {
          page = '1',
          limit = '20',
          search,
          status,
          dateFrom,
          dateTo,
          sortBy = 'created_at',
          sortOrder = 'desc'
        } = req.query;

        const filters = {
          page: parseInt(page as string, 10),
          limit: parseInt(limit as string, 10),
          search: search as string | undefined,
          status: status as string | undefined,
          dateFrom: dateFrom as string | undefined,
          dateTo: dateTo as string | undefined,
          sortBy: sortBy as 'created_at' | 'company' | 'status',
          sortOrder: sortOrder as 'asc' | 'desc'
        };

        const result = await assessmentService.getAssessments(filters);
        res.status(200).json(result);
      } catch (error) {
        console.error('Error fetching assessments:', error);
        res.status(500).json({ error: 'Failed to fetch assessments' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}