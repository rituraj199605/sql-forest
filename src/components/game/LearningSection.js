import React from 'react';
import { useGame } from '../../context/GameContext';
import TableVisualization from '../ui/TableVisualization';
import QueryEditor from '../ui/QueryEditor';
import QueryResult from '../ui/QueryResult';
import Mountain from '../../assets/svg/Mountain';
import Check from '../../assets/svg/Check';

function LearningSection() {
  const {
    currentLevelData,
    userQuery,
    setUserQuery,
    executeQuery,
    queryResult,
    showHint,
    setShowHint,
    goToNextLevel,
    animateSuccess,
    completedLevels
  } = useGame();

  if (!currentLevelData) {
    return <div className="text-center py-8">Loading level data...</div>;
  }

  return (
    <section className="grid grid-cols-1 gap-6">
      {/* Level Info Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm overflow-hidden relative">
        <div className="absolute -bottom-6 -right-6 opacity-10">
          <Mountain size="200" color="#94A3B8" />
        </div>
        <div className="flex items-center mb-4">
          <div className="bg-peach-300 text-slate-800 rounded-full px-3 py-1 text-sm mr-3">
            Level {currentLevelData.id}
          </div>
          <h2 className="text-2xl font-light text-slate-700">{currentLevelData.title}</h2>
          {completedLevels.includes(currentLevelData.id) && (
            <div className="ml-auto">
              <div className="flex items-center justify-center bg-mint-100 text-mint-600 w-8 h-8 rounded-full">
                <Check />
              </div>
            </div>
          )}
        </div>
        <p className="text-slate-500 mb-4">{currentLevelData.description}</p>
        <div className="bg-slate-100 rounded-xl p-4 mb-4">
          <h3 className="text-lg font-medium text-slate-700 mb-2">Challenge:</h3>
          <p className="text-slate-600">{currentLevelData.challenge}</p>
        </div>
        
        {animateSuccess && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
            <div className="text-center">
              <div className="text-4xl mb-2">🎉</div>
              <div className="text-xl font-medium text-slate-800 mb-3">Great job!</div>
              <button 
                className="bg-mint-200 text-slate-800 px-6 py-2 rounded-full hover:bg-mint-100 transition-colors"
                onClick={goToNextLevel}
              >
                {currentLevelData.id < 3 ? 'Next Level' : 'Review Progress'}
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Tables Visualization */}
      <TableVisualization tables={currentLevelData.tables} />
      
      {/* Query Editor */}
      <QueryEditor 
        userQuery={userQuery}
        setUserQuery={setUserQuery}
        executeQuery={executeQuery}
        showHint={showHint}
        setShowHint={setShowHint}
        hint={currentLevelData.hint}
      />
      
      {/* Query Result */}
      <QueryResult queryResult={queryResult} />
    </section>
  );
}

export default LearningSection;