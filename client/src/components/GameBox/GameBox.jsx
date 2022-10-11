import React from "react";
import "./gamebox.scss";

/**
 *
 * @param {Object} game The object representing the current games properties
 * @returns Single Game Box HTML
 */
export default function GameBox({ game, openModal }) {
  return (
    <div className="gamebox" onClick={() => openModal(game)}>
      <img
        src={game.cover ? game.cover : "assets/noimage.png"}
        alt={game.name}
        draggable="false"
      />
      <div className="label">
        <span>{game.name}</span>
      </div>
    </div>
  );
}
