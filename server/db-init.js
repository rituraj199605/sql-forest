// Script to initialize the MongoDB database with sample data
const { MongoClient } = require('mongodb');

// MongoDB Connection String - use environment variables in production
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'sql_forest_db';

// Initial data for levels
const initialLevels = [
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

// Initialize default user progress data
const initialUserProgress = {
  userId: "current_user",
  completedLevels: [],
  currentLevel: 1,
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
    
    // Initialize user_progress collection
    if (!collectionNames.includes('user_progress')) {
      await db.createCollection('user_progress');
      console.log('Created user_progress collection');
    }
    
    // Reset and populate user_progress collection (optional)
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