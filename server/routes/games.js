import express from "express";
import { fetchGames, fetchCovers } from "../controllers/games.js";

const router = express.Router();

router.post("/fetchGames", fetchGames);
router.post("/fetchCovers", fetchCovers);

export default router;
