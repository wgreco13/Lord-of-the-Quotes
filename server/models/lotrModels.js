const path = require('path');
const { Pool } = require('pg');

require('dotenv').config({
  path: path.join(__dirname, '../../.env')
});

const PG_URI = process.env.PG_URI;

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};