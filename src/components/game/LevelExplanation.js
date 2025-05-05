// src/components/game/LevelExplanation.js
import React from 'react';
import Leaf from '../../assets/svg/Leaf';
import { useGame } from '../../context/GameContext';

const LevelExplanation = ({ currentLevel, onClose }) => {
  const { levels } = useGame();
  
  // If we don't have nextLevelPreview directly on the level, 
  // try to find the next level in the sequence
  const nextLevelData = levels.find(l => l.id === currentLevel.id + 1);
  
  // Use nextLevelPreview from the current level if available, otherwise create a basic one
  const nextLevelPreview = currentLevel.nextLevelPreview || (nextLevelData ? {
    title: nextLevelData.title,
    description: nextLevelData.description,
    learningPoints: ["Advanced SQL concepts", "Building on previous skills"]
  } : null);
  
  // If we're at the last level, don't show next level preview
  const isLastLevel = !nextLevelData;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg relative">
        <div className="absolute top-3 right-3">
          <button 
            className="text-slate-400 hover:text-slate-600 transition-colors" 
            onClick={() => onClose(false)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        
        <div className="absolute -top-2 -left-4 opacity-50">
          <Leaf color="#94a3b8" rotate="30" size="40" />
        </div>
        
        <h2 className="text-2xl font-light text-slate-800 mb-4">
          Great progress! You've completed Level {currentLevel.id}
        </h2>
        
        <div className="bg-mint-100 rounded-xl p-4 mb-6">
          <h3 className="text-lg font-medium text-slate-700 mb-2">What you've learned:</h3>
          <p className="text-slate-600 mb-4">{currentLevel.summary || `You've mastered the ${currentLevel.title} concepts.`}</p>
          
          <div className="text-sm text-mint-600 font-medium">
            Key concepts mastered:
          </div>
          <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
            {currentLevel.keyConcepts ? 
              currentLevel.keyConcepts.map((concept, index) => (
                <li key={index}>{concept}</li>
              )) : 
              <li>{currentLevel.title} fundamentals</li>
            }
          </ul>
        </div>
        
        {!isLastLevel && nextLevelPreview && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-slate-700 mb-2">Up next:</h3>
            <div className="bg-peach-100 rounded-xl p-4 mb-4">
              <div className="flex items-center mb-3">
                <div className="bg-peach-300 text-slate-800 rounded-full px-3 py-1 text-sm mr-3">
                  Level {currentLevel.id + 1}
                </div>
                <h4 className="text-lg font-medium text-slate-700">{nextLevelPreview.title}</h4>
              </div>
              <p className="text-slate-600 mb-4">{nextLevelPreview.description}</p>
              
              <div className="bg-white bg-opacity-70 rounded-lg p-3">
                <div className="text-sm text-slate-500 mb-2">You'll learn about:</div>
                <ul className="list-disc list-inside text-slate-600 space-y-1">
                  {nextLevelPreview.learningPoints?.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-slate-100 rounded-xl p-4 mb-6">
          <h3 className="text-lg font-medium text-slate-700 mb-2">SQL Tip:</h3>
          <p className="text-slate-600">
            {nextLevelPreview?.tip || "Practice makes perfect! Keep trying different variations of your queries to deepen your understanding."}
          </p>
        </div>
        
        <div className="flex justify-center">
          {isLastLevel ? (
            <button 
              className="bg-mint-600 text-white px-6 py-2 rounded-full hover:bg-mint-100 hover:text-slate-800 transition-colors"
              onClick={() => onClose(false)}
            >
              Continue Practicing
            </button>
          ) : (
            <button 
              className="bg-peach-300 text-slate-800 px-6 py-2 rounded-full hover:bg-peach-400 transition-colors"
              onClick={() => onClose(true)}
            >
              Continue to Level {currentLevel.id + 1}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LevelExplanation;