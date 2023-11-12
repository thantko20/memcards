import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname + "/.env.local" });

export default {
  schema: "./src/lib/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string
  },
  out: "./drizzle"
} satisfies Config;
