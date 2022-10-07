import React from "react";
import "./footer.scss";

export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <footer>
          <img src="assets/logo.svg" alt="" />
          <span>
            Made with ❤️ and <b>React.js</b> by <b id="my-name">Iain B. Morrison</b>
          </span>
        </footer>
      </div>
    </div>
  );
}
