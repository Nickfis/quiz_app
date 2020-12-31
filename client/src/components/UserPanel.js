import React from "react";
import "./GameCenter.css";

const UserPanel = ({answeredQuestions, updateStakes, player, stakes}) => {
  return (
    <div className="changeStakes">
      <h3 className="changeStakesText">Beantwortete Fragen:</h3>
      <h3 className="numberOfQuestions">{answeredQuestions}</h3>
      <h3 className="changeStakesText">Einsatz ändern</h3>
      <input
        type="number"
        onChange={e => updateStakes(e.target.value, player)}
        value={stakes}
        placeholder={0}
        className="inputStakes"
      ></input>
    </div>
  );
};

export default UserPanel;
