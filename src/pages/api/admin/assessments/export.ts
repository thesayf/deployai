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

    const {
      format = 'csv',
      search,
      status,
      dateFrom,
      dateTo
    } = req.query;

    const assessmentService = new AssessmentService(tenantContext.tenant.id);

    const filters = {
      search: search as string | undefined,
      status: status as string | undefined,
      dateFrom: dateFrom as string | undefined,
      dateTo: dateTo as string | undefined
    };

    const exportData = await assessmentService.exportAssessments(
      format as 'csv' | 'json',
      filters
    );

    if (format === 'csv') {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="assessments-${tenantContext.tenant.subdomain}-${new Date().toISOString().split('T')[0]}.csv"`
      );
      res.status(200).send(exportData);
    } else {
      res.status(200).json(exportData);
    }
  } catch (error) {
    console.error('Error exporting assessments:', error);
    res.status(500).json({ error: 'Failed to export assessments' });
  }
}