// Sample data structure for MongoDB integration
// This would be used for initializing the database

export const initialLevels = [
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
  
  export const initialUserProgress = {
    userId: "current_user",
    completedLevels: [],
    currentLevel: 1,
    lastUpdated: new Date()
  };