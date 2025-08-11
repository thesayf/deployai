/**
 * Email configuration for the application
 * Update these values based on your Resend verified domains
 */

export const EMAIL_CONFIG = {
  // Sender addresses - these must be verified in Resend
  senders: {
    assessment: 'AI Assessment <assessment@deployai.studio>',
    reports: 'AI Reports <reports@deployai.studio>',
    // Fallback sender if the above are not verified
    fallback: 'deployAI <hello@deployai.studio>'
  },
  
  // Email subjects - less promotional for better deliverability
  subjects: {
    confirmation: 'Assessment Received - Processing Your Results',
    reportReady: (company?: string) => 
      `Assessment Report Ready${company ? ` - ${company}` : ''}`
  },
  
  // Timing expectations
  timing: {
    reportGenerationMinutes: '5-10 minutes',
    reportAvailabilityDays: 30
  }
};

/**
 * Get the appropriate sender address based on availability
 * You can update this logic based on which addresses are verified in Resend
 */
export function getEmailSender(type: 'assessment' | 'reports'): string {
  // deployai.studio domain is verified, so we can use it
  const sender = EMAIL_CONFIG.senders[type];
  console.log(`[EMAIL] Using ${type} sender: ${sender}`);
  return sender;
}