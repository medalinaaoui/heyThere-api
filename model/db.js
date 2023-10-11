import mysql from "mysql2";
import "dotenv/config";

export const db = mysql.createConnection({
  host: process.env.JAWSDB_HOST,
  user: process.env.JAWSDB_USERNAME,
  password: process.env.JAWSDB_PASSWORD,
  database: process.env.JAWSDB_DB,
});
