import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
  PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT, PGTESTDATABASE,
} = process.env;
const database = process.env.NODE_ENV === 'test' ? PGTESTDATABASE : PGDATABASE;


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
      const res = await client.query(query, params);
      client.end();
      const { rows, rowCount } = res;
      return {
        rows,
        count: rowCount,
      };
    } catch (errors) {
      return { errors };
    }
  }

  async create(data) {
    const params = [];
    const chunks = [];
    const values = [];
    const keys = [];
    Object.keys(data).forEach((key) => {
      keys.push(key);
      params.push(data[key]);
      values.push(`$${params.length}`);
    });
    chunks.push(`(${values.join(', ')})`);
    const query = `INSERT INTO ${this.table}(${keys.join(', ')}) values${chunks.join(', ')} RETURNING *`;
    return await this.queryBuilder(query, params);
  }

  async first(column, op = '=', value) {
    if (this.table && column && value) {
      const query = `SELECT * FROM ${this.table} WHERE ${column}${op}$1 LIMIT 1`;
      const result = await this.queryBuilder(query, [value]);
      if (result.errors) return result;
      return {
        row: result.rows[0],
        count: result.count,
      };
    }
    return { error: 'provide table name & column & value', response: null };
  }
}

export default Database;