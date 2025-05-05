import React from 'react';

const Navigation = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="mb-8">
      <div className="flex rounded-full bg-slate-200 p-1">
        <button 
          className={`flex-1 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'learn' ? 'bg-white shadow-md text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
          onClick={() => setActiveTab('learn')}
        >
          Learn
        </button>
        <button 
          className={`flex-1 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'progress' ? 'bg-white shadow-md text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
          onClick={() => setActiveTab('progress')}
        >
          Progress
        </button>
        <button 
          className={`flex-1 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'reference' ? 'bg-white shadow-md text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
          onClick={() => setActiveTab('reference')}
        >
          SQL Reference
        </button>
      </div>
    </nav>
  );
};

export default Navigation;