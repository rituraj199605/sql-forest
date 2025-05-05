// src/context/GameContext.js
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
  const [showExplanation, setShowExplanation] = useState(false);
  const [queryExecutionTime, setQueryExecutionTime] = useState(null);
  const [executionTimes, setExecutionTimes] = useState({});
  const [bestTimes, setBestTimes] = useState({});

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
          setBestTimes(progressData.bestTimes || {});
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
      // Start the timer
      const startTime = performance.now();
      
      const data = await executeQuery(currentLevel, userQuery);
      
      // End the timer and calculate execution time
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      setQueryExecutionTime(executionTime);
      
      // Update execution times
      setExecutionTimes(prev => ({
        ...prev,
        [currentLevel]: executionTime
      }));
      
      if (data.success) {
        setQueryResult({
          success: true,
          data: data.result,
          executionTime: executionTime
        });
        
        // Mark level as completed if not already
        if (!completedLevels.includes(currentLevel)) {
          const updatedCompletedLevels = [...completedLevels, currentLevel];
          setCompletedLevels(updatedCompletedLevels);
          setAnimateSuccess(true);
          
          // Update best times
          const updatedBestTimes = { ...bestTimes };
          if (!bestTimes[currentLevel] || executionTime < bestTimes[currentLevel]) {
            updatedBestTimes[currentLevel] = executionTime;
            setBestTimes(updatedBestTimes);
          }
          
          // Update user progress via API
          await updateUserProgress({
            completedLevels: updatedCompletedLevels,
            currentLevel,
            bestTimes: updatedBestTimes
          });
          
          // Auto-advance to the explanation after 1.5 seconds
          setTimeout(() => {
            setAnimateSuccess(false);
            setShowExplanation(true);
          }, 1500);
        }
      } else {
        setQueryResult({
          success: false,
          message: data.message || "Your query didn't produce the expected results. Try again or check the hint!",
          executionTime: executionTime,
          result: data.result,
          expectedResult: data.expectedResult
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
      setShowExplanation(false);
      
      // Update user progress via API
      await updateUserProgress({
        completedLevels,
        currentLevel: nextLevel,
        bestTimes
      });
    }
  };
  
  // Navigate to specific level
  const goToLevel = async (levelId) => {
    setCurrentLevel(levelId);
    setUserQuery('');
    setQueryResult(null);
    setShowHint(false);
    setShowExplanation(false);
    
    // Update user progress via API
    await updateUserProgress({
      completedLevels,
      currentLevel: levelId,
      bestTimes
    });
  };

  // Close explanation and either move to next level or stay on current level based on user choice
  const handleCloseExplanation = (moveToNext) => {
    setShowExplanation(false);
    if (moveToNext) {
      goToNextLevel();
    }
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
    showExplanation,
    setShowExplanation,
    queryExecutionTime,
    executionTimes,
    bestTimes,
    executeQuery: handleExecuteQuery,
    goToNextLevel,
    goToLevel,
    handleCloseExplanation
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};