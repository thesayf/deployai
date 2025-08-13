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
      
      // Look for specific stage steps - the save-stageX steps indicate completion
      const stage1Complete = steps.some((s: any) => 
        s.name === 'save-stage1' && s.state === 'STEP_SUCCESS'
      );
      const stage2Complete = steps.some((s: any) => 
        s.name === 'save-stage2' && s.state === 'STEP_SUCCESS'
      );
      const stage3Complete = steps.some((s: any) => 
        s.name === 'save-stage3' && s.state === 'STEP_SUCCESS'
      );
      const stage4Complete = steps.some((s: any) => 
        s.name === 'save-stage4' && s.state === 'STEP_SUCCESS'
      );
      
      // Check for running stages
      const stage1Running = steps.some((s: any) => 
        s.name === 'save-stage1' && s.state === 'STEP_RUNNING'
      );
      const stage2Running = steps.some((s: any) => 
        s.name === 'save-stage2' && s.state === 'STEP_RUNNING'
      );
      const stage3Running = steps.some((s: any) => 
        s.name === 'save-stage3' && s.state === 'STEP_RUNNING'
      );
      const stage4Running = steps.some((s: any) => 
        s.name === 'save-stage4' && s.state === 'STEP_RUNNING'
      );
      
      // Update stage details based on completion status
      // Stage 1
      if (stage1Complete) {
        stageDetails.stage1.completed = true;
      } else if (stage1Running || (!stage1Complete && !stage2Complete && !stage3Complete && !stage4Complete)) {
        // Stage 1 is active if running or if nothing is complete yet
        stageDetails.stage1.active = true;
        currentStage = 'stage1';
      }
      
      // Stage 2
      if (stage2Complete) {
        stageDetails.stage1.completed = true; // Ensure stage 1 is marked complete
        stageDetails.stage2.completed = true;
      } else if (stage2Running || (stage1Complete && !stage2Complete)) {
        stageDetails.stage1.completed = true;
        stageDetails.stage2.active = true;
        currentStage = 'stage2';
      }
      
      // Stage 3
      if (stage3Complete) {
        stageDetails.stage1.completed = true;
        stageDetails.stage2.completed = true;
        stageDetails.stage3.completed = true;
      } else if (stage3Running || (stage2Complete && !stage3Complete)) {
        stageDetails.stage1.completed = true;
        stageDetails.stage2.completed = true;
        stageDetails.stage3.active = true;
        currentStage = 'stage3';
      }
      
      // Stage 4
      if (stage4Complete) {
        stageDetails.stage1.completed = true;
        stageDetails.stage2.completed = true;
        stageDetails.stage3.completed = true;
        stageDetails.stage4.completed = true;
        currentStage = 'finalizing';
      } else if (stage4Running || (stage3Complete && !stage4Complete)) {
        stageDetails.stage1.completed = true;
        stageDetails.stage2.completed = true;
        stageDetails.stage3.completed = true;
        stageDetails.stage4.active = true;
        currentStage = 'stage4';
      }
      
      // Calculate progress based on completed stages
      if (stage4Complete) {
        progress = 90;
      } else if (stage3Complete) {
        progress = 75;
      } else if (stage2Complete) {
        progress = 50;
      } else if (stage1Complete) {
        progress = 25;
      } else {
        // Check if any stages are in progress
        if (stage4Running) progress = 80;
        else if (stage3Running) progress = 60;
        else if (stage2Running) progress = 35;
        else if (stage1Running) progress = 15;
        else progress = 5; // Just started
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