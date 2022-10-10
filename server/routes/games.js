import express from "express";
import { fetchGames, fetchCovers } from "../controllers/games.js";

// Create the router for the games endpoints
const router = express.Router();

// Connect the auth endpoints to controller functions
router.post("/fetchGames", fetchGames);
router.post("/fetchCovers", fetchCovers);

export default router;
