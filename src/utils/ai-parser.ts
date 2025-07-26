import { 
  Stage1Analysis, 
  Stage2MarketIntelligence, 
  Stage3FinancialAnalysis, 
  Stage4StrategicRecommendations,
  AIAnalysisError 
} from '@/types/ai-analysis';

/**
 * Helper to extract JSON from response text
 */
function extractJSON(response: string): string {
  // Try to extract JSON from code block first
  const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
  if (jsonMatch && jsonMatch[1]) {
    return jsonMatch[1];
  }
  
  // Try to find JSON object directly
  const objectMatch = response.match(/\{[\s\S]*\}/);
  if (objectMatch) {
    return objectMatch[0];
  }
  
  // Return original if no match found
  return response;
}

/**
 * Parse and validate Stage 1 Intelligence Analysis JSON response
 */
export function parseStage1Response(response: string): Stage1Analysis {
  try {
    const jsonString = extractJSON(response);
    const parsed = JSON.parse(jsonString);
    
    // Validate required structure
    if (!parsed.analysis) {
      throw new Error('Missing analysis object in Stage 1 response');
    }
    
    const { analysis } = parsed;
    
    // Validate scores
    if (!analysis.scores) {
      throw new Error('Missing scores in Stage 1 analysis');
    }
    
    // Validate score ranges
    const { aiOpportunityScore, roiPotentialScore, marketOpportunityScore } = analysis.scores;
    if (
      typeof aiOpportunityScore !== 'number' || 
      aiOpportunityScore < 0 || 
      aiOpportunityScore > 100
    ) {
      throw new Error('Invalid aiOpportunityScore: must be 0-100');
    }
    
    if (
      typeof roiPotentialScore !== 'number' || 
      roiPotentialScore < 0 || 
      roiPotentialScore > 100
    ) {
      throw new Error('Invalid roiPotentialScore: must be 0-100');
    }
    
    if (
      typeof marketOpportunityScore !== 'number' || 
      marketOpportunityScore < 0 || 
      marketOpportunityScore > 100
    ) {
      throw new Error('Invalid marketOpportunityScore: must be 0-100');
    }
    
    // Validate enums
    const validRiskLevels = ['Low', 'Medium', 'High'];
    if (!validRiskLevels.includes(analysis.scores.implementationRisk)) {
      throw new Error('Invalid implementationRisk: must be Low/Medium/High');
    }
    
    if (!validRiskLevels.includes(analysis.scores.urgencyFactor)) {
      throw new Error('Invalid urgencyFactor: must be Low/Medium/High');
    }
    
    // Return validated response
    return parsed as Stage1Analysis;
  } catch (error) {
    console.error('Failed to parse Stage 1 response:', error);
    throw new Error(`Stage 1 parsing error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Parse and validate Stage 2 Market Intelligence JSON response
 */
export function parseStage2Response(response: string): Stage2MarketIntelligence {
  try {
    const jsonString = extractJSON(response);
    const parsed = JSON.parse(jsonString);
    
    // Validate required structure
    if (!parsed.marketIntelligence) {
      throw new Error('Missing marketIntelligence object in Stage 2 response');
    }
    
    const { marketIntelligence } = parsed;
    
    // Validate recommendedSolutions
    if (!Array.isArray(marketIntelligence.recommendedSolutions)) {
      throw new Error('recommendedSolutions must be an array');
    }
    
    // Validate each solution category
    marketIntelligence.recommendedSolutions.forEach((category: any, index: number) => {
      if (!category.category || !Array.isArray(category.tools)) {
        throw new Error(`Invalid solution category at index ${index}`);
      }
      
      // Validate each tool
      category.tools.forEach((tool: any, toolIndex: number) => {
        if (!tool.name || !tool.vendor || !tool.pricing || !tool.roi) {
          throw new Error(`Invalid tool at category ${index}, tool ${toolIndex}`);
        }
        
        // Validate pricing
        if (typeof tool.pricing.cost !== 'number' || tool.pricing.cost < 0) {
          throw new Error(`Invalid pricing cost for ${tool.name}`);
        }
        
        // Validate ROI
        if (typeof tool.roi.value !== 'number') {
          throw new Error(`Invalid ROI value for ${tool.name}`);
        }
      });
    });
    
    return parsed as Stage2MarketIntelligence;
  } catch (error) {
    console.error('Failed to parse Stage 2 response:', error);
    throw new Error(`Stage 2 parsing error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Parse and validate Stage 3 Financial Analysis JSON response
 */
export function parseStage3Response(response: string): Stage3FinancialAnalysis {
  try {
    const jsonString = extractJSON(response);
    const parsed = JSON.parse(jsonString);
    
    // Validate required structure
    if (!parsed.financialAnalysis) {
      throw new Error('Missing financialAnalysis object in Stage 3 response');
    }
    
    const { financialAnalysis } = parsed;
    
    // Validate currentStateCosts
    if (!financialAnalysis.currentStateCosts) {
      throw new Error('Missing currentStateCosts in Stage 3 analysis');
    }
    
    // Validate numeric fields
    const costFields = [
      'manualLaborHours',
      'weeklyLaborCost',
      'annualInefficiencyCost',
      'opportunityCostRevenue',
      'totalCurrentStateCost'
    ];
    
    costFields.forEach(field => {
      if (typeof financialAnalysis.currentStateCosts[field] !== 'number') {
        throw new Error(`Invalid ${field}: must be a number`);
      }
    });
    
    // Validate projectedSavings
    if (!financialAnalysis.projectedSavings) {
      throw new Error('Missing projectedSavings in Stage 3 analysis');
    }
    
    // Validate ROI
    const roi = financialAnalysis.projectedSavings.netROI;
    if (!roi || typeof roi.value !== 'number') {
      throw new Error('Invalid netROI value');
    }
    
    return parsed as Stage3FinancialAnalysis;
  } catch (error) {
    console.error('Failed to parse Stage 3 response:', error);
    throw new Error(`Stage 3 parsing error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Parse and validate Stage 4 Strategic Recommendations JSON response
 */
export function parseStage4Response(response: string): Stage4StrategicRecommendations {
  try {
    const jsonString = extractJSON(response);
    const parsed = JSON.parse(jsonString);
    
    // Validate required structure
    if (!parsed.strategicRecommendations) {
      throw new Error('Missing strategicRecommendations object in Stage 4 response');
    }
    
    const { strategicRecommendations } = parsed;
    
    // Validate executiveSummary
    if (!strategicRecommendations.executiveSummary) {
      throw new Error('Missing executiveSummary in Stage 4 recommendations');
    }
    
    const { executiveSummary } = strategicRecommendations;
    if (
      !executiveSummary.headline ||
      !Array.isArray(executiveSummary.keyFindings) ||
      !Array.isArray(executiveSummary.topRecommendations)
    ) {
      throw new Error('Invalid executiveSummary structure');
    }
    
    // Validate priorityRanking
    if (!Array.isArray(strategicRecommendations.priorityRanking)) {
      throw new Error('priorityRanking must be an array');
    }
    
    // Validate implementationRoadmap
    if (!strategicRecommendations.implementationRoadmap) {
      throw new Error('Missing implementationRoadmap');
    }
    
    if (!strategicRecommendations.implementationRoadmap.phase1) {
      throw new Error('Missing phase1 in implementationRoadmap');
    }
    
    return parsed as Stage4StrategicRecommendations;
  } catch (error) {
    console.error('Failed to parse Stage 4 response:', error);
    throw new Error(`Stage 4 parsing error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Extract error message from AI response if it's not valid JSON
 */
export function extractErrorFromResponse(response: string, stage: number): AIAnalysisError {
  // Check if response contains common error patterns
  if (response.includes('I cannot') || response.includes('I can\'t')) {
    return {
      stage,
      error: 'AI refused to generate analysis',
      details: response.substring(0, 200)
    };
  }
  
  if (response.includes('error') || response.includes('Error')) {
    return {
      stage,
      error: 'AI reported an error',
      details: response.substring(0, 200)
    };
  }
  
  // Try to extract any JSON-like content
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      JSON.parse(jsonMatch[0]);
      return {
        stage,
        error: 'Valid JSON found but failed validation',
        details: 'Check parsing logic'
      };
    } catch {
      return {
        stage,
        error: 'Malformed JSON in response',
        details: jsonMatch[0].substring(0, 200)
      };
    }
  }
  
  return {
    stage,
    error: 'Invalid response format',
    details: response.substring(0, 200)
  };
}