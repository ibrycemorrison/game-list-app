import express from "express";

// Create the router for the users endpoints
const router = express.Router();

// Connect the auth endpoints to controller functions
router.get("/", (req, res) => {
  res.json("this is post");
});

export default router;
