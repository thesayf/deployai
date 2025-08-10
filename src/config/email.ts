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
  
  // Email subjects
  subjects: {
    confirmation: 'Processing Your AI Readiness Assessment',
    reportReady: (company?: string) => 
      `Your AI Implementation Report is Ready${company ? ` - ${company}` : ''}`
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
  // Check if we should use fallback for unverified domains
  const useFallback = process.env.USE_FALLBACK_SENDER === 'true';
  
  if (useFallback) {
    console.log(`[EMAIL] Using fallback sender for ${type} emails`);
    return EMAIL_CONFIG.senders.fallback;
  }
  
  // Use the specific sender for this type
  const sender = EMAIL_CONFIG.senders[type];
  console.log(`[EMAIL] Using ${type} sender: ${sender}`);
  return sender;
}