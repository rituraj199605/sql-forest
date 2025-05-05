import React from 'react';

const QueryEditor = ({ userQuery, setUserQuery, executeQuery, showHint, setShowHint, hint }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <h3 className="text-lg font-medium text-slate-700 mb-4">SQL Query:</h3>
      <div className="mb-4">
        <textarea
          className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-peach-300"
          placeholder="Type your SQL query here..."
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
        ></textarea>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-peach-300 text-slate-800 px-6 py-2 rounded-full hover:bg-peach-400 transition-colors"
          onClick={executeQuery}
        >
          Execute Query
        </button>
        <button
          className="text-slate-500 hover:text-slate-700 transition-colors"
          onClick={() => setShowHint(!showHint)}
        >
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </button>
      </div>
      
      {showHint && hint && (
        <div className="mt-4 p-4 bg-slate-50 rounded-xl">
          <div className="text-sm text-slate-600">
            <span className="font-medium">Hint:</span> {hint}
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryEditor;