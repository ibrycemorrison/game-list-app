import { db } from "../database.js";
import { mongoDB, usersDB } from "../database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  // Check existing user
  const currentUser = await usersDB.findOne({ username: req.body.username });

  if (currentUser) return res.status(409).json("User already exists!");

  // Hashing password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  // Create user
  try {
    usersDB.insertOne({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      img: "",
      games: {},
    });
    return res.status(200).json("User has been created.");
  } catch (err) {
    res.status(400).json("Could not create user.");
  }
};

export const login = async (req, res) => {
  // Check if user exists
  const currentUser = await usersDB.findOne({ username: req.body.username });

  if (!currentUser) return res.status(400).json("Wrong username or password!");

  const isPasswordCorrect = bcrypt.compareSync(
    req.body.password,
    currentUser.password
  );

  if (!isPasswordCorrect)
    return res.status(400).json("Wrong username or password!");

  const token = jwt.sign({ id: currentUser._id }, "jwtkey");
  const { password, ...other } = currentUser;

  res
    .cookie("access_token", token, {
      httpOnly: true,
      sameSite: "none",
    })
    .status(200)
    .json(other);
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};
