import { Pool } from 'pg';
import 'dotenv/config'

/* Create connection to Postgres database using credentials in .env */
const connectionPool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

module.exports = connectionPool;