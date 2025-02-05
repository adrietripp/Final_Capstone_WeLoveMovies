require("dotenv").config(); // Load environment variables

const { PORT = 5001 } = process.env; // Ensure dynamic port from Render
const app = require("./app");
const knex = require("./db/connection");

// Function to start the server
const startServer = async () => {
  try {
    console.log("Running migrations...");
    await knex.migrate.latest(); // Run migrations before starting

    console.log("Seeding database...");
    await knex.seed.run(); // Ensure seeds run if needed

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}!`);
    });

  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Stop execution if an error occurs
  }
};

// Start the server
startServer();
