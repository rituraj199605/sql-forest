import React from 'react';
import { GameProvider } from './context/GameContext';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import LearningSection from './components/game/LearningSection';
import ProgressSection from './components/game/ProgressSection';
import ReferenceSection from './components/game/ReferenceSection';
import './App.css';

// Main App Component
export default function SQLForest() {
  const [activeTab, setActiveTab] = React.useState('learn');

  return (
    <GameProvider>
      <div className="bg-gray-100 min-h-screen p-6 font-sans">
        <div className="max-w-5xl mx-auto">
          {/* Header with leaf decorations */}
          <Header />
          
          {/* Navigation */}
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {/* Content based on active tab */}
          <div className="transition-all duration-300">
            {activeTab === 'learn' && <LearningSection />}
            {activeTab === 'progress' && <ProgressSection />}
            {activeTab === 'reference' && <ReferenceSection />}
          </div>
        </div>
      </div>
    </GameProvider>
  );
}