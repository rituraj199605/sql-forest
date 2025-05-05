// Service for game-related API calls
import { fetchAPI } from './api';

// Fetch all main game levels from the backend
export async function fetchLevels() {
  try {
    const levels = await fetchAPI('levels');
    return levels.sort((a, b) => a.id - b.id);
  } catch (error) {
    console.error('Error fetching levels:', error);
    return [];
  }
}

// Fetch all sub-levels from the backend
export async function fetchSubLevels() {
  try {
    const subLevels = await fetchAPI('sub-levels');
    return subLevels.sort((a, b) => {
      if (a.parentLevelId !== b.parentLevelId) {
        return a.parentLevelId - b.parentLevelId;
      }
      return a.scenarioNumber - b.scenarioNumber;
    });
  } catch (error) {
    console.error('Error fetching sub-levels:', error);
    return [];
  }
}

// Fetch single level by ID (can be main level or sub-level)
export async function fetchLevelById(levelId, isSubLevel = false) {
  try {
    const endpoint = isSubLevel ? `sub-levels/${levelId}` : `levels/${levelId}`;
    return await fetchAPI(endpoint);
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

// Execute a query for a specific level or sub-level
export async function executeQuery(levelId, query, isSubLevel = false) {
  try {
    return await fetchAPI('execute-query', {
      method: 'POST',
      body: JSON.stringify({ 
        levelId, 
        query,
        isSubLevel 
      }),
    });
  } catch (error) {
    console.error('Error executing query:', error);
    return {
      success: false,
      message: 'Error connecting to the server. Please try again.'
    };
  }
}