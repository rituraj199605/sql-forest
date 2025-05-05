// API utilities for frontend to backend communication

// Base URL for API calls
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';

// Generic fetch function with error handling
export async function fetchAPI(endpoint, options = {}) {
  try {
    const url = `${API_BASE_URL}/${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        // Add authentication headers as needed
        ...options.headers,
      },
      ...options,
    });

    // Check if the request was successful
    if (!response.ok) {
      // Try to get error message from response
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${response.status}`);
    }

    // Parse JSON response
    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}