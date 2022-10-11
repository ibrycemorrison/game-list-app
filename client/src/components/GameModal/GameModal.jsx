import React from "react";
import "./gamemodal.scss";

/**
 *
 * @param {Object} selectedGame The object representing the current games properties
 * @param {Function} closeModal Function to close the current modal
 * @returns Single Game Modal HTML
 */
export default function GameModal({ selectedGame, closeModal }) {
  if (!selectedGame) {
    return <div className="gamemodal" id="gamemodal"></div>;
  }

  return (
    <div className="gamemodal" id="gamemodal">
      <div className="gamemodal-top-container">
        <h1>{selectedGame.name}</h1>
        <div className="x-wrapper">
          <img src="assets/x-symbol.svg" alt="" onClick={() => closeModal()} />
        </div>
      </div>
      <div className="gamemodal-inside-container">
        <div className="container-left">
          <img
            src={selectedGame.cover ? selectedGame.cover : "assets/noimage.png"}
            alt=""
          />
        </div>
        <div className="container-right">
          <h2>
            {selectedGame.rating && (
              <>
                Score: <span>{Math.round(selectedGame.rating)}</span>
              </>
            )}
          </h2>
        </div>
      </div>
    </div>
  );
}
