import React from 'react';

const TableVisualization = ({ tables }) => {
  if (!tables || tables.length === 0) {
    return <div className="text-slate-500">No tables available for this level.</div>;
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <h3 className="text-lg font-medium text-slate-700 mb-4">Tables Available:</h3>
      <div className="grid grid-cols-1 gap-6">
        {tables.map((table, index) => (
          <div key={index} className="overflow-hidden">
            <div className="flex items-center mb-2">
              <h4 className="text-slate-700 font-medium">{table.name}</h4>
              <span className="ml-2 text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full">
                {table.data.length} rows
              </span>
            </div>
            <div className="overflow-x-auto rounded-xl shadow-sm">
              <table className="min-w-full">
                <thead className="bg-slate-100">
                  <tr>
                    {table.columns.map((column, idx) => (
                      <th key={idx} className="px-4 py-2 text-left text-sm font-medium text-slate-600">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {table.data.map((row, rowIdx) => (
                    <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="px-4 py-2 text-sm text-slate-700">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableVisualization;