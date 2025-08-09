/**
 * Simple utility to extract JSON from AI responses
 */
export function cleanAndParseJSON(content: string): any {
  if (!content || typeof content !== 'string') {
    throw new Error('Invalid content provided');
  }

  // First try direct parsing
  try {
    return JSON.parse(content.trim());
  } catch (e) {
    // Continue to cleaning
  }

  // Remove markdown code blocks if present
  let cleaned = content.trim();
  cleaned = cleaned.replace(/^```(?:json)?\s*/gm, '');
  cleaned = cleaned.replace(/```\s*$/gm, '');
  
  // Remove any text before the first { or [
  const jsonStart = cleaned.search(/[{[]/);
  if (jsonStart > 0) {
    cleaned = cleaned.substring(jsonStart);
  }
  
  // Remove any text after the last } or ]
  const lastClose = Math.max(cleaned.lastIndexOf('}'), cleaned.lastIndexOf(']'));
  if (lastClose > -1 && lastClose < cleaned.length - 1) {
    cleaned = cleaned.substring(0, lastClose + 1);
  }
  
  // Try parsing the cleaned content
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    console.error('Failed to parse JSON after cleaning:', e);
    console.error('Original content length:', content.length);
    console.error('First 200 chars:', content.substring(0, 200));
    console.error('Last 200 chars:', content.substring(content.length - 200));
    throw new Error('Unable to extract valid JSON from response');
  }
}