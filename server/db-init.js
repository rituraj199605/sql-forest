// server/db-init.js - with expanded levels and sub-levels
const { MongoClient } = require('mongodb');
const { initializeSubLevels } = require('./db-init-sub-levels');

// MongoDB Connection String - use environment variables in production
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'sql_forest_db';

// Main levels for a comprehensive SQL learning journey
const initialLevels = [
  {
    id: 1,
    title: "SELECT Basics",
    description: "Learn to retrieve data from a table",
    challenge: "Select all animal names from the forest_animals table",
    hint: "Try: SELECT name FROM forest_animals",
    solution: "SELECT name FROM forest_animals",
    summary: "You've learned how to use the SELECT statement to retrieve specific columns from a database table.",
    keyConcepts: [
      "Basic SELECT syntax",
      "Retrieving specific columns",
      "Understanding table structure"
    ],
    nextLevelPreview: {
      title: "Filtering with WHERE",
      description: "Learn to filter results based on conditions",
      learningPoints: [
        "Using the WHERE clause to filter results",
        "Comparison operators like >, <, and =",
        "Boolean expressions in SQL"
      ],
      tip: "The WHERE clause is like a filter that only lets matching rows through."
    },
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
    summary: "You've mastered filtering data with the WHERE clause, allowing you to narrow down results based on specific conditions.",
    keyConcepts: [
      "WHERE clause syntax",
      "Comparison operators",
      "Filtering rows based on criteria"
    ],
    nextLevelPreview: {
      title: "JOIN Operations",
      description: "Connect related tables to extract combined data",
      learningPoints: [
        "Understanding table relationships",
        "Inner JOIN syntax",
        "Using aliases in SQL"
      ],
      tip: "JOINs allow you to connect data across different tables, like putting puzzle pieces together."
    },
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
    summary: "You've learned how to join related tables together, which is essential for working with relational databases.",
    keyConcepts: [
      "JOIN syntax",
      "Table aliases",
      "Specifying join conditions with ON",
      "Working with multiple tables"
    ],
    nextLevelPreview: {
      title: "Ordering Results",
      description: "Sort your query results in a specific order",
      learningPoints: [
        "Using ORDER BY to sort results",
        "Ascending and descending sorting",
        "Sorting by multiple columns"
      ],
      tip: "ORDER BY helps you organize your results in a meaningful way, just like sorting books on a shelf."
    },
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
  },
  {
    id: 4,
    title: "Ordering Results",
    description: "Sort your query results",
    challenge: "List all animals, ordered by age from oldest to youngest",
    hint: "Try: SELECT * FROM forest_animals ORDER BY age DESC",
    solution: "SELECT * FROM forest_animals ORDER BY age DESC",
    summary: "You've mastered how to order query results, which is essential for creating organized and readable outputs.",
    keyConcepts: [
      "ORDER BY syntax",
      "Ascending (ASC) and descending (DESC) order",
      "Default sort order"
    ],
    nextLevelPreview: {
      title: "Aggregate Functions",
      description: "Calculate summary statistics from your data",
      learningPoints: [
        "Using COUNT, SUM, AVG, MIN, and MAX functions",
        "Getting summary statistics from data",
        "Handling NULL values in aggregations"
      ],
      tip: "Aggregate functions are like mathematical tools that help you analyze sets of values rather than individual values."
    },
    tables: [
      {
        name: "forest_animals",
        columns: ["id", "name", "species", "age"],
        data: [
          [1, "Ollie", "Owl", 3],
          [2, "Felix", "Fox", 2],
          [3, "Bella", "Bear", 5],
          [4, "Sammy", "Squirrel", 1],
          [5, "Daisy", "Deer", 4],
          [6, "Hooty", "Owl", 6],
          [7, "Roxy", "Fox", 3]
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Aggregate Functions",
    description: "Calculate summary statistics",
    challenge: "Find the average age of all animals in the forest",
    hint: "Try: SELECT AVG(age) as average_age FROM forest_animals",
    solution: "SELECT AVG(age) as average_age FROM forest_animals",
    summary: "You've learned how to use aggregate functions to perform calculations across multiple rows.",
    keyConcepts: [
      "Aggregate functions (AVG, COUNT, SUM, etc.)",
      "Column aliases with AS",
      "Understanding result set transformations"
    ],
    nextLevelPreview: {
      title: "GROUP BY Clause",
      description: "Group your data for aggregate analysis",
      learningPoints: [
        "Grouping rows with similar values",
        "Combining GROUP BY with aggregate functions",
        "Understanding when to use GROUP BY"
      ],
      tip: "GROUP BY is like sorting your data into buckets before counting or analyzing what's in each bucket."
    },
    tables: [
      {
        name: "forest_animals",
        columns: ["id", "name", "species", "age"],
        data: [
          [1, "Ollie", "Owl", 3],
          [2, "Felix", "Fox", 2],
          [3, "Bella", "Bear", 5],
          [4, "Sammy", "Squirrel", 1],
          [5, "Daisy", "Deer", 4],
          [6, "Hooty", "Owl", 6],
          [7, "Roxy", "Fox", 3]
        ]
      }
    ]
  },
  // Other main levels remain the same...
];

// Initialize default user progress data
const initialUserProgress = {
  userId: "current_user",
  completedLevels: [],
  completedSubLevels: [],
  currentMainLevel: 1,
  currentSubLevel: "1.1",
  bestTimes: {},
  lastUpdated: new Date()
};

async function initializeDatabase() {
  let client;
  
  try {
    // Connect to MongoDB
    client = await MongoClient.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    const db = client.db(DB_NAME);
    console.log(`Connected to database: ${DB_NAME}`);
    
    // Create collections if they don't exist
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    // Initialize levels collection
    if (!collectionNames.includes('levels')) {
      await db.createCollection('levels');
      console.log('Created levels collection');
    }
    
    // Reset and populate levels collection
    await db.collection('levels').deleteMany({});
    await db.collection('levels').insertMany(initialLevels);
    console.log(`Inserted ${initialLevels.length} levels`);
    
    // Initialize and populate sub-levels
    await initializeSubLevels(db);
    
    // Initialize user_progress collection
    if (!collectionNames.includes('user_progress')) {
      await db.createCollection('user_progress');
      console.log('Created user_progress collection');
    }
    
    // Reset and populate user_progress collection
    await db.collection('user_progress').deleteMany({});
    await db.collection('user_progress').insertOne(initialUserProgress);
    console.log('Initialized default user progress');
    
    console.log('Database initialization complete!');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('Database connection closed');
    }
  }
}

// Run the initialization
initializeDatabase();