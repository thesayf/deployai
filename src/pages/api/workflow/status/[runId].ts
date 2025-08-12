/**
 * Workflow Status Endpoint
 * Check the status of a workflow run
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getWorkflowStatus } from '@/lib/workflow/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { runId } = req.query;

  if (!runId || typeof runId !== 'string') {
    return res.status(400).json({ error: 'Invalid workflow run ID' });
  }

  try {
    const status = await getWorkflowStatus(runId);

    if (!status) {
      return res.status(404).json({ error: 'Workflow run not found' });
    }

    // Calculate progress based on completed steps
    let progress = 0;
    let currentStage = 'initializing';
    
    // Parse the workflow logs to determine progress
    if (status.state === 'RUN_SUCCESS') {
      progress = 100;
      currentStage = 'completed';
    } else if (status.state === 'RUN_FAILED') {
      currentStage = 'failed';
    } else if (status.state === 'RUN_CANCELED') {
      currentStage = 'canceled';
    } else {
      // Check steps to determine progress
      const steps = status.steps || [];
      const totalStages = 4; // 4 AI stages
      const completedStages = steps.filter((s: any) => 
        s.name?.includes('stage') && s.state === 'STEP_SUCCESS'
      ).length;
      
      progress = Math.floor((completedStages / totalStages) * 100);
      
      if (completedStages === 0) {
        currentStage = 'stage1';
      } else if (completedStages === 1) {
        currentStage = 'stage2';
      } else if (completedStages === 2) {
        currentStage = 'stage3';
      } else if (completedStages === 3) {
        currentStage = 'stage4';
      }
    }

    res.status(200).json({
      success: true,
      status: status.state === 'RUN_SUCCESS' ? 'completed' : 
              status.state === 'RUN_FAILED' ? 'failed' : 
              status.state === 'RUN_CANCELED' ? 'canceled' : 'processing',
      currentStage,
      progress,
      workflowState: status.state,
      createdAt: status.createdAt,
      updatedAt: status.updatedAt
    });

  } catch (error) {
    console.error('[Workflow Status] Error:', error);
    res.status(500).json({ 
      error: 'Failed to get workflow status',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}