const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost:3036',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root123',
  database: process.env.DB_NAME || 'inventario_empresa_comsa',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;
