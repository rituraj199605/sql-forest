import React, { useState } from 'react';
import Chevron from '../../assets/svg/Chevron';

const ReferenceCard = ({ title, description, examples }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h3 className="text-lg font-medium text-slate-800">{title}</h3>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
        <Chevron direction={isExpanded ? 'up' : 'down'} />
      </div>
      
      {isExpanded && (
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <h4 className="text-sm font-medium text-slate-600 mb-2">Examples:</h4>
          <div className="space-y-2">
            {examples.map((example, index) => (
              <div key={index} className="bg-slate-100 p-3 rounded-xl font-mono text-sm text-slate-700">
                {example}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferenceCard;