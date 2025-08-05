import { QuizResponseData, ScoreCalculation } from '@/types/quiz';

export function generateStage2SystemPrompt(): string {
  return `You are an AI transformation strategist creating detailed implementation recommendations.
Based on the initial assessment, provide specific, actionable guidance for AI adoption.

Focus on:
1. Concrete implementation steps
2. Specific tools and technologies
3. Team structure and roles
4. Budget allocation strategies
5. Success metrics and KPIs
6. Timeline with milestones

Be prescriptive and detailed. Provide examples and specific vendor recommendations where appropriate.
Format your response in clean markdown with clear sections and actionable items.`;
}

export function generateStage2UserPrompt(
  responses: QuizResponseData,
  scoreResult: ScoreCalculation,
  stage1Content: string
): string {
  return `Based on the following AI readiness assessment, provide detailed implementation recommendations:

## Company Profile
- Industry: ${responses.industry}
- Company Size: ${responses.companySize}
- Current Systems: ${responses.currentSystems?.join(', ') || 'Not specified'}
- Budget Range: ${responses.budget || 'Not specified'}
- Timeline: ${responses.timeline || 'Not specified'}
- Decision Making: ${responses.decisionMaking || 'Not specified'}

## Assessment Results
- Score: ${scoreResult.totalScore}/85 (${scoreResult.category})
- Primary Objectives: ${responses.businessObjectives?.join(', ') || 'Not specified'}
- Key Challenges: ${responses.biggestChallenge || 'Not specified'}

## Initial Assessment Summary
${stage1Content.substring(0, 1000)}...

Please provide comprehensive implementation recommendations including:

1. **Implementation Roadmap**
   - Phase 1: Foundation (Months 1-3)
     - Specific tasks and deliverables
     - Required resources
     - Success criteria
   - Phase 2: Pilot Projects (Months 4-6)
     - Recommended pilot use cases
     - Technology stack
     - Team requirements
   - Phase 3: Scale & Optimize (Months 7-12)
     - Expansion strategy
     - Performance optimization
     - ROI measurement

2. **Technology Stack Recommendations**
   - Core AI/ML platforms (specific vendors/tools)
   - Data infrastructure needs
   - Integration requirements
   - Security and compliance tools

3. **Team & Organizational Structure**
   - Required roles and responsibilities
   - Hiring vs. training strategy
   - Partner/consultant needs
   - Governance structure

4. **Budget Breakdown**
   - Infrastructure costs
   - Software/licensing
   - Personnel costs
   - Training and development
   - Contingency planning

5. **Use Case Prioritization**
   - Top 3 initial use cases based on their profile
   - Expected ROI for each
   - Implementation complexity
   - Risk assessment

6. **Vendor Recommendations**
   - Specific AI/ML platforms suitable for their needs
   - Data management solutions
   - Consulting partners
   - Training providers

7. **Success Metrics & KPIs**
   - Business metrics
   - Technical metrics
   - Adoption metrics
   - ROI calculations

8. **Risk Mitigation Plan**
   - Technical risks and solutions
   - Organizational change management
   - Compliance and ethical considerations
   - Fallback strategies

9. **Quick Wins**
   - Implementations that can show value in 30 days
   - Low-risk, high-impact opportunities
   - Pilot project suggestions

Ensure all recommendations are specific to their industry, size, and stated objectives.`;
}

export function generateStage2EnhancedPrompt(
  responses: QuizResponseData,
  scoreResult: ScoreCalculation,
  stage1Content: string
): string {
  const basePrompt = generateStage2UserPrompt(responses, scoreResult, stage1Content);
  
  // Add industry-specific enhancements
  const industryEnhancements = getIndustrySpecificPrompts(responses.industry || 'Technology');
  
  // Add size-specific considerations
  const sizeConsiderations = getCompanySizeConsiderations(responses.companySize || 'Small (1-50 employees)');
  
  return `${basePrompt}

## Industry-Specific Considerations
${industryEnhancements}

## Company Size Considerations
${sizeConsiderations}

## Additional Requirements
- Provide specific vendor names and approximate costs
- Include links to resources where relevant
- Suggest specific job titles for hiring
- Recommend specific training courses or certifications
- Include regulatory compliance requirements for their industry`;
}

function getIndustrySpecificPrompts(industry: string): string {
  const industryMap: Record<string, string> = {
    'Technology': `
- Focus on API integrations and developer tools
- Consider MLOps platforms
- Emphasize scalability and performance`,
    'Finance': `
- Prioritize compliance and regulatory requirements
- Focus on risk management and fraud detection
- Consider explainable AI solutions`,
    'Healthcare': `
- Address HIPAA compliance
- Focus on diagnostic and patient care applications
- Consider FDA approval requirements`,
    'Retail': `
- Emphasize customer experience and personalization
- Focus on inventory and supply chain optimization
- Consider omnichannel integration`,
    'Manufacturing': `
- Focus on predictive maintenance and quality control
- Consider IoT integration
- Emphasize safety and efficiency`,
    'Other': `
- Provide cross-industry best practices
- Focus on general business process optimization
- Consider custom solutions`
  };
  
  return industryMap[industry] || industryMap['Other'];
}

function getCompanySizeConsiderations(size: string): string {
  const sizeMap: Record<string, string> = {
    '1-10': `
- Focus on low-cost, high-impact solutions
- Recommend no-code/low-code platforms
- Suggest fractional AI expertise`,
    '11-50': `
- Balance build vs. buy decisions
- Recommend scalable SaaS solutions
- Consider dedicated AI lead role`,
    '51-200': `
- Focus on departmental implementations
- Recommend enterprise-ready platforms
- Suggest small AI team formation`,
    '201-1000': `
- Plan for enterprise-wide adoption
- Focus on governance and standards
- Recommend AI center of excellence`,
    '1000+': `
- Emphasize enterprise architecture
- Focus on global scalability
- Recommend full AI division structure`
  };
  
  return sizeMap[size] || sizeMap['51-200'];
}