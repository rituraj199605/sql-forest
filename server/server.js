// server/server.js
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
        bestTimes: {},
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
    
    const { completedLevels, currentLevel, bestTimes } = req.body;
    
    const result = await db.collection('user_progress').updateOne(
      { userId },
      { 
        $set: { 
          completedLevels, 
          currentLevel,
          bestTimes: bestTimes || {},
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

// Execute SQL query and compare results instead of the exact query
app.post('/api/execute-query', async (req, res) => {
  try {
    const { levelId, query } = req.body;
    
    // Get the level data
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
    
    // Execute the user's query
    const userResult = executeQueryOnMockDB(query, level.tables);
    
    if (userResult.error) {
      return res.json({
        success: false,
        message: `SQL Error: ${userResult.error}`
      });
    }
    
    // Execute the solution query
    const solutionResult = executeQueryOnMockDB(level.solution, level.tables);
    
    // Compare the results
    const resultsMatch = compareQueryResults(userResult.data, solutionResult.data);
    
    if (resultsMatch) {
      res.json({ 
        success: true, 
        result: userResult.data,
        message: "Great job! Your query produced the correct results."
      });
    } else {
      res.json({ 
        success: false, 
        result: userResult.data,
        expectedResult: solutionResult.data,
        message: "Your query executed successfully, but the results don't match what we expected. Try again or check the hint!"
      });
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Simple mock SQL engine for executing queries and returning results
function executeQueryOnMockDB(query, tables) {
  try {
    // Parse the query (very simplified for demo purposes)
    query = query.trim().toLowerCase();
    
    // Handle different query types
    if (query.startsWith('select')) {
      return handleSelectQuery(query, tables);
    } else {
      return { error: "Only SELECT statements are supported in this learning environment." };
    }
  } catch (error) {
    return { error: error.message };
  }
}

// Handle a SELECT query on the mock database
function handleSelectQuery(query, tables) {
  // This is a very simplified SQL parser for demonstration
  // In a real implementation, you would use a proper SQL parser
  
  try {
    // Basic pattern matching for common SELECT query structures
    if (query.includes('select') && query.includes('from')) {
      // Extract the table name
      const fromClause = query.split('from')[1].trim();
      let tableName = fromClause.split(' ')[0];
      
      // Find the table in our data
      const table = tables.find(t => t.name.toLowerCase() === tableName);
      
      if (!table) {
        return { error: `Table '${tableName}' not found.` };
      }
      
      // Extract columns to select
      let columns = [];
      const selectClause = query.split('from')[0].replace('select', '').trim();
      
      if (selectClause === '*') {
        columns = table.columns.map((col, index) => ({ name: col, index }));
      } else {
        const columnNames = selectClause.split(',').map(c => c.trim());
        columns = columnNames.map(colName => {
          const colIndex = table.columns.findIndex(c => c.toLowerCase() === colName);
          if (colIndex === -1) {
            throw new Error(`Column '${colName}' not found in table '${tableName}'.`);
          }
          return { name: table.columns[colIndex], index: colIndex };
        });
      }
      
      // Process WHERE clause if it exists
      let filteredData = [...table.data];
      if (query.includes('where')) {
        const whereClause = query.split('where')[1].trim();
        
        // Very simple condition parsing (only handles basic comparisons)
        // This is just for demonstration, a real parser would be more complex
        const condition = parseCondition(whereClause, table);
        
        filteredData = table.data.filter(row => evaluateCondition(row, condition, table));
      }
      
      // Handle JOIN if present
      if (query.includes('join')) {
        return handleJoin(query, tables);
      }
      
      // Handle GROUP BY if present
      if (query.includes('group by')) {
        return handleGroupBy(query, table, filteredData);
      }
      
      // Format the result data
      const result = filteredData.map(row => {
        const resultRow = {};
        columns.forEach(col => {
          resultRow[col.name] = row[col.index];
        });
        return resultRow;
      });
      
      return { data: result };
    } else {
      return { error: "Invalid SELECT query format." };
    }
  } catch (error) {
    return { error: error.message };
  }
}

// Simple condition parser
function parseCondition(whereClause, table) {
  // This is a very simplified condition parser for demo
  // Handle basic comparisons like "column > value"
  const operators = ['=', '>', '<', '>=', '<=', '<>'];
  
  let operator = null;
  let operatorIndex = -1;
  
  for (const op of operators) {
    if (whereClause.includes(op)) {
      operator = op;
      operatorIndex = whereClause.indexOf(op);
      break;
    }
  }
  
  if (!operator) {
    throw new Error("Unsupported condition in WHERE clause.");
  }
  
  const columnName = whereClause.substring(0, operatorIndex).trim();
  const columnIndex = table.columns.findIndex(c => c.toLowerCase() === columnName);
  
  if (columnIndex === -1) {
    throw new Error(`Column '${columnName}' not found in table.`);
  }
  
  let value = whereClause.substring(operatorIndex + operator.length).trim();
  
  // Handle string values
  if (value.startsWith("'") && value.endsWith("'")) {
    value = value.substring(1, value.length - 1);
  } else {
    // Try to convert to number
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      value = numValue;
    }
  }
  
  return { columnIndex, operator, value };
}

// Evaluate a condition on a row
function evaluateCondition(row, condition, table) {
  const { columnIndex, operator, value } = condition;
  const cellValue = row[columnIndex];
  
  switch (operator) {
    case '=':
      return cellValue == value;
    case '>':
      return cellValue > value;
    case '<':
      return cellValue < value;
    case '>=':
      return cellValue >= value;
    case '<=':
      return cellValue <= value;
    case '<>':
      return cellValue != value;
    default:
      return false;
  }
}

// Handle JOIN operations
function handleJoin(query, tables) {
  try {
    // This is a very simplified JOIN handler for the demo
    // Extract table names and join condition
    const joinRegex = /from\s+(\w+)(?:\s+as\s+(\w+))?\s+join\s+(\w+)(?:\s+as\s+(\w+))?\s+on\s+(.+?)(?:\s+where|$)/i;
    const joinMatch = query.match(joinRegex);
    
    if (!joinMatch) {
      return { error: "Invalid JOIN syntax." };
    }
    
    const table1Name = joinMatch[1];
    const table1Alias = joinMatch[2] || table1Name;
    const table2Name = joinMatch[3];
    const table2Alias = joinMatch[4] || table2Name;
    const joinCondition = joinMatch[5].trim();
    
    // Find the tables
    const table1 = tables.find(t => t.name.toLowerCase() === table1Name);
    const table2 = tables.find(t => t.name.toLowerCase() === table2Name);
    
    if (!table1 || !table2) {
      return { error: "One or more tables not found." };
    }
    
    // Parse join condition (very simplified)
    // Assumes format: alias1.column1 = alias2.column2
    const conditionParts = joinCondition.split('=').map(p => p.trim());
    
    if (conditionParts.length !== 2) {
      return { error: "Invalid JOIN condition format." };
    }
    
    const leftParts = conditionParts[0].split('.');
    const rightParts = conditionParts[1].split('.');
    
    if (leftParts.length !== 2 || rightParts.length !== 2) {
      return { error: "JOIN condition must use table aliases." };
    }
    
    const leftAlias = leftParts[0];
    const leftColumn = leftParts[1];
    const rightAlias = rightParts[0];
    const rightColumn = rightParts[1];
    
    // Determine which column indexes to join on
    let t1ColIndex, t2ColIndex;
    
    if (leftAlias === table1Alias) {
      t1ColIndex = table1.columns.findIndex(c => c.toLowerCase() === leftColumn);
      t2ColIndex = table2.columns.findIndex(c => c.toLowerCase() === rightColumn);
    } else {
      t1ColIndex = table1.columns.findIndex(c => c.toLowerCase() === rightColumn);
      t2ColIndex = table2.columns.findIndex(c => c.toLowerCase() === leftColumn);
    }
    
    if (t1ColIndex === -1 || t2ColIndex === -1) {
      return { error: "Join columns not found in tables." };
    }
    
    // Perform the join
    const joinedData = [];
    
    for (const row1 of table1.data) {
      for (const row2 of table2.data) {
        if (row1[t1ColIndex] === row2[t2ColIndex]) {
          // Get the columns to select
          const selectClause = query.split('select')[1].split('from')[0].trim();
          const columnSelections = selectClause.split(',').map(c => c.trim());
          
          const resultRow = {};
          
          for (const colSelection of columnSelections) {
            const parts = colSelection.split('.');
            
            if (parts.length !== 2) {
              continue; // Skip invalid column selections
            }
            
            const alias = parts[0];
            const colName = parts[1];
            
            if (alias === table1Alias) {
              const colIndex = table1.columns.findIndex(c => c.toLowerCase() === colName);
              if (colIndex !== -1) {
                resultRow[`${colName}`] = row1[colIndex];
              }
            } else if (alias === table2Alias) {
              const colIndex = table2.columns.findIndex(c => c.toLowerCase() === colName);
              if (colIndex !== -1) {
                resultRow[`${colName}`] = row2[colIndex];
              }
            }
          }
          
          joinedData.push(resultRow);
        }
      }
    }
    
    return { data: joinedData };
  } catch (error) {
    return { error: error.message };
  }
}

// Handle GROUP BY operations
function handleGroupBy(query, table, filteredData) {
  try {
    // Extract GROUP BY clause
    const groupByRegex = /group by\s+(.+?)(?:\s+having|$)/i;
    const groupByMatch = query.match(groupByRegex);
    
    if (!groupByMatch) {
      return { error: "Invalid GROUP BY syntax." };
    }
    
    const groupByColumn = groupByMatch[1].trim();
    const groupByColIndex = table.columns.findIndex(c => c.toLowerCase() === groupByColumn);
    
    if (groupByColIndex === -1) {
      return { error: `Column '${groupByColumn}' not found in table.` };
    }
    
    // Extract aggregation function
    const aggregationRegex = /select\s+(.+?)\s+from/i;
    const aggregationMatch = query.match(aggregationRegex);
    
    if (!aggregationMatch) {
      return { error: "Invalid SELECT syntax with GROUP BY." };
    }
    
    const selectExpressions = aggregationMatch[1].split(',').map(e => e.trim());
    
    // Process the data with grouping
    const groupedData = {};
    
    // Group the data
    for (const row of filteredData) {
      const groupKey = row[groupByColIndex];
      
      if (!groupedData[groupKey]) {
        groupedData[groupKey] = [];
      }
      
      groupedData[groupKey].push(row);
    }
    
    // Apply aggregations
    const result = [];
    
    for (const [groupKey, rows] of Object.entries(groupedData)) {
      const resultRow = { [groupByColumn]: groupKey };
      
      for (const expr of selectExpressions) {
        if (expr.toLowerCase() === groupByColumn.toLowerCase()) {
          continue; // Already added
        }
        
        // Check for aggregation functions
        const funcMatch = expr.match(/(\w+)\((.+?)\)/i);
        
        if (funcMatch) {
          const funcName = funcMatch[1].toLowerCase();
          const argName = funcMatch[2].trim();
          
          // Handle different aggregate functions
          if (argName === '*' && funcName === 'count') {
            resultRow[`${funcName}(*)`] = rows.length;
          } else {
            const argIndex = table.columns.findIndex(c => c.toLowerCase() === argName);
            
            if (argIndex === -1) {
              return { error: `Column '${argName}' not found in table.` };
            }
            
            switch (funcName) {
              case 'count':
                resultRow[`${funcName}(${argName})`] = rows.length;
                break;
              case 'sum':
                resultRow[`${funcName}(${argName})`] = rows.reduce((sum, r) => sum + r[argIndex], 0);
                break;
              case 'avg':
                resultRow[`${funcName}(${argName})`] = rows.reduce((sum, r) => sum + r[argIndex], 0) / rows.length;
                break;
              case 'min':
                resultRow[`${funcName}(${argName})`] = Math.min(...rows.map(r => r[argIndex]));
                break;
              case 'max':
                resultRow[`${funcName}(${argName})`] = Math.max(...rows.map(r => r[argIndex]));
                break;
              default:
                return { error: `Unsupported aggregate function: ${funcName}` };
            }
          }
        }
      }
      
      result.push(resultRow);
    }
    
    return { data: result };
  } catch (error) {
    return { error: error.message };
  }
}

// Compare two query result sets
function compareQueryResults(resultA, resultB) {
  if (!resultA || !resultB) return false;
  if (resultA.length !== resultB.length) return false;
  
  // Sort both results if they are arrays
  const sortedA = JSON.stringify(sortResultSet(resultA));
  const sortedB = JSON.stringify(sortResultSet(resultB));
  
  return sortedA === sortedB;
}

// Sort a result set for comparison
function sortResultSet(resultSet) {
  if (!Array.isArray(resultSet)) return resultSet;
  
  // Deep clone the array to avoid modifying the original
  const cloned = JSON.parse(JSON.stringify(resultSet));
  
  // Sort each object's keys
  return cloned.map(item => {
    if (typeof item !== 'object' || item === null) return item;
    
    const sorted = {};
    Object.keys(item).sort().forEach(key => {
      sorted[key] = item[key];
    });
    
    return sorted;
  });
}

// Initialize server
async function startServer() {
  await connectToMongo();
  
  // Start Express server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();