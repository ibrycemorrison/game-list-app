import { mongoDB, usersDB } from "../database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * Function to register a user in the database
 * @param {*} req Request from frontend
 * @param {*} res Response to frontend
 * @returns The proper response to the frontend app
 */
export const register = async (req, res) => {
  // Fetch user with a matching username
  const currentUser = await usersDB.findOne({ username: req.body.username });

  // If there is an existing user with the requested username, return an error message
  if (currentUser) return res.status(409).json("User already exists!");

  // Hashing the password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  // Attempt to insert new user into database
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
    return res.status(400).json("Could not create user.");
  }
};

/**
 *
 * @param {*} req Request from frontend
 * @param {*} res Response to frontend
 * @returns The proper response to the frontend app
 */
export const login = async (req, res) => {
  // Check if requested user exists in the database
  const currentUser = await usersDB.findOne({ username: req.body.username });

  // If the requested user is not found, return an error message
  if (!currentUser) return res.status(400).json("Wrong username or password!");

  // Check against our hash, if the inputted password is correct
  const isPasswordCorrect = bcrypt.compareSync(
    req.body.password,
    currentUser.password
  );

  // If the password is incorrect, return an error message
  if (!isPasswordCorrect)
    return res.status(400).json("Wrong username or password!");

  // Authenticate with JSON Web Token
  const token = jwt.sign({ id: currentUser._id }, "jwtkey");
  // Separate the password from the user data
  const { password, ...other } = currentUser;

  // Return the logged in user data, and the authentication token
  return res
    .cookie("access_token", token, {
      httpOnly: true,
      sameSite: "none",
    })
    .status(200)
    .json(other);
};

/**
 * Function to logout the current user
 * @param {*} req The request from the frontend
 * @param {*} res The response to the frontend
 * @returns The proper response to the frontend app
 */
export const logout = (req, res) => {
  // Return successful code, and clear authentication token
  return res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};
