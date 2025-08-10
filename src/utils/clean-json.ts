/**
<<<<<<< HEAD
 * Utility to clean and parse potentially malformed JSON strings
 * Handles common issues like trailing commas, comments, and extra whitespace
 */

export function cleanAndParseJSON(jsonString: string): any {
  try {
    // First attempt: direct parse
    return JSON.parse(jsonString);
  } catch (e) {
    // Clean the JSON string
    let cleaned = jsonString;
    
    // Remove any markdown code block markers
    cleaned = cleaned.replace(/^```json\s*\n?/gm, '');
    cleaned = cleaned.replace(/^```\s*$/gm, '');
    
    // Remove comments (both // and /* */ style)
    cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');
    cleaned = cleaned.replace(/\/\/.*$/gm, '');
    
    // Remove trailing commas before } or ]
    cleaned = cleaned.replace(/,\s*([}\]])/g, '$1');
    
    // Remove any BOM characters
    cleaned = cleaned.replace(/^\uFEFF/, '');
    
    // Trim whitespace
    cleaned = cleaned.trim();
    
    // Extract JSON if it's embedded in text
    // Look for JSON object or array
    const jsonMatch = cleaned.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (jsonMatch) {
      cleaned = jsonMatch[1];
    }
    
    try {
      return JSON.parse(cleaned);
    } catch (e2) {
      // Last resort: try to extract just the JSON portion if there's surrounding text
      const startIndex = cleaned.indexOf('{');
      const endIndex = cleaned.lastIndexOf('}');
      
      if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        const extracted = cleaned.substring(startIndex, endIndex + 1);
        try {
          return JSON.parse(extracted);
        } catch (e3) {
          // If all else fails, throw the original error with context
          console.error('Failed to parse JSON after cleaning:', cleaned);
          throw new Error(`Failed to parse JSON: ${e3 instanceof Error ? e3.message : 'Unknown error'}`);
        }
      }
      
      throw new Error(`Failed to parse JSON: ${e2 instanceof Error ? e2.message : 'Unknown error'}`);
    }
  }
}

/**
 * Safely stringify an object to JSON, handling circular references
 */
export function safeStringify(obj: any, space?: number): string {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '[Circular Reference]';
      }
      seen.add(value);
    }
    return value;
  }, space);
=======
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
>>>>>>> origin/main
}