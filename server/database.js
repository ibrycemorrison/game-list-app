import mysql from "mysql";
import dotenv from "dotenv"
import { MongoClient } from "mongodb";

dotenv.config();

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "gamelist",
});

export const mongoDB = new MongoClient(process.env.MONGO_URI);
export const usersDB = mongoDB.db("gamelistdb").collection("users");
