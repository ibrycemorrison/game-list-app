import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cookieParser from "cookie-parser";
import { addUser } from "./controllers/user.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import gameRoutes from "./routes/games.js";
import { mongoDB } from "./database.js";

// Define the ExpressJS app
const app = express();
// Configure the environment variables
dotenv.config();

// Middleware is executed EVERY time the app gets a backend request

// Define JSON middleware
app.use(express.json());
// Define cookieParser middleware
app.use(cookieParser());

// Define the routes that the app will use
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);

// Attempt to connect the mongoDB database
try {
  // Connect and print success message
  mongoDB.connect();
  console.log("MongoDB Connected".brightGreen.underline);
} catch (err) {
  // Print error message
  console.log(err);
}

// Print console message that the app backend is successfully connected
app.listen(8800, () => {
  console.log("Game List App Server Connected!".cyan.underline);
});
