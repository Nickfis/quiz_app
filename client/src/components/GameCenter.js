import React, {useState, Fragment} from "react";
import "./GameCenter.css";
import maxi from "./../resources/maxiBild.jpg";
import siggi from "./../resources/siggiBild.jpg";

const GameCenter = () => {
  let [currentStakes, setCurrentStakes] = useState({
    firstPlayer: 0,
    secondPlayer: 0
  });
  let [answeredQuestions, setAnsweredQuestions] = useState(0);

  let [buzzerBlocked, setBuzzerBlocked] = useState(false);
  let [whoClicked, setBuzzerClicker] = useState("Marcel");

  const handleBuzzerClick = player => {
    setBuzzerBlocked(true);
    console.log(`${player} has pressed the button bitch!!!`);
    setBuzzerClicker(player);
  };

  const handleStakeSubmit = (e, player) => {
    e.preventDefault();
    console.log(e);
    // setCurrentStakes({...currentStakes, player: })
  };

  return (
    <Fragment>
      <div className="buzzerBlockedScreen">
        <div className="whoBuzzered">
          <span className="firstClicker">{whoClicked}</span>
          hat zuerst gedrückt! Sag die Antwort du Opfer.
        </div>
      </div>
      <div className="gameCenter">
        <div className="scoreBoard">
          <div className="playerContainer">
            <h2 className="playerName">Kleines Gehirn</h2>
            <img className="playerPicture" src={siggi} />
            <h4 className="stakes">
              Aktueller Einsatz: {currentStakes.firstPlayer}
            </h4>
          </div>
          <div className="scoreContainer">
            <h2 className="playerName">Punktestand</h2>
            <div className="pointsContainer">
              <h2>100</h2>
              <div className="pointsDivider"></div>
              <h2>100</h2>
            </div>
          </div>
          <div className="playerContainer">
            <h2 className="playerName">Ober Alman</h2>
            <img className="playerPicture" src={maxi} />
            <h4 className="stakes">
              Aktueller Einsatz: {currentStakes.secondPlayer}
            </h4>
          </div>
        </div>
        <div className="metrics">
          <div className="changeStakes">
            <h3 className="changeStakesText">Beantwortete Fragen:</h3>
            <h3 className="numberOfQuestions">0</h3>
            <h3 className="changeStakesText">Einsatz ändern</h3>
            <input
              type="text"
              onChange={e =>
                setCurrentStakes({
                  ...currentStakes,
                  secondPlayer: e.target.value
                })
              }
              placeholder={0}
            ></input>
          </div>
          <div
            className="buzzer"
            onClick={e => handleBuzzerClick("Kleines Gehirn")}
          >
            BUZZER
          </div>
          <div className="changeStakes">
            <h3 className="changeStakesText">Beantwortete Fragen:</h3>
            <h3 className="numberOfQuestions">0</h3>
            <h3 className="changeStakesText">Einsatz ändern</h3>
            <input
              type="text"
              onChange={e =>
                setCurrentStakes({
                  ...currentStakes,
                  secondPlayer: e.target.value
                })
              }
              placeholder={0}
            ></input>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default GameCenter;
