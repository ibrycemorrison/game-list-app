import express from "express";
import dotenv from "dotenv";
import { addUser } from "./controllers/user.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import gameRoutes from "./routes/games.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config({ path: ".env" });

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);

app.listen(8800, () => {
  console.log("Connected!");
});
