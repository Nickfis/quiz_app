import React from "react";
import "./GameCenter.css";

const AdminPanel = ({
  handleCorrectAnswer,
  handleWrongAnswer,
  handleBuzzerReset
}) => {
  return (
    <div className="adminPanel">
      <div className="firstPlayerPanel">
        <div
          className="button correct"
          onClick={() => handleCorrectAnswer("firstPlayer")}
        >
          RICHTIG
        </div>
        <div
          className="button false"
          onClick={() => handleWrongAnswer("firstPlayer")}
        >
          FALSCH
        </div>
      </div>
      <div className="button" onClick={() => handleBuzzerReset()}>
        Buzzer freischalten
      </div>
      <div className="secondPlayerPanel">
        <div
          className="button correct"
          onClick={() => handleCorrectAnswer("secondPlayer")}
        >
          RICHTIG
        </div>
        <div
          className="button false"
          onClick={() => handleWrongAnswer("secondPlayer")}
        >
          FALSCH
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
