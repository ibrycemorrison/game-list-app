import express from "express";
import { register, login, logout } from "../controllers/auth.js";

// Create the router for the auth endpoints
const router = express.Router();

// Connect the auth endpoints to controller functions
router.post("/register", await register);
router.post("/login", await login);
router.post("/logout", logout);

export default router;
