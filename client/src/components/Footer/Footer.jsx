import React from "react";
import "./footer.scss";
// import { themeColorTemplates } from "../../data/theme-colors.js";

// /**
//  * Function to change element colors based on the site theme selected
//  * @param {string} theme String representing the theme (i.e. themeLight)
//  */
// export const changeTheme = (theme) => {
//   document.documentElement.style.setProperty(
//     "--app-mainBackgroundColor",
//     themeColorTemplates[theme].mainBackgroundColor
//   );
//   document.documentElement.style.setProperty(
//     "--app-mainTextColor",
//     themeColorTemplates[theme].mainTextColor
//   );
//   document.documentElement.style.setProperty(
//     "--app-subColor",
//     themeColorTemplates[theme].subColor
//   );
//   document.documentElement.style.setProperty(
//     "--app-highlightColor",
//     themeColorTemplates[theme].highlightColor
//   );
//   document.documentElement.style.setProperty(
//     "--app-logoFilter",
//     themeColorTemplates[theme].logoFilter
//   );
// };

/**
 *
 * @returns Footer HTML
 */
export default function Footer() {
  // /**
  //  * Function to handle changing color themes
  //  * @param theme String representing the theme currently being used
  //  */
  // const handleClick = (theme) => {
  //   localStorage.setItem("theme-color", theme);
  //   changeTheme(theme);
  // };

  return (
    <div className={"footer"}>
      <div className="container">
        <footer>
          <div className="left">
            <img src="assets/logo.svg" alt="" id="footer-logo" />
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
