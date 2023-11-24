import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, pool } from "./lib/db";

// This will run migrations on the database, skipping the ones already applied
async function main() {
  try {
    await migrate(db, { migrationsFolder: "./drizzle" });

    // Don't forget to close the connection, otherwise the script will hang
    await pool.end();
  } catch (error) {
    console.log(error);
  }
}

main();
