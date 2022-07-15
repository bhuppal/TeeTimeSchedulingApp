const { Pool } = require('pg');
const appConfig = require('../app-config');
const pool = new Pool(appConfig.db);

async function query(query, params) {
    const {rows, fields} = await pool.query(query, params);

    return rows;
}

module.exports = {
  query
}