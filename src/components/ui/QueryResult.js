// src/components/ui/QueryResult.js
import React from 'react';

const QueryResult = ({ queryResult }) => {
  if (!queryResult) return null;

  // Format execution time
  const formatExecutionTime = (ms) => {
    if (!ms) return '';
    return `${(ms / 1000).toFixed(2)} seconds`;
  };

  return (
    <div className={`bg-white rounded-3xl p-6 shadow-sm border-l-4 ${queryResult.success ? 'border-mint-200' : 'border-peach-300'}`}>
      <h3 className="text-lg font-medium text-slate-700 mb-4">Result:</h3>
      
      {queryResult.success ? (
        <div>
          <div className="flex items-center mb-4">
            <div className="bg-mint-100 text-mint-600 inline-block px-3 py-1 rounded-full text-sm">
              Query successful!
            </div>
            {queryResult.executionTime && (
              <div className="ml-3 text-sm text-slate-500">
                Execution time: {formatExecutionTime(queryResult.executionTime)}
              </div>
            )}
          </div>
          
          {queryResult.data && queryResult.data.length > 0 ? (
            <div className="overflow-x-auto rounded-xl shadow-sm">
              <table className="min-w-full">
                <thead className="bg-slate-100">
                  <tr>
                    {Object.keys(queryResult.data[0]).map((column, idx) => (
                      <th key={idx} className="px-4 py-2 text-left text-sm font-medium text-slate-600">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {queryResult.data.map((row, rowIdx) => (
                    <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      {Object.values(row).map((cell, cellIdx) => (
                        <td key={cellIdx} className="px-4 py-2 text-sm text-slate-700">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-slate-600">Query executed successfully, but no results were returned.</p>
          )}
        </div>
      ) : (
        <div>
          <div className="flex items-center mb-4">
            <div className="bg-peach-100 text-peach-600 inline-block px-3 py-1 rounded-full text-sm">
              Query error
            </div>
            {queryResult.executionTime && (
              <div className="ml-3 text-sm text-slate-500">
                Execution time: {formatExecutionTime(queryResult.executionTime)}
              </div>
            )}
          </div>
          <p className="text-slate-600 mb-4">{queryResult.message}</p>
          
          {/* If there's a specific expected result that didn't match */}
          {queryResult.result && queryResult.expectedResult && (
            <div className="mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-2">Your Result:</h4>
                  <div className="bg-slate-50 p-3 rounded-lg overflow-x-auto text-sm">
                    <pre className="whitespace-pre-wrap">{JSON.stringify(queryResult.result, null, 2)}</pre>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-2">Expected Result:</h4>
                  <div className="bg-slate-50 p-3 rounded-lg overflow-x-auto text-sm">
                    <pre className="whitespace-pre-wrap">{JSON.stringify(queryResult.expectedResult, null, 2)}</pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QueryResult;