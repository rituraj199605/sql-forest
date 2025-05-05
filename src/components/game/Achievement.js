import React from 'react';

const Achievement = ({ title, description, isUnlocked, icon }) => {
  return (
    <div className={`p-4 rounded-2xl ${isUnlocked ? 'bg-peach-100' : 'bg-slate-100'}`}>
      <div className={`w-12 h-12 rounded-full mb-2 flex items-center justify-center text-xl
        ${isUnlocked ? 'bg-peach-300 text-white' : 'bg-slate-300 text-slate-500'}
      `}>
        {isUnlocked ? icon : '🔒'}
      </div>
      <h4 className="text-md font-medium text-slate-700">{title}</h4>
      <p className="text-xs text-slate-500">{description}</p>
    </div>
  );
};

export default Achievement;