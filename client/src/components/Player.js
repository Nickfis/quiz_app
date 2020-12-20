import React from "react";
import "./GameCenter.css";

const Player = ({name, picture, stakes}) => {
  return (
    <div className="playerContainer">
      <h2 className="playerName">{name}</h2>
      <img className="playerPicture" src={picture} alt={name} />
      <h4 className="stakes">Aktueller Einsatz: {stakes ? stakes : null}</h4>
    </div>
  );
};

export default Player;
