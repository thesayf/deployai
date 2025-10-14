/**
 * Generic fetcher function for SWR
 * Handles API requests with proper error handling
 */
export async function fetcher<T>(url: string, headers?: HeadersInit): Promise<T> {
  const response = await fetch(url, {
    headers,
    method: 'GET'
  });

  if (!response.ok) {
    const error: any = new Error('API request failed');
    try {
      error.info = await response.json();
    } catch {
      error.info = { message: response.statusText };
    }
    error.status = response.status;
    throw error;
  }

  return response.json();
}
