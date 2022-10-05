import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "./topbar.scss";

export default function Topbar() {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="topbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src="../../assets/logo.svg" alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/">
            Profile
          </Link>
          <Link className="link" to="/gamelist">
            Game List
          </Link>
          <Link className="link" to="/">
            Browse
          </Link>
        </div>
        <div className="profile">
          {currentUser ? (
            <Link className="link" onClick={logout}>
              Logout
            </Link>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span>{currentUser?.username}</span>
        </div>
      </div>
    </div>
  );
}
