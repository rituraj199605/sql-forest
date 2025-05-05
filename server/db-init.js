// server/db-init.js - with expanded levels
const { MongoClient } = require('mongodb');

// MongoDB Connection String - use environment variables in production
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'sql_forest_db';

// Expanded levels for a comprehensive SQL learning journey
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
  {
    id: 6,
    title: "GROUP BY Clause",
    description: "Group data for aggregate analysis",
    challenge: "Count how many animals there are of each species",
    hint: "Try: SELECT species, COUNT(*) as count FROM forest_animals GROUP BY species",
    solution: "SELECT species, COUNT(*) as count FROM forest_animals GROUP BY species",
    summary: "You've mastered grouping related data together and performing calculations on each group.",
    keyConcepts: [
      "GROUP BY syntax",
      "Using GROUP BY with aggregates",
      "Creating summary reports",
      "Grouping by multiple columns"
    ],
    nextLevelPreview: {
      title: "HAVING Clause",
      description: "Filter grouped results with conditions",
      learningPoints: [
        "Filtering groups with the HAVING clause",
        "Difference between WHERE and HAVING",
        "Order of operations in SQL queries"
      ],
      tip: "If WHERE filters individual rows before grouping, HAVING filters groups after they're formed."
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
          [7, "Roxy", "Fox", 3],
          [8, "Buddy", "Bear", 4],
          [9, "Acorn", "Squirrel", 2]
        ]
      }
    ]
  },
  {
    id: 7,
    title: "HAVING Clause",
    description: "Filter grouped results",
    challenge: "Find species that have more than one animal",
    hint: "Try: SELECT species, COUNT(*) as count FROM forest_animals GROUP BY species HAVING COUNT(*) > 1",
    solution: "SELECT species, COUNT(*) as count FROM forest_animals GROUP BY species HAVING COUNT(*) > 1",
    summary: "You've learned how to filter groups of data using the HAVING clause, which works after grouping has been performed.",
    keyConcepts: [
      "HAVING clause syntax",
      "Filtering grouped data",
      "Combining WHERE, GROUP BY, and HAVING"
    ],
    nextLevelPreview: {
      title: "Subqueries",
      description: "Use queries within queries for complex operations",
      learningPoints: [
        "Writing subqueries",
        "Using subqueries in WHERE clauses",
        "Subqueries in the FROM clause"
      ],
      tip: "Subqueries are like nesting Russian dolls - a smaller query inside a bigger one."
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
          [7, "Roxy", "Fox", 3],
          [8, "Buddy", "Bear", 4],
          [9, "Acorn", "Squirrel", 2]
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Subqueries",
    description: "Use queries within queries",
    challenge: "Find animals that are older than the average age",
    hint: "Try: SELECT * FROM forest_animals WHERE age > (SELECT AVG(age) FROM forest_animals)",
    solution: "SELECT * FROM forest_animals WHERE age > (SELECT AVG(age) FROM forest_animals)",
    summary: "You've mastered the art of nesting queries within queries, which allows for much more complex and powerful data analysis.",
    keyConcepts: [
      "Subquery syntax",
      "Nested queries",
      "Using aggregates in subqueries",
      "Correlated vs non-correlated subqueries"
    ],
    nextLevelPreview: {
      title: "CASE Expressions",
      description: "Create conditional logic in your queries",
      learningPoints: [
        "Using CASE to handle conditional logic",
        "Simple CASE expressions",
        "Searched CASE expressions",
        "Using CASE in SELECT and ORDER BY"
      ],
      tip: "CASE expressions are like 'if-then-else' statements in SQL, letting you handle different scenarios in your queries."
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
          [7, "Roxy", "Fox", 3],
          [8, "Buddy", "Bear", 4],
          [9, "Acorn", "Squirrel", 2]
        ]
      }
    ]
  },
  {
    id: 9,
    title: "CASE Expressions",
    description: "Implement conditional logic",
    challenge: "Categorize animals as 'Young' if age < 3, 'Adult' if age between 3 and 5, and 'Senior' if age > 5",
    hint: "Try: SELECT name, species, age, CASE WHEN age < 3 THEN 'Young' WHEN age <= 5 THEN 'Adult' ELSE 'Senior' END as age_category FROM forest_animals",
    solution: "SELECT name, species, age, CASE WHEN age < 3 THEN 'Young' WHEN age <= 5 THEN 'Adult' ELSE 'Senior' END as age_category FROM forest_animals",
    summary: "You've learned to use CASE expressions to implement conditional logic in your queries, similar to if-then-else statements in programming.",
    keyConcepts: [
      "CASE expression syntax",
      "Simple vs searched CASE",
      "Using multiple WHEN conditions",
      "Creating derived columns with CASE"
    ],
    nextLevelPreview: {
      title: "Advanced Joins",
      description: "Master different types of table joins",
      learningPoints: [
        "INNER JOIN vs OUTER JOINs",
        "LEFT, RIGHT, and FULL OUTER JOINs",
        "Understanding join types and when to use them"
      ],
      tip: "Different join types give you different ways to combine tables - think of them as different rules for matching puzzle pieces."
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
          [7, "Roxy", "Fox", 3],
          [8, "Buddy", "Bear", 4],
          [9, "Acorn", "Squirrel", 2]
        ]
      }
    ]
  },
  {
    id: 10,
    title: "Advanced Joins",
    description: "Master different join types",
    challenge: "Find all animals and their habitats, including animals without a registered habitat",
    hint: "Try: SELECT a.name, a.species, h.location FROM forest_animals a LEFT JOIN animal_habitats h ON a.id = h.animal_id",
    solution: "SELECT a.name, a.species, h.location FROM forest_animals a LEFT JOIN animal_habitats h ON a.id = h.animal_id",
    summary: "You've mastered advanced join types, which allow you to combine tables in different ways depending on your needs.",
    keyConcepts: [
      "LEFT JOIN vs INNER JOIN",
      "Handling NULL values in joins",
      "Including unmatched rows"
    ],
    nextLevelPreview: {
      title: "UNION and Set Operations",
      description: "Combine results from multiple queries",
      learningPoints: [
        "Using UNION to combine result sets",
        "UNION vs UNION ALL",
        "Other set operations: INTERSECT and EXCEPT"
      ],
      tip: "Set operations let you combine or compare the results of separate queries, like working with mathematical sets."
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
          [7, "Roxy", "Fox", 3],
          [8, "Buddy", "Bear", 4],
          [9, "Acorn", "Squirrel", 2]
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
          // Note that animals 6-9 don't have habitats
        ]
      }
    ]
  },
  {
    id: 11,
    title: "UNION and Set Operations",
    description: "Combine results from multiple queries",
    challenge: "List all locations that are either animal habitats or food sources",
    hint: "Try: SELECT location, type FROM animal_habitats UNION SELECT location, type FROM food_sources",
    solution: "SELECT location, type FROM animal_habitats UNION SELECT location, type FROM food_sources",
    summary: "You've learned how to use set operations to combine results from multiple queries, expanding your ability to work with diverse data sources.",
    keyConcepts: [
      "UNION syntax",
      "Removing duplicates with UNION",
      "UNION ALL for keeping duplicates",
      "Column matching requirements"
    ],
    nextLevelPreview: {
      title: "Common Table Expressions (CTEs)",
      description: "Write cleaner and more maintainable complex queries",
      learningPoints: [
        "Creating temporary result sets with WITH",
        "Using CTEs for more readable queries",
        "Recursive CTEs for hierarchical data"
      ],
      tip: "CTEs are like creating temporary tables on-the-fly, making complex queries easier to read and maintain."
    },
    tables: [
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
      },
      {
        name: "food_sources",
        columns: ["id", "location", "type", "food_type"],
        data: [
          [1, "Berry Bush", "Shrub", "Berries"],
          [2, "Old Log", "Fallen Tree", "Insects"],
          [3, "Pine Tree", "Tree", "Seeds"],
          [4, "Mushroom Patch", "Ground", "Fungi"],
          [5, "Flower Field", "Open Field", "Nectar"]
        ]
      }
    ]
  },
  {
    id: 12,
    title: "Common Table Expressions (CTEs)",
    description: "Write cleaner complex queries",
    challenge: "Find the average age of animals grouped by species, but only for species with an average age above 3",
    hint: "Try: WITH species_avg AS (SELECT species, AVG(age) as avg_age FROM forest_animals GROUP BY species) SELECT * FROM species_avg WHERE avg_age > 3",
    solution: "WITH species_avg AS (SELECT species, AVG(age) as avg_age FROM forest_animals GROUP BY species) SELECT * FROM species_avg WHERE avg_age > 3",
    summary: "You've mastered Common Table Expressions, which make complex queries more readable and manageable by breaking them down into named temporary result sets.",
    keyConcepts: [
      "WITH clause syntax",
      "Creating named subqueries",
      "Improving query readability",
      "Using CTEs with other SQL features"
    ],
    nextLevelPreview: {
      title: "Window Functions",
      description: "Perform calculations across rows while keeping individual rows",
      learningPoints: [
        "Understanding window functions",
        "Using OVER, PARTITION BY, and ORDER BY",
        "Calculating running totals and moving averages"
      ],
      tip: "Window functions are like aggregate functions, but they maintain your original rows while adding calculations based on related rows."
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
          [7, "Roxy", "Fox", 3],
          [8, "Buddy", "Bear", 4],
          [9, "Acorn", "Squirrel", 2]
        ]
      }
    ]
  },
  {
    id: 13,
    title: "Window Functions",
    description: "Calculate across rows while keeping row details",
    challenge: "Show each animal's age and how it ranks within its species (youngest to oldest)",
    hint: "Try: SELECT name, species, age, RANK() OVER (PARTITION BY species ORDER BY age) as age_rank FROM forest_animals",
    solution: "SELECT name, species, age, RANK() OVER (PARTITION BY species ORDER BY age) as age_rank FROM forest_animals",
    summary: "You've learned to use window functions, which allow you to perform calculations across sets of related rows while retaining individual row details.",
    keyConcepts: [
      "Window function syntax with OVER",
      "PARTITION BY to group rows",
      "Ranking functions: RANK, DENSE_RANK, ROW_NUMBER",
      "Aggregate window functions"
    ],
    nextLevelPreview: {
      title: "Performance Optimization",
      description: "Make your queries run faster and more efficiently",
      learningPoints: [
        "Understanding query execution plans",
        "Writing efficient queries",
        "The role of indexes in performance",
        "Avoiding common performance pitfalls"
      ],
      tip: "Query optimization is like finding the shortest path through a maze - there are often many ways to get the answer, but some are much faster than others."
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
          [7, "Roxy", "Fox", 3],
          [8, "Buddy", "Bear", 4],
          [9, "Acorn", "Squirrel", 2],
          [10, "Scout", "Squirrel", 3]
        ]
      }
    ]
  },
  {
    id: 14,
    title: "Performance Optimization",
    description: "Make queries faster and more efficient",
    challenge: "Rewrite the query to be more efficient by avoiding unnecessary calculations",
    hint: "Try: SELECT a.name, a.species, h.location FROM forest_animals a JOIN animal_habitats h ON a.id = h.animal_id WHERE a.species = 'Owl'",
    solution: "SELECT a.name, a.species, h.location FROM forest_animals a JOIN animal_habitats h ON a.id = h.animal_id WHERE a.species = 'Owl'",
    summary: "You've learned key principles of SQL performance optimization, which will help you write queries that execute more quickly and efficiently.",
    keyConcepts: [
      "Filtering early to reduce rows processed",
      "Choosing the right join type",
      "Avoiding SELECT *",
      "Using appropriate WHERE clauses"
    ],
    nextLevelPreview: {
      title: "Advanced SQL Master Challenge",
      description: "Combine multiple SQL concepts in a complex query",
      learningPoints: [
        "Putting it all together",
        "Solving complex business problems with SQL",
        "Multi-step query planning"
      ],
      tip: "Complex SQL challenges require breaking down the problem into smaller steps and planning your approach before writing a single line of code."
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
          [7, "Roxy", "Fox", 3],
          [8, "Buddy", "Bear", 4],
          [9, "Acorn", "Squirrel", 2],
          [10, "Scout", "Squirrel", 3]
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
          [5, 5, "Meadow", "Open Field"],
          [6, 6, "Ancient Tree", "Tree"],
          [7, 9, "Oak Tree", "Tree"],
          [8, 10, "Pine Tree", "Tree"]
        ]
      }
    ]
  },
  {
    id: 15,
    title: "Advanced SQL Master Challenge",
    description: "Combine multiple SQL concepts in one complex query",
    challenge: "For each habitat type, find the average age of animals living there and the name of the oldest animal in that habitat type",
    hint: "Try: WITH habitat_animals AS (SELECT h.type, a.name, a.age, RANK() OVER (PARTITION BY h.type ORDER BY a.age DESC) as age_rank FROM animal_habitats h JOIN forest_animals a ON h.animal_id = a.id) SELECT ha.type, AVG(ha.age) OVER (PARTITION BY ha.type) as avg_age, ha.name as oldest_animal FROM habitat_animals ha WHERE ha.age_rank = 1",
    solution: "WITH habitat_animals AS (SELECT h.type, a.name, a.age, RANK() OVER (PARTITION BY h.type ORDER BY a.age DESC) as age_rank FROM animal_habitats h JOIN forest_animals a ON h.animal_id = a.id) SELECT ha.type, AVG(ha.age) OVER (PARTITION BY ha.type) as avg_age, ha.name as oldest_animal FROM habitat_animals ha WHERE ha.age_rank = 1",
    summary: "Congratulations! You've successfully completed the SQL Forest adventure and mastered advanced SQL concepts. You now have a strong foundation in SQL that you can apply to real-world data challenges.",
    keyConcepts: [
      "Combining CTEs, window functions, and joins",
      "Breaking down complex problems",
      "Structured query planning",
      "Advanced SQL patterns"
    ],
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
          [7, "Roxy", "Fox", 3],
          [8, "Buddy", "Bear", 4],
          [9, "Acorn", "Squirrel", 2],
          [10, "Scout", "Squirrel", 3]
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
          [5, 5, "Meadow", "Open Field"],
          [6, 6, "Ancient Tree", "Tree"],
          [7, 9, "Oak Tree", "Tree"],
          [8, 10, "Pine Tree", "Tree"]
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