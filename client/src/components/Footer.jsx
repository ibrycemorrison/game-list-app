import React from "react";
import "./footer.scss";
import { themeColorTemplates } from "../data/theme-colors";

export const changeTheme = (theme) => {
  document.documentElement.style.setProperty("--app-mainBackgroundColor", themeColorTemplates[theme].mainBackgroundColor);
  document.documentElement.style.setProperty("--app-mainTextColor", themeColorTemplates[theme].mainTextColor);
  document.documentElement.style.setProperty("--app-subColor", themeColorTemplates[theme].subColor);
  document.documentElement.style.setProperty("--app-highlightColor", themeColorTemplates[theme].highlightColor);
  document.documentElement.style.setProperty("--app-logoFilter", themeColorTemplates[theme].logoFilter);
};

export default function Footer() {
  /**
   * Function to handle changing color themes
   * @param theme String representing the theme currently being used
   */
  const handleClick = (theme) => {
    localStorage.setItem("theme-color", theme);
    changeTheme(theme);
  };

  return (
    <div className={"footer"}>
      <div className="container">
        <footer>
          <div className="left">
            <img src="assets/logo.svg" alt="" id="footer-logo" />
            <div className="theme-options">
              <div id="themeDark" onClick={() => handleClick("themeDark")} />
              <div id="themeLight" onClick={() => handleClick("themeLight")} />
              <div id="themePurple" onClick={() => handleClick("themePurple")} />
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
