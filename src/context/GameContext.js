import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchLevels, fetchUserProgress, updateUserProgress, executeQuery } from '../services/gameService';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [levels, setLevels] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [userQuery, setUserQuery] = useState('');
  const [queryResult, setQueryResult] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [animateSuccess, setAnimateSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load levels from API when component mounts
    const loadGameData = async () => {
      try {
        setLoading(true);
        const levelsData = await fetchLevels();
        setLevels(levelsData);
        
        // Load user progress data
        const progressData = await fetchUserProgress();
        if (progressData) {
          setCompletedLevels(progressData.completedLevels || []);
          setCurrentLevel(progressData.currentLevel || 1);
        }
      } catch (error) {
        console.error('Error loading game data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadGameData();
  }, []);

  // Get current level data
  const currentLevelData = levels.find(level => level.id === currentLevel) || null;
  
  // Execute SQL query against the backend
  const handleExecuteQuery = async () => {
    if (!currentLevelData) return;
    
    try {
      const data = await executeQuery(currentLevel, userQuery);
      
      if (data.success) {
        setQueryResult({
          success: true,
          data: data.result
        });
        
        // Mark level as completed if not already
        if (!completedLevels.includes(currentLevel)) {
          const updatedCompletedLevels = [...completedLevels, currentLevel];
          setCompletedLevels(updatedCompletedLevels);
          setAnimateSuccess(true);
          setTimeout(() => setAnimateSuccess(false), 2000);
          
          // Update user progress via API
          await updateUserProgress({
            completedLevels: updatedCompletedLevels,
            currentLevel
          });
        }
      } else {
        setQueryResult({
          success: false,
          message: data.message || "Your query doesn't match the expected solution. Try again or check the hint!"
        });
      }
    } catch (error) {
      console.error('Error executing query:', error);
      setQueryResult({
        success: false,
        message: "An error occurred while executing your query. Please try again."
      });
    }
  };
  
  // Navigate to next level
  const goToNextLevel = async () => {
    if (currentLevel < levels.length) {
      const nextLevel = currentLevel + 1;
      setCurrentLevel(nextLevel);
      setUserQuery('');
      setQueryResult(null);
      setShowHint(false);
      
      // Update user progress via API
      await updateUserProgress({
        completedLevels,
        currentLevel: nextLevel
      });
    }
  };
  
  // Navigate to specific level
  const goToLevel = async (levelId) => {
    setCurrentLevel(levelId);
    setUserQuery('');
    setQueryResult(null);
    setShowHint(false);
    
    // Update user progress via API
    await updateUserProgress({
      completedLevels,
      currentLevel: levelId
    });
  };

  const value = {
    levels,
    currentLevel,
    currentLevelData,
    userQuery,
    setUserQuery,
    queryResult,
    showHint,
    setShowHint,
    completedLevels,
    animateSuccess,
    loading,
    executeQuery: handleExecuteQuery,
    goToNextLevel,
    goToLevel
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};