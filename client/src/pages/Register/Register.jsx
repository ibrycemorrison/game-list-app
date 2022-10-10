import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../auth.scss";

/**
 *
 * @returns Register Page HTML
 */
export default function Register() {
  // inputs state, representing the inputs of the register form
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  // error state, used to represent the error message to display
  const [error, setError] = useState(null);

  // Define {useNavigate} to change pages
  const navigate = useNavigate();

  /**
   * Handles the changing of the inputs
   * @param {HTML Element} e The inputs of the login form
   */
  const handleChange = (e) => {
    // Update the previous inputs state with the new data
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * Registers the user, and navigates to the login page on form submission
   * @param {HTML Element} e The form submission
   */
  const handleSubmit = async (e) => {
    // Prevent the page from refreshing
    e.preventDefault();
    try {
      // Attempt to register the user
      await axios.post("/auth/register", inputs);
      // If successful, navigate to the login page
      navigate("/login");
    } catch (err) {
      // Set the error message to display
      setError(err.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="text"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Register</button>
        {error && <p>{error}</p>}
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
}
