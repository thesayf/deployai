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
    let stageDetails = {
      stage1: { name: 'Problem Analysis', completed: false, active: false },
      stage2: { name: 'Tool Research', completed: false, active: false },
      stage3: { name: 'Solution Curation', completed: false, active: false },
      stage4: { name: 'Report Generation', completed: false, active: false }
    };
    
    // Type guard for status properties
    const workflowStatus = status as any;
    
    // Parse the workflow logs to determine progress
    if (workflowStatus.state === 'RUN_SUCCESS') {
      progress = 100;
      currentStage = 'completed';
      // Mark all stages as completed
      Object.keys(stageDetails).forEach(key => {
        stageDetails[key as keyof typeof stageDetails].completed = true;
      });
    } else if (workflowStatus.state === 'RUN_FAILED') {
      currentStage = 'failed';
    } else if (workflowStatus.state === 'RUN_CANCELED') {
      currentStage = 'canceled';
    } else {
      // Check steps to determine progress
      const steps = workflowStatus.steps || [];
      
      // Look for specific stage steps
      const stage1Complete = steps.some((s: any) => 
        (s.name === 'stage1-analysis' || s.name === 'save-stage1') && s.state === 'STEP_SUCCESS'
      );
      const stage2Complete = steps.some((s: any) => 
        (s.name === 'stage2-research' || s.name === 'save-stage2') && s.state === 'STEP_SUCCESS'
      );
      const stage3Complete = steps.some((s: any) => 
        (s.name === 'stage3-curation' || s.name === 'save-stage3') && s.state === 'STEP_SUCCESS'
      );
      const stage4Complete = steps.some((s: any) => 
        (s.name === 'stage4-generation' || s.name === 'save-stage4') && s.state === 'STEP_SUCCESS'
      );
      
      // Update stage details
      if (stage1Complete) {
        stageDetails.stage1.completed = true;
        progress = 25;
        currentStage = 'stage2';
        stageDetails.stage2.active = true;
      } else if (steps.some((s: any) => s.name === 'stage1-analysis' && s.state === 'STEP_RUNNING')) {
        currentStage = 'stage1';
        stageDetails.stage1.active = true;
        progress = 10;
      }
      
      if (stage2Complete) {
        stageDetails.stage2.completed = true;
        progress = 50;
        currentStage = 'stage3';
        stageDetails.stage3.active = true;
      } else if (stage1Complete && steps.some((s: any) => s.name === 'stage2-research' && s.state === 'STEP_RUNNING')) {
        stageDetails.stage2.active = true;
        progress = 35;
      }
      
      if (stage3Complete) {
        stageDetails.stage3.completed = true;
        progress = 75;
        currentStage = 'stage4';
        stageDetails.stage4.active = true;
      } else if (stage2Complete && steps.some((s: any) => s.name === 'stage3-curation' && s.state === 'STEP_RUNNING')) {
        stageDetails.stage3.active = true;
        progress = 60;
      }
      
      if (stage4Complete) {
        stageDetails.stage4.completed = true;
        progress = 90;
        currentStage = 'finalizing';
      } else if (stage3Complete && steps.some((s: any) => s.name === 'stage4-generation' && s.state === 'STEP_RUNNING')) {
        stageDetails.stage4.active = true;
        progress = 85;
      }
      
      // If no specific stages found, estimate based on step count
      if (progress === 0 && steps.length > 0) {
        const totalSteps = 10; // Approximate total steps in workflow
        const completedSteps = steps.filter((s: any) => s.state === 'STEP_SUCCESS').length;
        progress = Math.min(Math.floor((completedSteps / totalSteps) * 100), 95);
        
        if (progress < 25) currentStage = 'stage1';
        else if (progress < 50) currentStage = 'stage2';
        else if (progress < 75) currentStage = 'stage3';
        else currentStage = 'stage4';
      }
    }

    res.status(200).json({
      success: true,
      status: workflowStatus.state === 'RUN_SUCCESS' ? 'completed' : 
              workflowStatus.state === 'RUN_FAILED' ? 'failed' : 
              workflowStatus.state === 'RUN_CANCELED' ? 'canceled' : 'processing',
      currentStage,
      progress,
      stageDetails,
      workflowState: workflowStatus.state,
      createdAt: workflowStatus.createdAt,
      updatedAt: workflowStatus.updatedAt,
      message: currentStage === 'stage1' ? 'Analyzing your business context...' :
               currentStage === 'stage2' ? 'Researching AI tools for your needs...' :
               currentStage === 'stage3' ? 'Curating personalized solutions...' :
               currentStage === 'stage4' ? 'Generating your executive report...' :
               currentStage === 'completed' ? 'Your report is ready!' :
               currentStage === 'failed' ? 'An error occurred during processing' :
               'Initializing report generation...'
    });

  } catch (error) {
    console.error('[Workflow Status] Error:', error);
    res.status(500).json({ 
      error: 'Failed to get workflow status',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}