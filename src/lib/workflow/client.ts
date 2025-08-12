/**
 * Upstash Workflow Client
 * Provides utilities for triggering and managing workflows
 */

import { Client } from "@upstash/workflow";

// Initialize the workflow client
export const workflowClient = new Client({
  token: process.env.QSTASH_TOKEN || "",
  baseUrl: process.env.QSTASH_URL || "https://qstash.upstash.io"
});

/**
 * Trigger a workflow with retries and error handling
 */
export async function triggerWorkflow(
  url: string,
  body: any,
  workflowRunId?: string
) {
  try {
    const result = await workflowClient.trigger({
      url,
      body,
      workflowRunId,
      retries: 3, // Automatic retries with exponential backoff
    });
    
    console.log(`[Workflow] Triggered: ${result.workflowRunId}`);
    return result;
  } catch (error) {
    console.error('[Workflow] Failed to trigger:', error);
    throw error;
  }
}

/**
 * Check workflow status
 */
export async function getWorkflowStatus(workflowRunId: string) {
  try {
    const { runs } = await workflowClient.logs({
      workflowRunId,
      count: 1
    });
    
    if (runs && runs.length > 0) {
      return runs[0];
    }
    
    return null;
  } catch (error) {
    console.error('[Workflow] Failed to get status:', error);
    return null;
  }
}

/**
 * Cancel a workflow run
 */
export async function cancelWorkflow(workflowRunId: string) {
  try {
    await workflowClient.cancel({ ids: workflowRunId });
    console.log(`[Workflow] Cancelled: ${workflowRunId}`);
    return true;
  } catch (error) {
    console.error('[Workflow] Failed to cancel:', error);
    return false;
  }
}