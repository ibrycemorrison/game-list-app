import dotenv from "dotenv"
import { MongoClient } from "mongodb";

// Configure the environment variables
dotenv.config();

// Connect the mongoDB database
export const mongoDB = new MongoClient(process.env.MONGO_URI);
// Pull the "users" collection from the mongoDB database
export const usersDB = mongoDB.db("gamelistdb").collection("users");
