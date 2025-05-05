import React from 'react';
import { useGame } from '../../context/GameContext';
import Achievement from './Achievement';
import Check from '../../assets/svg/Check';

const ProgressSection = () => {
  const { levels, completedLevels, currentLevel, goToLevel } = useGame();
  
  const progressPercentage = levels.length > 0
    ? (completedLevels.length / levels.length) * 100
    : 0;
  
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
      <div className="space-y-4">
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
            </div>
          );
        })}
      </div>
      
      {/* Achievements */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-slate-700 mb-4">Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Achievement 
            title="First Query" 
            description="Execute your first SQL query"
            isUnlocked={completedLevels.length > 0}
            icon="✨"
          />
          <Achievement 
            title="Table Master" 
            description="Successfully filter data with WHERE"
            isUnlocked={completedLevels.includes(2)}
            icon="🔍"
          />
          <Achievement 
            title="Relationship Builder" 
            description="Complete a JOIN operation"
            isUnlocked={completedLevels.includes(3)}
            icon="🔗"
          />
        </div>
      </div>
    </section>
  );
};

export default ProgressSection;