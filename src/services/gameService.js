// Service for game-related API calls
import { fetchAPI } from './api';

// Fetch all game levels from the backend
export async function fetchLevels() {
  try {
    const levels = await fetchAPI('levels');
    return levels.sort((a, b) => a.id - b.id);
  } catch (error) {
    console.error('Error fetching levels:', error);
    return [];
  }
}

// Fetch single level by ID
export async function fetchLevelById(levelId) {
  try {
    return await fetchAPI(`levels/${levelId}`);
  } catch (error) {
    console.error(`Error fetching level ${levelId}:`, error);
    return null;
  }
}

// Fetch user progress from the backend
export async function fetchUserProgress() {
  try {
    return await fetchAPI('user/progress');
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return null;
  }
}

// Update user progress on the backend
export async function updateUserProgress(progressData) {
  try {
    await fetchAPI('user/progress', {
      method: 'PUT',
      body: JSON.stringify(progressData),
    });
    
    return true;
  } catch (error) {
    console.error('Error updating user progress:', error);
    return false;
  }
}

// Execute a query for a specific level
export async function executeQuery(levelId, query) {
  try {
    return await fetchAPI('execute-query', {
      method: 'POST',
      body: JSON.stringify({ levelId, query }),
    });
  } catch (error) {
    console.error('Error executing query:', error);
    return {
      success: false,
      message: 'Error connecting to the server. Please try again.'
    };
  }
}