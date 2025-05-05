import React from 'react';

const QueryResult = ({ queryResult }) => {
  if (!queryResult) return null;

  return (
    <div className={`bg-white rounded-3xl p-6 shadow-sm border-l-4 ${queryResult.success ? 'border-mint-200' : 'border-peach-300'}`}>
      <h3 className="text-lg font-medium text-slate-700 mb-4">Result:</h3>
      
      {queryResult.success ? (
        <div>
          <div className="bg-mint-100 text-mint-600 inline-block px-3 py-1 rounded-full text-sm mb-4">
            Query successful!
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
            <p className="text-slate-600">No results returned.</p>
          )}
        </div>
      ) : (
        <div>
          <div className="bg-peach-100 text-peach-600 inline-block px-3 py-1 rounded-full text-sm mb-4">
            Query error
          </div>
          <p className="text-slate-600">{queryResult.message}</p>
        </div>
      )}
    </div>
  );
};

export default QueryResult;