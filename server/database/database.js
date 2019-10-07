import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
  PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT,
} = process.env;
let database = PGDATABASE;
if (process.env.NODE_ENV === 'test') {
  database = process.env.PGTESTDATABASE;
}

const pool = new Pool({
  database,
  user: PGUSER,
  host: PGHOST,
  password: PGPASSWORD,
  port: PGPORT,
});

class Database {
  constructor(table) {
    this.table = table;
  }

  async queryBuilder(query, params) {
    try {
      const client = await pool.connect();
      const results = await client.query(query, params);
      client.end();
      return { results, errors: null };
    } catch (errors) {
      return { results: null, errors };
    }
  }
}

export default Database;