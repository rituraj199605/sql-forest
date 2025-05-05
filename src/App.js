import React, { useState, useEffect } from 'react';

// Main App Component
export default function SQLForest() {
  const [activeTab, setActiveTab] = useState('learn');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [userQuery, setUserQuery] = useState('');
  const [queryResult, setQueryResult] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [animateSuccess, setAnimateSuccess] = useState(false);
  
  // Game levels data
  const levels = [
    {
      id: 1,
      title: "SELECT Basics",
      description: "Learn to retrieve data from a table",
      challenge: "Select all animal names from the forest_animals table",
      hint: "Try: SELECT name FROM forest_animals",
      solution: "SELECT name FROM forest_animals",
      tables: [
        {
          name: "forest_animals",
          columns: ["id", "name", "species", "age"],
          data: [
            [1, "Ollie", "Owl", 3],
            [2, "Felix", "Fox", 2],
            [3, "Bella", "Bear", 5],
            [4, "Sammy", "Squirrel", 1],
            [5, "Daisy", "Deer", 4]
          ]
        }
      ]
    },
    {
      id: 2,
      title: "WHERE Clause",
      description: "Filter results based on conditions",
      challenge: "Find animals that are older than 3 years",
      hint: "Try: SELECT * FROM forest_animals WHERE age > 3",
      solution: "SELECT * FROM forest_animals WHERE age > 3",
      tables: [
        {
          name: "forest_animals",
          columns: ["id", "name", "species", "age"],
          data: [
            [1, "Ollie", "Owl", 3],
            [2, "Felix", "Fox", 2],
            [3, "Bella", "Bear", 5],
            [4, "Sammy", "Squirrel", 1],
            [5, "Daisy", "Deer", 4]
          ]
        }
      ]
    },
    {
      id: 3,
      title: "JOIN Operations",
      description: "Connect related tables",
      challenge: "Match animals with their habitats",
      hint: "Try: SELECT a.name, h.location FROM forest_animals a JOIN animal_habitats h ON a.id = h.animal_id",
      solution: "SELECT a.name, h.location FROM forest_animals a JOIN animal_habitats h ON a.id = h.animal_id",
      tables: [
        {
          name: "forest_animals",
          columns: ["id", "name", "species", "age"],
          data: [
            [1, "Ollie", "Owl", 3],
            [2, "Felix", "Fox", 2],
            [3, "Bella", "Bear", 5],
            [4, "Sammy", "Squirrel", 1],
            [5, "Daisy", "Deer", 4]
          ]
        },
        {
          name: "animal_habitats",
          columns: ["id", "animal_id", "location", "type"],
          data: [
            [1, 1, "Tall Oak", "Tree"],
            [2, 2, "Berry Bush", "Shrub"],
            [3, 3, "Cave", "Rock"],
            [4, 4, "Hollow Tree", "Tree"],
            [5, 5, "Meadow", "Open Field"]
          ]
        }
      ]
    }
  ];
  
  // Get current level data
  const currentLevelData = levels.find(level => level.id === currentLevel);
  
  // Check SQL query against solution
  const executeQuery = () => {
    // Simple simulation of executing the query
    if (userQuery.trim().toLowerCase() === currentLevelData.solution.toLowerCase()) {
      // Create result based on the query
      let result = [];
      
      if (currentLevel === 1) {
        // SELECT name FROM forest_animals
        result = currentLevelData.tables[0].data.map(row => ({name: row[1]}));
      } else if (currentLevel === 2) {
        // SELECT * FROM forest_animals WHERE age > 3
        result = currentLevelData.tables[0].data
          .filter(row => row[3] > 3)
          .map(row => ({
            id: row[0],
            name: row[1],
            species: row[2],
            age: row[3]
          }));
      } else if (currentLevel === 3) {
        // SELECT a.name, h.location FROM forest_animals a JOIN animal_habitats h ON a.id = h.animal_id
        const animals = currentLevelData.tables[0];
        const habitats = currentLevelData.tables[1];
        
        result = animals.data.map(animal => {
          const habitat = habitats.data.find(h => h[1] === animal[0]);
          return {
            name: animal[1],
            location: habitat ? habitat[2] : null
          };
        });
      }
      
      setQueryResult({
        success: true,
        data: result
      });
      
      // Mark level as completed if not already
      if (!completedLevels.includes(currentLevel)) {
        setCompletedLevels([...completedLevels, currentLevel]);
        setAnimateSuccess(true);
        setTimeout(() => setAnimateSuccess(false), 2000);
      }
    } else {
      setQueryResult({
        success: false,
        message: "Your query doesn't match the expected solution. Try again or check the hint!"
      });
    }
  };
  
  // Navigate to next level
  const goToNextLevel = () => {
    if (currentLevel < levels.length) {
      setCurrentLevel(currentLevel + 1);
      setUserQuery('');
      setQueryResult(null);
      setShowHint(false);
    }
  };
  
  // Navigate to specific level
  const goToLevel = (levelId) => {
    setCurrentLevel(levelId);
    setUserQuery('');
    setQueryResult(null);
    setShowHint(false);
  };
  
  return (
    <div className="bg-gray-100 min-h-screen p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header with leaf decorations */}
        <header className="mb-8 text-center relative">
          <div className="absolute -top-2 -left-4">
            <LeafSVG color="#94a3b8" rotate="30" size="40" />
          </div>
          <div className="absolute top-6 right-2">
            <LeafSVG color="#cbd5e1" rotate="-20" size="24" />
          </div>
          <h1 className="text-4xl font-light text-slate-800 mb-2">SQL Forest</h1>
          <p className="text-slate-500 max-w-lg mx-auto">
            Journey through the forest of SQL knowledge, solving challenges as you grow your skills
          </p>
        </header>
        
        {/* Navigation */}
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
        
        {/* Content based on active tab */}
        <div className="transition-all duration-300">
          {activeTab === 'learn' && (
            <LearningSection 
              levelData={currentLevelData}
              userQuery={userQuery}
              setUserQuery={setUserQuery}
              executeQuery={executeQuery}
              queryResult={queryResult}
              showHint={showHint}
              setShowHint={setShowHint}
              goToNextLevel={goToNextLevel}
              animateSuccess={animateSuccess}
              completedLevels={completedLevels}
            />
          )}
          
          {activeTab === 'progress' && (
            <ProgressSection 
              levels={levels}
              completedLevels={completedLevels}
              currentLevel={currentLevel}
              goToLevel={goToLevel}
            />
          )}
          
          {activeTab === 'reference' && (
            <ReferenceSection />
          )}
        </div>
      </div>
    </div>
  );
}

// Learning section component
function LearningSection({ 
  levelData, 
  userQuery, 
  setUserQuery, 
  executeQuery, 
  queryResult, 
  showHint, 
  setShowHint,
  goToNextLevel,
  animateSuccess,
  completedLevels
}) {
  return (
    <section className="grid grid-cols-1 gap-6">
      {/* Level Info Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm overflow-hidden relative">
        <div className="absolute -bottom-6 -right-6 opacity-10">
          <MountainSVG size="200" color="#94A3B8" />
        </div>
        <div className="flex items-center mb-4">
          <div className="bg-peach-300 text-slate-800 rounded-full px-3 py-1 text-sm mr-3">
            Level {levelData.id}
          </div>
          <h2 className="text-2xl font-light text-slate-700">{levelData.title}</h2>
          {completedLevels.includes(levelData.id) && (
            <div className="ml-auto">
              <div className="flex items-center justify-center bg-mint-100 text-mint-600 w-8 h-8 rounded-full">
                <CheckIcon />
              </div>
            </div>
          )}
        </div>
        <p className="text-slate-500 mb-4">{levelData.description}</p>
        <div className="bg-slate-100 rounded-xl p-4 mb-4">
          <h3 className="text-lg font-medium text-slate-700 mb-2">Challenge:</h3>
          <p className="text-slate-600">{levelData.challenge}</p>
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
                {levelData.id < 3 ? 'Next Level' : 'Review Progress'}
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Tables Visualization */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg font-medium text-slate-700 mb-4">Tables Available:</h3>
        <div className="grid grid-cols-1 gap-6">
          {levelData.tables.map((table, index) => (
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
      
      {/* Query Editor */}
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
        
        {showHint && (
          <div className="mt-4 p-4 bg-slate-50 rounded-xl">
            <div className="text-sm text-slate-600">
              <span className="font-medium">Hint:</span> {levelData.hint}
            </div>
          </div>
        )}
      </div>
      
      {/* Query Result */}
      {queryResult && (
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
      )}
    </section>
  );
}

// Progress section component
function ProgressSection({ levels, completedLevels, currentLevel, goToLevel }) {
  const progressPercentage = (completedLevels.length / levels.length) * 100;
  
  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm">
      <h2 className="text-2xl font-light text-slate-700 mb-6">Your Learning Progress</h2>
      
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-500">Progress</span>
          <span className="text-sm font-medium text-slate-700">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-mint-200 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* Level cards */}
      <div className="space-y-4">
        {levels.map((level) => {
          const isCompleted = completedLevels.includes(level.id);
          const isCurrent = currentLevel === level.id;
          
          return (
            <div 
              key={level.id}
              className={`p-4 rounded-2xl transition-all duration-300 cursor-pointer
                ${isCompleted ? 'bg-mint-100' : isCurrent ? 'bg-peach-100' : 'bg-slate-50'}
                ${isCurrent ? 'transform scale-102 shadow-sm' : ''}
              `}
              onClick={() => goToLevel(level.id)}
            >
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4
                  ${isCompleted ? 'bg-mint-200 text-slate-700' : isCurrent ? 'bg-peach-300 text-white' : 'bg-slate-200 text-slate-600'}
                `}>
                  {isCompleted ? <CheckIcon /> : level.id}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-800">{level.title}</h3>
                  <p className="text-sm text-slate-500">{level.description}</p>
                </div>
                <div className="ml-auto">
                  {isCompleted ? (
                    <span className="text-xs bg-mint-200 text-slate-700 px-3 py-1 rounded-full">Completed</span>
                  ) : isCurrent ? (
                    <span className="text-xs bg-peach-300 text-white px-3 py-1 rounded-full">In Progress</span>
                  ) : (
                    <span className="text-xs bg-slate-200 text-slate-600 px-3 py-1 rounded-full">Locked</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Achievements */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-slate-700 mb-4">Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Achievement 
            title="First Query" 
            description="Execute your first SQL query"
            isUnlocked={completedLevels.length > 0}
            icon="✨"
          />
          <Achievement 
            title="Table Master" 
            description="Successfully filter data with WHERE"
            isUnlocked={completedLevels.includes(2)}
            icon="🔍"
          />
          <Achievement 
            title="Relationship Builder" 
            description="Complete a JOIN operation"
            isUnlocked={completedLevels.includes(3)}
            icon="🔗"
          />
        </div>
      </div>
    </section>
  );
}

// Achievement component
function Achievement({ title, description, isUnlocked, icon }) {
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
}

// Reference section component
function ReferenceSection() {
  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm">
      <h2 className="text-2xl font-light text-slate-700 mb-6">SQL Reference Guide</h2>
      
      <div className="space-y-6">
        <ReferenceCard 
          title="SELECT Statement" 
          description="Used to select data from a database"
          examples={[
            "SELECT * FROM table_name",
            "SELECT column1, column2 FROM table_name"
          ]}
        />
        
        <ReferenceCard 
          title="WHERE Clause" 
          description="Used to filter records"
          examples={[
            "SELECT * FROM table_name WHERE condition",
            "SELECT * FROM customers WHERE country = 'USA'"
          ]}
        />
        
        <ReferenceCard 
          title="JOIN Operations" 
          description="Used to combine rows from two or more tables"
          examples={[
            "SELECT orders.id, customers.name FROM orders JOIN customers ON orders.customer_id = customers.id",
            "SELECT a.column, b.column FROM tableA a INNER JOIN tableB b ON a.common_field = b.common_field"
          ]}
        />
        
        <ReferenceCard 
          title="GROUP BY Statement" 
          description="Groups rows with the same values into summary rows"
          examples={[
            "SELECT COUNT(id), country FROM customers GROUP BY country",
            "SELECT department, AVG(salary) FROM employees GROUP BY department"
          ]}
        />
        
        <ReferenceCard 
          title="ORDER BY Keyword" 
          description="Used to sort the result-set by one or more columns"
          examples={[
            "SELECT * FROM table_name ORDER BY column1 ASC, column2 DESC",
            "SELECT name, price FROM products ORDER BY price DESC"
          ]}
        />
      </div>
    </section>
  );
}

// Reference card component
function ReferenceCard({ title, description, examples }) {
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
        <ChevronIcon direction={isExpanded ? 'up' : 'down'} />
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
}

// Utility components and SVGs
function LeafSVG({ color = "#94A3B8", rotate = "0", size = "24" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: `rotate(${rotate}deg)` }}>
      <path d="M12.0002 22C16.8732 22 21.0002 17.873 21.0002 13C21.0002 8.12701 12.0002 2 12.0002 2C12.0002 2 3.00018 8.12701 3.00018 13C3.00018 17.873 7.12719 22 12.0002 22Z" fill={color} fillOpacity="0.2" />
      <path d="M12 22C12 22 12 11 12 7C12 3 12 2 12 2C12 2 3 8.127 3 13C3 17.873 7.127 22 12 22Z" fill={color} fillOpacity="0.3" />
    </svg>
  );
}

function MountainSVG({ color = "#2D3F4C", size = "100" }) {
  return (
    <svg width={size} height={Math.round(parseInt(size) * 0.6)} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 60H100V40C100 40 85 25 70 35C55 45 50 30 30 35C10 40 0 60 0 60Z" fill={color} fillOpacity="0.2" />
      <path d="M0 60H100V45C100 45 75 30 60 40C45 50 35 35 20 40C5 45 0 60 0 60Z" fill={color} fillOpacity="0.4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronIcon({ direction = 'down' }) {
  return (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 20 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: direction === 'up' ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <path d="M5 7.5L10 12.5L15 7.5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}