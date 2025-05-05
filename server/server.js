const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection String - use environment variables in production
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'sql_forest_db';

// MongoDB Connection
let db;

async function connectToMongo() {
  try {
    const client = await MongoClient.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    db = client.db(DB_NAME);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// API Routes

// Get all levels
app.get('/api/levels', async (req, res) => {
  try {
    const levels = await db.collection('levels').find({}).toArray();
    res.json(levels);
  } catch (error) {
    console.error('Error fetching levels:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific level
app.get('/api/levels/:id', async (req, res) => {
  try {
    const level = await db.collection('levels').findOne({ id: parseInt(req.params.id) });
    
    if (!level) {
      return res.status(404).json({ error: 'Level not found' });
    }
    
    res.json(level);
  } catch (error) {
    console.error(`Error fetching level ${req.params.id}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user progress
app.get('/api/user/progress', async (req, res) => {
  try {
    // In a real app, you'd identify the user from authentication
    const userId = 'current_user';
    
    const progress = await db.collection('user_progress').findOne({ userId });
    
    if (!progress) {
      // If no progress record exists, create a new one
      const newProgress = {
        userId,
        completedLevels: [],
        currentLevel: 1,
        lastUpdated: new Date()
      };
      
      await db.collection('user_progress').insertOne(newProgress);
      return res.json(newProgress);
    }
    
    res.json(progress);
  } catch (error) {
    console.error('Error fetching user progress:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user progress
app.put('/api/user/progress', async (req, res) => {
  try {
    // In a real app, you'd identify the user from authentication
    const userId = 'current_user';
    
    const { completedLevels, currentLevel } = req.body;
    
    const result = await db.collection('user_progress').updateOne(
      { userId },
      { 
        $set: { 
          completedLevels, 
          currentLevel,
          lastUpdated: new Date()
        } 
      },
      { upsert: true }
    );
    
    res.json({ success: true, message: 'Progress updated successfully' });
  } catch (error) {
    console.error('Error updating user progress:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Execute SQL query
app.post('/api/execute-query', async (req, res) => {
  try {
    // FIX: Changed from userQuery to query to match frontend parameter name
    const { levelId, query } = req.body;
    
    // Get the level data to check against the solution
    const level = await db.collection('levels').findOne({ id: parseInt(levelId) });
    
    if (!level) {
      return res.status(404).json({ error: 'Level not found' });
    }
    
    // Make sure query is defined before using it
    if (!query) {
      return res.status(400).json({ 
        success: false, 
        message: "No query provided. Please enter a SQL query." 
      });
    }
    
    // Check if the user's query matches the solution
    // Note: In a real implementation, you would execute the SQL query against a database
    // and compare the results rather than just comparing the strings
    if (query.trim().toLowerCase() === level.solution.toLowerCase()) {
      // Simulate the result based on the query and level
      let result;
      
      switch (parseInt(levelId)) {
        case 1:
          // SELECT name FROM forest_animals
          result = level.tables[0].data.map(row => ({ name: row[1] }));
          break;
        case 2:
          // SELECT * FROM forest_animals WHERE age > 3
          result = level.tables[0].data
            .filter(row => row[3] > 3)
            .map(row => ({
              id: row[0],
              name: row[1],
              species: row[2],
              age: row[3]
            }));
          break;
        case 3:
          // SELECT a.name, h.location FROM forest_animals a JOIN animal_habitats h ON a.id = h.animal_id
          const animals = level.tables[0];
          const habitats = level.tables[1];
          
          result = animals.data.map(animal => {
            const habitat = habitats.data.find(h => h[1] === animal[0]);
            return {
              name: animal[1],
              location: habitat ? habitat[2] : null
            };
          });
          break;
        default:
          result = [];
      }
      
      res.json({ success: true, result });
    } else {
      res.json({ 
        success: false, 
        message: "Your query doesn't match the expected solution. Try again or check the hint!" 
      });
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Initialize server
async function startServer() {
  await connectToMongo();
  
  // Start Express server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();