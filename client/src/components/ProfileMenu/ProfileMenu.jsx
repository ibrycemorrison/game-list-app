import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

function ProfileMenuItem({ itemText, onClickFunction }) {
  return <div className="profilemenuitem">{itemText}</div>;
}

export default function ProfileMenu() {
  // Context imported:
  //    logout      - Function to logout the current user
  const { logout } = useContext(AuthContext);

  return (
    <div id="submenu" className="submenu-wrapper">
      <div className="profilemenu">
        <Link className="link" to="/profile">
          <ProfileMenuItem itemText={"Profile"}></ProfileMenuItem>
        </Link>
        <Link
          className="link"
          onClick={() => {
            logout();
            const submenu = document.getElementById("submenu");
            submenu.style.opacity = "0";
          }}
        >
          <ProfileMenuItem itemText={"Logout"}></ProfileMenuItem>
        </Link>
      </div>
    </div>
  );
}
