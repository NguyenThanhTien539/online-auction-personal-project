import knex, { Knex } from "knex";

let db: Knex | null = null;

function loadDbConfig() {
  const { DB_CLIENT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } =
    process.env;
  if (!DB_HOST || !DB_USER || !DB_NAME || !DB_PORT) {
    console.warn("Incomplete database configuration in environment variables");
    return null;
  }
  return {
    client: DB_CLIENT,
    connection: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: Number(DB_PORT),
    },
    pool: { min: 0, max: 7 },
  };
}

const config = loadDbConfig();

if (config) {
  db = knex(config);
  console.log("Database initialized");
} else {
  console.log("Database not initialized");
}

export function getDb(): Knex {
  if (!db) {
    throw new Error("Database not initialized");
  }
  return db;
}
