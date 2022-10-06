import React from "react";
import "./gamebox.scss";

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
