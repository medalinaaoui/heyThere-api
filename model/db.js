import mysql from "mysql2";
import "dotenv/config";

export const db = mysql.createConnection({
  host: "phtfaw4p6a970uc0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "l97hboax73u8p2x3",
  password: "n2r3ro6vdrrkfrpq",
  database: "c9wqnxnjqxmyby8r",
});
