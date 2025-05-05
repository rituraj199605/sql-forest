// src/components/game/SubLevelSelector.js
import React from 'react';
import { useGame } from '../../context/GameContext';

const SubLevelSelector = () => {
  const { 
    currentMainLevel, 
    currentSubLevel, 
    subLevels, 
    setCurrentSubLevel,
    completedSubLevels
  } = useGame();

  if (!subLevels || subLevels.length === 0) {
    return null;
  }

  // Filter sub-levels for the current main level
  const currentLevelSubLevels = subLevels.filter(
    subLevel => subLevel.parentLevelId === currentMainLevel
  );

  if (currentLevelSubLevels.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm mb-6">
      <h3 className="text-lg font-medium text-slate-700 mb-3">Practice Scenarios:</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {currentLevelSubLevels.map((subLevel) => {
          const isCompleted = completedSubLevels.includes(subLevel.id);
          const isActive = currentSubLevel === subLevel.id;
          
          return (
            <button
              key={subLevel.id}
              onClick={() => setCurrentSubLevel(subLevel.id)}
              className={`py-2 px-3 rounded-xl text-sm transition-all duration-200
                ${isCompleted ? 'bg-mint-100 text-mint-600' : isActive ? 'bg-peach-300 text-slate-800' : 'bg-slate-100 text-slate-600'}
                hover:shadow-sm hover:scale-102`}
            >
              <div className="flex items-center justify-between">
                <span>{subLevel.shortTitle || `Scenario ${subLevel.scenarioNumber}`}</span>
                {isCompleted && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                    <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SubLevelSelector;