// src/context/GameContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchLevels, fetchSubLevels, fetchUserProgress, updateUserProgress, executeQuery } from '../services/gameService';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  // Main level states
  const [levels, setLevels] = useState([]);
  const [currentMainLevel, setCurrentMainLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState([]);
  
  // Sub-level states
  const [subLevels, setSubLevels] = useState([]);
  const [currentSubLevel, setCurrentSubLevel] = useState(null);
  const [completedSubLevels, setCompletedSubLevels] = useState([]);
  
  // Query and result states
  const [userQuery, setUserQuery] = useState('');
  const [queryResult, setQueryResult] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [animateSuccess, setAnimateSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);
  const [queryExecutionTime, setQueryExecutionTime] = useState(null);
  const [executionTimes, setExecutionTimes] = useState({});
  const [bestTimes, setBestTimes] = useState({});

  // Load game data when component mounts
  useEffect(() => {
    const loadGameData = async () => {
      try {
        setLoading(true);
        
        // Load main levels
        const levelsData = await fetchLevels();
        setLevels(levelsData);
        
        // Load sub-levels
        const subLevelsData = await fetchSubLevels();
        setSubLevels(subLevelsData);
        
        // Load user progress data
        const progressData = await fetchUserProgress();
        if (progressData) {
          setCompletedLevels(progressData.completedLevels || []);
          setCompletedSubLevels(progressData.completedSubLevels || []);
          setCurrentMainLevel(progressData.currentMainLevel || 1);
          
          // Set the first incomplete sub-level of the current main level, or the first one if none are completed
          const currentLevelSubLevels = subLevelsData.filter(sl => sl.parentLevelId === progressData.currentMainLevel);
          if (currentLevelSubLevels.length > 0) {
            const firstIncompleteSubLevel = currentLevelSubLevels.find(
              sl => !progressData.completedSubLevels.includes(sl.id)
            );
            setCurrentSubLevel(firstIncompleteSubLevel?.id || currentLevelSubLevels[0].id);
          }
          
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

  // Current level and sub-level data
  const currentMainLevelData = levels.find(level => level.id === currentMainLevel) || null;
  const currentSubLevelData = subLevels.find(subLevel => subLevel.id === currentSubLevel) || null;
  
  // Use the current sub-level data if available, otherwise fall back to the main level data
  const currentLevelData = currentSubLevelData || currentMainLevelData;
  
  // Execute SQL query against the backend
  const handleExecuteQuery = async () => {
    if (!currentLevelData) return;
    
    try {
      // Start the timer
      const startTime = performance.now();
      
      // Execute the query against the current level (main or sub)
      const levelId = currentSubLevel || currentMainLevel;
      const isSubLevel = !!currentSubLevel;
      
      const data = await executeQuery(levelId, userQuery, isSubLevel);
      
      // End the timer and calculate execution time
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      setQueryExecutionTime(executionTime);
      
      // Update execution times
      setExecutionTimes(prev => ({
        ...prev,
        [levelId]: executionTime
      }));
      
      if (data.success) {
        setQueryResult({
          success: true,
          data: data.result,
          executionTime: executionTime
        });
        
        // Mark level as completed if not already
        let updatedState = false;
        
        if (currentSubLevel) {
          // Handle sub-level completion
          if (!completedSubLevels.includes(currentSubLevel)) {
            const updatedCompletedSubLevels = [...completedSubLevels, currentSubLevel];
            setCompletedSubLevels(updatedCompletedSubLevels);
            updatedState = true;
            
            // Check if all sub-levels of the main level are completed
            const mainLevelSubLevels = subLevels.filter(sl => sl.parentLevelId === currentMainLevel);
            const allSubLevelsCompleted = mainLevelSubLevels.every(
              sl => updatedCompletedSubLevels.includes(sl.id)
            );
            
            // If all sub-levels are completed, mark the main level as completed too
            if (allSubLevelsCompleted && !completedLevels.includes(currentMainLevel)) {
              const updatedCompletedLevels = [...completedLevels, currentMainLevel];
              setCompletedLevels(updatedCompletedLevels);
            }
          }
        } else {
          // Handle main level completion (for backward compatibility)
          if (!completedLevels.includes(currentMainLevel)) {
            const updatedCompletedLevels = [...completedLevels, currentMainLevel];
            setCompletedLevels(updatedCompletedLevels);
            updatedState = true;
          }
        }
        
        if (updatedState) {
          setAnimateSuccess(true);
          
          // Update best times
          const updatedBestTimes = { ...bestTimes };
          if (!bestTimes[levelId] || executionTime < bestTimes[levelId]) {
            updatedBestTimes[levelId] = executionTime;
            setBestTimes(updatedBestTimes);
          }
          
          // Update user progress via API
          await updateUserProgress({
            completedLevels,
            completedSubLevels,
            currentMainLevel,
            currentSubLevel,
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
  
  // Navigate to next level or sub-level
  const goToNextLevel = async () => {
    if (currentSubLevel) {
      // Find the next sub-level in the current main level
      const currentLevelSubLevels = subLevels.filter(sl => sl.parentLevelId === currentMainLevel)
        .sort((a, b) => a.scenarioNumber - b.scenarioNumber);
      
      const currentIndex = currentLevelSubLevels.findIndex(sl => sl.id === currentSubLevel);
      
      if (currentIndex < currentLevelSubLevels.length - 1) {
        // Move to the next sub-level
        setCurrentSubLevel(currentLevelSubLevels[currentIndex + 1].id);
      } else {
        // All sub-levels completed, move to the next main level
        if (currentMainLevel < levels.length) {
          const nextMainLevel = currentMainLevel + 1;
          setCurrentMainLevel(nextMainLevel);
          
          // Set the first sub-level of the next main level
          const nextLevelSubLevels = subLevels.filter(sl => sl.parentLevelId === nextMainLevel)
            .sort((a, b) => a.scenarioNumber - b.scenarioNumber);
          
          if (nextLevelSubLevels.length > 0) {
            setCurrentSubLevel(nextLevelSubLevels[0].id);
          } else {
            setCurrentSubLevel(null); // No sub-levels for the next main level
          }
        }
      }
    } else {
      // Legacy behavior for main levels without sub-levels
      if (currentMainLevel < levels.length) {
        const nextMainLevel = currentMainLevel + 1;
        setCurrentMainLevel(nextMainLevel);
        
        // Check if the next main level has sub-levels
        const nextLevelSubLevels = subLevels.filter(sl => sl.parentLevelId === nextMainLevel)
          .sort((a, b) => a.scenarioNumber - b.scenarioNumber);
        
        if (nextLevelSubLevels.length > 0) {
          setCurrentSubLevel(nextLevelSubLevels[0].id);
        }
      }
    }
    
    // Reset the state for the new level
    setUserQuery('');
    setQueryResult(null);
    setShowHint(false);
    setShowExplanation(false);
    
    // Update user progress via API
    await updateUserProgress({
      completedLevels,
      completedSubLevels,
      currentMainLevel,
      currentSubLevel,
      bestTimes
    });
  };
  
  // Navigate to specific main level
  const goToLevel = async (levelId) => {
    setCurrentMainLevel(levelId);
    
    // Find the first sub-level for this main level
    const levelSubLevels = subLevels.filter(sl => sl.parentLevelId === levelId)
      .sort((a, b) => a.scenarioNumber - b.scenarioNumber);
    
    if (levelSubLevels.length > 0) {
      // Find the first incomplete sub-level, or use the first one if all are completed
      const firstIncompleteSubLevel = levelSubLevels.find(sl => !completedSubLevels.includes(sl.id));
      setCurrentSubLevel(firstIncompleteSubLevel?.id || levelSubLevels[0].id);
    } else {
      setCurrentSubLevel(null); // No sub-levels for this main level
    }
    
    // Reset the state for the new level
    setUserQuery('');
    setQueryResult(null);
    setShowHint(false);
    setShowExplanation(false);
    
    // Update user progress via API
    await updateUserProgress({
      completedLevels,
      completedSubLevels,
      currentMainLevel: levelId,
      currentSubLevel,
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
    // Main level state
    levels,
    currentMainLevel,
    setCurrentMainLevel,
    completedLevels,
    
    // Sub-level state
    subLevels,
    currentSubLevel,
    setCurrentSubLevel,
    completedSubLevels,
    
    // Current level data (either main or sub)
    currentLevelData,
    
    // Query and result state
    userQuery,
    setUserQuery,
    queryResult,
    showHint,
    setShowHint,
    animateSuccess,
    loading,
    showExplanation,
    setShowExplanation,
    queryExecutionTime,
    executionTimes,
    bestTimes,
    
    // Actions
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