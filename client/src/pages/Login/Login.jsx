import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "../auth.scss";

/**
 *
 * @returns Login Page HTML
 */
export default function Login() {
  // inputs state, representing the inputs of the login form
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  // error state, used to represent the error message to display
  const [error, setError] = useState(null);

  // Define {useNavigate} to change pages
  const navigate = useNavigate();

  // Get the {login} function from the AuthContext
  const { login } = useContext(AuthContext);

  /**
   * Handles the changing of the inputs
   * @param {HTML Element} e The inputs of the login form
   */
  const handleChange = (e) => {
    // Update the previous inputs state with the new data
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * Logs the user in, and navigates to the home page on form submission
   * @param {HTML Element} e The form submission
   */
  const handleSubmit = async (e) => {
    // Prevent the page from refreshing
    e.preventDefault();
    try {
      // Attempt to login with the inputted data
      await login(inputs);
      // If successful, navigate to the homepage
      navigate("/");
    } catch (err) {
      // Set the error message to display
      setError(err.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
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
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
        {error && <p>{error}</p>}
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
}
