import React from "react";
import "./gamebox.scss";

/**
 *
 * @param {int} id The id of the game
 * @param {string} name The name of the game
 * @param {string} cover The link to cover art of the game
 * @param {string} url The IGDB url of the game
 * @returns Single Game Box HTML
 */
export default function GameBox({ id, name, cover, url }) {
  return (
    <div className="gamebox">
      <img
        src={cover ? cover : "assets/noimage.png"}
        alt={name}
        draggable="false"
      />
      <div className="label">
        <span>{name}</span>
      </div>
    </div>
  );
}
