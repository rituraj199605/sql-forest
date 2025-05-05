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

// Get all main levels
app.get('/api/levels', async (req, res) => {
  try {
    const levels = await db.collection('levels').find({}).toArray();
    res.json(levels);
  } catch (error) {
    console.error('Error fetching levels:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all sub-levels
app.get('/api/sub-levels', async (req, res) => {
  try {
    const subLevels = await db.collection('sub_levels').find({}).toArray();
    res.json(subLevels);
  } catch (error) {
    console.error('Error fetching sub-levels:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific main level
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

// Get a specific sub-level
app.get('/api/sub-levels/:id', async (req, res) => {
  try {
    const subLevel = await db.collection('sub_levels').findOne({ id: req.params.id });
    
    if (!subLevel) {
      return res.status(404).json({ error: 'Sub-level not found' });
    }
    
    res.json(subLevel);
  } catch (error) {
    console.error(`Error fetching sub-level ${req.params.id}:`, error);
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
        completedSubLevels: [],
        currentMainLevel: 1,
        currentSubLevel: null,
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
    
    const { 
      completedLevels, 
      completedSubLevels,
      currentMainLevel, 
      currentSubLevel,
      bestTimes 
    } = req.body;
    
    const result = await db.collection('user_progress').updateOne(
      { userId },
      { 
        $set: { 
          completedLevels, 
          completedSubLevels: completedSubLevels || [],
          currentMainLevel,
          currentSubLevel,
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
    const { levelId, query, isSubLevel } = req.body;
    
    // Get the level data (either main level or sub-level)
    const collection = isSubLevel ? 'sub_levels' : 'levels';
    const level = await db.collection(collection).findOne({ 
      id: isSubLevel ? levelId : parseInt(levelId) 
    });
    
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
      // Check if it's a JOIN query
      if (query.includes('join')) {
        return handleJoin(query, tables);
      }
      
      // Extract the table name
      const fromClause = query.split('from')[1].trim();
      let tableName = fromClause.split(/\s+(?:where|group|order|limit)/i)[0].trim();
      
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
        const columnSelections = selectClause.split(',').map(c => c.trim());
        
        columns = columnSelections.map(colSelection => {
          // Handle "column AS alias" syntax
          const parts = colSelection.split(/\s+as\s+/i);
          const colName = parts[0].trim();
          const alias = parts.length > 1 ? parts[1].trim() : colName;
          
          // Check for aggregate functions
          if (colName.toLowerCase().match(/^(count|sum|avg|min|max)\s*\(/i)) {
            return { name: alias, aggregate: true, function: colName };
          }
          
          const colIndex = table.columns.findIndex(c => c.toLowerCase() === colName.toLowerCase());
          if (colIndex === -1) {
            throw new Error(`Column '${colName}' not found in table '${tableName}'.`);
          }
          return { name: alias, index: colIndex };
        });
      }
      
      // Process WHERE clause if it exists
      let filteredData = [...table.data];
      if (query.includes('where')) {
        const whereClause = query.split(/\s+where\s+/i)[1].split(/\s+(?:group|order|limit)/i)[0].trim();
        
        // Very simple condition parsing (only handles basic comparisons)
        // This is just for demonstration, a real parser would be more complex
        const condition = parseCondition(whereClause, table);
        
        filteredData = table.data.filter(row => evaluateCondition(row, condition, table));
      }
      
      // Handle GROUP BY if present
      if (query.includes('group by')) {
        return handleGroupBy(query, table, filteredData);
      }
      
      // Handle ORDER BY if present
      if (query.includes('order by')) {
        const orderByClause = query.split(/\s+order\s+by\s+/i)[1].split(/\s+(?:limit)/i)[0].trim();
        filteredData = handleOrderBy(orderByClause, table, filteredData);
      }
      
      // Format the result data
      const result = filteredData.map(row => {
        const resultRow = {};
        columns.forEach(col => {
          if (col.aggregate) {
            // Handle aggregate functions
            // This is just a placeholder, real implementation would be more complex
            resultRow[col.name] = "Aggregate functions outside GROUP BY are not fully implemented yet";
          } else {
            resultRow[col.name] = row[col.index];
          }
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

// Handle ORDER BY operations
function handleOrderBy(orderByClause, table, data) {
  // Parse the ORDER BY clause
  const orderSpecs = orderByClause.split(',').map(spec => {
    const parts = spec.trim().split(/\s+/);
    const columnName = parts[0].trim();
    const direction = parts.length > 1 && parts[1].toLowerCase() === 'desc' ? 'desc' : 'asc';
    
    const columnIndex = table.columns.findIndex(c => c.toLowerCase() === columnName.toLowerCase());
    if (columnIndex === -1) {
      throw new Error(`Column '${columnName}' not found in ORDER BY clause.`);
    }
    
    return { columnIndex, direction };
  });
  
  // Sort the data based on the ORDER BY specifications
  return [...data].sort((rowA, rowB) => {
    for (const spec of orderSpecs) {
      const valueA = rowA[spec.columnIndex];
      const valueB = rowB[spec.columnIndex];
      
      // Compare the values based on their data types
      let comparison;
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        comparison = valueA - valueB;
      } else {
        // Convert to strings for comparison
        comparison = String(valueA).localeCompare(String(valueB));
      }
      
      // Apply the sort direction
      if (comparison !== 0) {
        return spec.direction === 'asc' ? comparison : -comparison;
      }
    }
    
    return 0; // If all values are equal
  });
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
  const columnIndex = table.columns.findIndex(c => c.toLowerCase() === columnName.toLowerCase());
  
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

// Handle JOIN operations - UPDATED for better functionality
function handleJoin(query, tables) {
  try {
    // This is an improved JOIN handler with better error handling and column resolution
    
    // 1. Extract table names and join condition
    // Match pattern: SELECT ... FROM table1 [AS alias1] JOIN table2 [AS alias2] ON condition [WHERE ...]
    const joinRegex = /from\s+(\w+)(?:\s+(?:as\s+)?(\w+))?\s+(?:inner\s+)?join\s+(\w+)(?:\s+(?:as\s+)?(\w+))?\s+on\s+(.+?)(?:\s+where|\s+group|\s+order|\s+limit|\s*$)/i;
    const joinMatch = query.match(joinRegex);
    
    if (!joinMatch) {
      return { error: "Invalid JOIN syntax. Expected format: SELECT ... FROM table1 [AS t1] JOIN table2 [AS t2] ON t1.col = t2.col" };
    }
    
    const table1Name = joinMatch[1].toLowerCase();
    const table1Alias = (joinMatch[2] || table1Name).toLowerCase();
    const table2Name = joinMatch[3].toLowerCase();
    const table2Alias = (joinMatch[4] || table2Name).toLowerCase();
    let joinCondition = joinMatch[5].trim().toLowerCase();
    
    // 2. Find the tables
    const table1 = tables.find(t => t.name.toLowerCase() === table1Name);
    const table2 = tables.find(t => t.name.toLowerCase() === table2Name);
    
    if (!table1 || !table2) {
      return { 
        error: `Table not found: ${!table1 ? table1Name : table2Name}. 
               Available tables: ${tables.map(t => t.name).join(', ')}` 
      };
    }
    
    // 3. Parse join condition
    // Format: alias1.column1 = alias2.column2
    // Normalize the condition by removing extra whitespace around operators
    joinCondition = joinCondition.replace(/\s*=\s*/g, '=');
    
    const conditionParts = joinCondition.split('=').map(p => p.trim());
    
    if (conditionParts.length !== 2) {
      return { 
        error: "Invalid JOIN condition. Expected format: alias1.column1 = alias2.column2" 
      };
    }
    
    const leftParts = conditionParts[0].split('.');
    const rightParts = conditionParts[1].split('.');
    
    if (leftParts.length !== 2 || rightParts.length !== 2) {
      return { 
        error: "JOIN condition must use table aliases with dot notation, e.g., t1.id = t2.customer_id"
      };
    }
    
    const leftAlias = leftParts[0].toLowerCase();
    const leftColumn = leftParts[1].toLowerCase();
    const rightAlias = rightParts[0].toLowerCase();
    const rightColumn = rightParts[1].toLowerCase();
    
    // 4. Validate aliases match the ones we extracted earlier
    const validAliases = [table1Alias, table2Alias];
    
    if (!validAliases.includes(leftAlias) || !validAliases.includes(rightAlias)) {
      return { 
        error: `Invalid table alias in JOIN condition. 
               Expected one of: ${validAliases.join(', ')}, but got: ${leftAlias} and ${rightAlias}`
      };
    }
    
    // 5. Find column indices in their respective tables
    let t1ColIndex, t2ColIndex;
    
    // Determine which table each alias refers to
    let leftTable, rightTable;
    if (leftAlias === table1Alias) {
      leftTable = table1;
      rightTable = table2;
    } else {
      leftTable = table2;
      rightTable = table1;
    }
    
    t1ColIndex = leftTable.columns.findIndex(c => c.toLowerCase() === leftColumn);
    t2ColIndex = rightTable.columns.findIndex(c => c.toLowerCase() === rightColumn);
    
    if (t1ColIndex === -1 || t2ColIndex === -1) {
      return { 
        error: `Column not found in JOIN condition.
               '${leftColumn}' ${t1ColIndex === -1 ? 'not found in ' + leftTable.name : 'exists'}.
               '${rightColumn}' ${t2ColIndex === -1 ? 'not found in ' + rightTable.name : 'exists'}.
               Available columns in ${leftTable.name}: ${leftTable.columns.join(', ')}.
               Available columns in ${rightTable.name}: ${rightTable.columns.join(', ')}.`
      };
    }
    
    // 6. Extract the columns to select
    const selectClause = query.split('select')[1].split('from')[0].trim();
    const columnSelections = selectClause.split(',').map(c => c.trim().toLowerCase());
    
    // 7. Perform the join operation
    const joinedData = [];
    
    for (const row1 of leftTable.data) {
      for (const row2 of rightTable.data) {
        // Compare the join columns for a match
        if (row1[t1ColIndex] === row2[t2ColIndex]) {
          const resultRow = {};
          
          // Process each selected column
          for (const colSelection of columnSelections) {
            // Handle cases like "alias.column" or "alias.column as alias_column"
            let parts = colSelection.split(' as ');
            let columnRef = parts[0].trim();
            let outputName = parts.length > 1 ? parts[1].trim() : columnRef;
            
            // Handle case where there's no alias in the column selection (e.g., just "column")
            if (!columnRef.includes('.')) {
              // If no alias is provided, we need to check both tables for the column
              const t1ColIdx = leftTable.columns.findIndex(c => c.toLowerCase() === columnRef);
              const t2ColIdx = rightTable.columns.findIndex(c => c.toLowerCase() === columnRef);
              
              if (t1ColIdx !== -1) {
                resultRow[outputName] = row1[t1ColIdx];
              } else if (t2ColIdx !== -1) {
                resultRow[outputName] = row2[t2ColIdx];
              }
              // If not found in either table, skip this column
              continue;
            }
            
            // Handle columns with aliases (e.g., "t1.column")
            const colParts = columnRef.split('.');
            const colAlias = colParts[0];
            const colName = colParts[1];
            
            if (colAlias === leftAlias) {
              const colIndex = leftTable.columns.findIndex(c => c.toLowerCase() === colName);
              if (colIndex !== -1) {
                resultRow[outputName] = row1[colIndex];
              }
            } else if (colAlias === rightAlias) {
              const colIndex = rightTable.columns.findIndex(c => c.toLowerCase() === colName);
              if (colIndex !== -1) {
                resultRow[outputName] = row2[colIndex];
              }
            }
            // Skip columns with invalid aliases
          }
          
          // Only add rows that have at least one column value
          if (Object.keys(resultRow).length > 0) {
            joinedData.push(resultRow);
          }
        }
      }
    }
    
    // 8. Apply WHERE clause if present
    let filteredData = joinedData;
    if (query.toLowerCase().includes('where')) {
      const whereClause = query.toLowerCase().split('where')[1]
        .split(/\s+(?:group|order|limit)\s+/)[0].trim();
      
      // Basic WHERE clause parsing (very simplified)
      // This would need to be expanded for a real implementation
      try {
        filteredData = filterJoinedData(joinedData, whereClause);
      } catch (error) {
        return { 
          error: `Error processing WHERE clause: ${error.message}`
        };
      }
    }
    
    // Return the joined data
    return { data: filteredData };
  } catch (error) {
    return { 
      error: `Error processing JOIN: ${error.message}`
    };
  }
}

// Helper function to filter joined data based on a simple WHERE clause
function filterJoinedData(data, whereClause) {
  // Very simplified WHERE clause handling
  // In a real implementation, this would need to be much more sophisticated
  
  // Look for basic comparison operators
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
    throw new Error("Unsupported operator in WHERE clause");
  }
  
  const leftExpr = whereClause.substring(0, operatorIndex).trim();
  let rightExpr = whereClause.substring(operatorIndex + operator.length).trim();
  
  // Handle string literals
  if (rightExpr.startsWith("'") && rightExpr.endsWith("'")) {
    rightExpr = rightExpr.substring(1, rightExpr.length - 1);
  } else {
    // Try to convert to number
    const numValue = Number(rightExpr);
    if (!isNaN(numValue)) {
      rightExpr = numValue;
    }
  }
  
  // Apply the filter
  return data.filter(row => {
    const leftValue = row[leftExpr];
    
    if (leftValue === undefined) {
      // Column not found in this row
      return false;
    }
    
    switch (operator) {
      case '=':
        return leftValue == rightExpr;
      case '>':
        return leftValue > rightExpr;
      case '<':
        return leftValue < rightExpr;
      case '>=':
        return leftValue >= rightExpr;
      case '<=':
        return leftValue <= rightExpr;
      case '<>':
        return leftValue != rightExpr;
      default:
        return false;
    }
  });
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
    const groupByColIndex = table.columns.findIndex(c => c.toLowerCase() === groupByColumn.toLowerCase());
    
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
            const argIndex = table.columns.findIndex(c => c.toLowerCase() === argName.toLowerCase());
            
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