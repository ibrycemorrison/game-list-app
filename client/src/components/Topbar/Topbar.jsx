import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import "./topbar.scss";

/**
 *
 * @returns Topbar HTML
 */
export default function Topbar() {
  // Context imported:
  //    currentUser - Current user Object
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="topbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src="assets/logo.svg" alt="" id="topbar-logo" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/profile">
            Profile
          </Link>
          <Link className="link" to="/gamelist">
            Game List
          </Link>
          <Link className="link" to="/games">
            Browse
          </Link>
        </div>
        <div className="profile">
          {!currentUser && (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span>{currentUser?.username}</span>
          <div className="profile-picture">
            {currentUser && (
              <Link className="link" to="/profile">
                <img src="assets/placeholder-profile.png" alt="" />
              </Link>
            )}
            <ProfileMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
