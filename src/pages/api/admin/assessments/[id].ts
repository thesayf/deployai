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

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid assessment ID' });
  }

  const assessmentService = new AssessmentService(tenantContext.tenant.id);

  switch (req.method) {
    case 'GET':
      try {
        const assessment = await assessmentService.getAssessmentById(id);

        if (!assessment) {
          return res.status(404).json({ error: 'Assessment not found' });
        }

        // Transform the response to match frontend expectations
        const response = {
          ...assessment,
          report: assessment.report ? {
            ...assessment.report,
            // Map stage1_problem_analysis to stage_1_analysis for backward compatibility
            stage_1_analysis: (assessment.report as any).stage1_problem_analysis,
          } : null,
        };

        res.status(200).json(response);
      } catch (error) {
        console.error('Error fetching assessment:', error);
        res.status(500).json({ error: 'Failed to fetch assessment' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}