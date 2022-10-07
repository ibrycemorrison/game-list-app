import express from "express";
import { register, login, logout } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", await register);
router.post("/login", await login);
router.post("/logout", logout);

export default router;
