import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Create the context object for this app
export const AuthContext = createContext();

/**
 *
 * @param {*} children The children HTML elements of this context scope
 * @returns The AuthContext HTML wrapper
 */
export const AuthContextProvider = ({ children }) => {
  // currentUser state to contain data for the logged in user
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  /**
   * Function to log the user in, based on inputs to the login form
   * @param {*} inputs Inputs from login form
   */
  const login = async (inputs) => {
    const res = await axios.post("/auth/login", inputs);
    setCurrentUser(res.data);
  };

  /**
   * Function to log the user out
   * @param {*} inputs Empty body of inputs
   */
  const logout = async (inputs) => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };

  // useEffect for setting the user every time it is updated
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
