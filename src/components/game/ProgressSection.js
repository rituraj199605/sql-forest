// src/components/game/ProgressSection.js
import React from 'react';
import { useGame } from '../../context/GameContext';
import Check from '../../assets/svg/Check';
import Leaf from '../../assets/svg/Leaf';

const ProgressSection = () => {
  const { levels, completedLevels, currentLevel, goToLevel, bestTimes } = useGame();
  
  const progressPercentage = levels.length > 0
    ? (completedLevels.length / levels.length) * 100
    : 0;
  
  // Format execution time for display
  const formatTime = (timeMs) => {
    if (!timeMs) return 'Not yet completed';
    return `${(timeMs / 1000).toFixed(2)}s`;
  };
  
  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm">
      <h2 className="text-2xl font-light text-slate-700 mb-6">Your Learning Progress</h2>
      
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-500">Progress</span>
          <span className="text-sm font-medium text-slate-700">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-mint-200 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* Level cards */}
      <div className="space-y-4 mb-8">
        <h3 className="text-lg font-medium text-slate-700 mb-4">All Levels</h3>
        {levels.map((level) => {
          const isCompleted = completedLevels.includes(level.id);
          const isCurrent = currentLevel === level.id;
          
          return (
            <div 
              key={level.id}
              className={`p-4 rounded-2xl transition-all duration-300 cursor-pointer
                ${isCompleted ? 'bg-mint-100' : isCurrent ? 'bg-peach-100' : 'bg-slate-50'}
                ${isCurrent ? 'transform scale-102 shadow-sm' : ''}
              `}
              onClick={() => goToLevel(level.id)}
            >
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4
                  ${isCompleted ? 'bg-mint-200 text-slate-700' : isCurrent ? 'bg-peach-300 text-white' : 'bg-slate-200 text-slate-600'}
                `}>
                  {isCompleted ? <Check /> : level.id}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-800">{level.title}</h3>
                  <p className="text-sm text-slate-500">{level.description}</p>
                </div>
                <div className="ml-auto">
                  {isCompleted ? (
                    <span className="text-xs bg-mint-200 text-slate-700 px-3 py-1 rounded-full">Completed</span>
                  ) : isCurrent ? (
                    <span className="text-xs bg-peach-300 text-white px-3 py-1 rounded-full">In Progress</span>
                  ) : (
                    <span className="text-xs bg-slate-200 text-slate-600 px-3 py-1 rounded-full">Locked</span>
                  )}
                </div>
              </div>
              
              {/* Show best time for completed levels */}
              {isCompleted && bestTimes[level.id] && (
                <div className="mt-2 text-xs text-mint-600 font-medium">
                  Best time: {formatTime(bestTimes[level.id])}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Completed Levels / Achievements Section */}
      {completedLevels.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-slate-700 mb-4">Completed Levels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedLevels.map(levelId => {
              const level = levels.find(l => l.id === levelId);
              if (!level) return null;
              
              return (
                <div key={level.id} className="bg-mint-100 p-4 rounded-2xl relative overflow-hidden">
                  <div className="absolute -bottom-4 -right-4 opacity-10">
                    <Leaf color="#3D7A68" rotate="30" size="64" />
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="bg-mint-200 text-slate-700 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      <Check />
                    </div>
                    <h4 className="text-md font-medium text-slate-700">{level.title}</h4>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">{level.description}</p>
                  
                  {/* Show key concepts if available */}
                  {level.keyConcepts && level.keyConcepts.length > 0 && (
                    <div className="mt-2">
                      <div className="text-xs text-mint-600 font-medium">Key concepts:</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {level.keyConcepts.slice(0, 2).map((concept, idx) => (
                          <span key={idx} className="text-xs bg-white bg-opacity-70 px-2 py-1 rounded-full text-slate-600">
                            {concept}
                          </span>
                        ))}
                        {level.keyConcepts.length > 2 && (
                          <span className="text-xs bg-white bg-opacity-70 px-2 py-1 rounded-full text-slate-600">
                            +{level.keyConcepts.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Show best time */}
                  {bestTimes[level.id] && (
                    <div className="mt-2 text-xs text-mint-600 font-medium">
                      Best time: {formatTime(bestTimes[level.id])}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProgressSection;