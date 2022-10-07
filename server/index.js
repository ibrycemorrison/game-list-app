import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cookieParser from "cookie-parser";
import { addUser } from "./controllers/user.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import gameRoutes from "./routes/games.js";
import { mongoDB } from "./database.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);

try {
  mongoDB.connect();
  console.log("MongoDB Connected".brightGreen.underline);
} catch (err) {
  console.log(err);
}

app.listen(8800, () => {
  console.log("Game List Connected!".cyan.underline);
});
