import React from "react";
import "./footer.scss";

export default function Footer() {
  /**
   * Function to handle changing color themes
   * @param theme String representing the theme currently being used
   */
  const handleClick = (theme) => {
    localStorage.setItem("theme-color", theme);
  };

  return (
    <div className={'footer'}>
      <div className="container">
        <footer>
          <div className="left">
            <img src="assets/logo.svg" alt="" />
            <div className="theme-options">
              <div
                id="theme-light"
                onClick={() => handleClick("theme-light")}
              />
              <div id="theme-dark" onClick={() => handleClick("theme-dark")} />
            </div>
          </div>
          <div className="right">
            <span>
              Made with ❤️ and <b>React.js</b> by{" "}
              <b id="my-name">Iain B. Morrison</b>
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
