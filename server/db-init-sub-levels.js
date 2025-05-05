// server/db-init-sub-levels.js
const { MongoClient } = require('mongodb');

// Sub-levels for the SELECT statement (Level 1)
const selectSubLevels = [
  {
    id: "1.1",
    parentLevelId: 1,
    scenarioNumber: 1,
    title: "SELECT All Columns",
    shortTitle: "All Columns",
    description: "Retrieve all columns from a table using *",
    challenge: "Select all columns from the forest_animals table",
    hint: "Try: SELECT * FROM forest_animals",
    solution: "SELECT * FROM forest_animals",
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
    id: "1.2",
    parentLevelId: 1,
    scenarioNumber: 2,
    title: "SELECT Specific Columns",
    shortTitle: "Specific Columns",
    description: "Retrieve only specific columns from a table",
    challenge: "Select only the name and species columns from the forest_animals table",
    hint: "Try: SELECT name, species FROM forest_animals",
    solution: "SELECT name, species FROM forest_animals",
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
    id: "1.3",
    parentLevelId: 1,
    scenarioNumber: 3,
    title: "SELECT with Column Aliases",
    shortTitle: "Column Aliases",
    description: "Use aliases to rename columns in the results",
    challenge: "Select the name column as 'Animal Name' and species column as 'Animal Type' from the forest_animals table",
    hint: "Try: SELECT name AS 'Animal Name', species AS 'Animal Type' FROM forest_animals",
    solution: "SELECT name AS 'Animal Name', species AS 'Animal Type' FROM forest_animals",
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
    id: "1.4",
    parentLevelId: 1,
    scenarioNumber: 4,
    title: "SELECT with DISTINCT",
    shortTitle: "DISTINCT",
    description: "Retrieve unique values from a column",
    challenge: "Select all unique species from the forest_animals table",
    hint: "Try: SELECT DISTINCT species FROM forest_animals",
    solution: "SELECT DISTINCT species FROM forest_animals",
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
    id: "1.5",
    parentLevelId: 1,
    scenarioNumber: 5,
    title: "SELECT with Simple Calculations",
    shortTitle: "Calculations",
    description: "Perform simple calculations in your SELECT statement",
    challenge: "Select the name, age, and age in 'human years' (age multiplied by 7) from the forest_animals table",
    hint: "Try: SELECT name, age, age * 7 AS 'Human Years' FROM forest_animals",
    solution: "SELECT name, age, age * 7 AS 'Human Years' FROM forest_animals",
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
  }
];

// Sub-levels for the WHERE clause (Level 2)
const whereSubLevels = [
  {
    id: "2.1",
    parentLevelId: 2,
    scenarioNumber: 1,
    title: "Simple Comparison",
    shortTitle: "Simple Comparison",
    description: "Filter results with a simple comparison",
    challenge: "Find animals that are exactly 3 years old",
    hint: "Try: SELECT * FROM forest_animals WHERE age = 3",
    solution: "SELECT * FROM forest_animals WHERE age = 3",
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
    id: "2.2",
    parentLevelId: 2,
    scenarioNumber: 2,
    title: "Greater Than Comparison",
    shortTitle: "Greater Than",
    description: "Filter results for values greater than a threshold",
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
          [5, "Daisy", "Deer", 4],
          [6, "Hooty", "Owl", 6],
          [7, "Roxy", "Fox", 3]
        ]
      }
    ]
  },
  {
    id: "2.3",
    parentLevelId: 2,
    scenarioNumber: 3,
    title: "String Comparison",
    shortTitle: "String Comparison",
    description: "Filter results based on text values",
    challenge: "Find all animals of the 'Owl' species",
    hint: "Try: SELECT * FROM forest_animals WHERE species = 'Owl'",
    solution: "SELECT * FROM forest_animals WHERE species = 'Owl'",
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
    id: "2.4",
    parentLevelId: 2,
    scenarioNumber: 4,
    title: "Multiple Conditions with AND",
    shortTitle: "AND Conditions",
    description: "Filter results with multiple conditions (all must be true)",
    challenge: "Find all 'Fox' animals that are older than 2 years",
    hint: "Try: SELECT * FROM forest_animals WHERE species = 'Fox' AND age > 2",
    solution: "SELECT * FROM forest_animals WHERE species = 'Fox' AND age > 2",
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
    id: "2.5",
    parentLevelId: 2,
    scenarioNumber: 5,
    title: "Multiple Conditions with OR",
    shortTitle: "OR Conditions",
    description: "Filter results with multiple conditions (any can be true)",
    challenge: "Find all animals that are either 'Owl' species OR at least 5 years old",
    hint: "Try: SELECT * FROM forest_animals WHERE species = 'Owl' OR age >= 5",
    solution: "SELECT * FROM forest_animals WHERE species = 'Owl' OR age >= 5",
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
  }
];

// Sub-levels for the JOIN operations (Level 3)
const joinSubLevels = [
  {
    id: "3.1",
    parentLevelId: 3,
    scenarioNumber: 1,
    title: "Basic INNER JOIN",
    shortTitle: "Basic JOIN",
    description: "Connect two tables with a simple INNER JOIN",
    challenge: "Match each animal with its habitat location",
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
  },
  {
    id: "3.2",
    parentLevelId: 3,
    scenarioNumber: 2,
    title: "JOIN with Additional Columns",
    shortTitle: "More Columns",
    description: "SELECT multiple columns from both tables in a JOIN",
    challenge: "Show each animal's name, species, and habitat location and type",
    hint: "Try: SELECT a.name, a.species, h.location, h.type FROM forest_animals a JOIN animal_habitats h ON a.id = h.animal_id",
    solution: "SELECT a.name, a.species, h.location, h.type FROM forest_animals a JOIN animal_habitats h ON a.id = h.animal_id",
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
    id: "3.3",
    parentLevelId: 3,
    scenarioNumber: 3,
    title: "JOIN with WHERE Clause",
    shortTitle: "JOIN + WHERE",
    description: "Filter results of a JOIN operation",
    challenge: "Find all animals that live in a habitat of type 'Tree'",
    hint: "Try: SELECT a.name, a.species, h.location FROM forest_animals a JOIN animal_habitats h ON a.id = h.animal_id WHERE h.type = 'Tree'",
    solution: "SELECT a.name, a.species, h.location FROM forest_animals a JOIN animal_habitats h ON a.id = h.animal_id WHERE h.type = 'Tree'",
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
    id: "3.4",
    parentLevelId: 3,
    scenarioNumber: 4,
    title: "Three-Table JOIN",
    shortTitle: "Three Tables",
    description: "Connect three tables together with multiple JOINs",
    challenge: "Show each animal's name, its habitat location, and the food available at that habitat",
    hint: "Try: SELECT a.name, h.location, f.food_type FROM forest_animals a JOIN animal_habitats h ON a.id = h.animal_id JOIN habitat_foods f ON h.id = f.habitat_id",
    solution: "SELECT a.name, h.location, f.food_type FROM forest_animals a JOIN animal_habitats h ON a.id = h.animal_id JOIN habitat_foods f ON h.id = f.habitat_id",
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
      },
      {
        name: "habitat_foods",
        columns: ["id", "habitat_id", "food_type", "season"],
        data: [
          [1, 1, "Mice", "All Year"],
          [2, 2, "Berries", "Summer"],
          [3, 3, "Fish", "Spring"],
          [4, 3, "Honey", "Summer"],
          [5, 4, "Nuts", "Fall"],
          [6, 5, "Grass", "All Year"]
        ]
      }
    ]
  },
  {
    id: "3.5",
    parentLevelId: 3,
    scenarioNumber: 5,
    title: "SELF JOIN",
    shortTitle: "SELF JOIN",
    description: "Join a table to itself to find relationships",
    challenge: "Find all pairs of animals that are the same species",
    hint: "Try: SELECT a1.name, a2.name, a1.species FROM forest_animals a1 JOIN forest_animals a2 ON a1.species = a2.species WHERE a1.id < a2.id",
    solution: "SELECT a1.name, a2.name, a1.species FROM forest_animals a1 JOIN forest_animals a2 ON a1.species = a2.species WHERE a1.id < a2.id",
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
          [8, "Buddy", "Bear", 4]
        ]
      }
    ]
  }
];

// Sub-levels for ORDER BY operations (Level 4)
const orderBySubLevels = [
  {
    id: "4.1",
    parentLevelId: 4,
    scenarioNumber: 1,
    title: "Simple Ascending Order",
    shortTitle: "ASC Order",
    description: "Sort results in ascending order",
    challenge: "List all animals ordered by age from youngest to oldest",
    hint: "Try: SELECT * FROM forest_animals ORDER BY age ASC",
    solution: "SELECT * FROM forest_animals ORDER BY age ASC",
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
    id: "4.2",
    parentLevelId: 4,
    scenarioNumber: 2,
    title: "Descending Order",
    shortTitle: "DESC Order",
    description: "Sort results in descending order",
    challenge: "List all animals ordered by age from oldest to youngest",
    hint: "Try: SELECT * FROM forest_animals ORDER BY age DESC",
    solution: "SELECT * FROM forest_animals ORDER BY age DESC",
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
    id: "4.3",
    parentLevelId: 4,
    scenarioNumber: 3,
    title: "Ordering by Text Values",
    shortTitle: "Text Ordering",
    description: "Sort results by text values",
    challenge: "List all animals in alphabetical order by name",
    hint: "Try: SELECT * FROM forest_animals ORDER BY name",
    solution: "SELECT * FROM forest_animals ORDER BY name",
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
    id: "4.4",
    parentLevelId: 4,
    scenarioNumber: 4,
    title: "Multiple Ordering Columns",
    shortTitle: "Multiple Columns",
    description: "Sort results by multiple columns",
    challenge: "List all animals ordered by species (alphabetically) and within each species by age (oldest first)",
    hint: "Try: SELECT * FROM forest_animals ORDER BY species ASC, age DESC",
    solution: "SELECT * FROM forest_animals ORDER BY species ASC, age DESC",
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
          [8, "Buddy", "Bear", 4]
        ]
      }
    ]
  },
  {
    id: "4.5",
    parentLevelId: 4,
    scenarioNumber: 5,
    title: "ORDER BY with LIMIT",
    shortTitle: "LIMIT Results",
    description: "Sort results and limit the number of rows returned",
    challenge: "Find the 3 oldest animals in the forest",
    hint: "Try: SELECT * FROM forest_animals ORDER BY age DESC LIMIT 3",
    solution: "SELECT * FROM forest_animals ORDER BY age DESC LIMIT 3",
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
          [8, "Buddy", "Bear", 4]
        ]
      }
    ]
  }
];

// Sub-levels for Aggregate Functions (Level 5)
const aggregateSubLevels = [
  {
    id: "5.1",
    parentLevelId: 5,
    scenarioNumber: 1,
    title: "COUNT Function",
    shortTitle: "COUNT",
    description: "Count the number of rows",
    challenge: "Count how many animals are in the forest",
    hint: "Try: SELECT COUNT(*) AS animal_count FROM forest_animals",
    solution: "SELECT COUNT(*) AS animal_count FROM forest_animals",
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
    id: "5.2",
    parentLevelId: 5,
    scenarioNumber: 2,
    title: "SUM Function",
    shortTitle: "SUM",
    description: "Calculate the sum of values",
    challenge: "Calculate the total combined age of all animals",
    hint: "Try: SELECT SUM(age) AS total_age FROM forest_animals",
    solution: "SELECT SUM(age) AS total_age FROM forest_animals",
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
    id: "5.3",
    parentLevelId: 5,
    scenarioNumber: 3,
    title: "AVG Function",
    shortTitle: "AVG",
    description: "Calculate the average of values",
    challenge: "Find the average age of all animals",
    hint: "Try: SELECT AVG(age) AS average_age FROM forest_animals",
    solution: "SELECT AVG(age) AS average_age FROM forest_animals",
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
    id: "5.4",
    parentLevelId: 5,
    scenarioNumber: 4,
    title: "MIN and MAX Functions",
    shortTitle: "MIN & MAX",
    description: "Find the minimum and maximum values",
    challenge: "Find the age of the youngest and oldest animals",
    hint: "Try: SELECT MIN(age) AS youngest, MAX(age) AS oldest FROM forest_animals",
    solution: "SELECT MIN(age) AS youngest, MAX(age) AS oldest FROM forest_animals",
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
    id: "5.5",
    parentLevelId: 5,
    scenarioNumber: 5,
    title: "Combined Aggregate Functions",
    shortTitle: "Combined Functions",
    description: "Use multiple aggregate functions in one query",
    challenge: "Find the count, sum, average, minimum, and maximum age of all animals",
    hint: "Try: SELECT COUNT(*) AS count, SUM(age) AS sum_age, AVG(age) AS avg_age, MIN(age) AS min_age, MAX(age) AS max_age FROM forest_animals",
    solution: "SELECT COUNT(*) AS count, SUM(age) AS sum_age, AVG(age) AS avg_age, MIN(age) AS min_age, MAX(age) AS max_age FROM forest_animals",
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
  }
];

// Sub-levels for GROUP BY clause (Level 6)
const groupBySubLevels = [
  {
    id: "6.1",
    parentLevelId: 6,
    scenarioNumber: 1,
    title: "Basic Grouping",
    shortTitle: "Basic Grouping",
    description: "Group data by a single column",
    challenge: "Count how many animals there are of each species",
    hint: "Try: SELECT species, COUNT(*) AS count FROM forest_animals GROUP BY species",
    solution: "SELECT species, COUNT(*) AS count FROM forest_animals GROUP BY species",
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
    id: "6.2",
    parentLevelId: 6,
    scenarioNumber: 2,
    title: "GROUP BY with SUM",
    shortTitle: "GROUP BY + SUM",
    description: "Group data and calculate sums for each group",
    challenge: "Calculate the total combined age for each species",
    hint: "Try: SELECT species, SUM(age) AS total_age FROM forest_animals GROUP BY species",
    solution: "SELECT species, SUM(age) AS total_age FROM forest_animals GROUP BY species",
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
    id: "6.3",
    parentLevelId: 6,
    scenarioNumber: 3,
    title: "GROUP BY with AVG",
    shortTitle: "GROUP BY + AVG",
    description: "Group data and calculate averages for each group",
    challenge: "Find the average age of animals for each species",
    hint: "Try: SELECT species, AVG(age) AS avg_age FROM forest_animals GROUP BY species",
    solution: "SELECT species, AVG(age) AS avg_age FROM forest_animals GROUP BY species",
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
    id: "6.4",
    parentLevelId: 6,
    scenarioNumber: 4,
    title: "GROUP BY with MIN and MAX",
    shortTitle: "GROUP BY + MIN/MAX",
    description: "Group data and find minimum and maximum values for each group",
    challenge: "Find the youngest and oldest animal age for each species",
    hint: "Try: SELECT species, MIN(age) AS youngest, MAX(age) AS oldest FROM forest_animals GROUP BY species",
    solution: "SELECT species, MIN(age) AS youngest, MAX(age) AS oldest FROM forest_animals GROUP BY species",
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
    id: "6.5",
    parentLevelId: 6,
    scenarioNumber: 5,
    title: "GROUP BY with ORDER BY",
    shortTitle: "GROUP BY + ORDER BY",
    description: "Group data and order the results",
    challenge: "Count animals of each species and order the results by count (highest to lowest)",
    hint: "Try: SELECT species, COUNT(*) AS count FROM forest_animals GROUP BY species ORDER BY count DESC",
    solution: "SELECT species, COUNT(*) AS count FROM forest_animals GROUP BY species ORDER BY count DESC",
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
  }
];

// Sub-levels for HAVING clause (Level 7)
const havingSubLevels = [
  {
    id: "7.1",
    parentLevelId: 7,
    scenarioNumber: 1,
    title: "Basic HAVING Clause",
    shortTitle: "Basic HAVING",
    description: "Filter groups based on aggregate conditions",
    challenge: "Find species that have more than one animal",
    hint: "Try: SELECT species, COUNT(*) AS count FROM forest_animals GROUP BY species HAVING COUNT(*) > 1",
    solution: "SELECT species, COUNT(*) AS count FROM forest_animals GROUP BY species HAVING COUNT(*) > 1",
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
    id: "7.2",
    parentLevelId: 7,
    scenarioNumber: 2,
    title: "HAVING with SUM",
    shortTitle: "HAVING + SUM",
    description: "Filter groups based on SUM calculations",
    challenge: "Find species where the total combined age is greater than 6",
    hint: "Try: SELECT species, SUM(age) AS total_age FROM forest_animals GROUP BY species HAVING SUM(age) > 6",
    solution: "SELECT species, SUM(age) AS total_age FROM forest_animals GROUP BY species HAVING SUM(age) > 6",
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
    id: "7.3",
    parentLevelId: 7,
    scenarioNumber: 3,
    title: "HAVING with AVG",
    shortTitle: "HAVING + AVG",
    description: "Filter groups based on AVG calculations",
    challenge: "Find species where the average age is greater than 3",
    hint: "Try: SELECT species, AVG(age) AS avg_age FROM forest_animals GROUP BY species HAVING AVG(age) > 3",
    solution: "SELECT species, AVG(age) AS avg_age FROM forest_animals GROUP BY species HAVING AVG(age) > 3",
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
    id: "7.4",
    parentLevelId: 7,
    scenarioNumber: 4,
    title: "WHERE and HAVING Together",
    shortTitle: "WHERE + HAVING",
    description: "Use WHERE to filter rows and HAVING to filter groups",
    challenge: "Find species where the average age of animals older than 2 is greater than 4",
    hint: "Try: SELECT species, AVG(age) AS avg_age FROM forest_animals WHERE age > 2 GROUP BY species HAVING AVG(age) > 4",
    solution: "SELECT species, AVG(age) AS avg_age FROM forest_animals WHERE age > 2 GROUP BY species HAVING AVG(age) > 4",
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
    id: "7.5",
    parentLevelId: 7,
    scenarioNumber: 5,
    title: "Complete Group Query",
    shortTitle: "Complete Query",
    description: "Combine GROUP BY, HAVING, and ORDER BY",
    challenge: "Find species that have more than one animal, and order them by their average age (oldest first)",
    hint: "Try: SELECT species, COUNT(*) AS count, AVG(age) AS avg_age FROM forest_animals GROUP BY species HAVING COUNT(*) > 1 ORDER BY avg_age DESC",
    solution: "SELECT species, COUNT(*) AS count, AVG(age) AS avg_age FROM forest_animals GROUP BY species HAVING COUNT(*) > 1 ORDER BY avg_age DESC",
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
  }
];

// Sub-levels for Subqueries (Level 8)
const subquerySubLevels = [
  {
    id: "8.1",
    parentLevelId: 8,
    scenarioNumber: 1,
    title: "Subquery in WHERE Clause",
    shortTitle: "WHERE Subquery",
    description: "Use a subquery in a WHERE clause",
    challenge: "Find animals that are older than the average age",
    hint: "Try: SELECT * FROM forest_animals WHERE age > (SELECT AVG(age) FROM forest_animals)",
    solution: "SELECT * FROM forest_animals WHERE age > (SELECT AVG(age) FROM forest_animals)",
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
    id: "8.2",
    parentLevelId: 8,
    scenarioNumber: 2,
    title: "Subquery with IN Operator",
    shortTitle: "IN Operator",
    description: "Use a subquery with the IN operator",
    challenge: "Find all animals that live in a habitat of type 'Tree'",
    hint: "Try: SELECT * FROM forest_animals WHERE id IN (SELECT animal_id FROM animal_habitats WHERE type = 'Tree')",
    solution: "SELECT * FROM forest_animals WHERE id IN (SELECT animal_id FROM animal_habitats WHERE type = 'Tree')",
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
          [5, 5, "Meadow", "Open Field"],
          [6, 6, "Ancient Tree", "Tree"],
          [7, 9, "Oak Tree", "Tree"]
        ]
      }
    ]
  },
  {
    id: "8.3",
    parentLevelId: 8,
    scenarioNumber: 3,
    title: "Subquery in SELECT Clause",
    shortTitle: "SELECT Subquery",
    description: "Use a subquery in a SELECT clause",
    challenge: "For each animal, show its name, age, and how its age compares to the average age",
    hint: "Try: SELECT name, age, age - (SELECT AVG(age) FROM forest_animals) AS age_diff FROM forest_animals",
    solution: "SELECT name, age, age - (SELECT AVG(age) FROM forest_animals) AS age_diff FROM forest_animals",
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
    id: "8.4",
    parentLevelId: 8,
    scenarioNumber: 4,
    title: "Subquery in FROM Clause",
    shortTitle: "FROM Subquery",
    description: "Use a subquery in a FROM clause",
    challenge: "Calculate the average age for each species, but only considering animals older than 2 years",
    hint: "Try: SELECT species, AVG(age) AS avg_age FROM (SELECT * FROM forest_animals WHERE age > 2) AS old_animals GROUP BY species",
    solution: "SELECT species, AVG(age) AS avg_age FROM (SELECT * FROM forest_animals WHERE age > 2) AS old_animals GROUP BY species",
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
    id: "8.5",
    parentLevelId: 8,
    scenarioNumber: 5,
    title: "Correlated Subquery",
    shortTitle: "Correlated Subquery",
    description: "Use a correlated subquery that references the outer query",
    challenge: "Find animals that are the oldest of their species",
    hint: "Try: SELECT * FROM forest_animals a1 WHERE age = (SELECT MAX(age) FROM forest_animals a2 WHERE a2.species = a1.species)",
    solution: "SELECT * FROM forest_animals a1 WHERE age = (SELECT MAX(age) FROM forest_animals a2 WHERE a2.species = a1.species)",
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
  }
];

// Initialize database with sub-levels
async function initializeSubLevels(db) {
  try {
    // Create collection if it doesn't exist
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    if (!collectionNames.includes('sub_levels')) {
      await db.createCollection('sub_levels');
      console.log('Created sub_levels collection');
    }
    
    // Reset and populate sub_levels collection
    await db.collection('sub_levels').deleteMany({});
    
    // Combine all sub-levels
    const allSubLevels = [
      ...selectSubLevels,
      ...whereSubLevels,
      ...joinSubLevels,
      ...orderBySubLevels,
      ...aggregateSubLevels,
      ...groupBySubLevels,
      ...havingSubLevels,
      ...subquerySubLevels
    ];
    
    await db.collection('sub_levels').insertMany(allSubLevels);
    console.log(`Inserted ${allSubLevels.length} sub-levels`);
    
    return true;
  } catch (error) {
    console.error('Error initializing sub-levels:', error);
    return false;
  }
}

module.exports = {
  selectSubLevels,
  whereSubLevels,
  joinSubLevels,
  orderBySubLevels,
  aggregateSubLevels,
  groupBySubLevels,
  havingSubLevels,
  subquerySubLevels,
  initializeSubLevels
};