import React, {useState, Fragment, useEffect} from "react";
import "./GameCenter.css";
import maxi from "./../resources/maxiBild.jpg";
import siggi from "./../resources/siggiBild.jpg";
import io from "socket.io-client";
// connecting to the socket server
const socket = io.connect("http://127.0.0.1:4001");

const GameCenter = props => {
  const user = props.match.params.user;
  // const [response, setResponse] = useState("");
  // connecting to the socket server
  useEffect(() => {
    socket.on("buzzerClicked", ({player}) => {
      setBuzzerStatus(true);
      setBuzzerClicker(player);
    });
  }, []);

  // state initialization
  let [currentStakes, setCurrentStakes] = useState({
    firstPlayer: 0,
    secondPlayer: 0
  });
  let [currentPoints, setCurrentPoints] = useState({
    firstPlayer: 100,
    secondPlayer: 100
  });
  let [answeredQuestions, setAnsweredQuestions] = useState(0);
  let [whoClicked, setBuzzerClicker] = useState("");
  let [buzzerBlocked, setBuzzerStatus] = useState(false);

  const handleBuzzerClick = () => {
    setBuzzerStatus(true);
    setBuzzerClicker(user.split("_").join(" "));
    socket.emit("buzzerClicked", {player: user.split("_").join(" ")});
  };

  const handleCorrectAnswer = player => {
    setCurrentPoints({
      ...currentPoints,
      [player]:
        parseInt(currentPoints[player]) + parseInt(currentStakes[player])
    });
  };

  const handleWrongAnswer = player => {
    setCurrentPoints({
      ...currentPoints,
      [player]:
        parseInt(currentPoints[player]) - parseInt(currentStakes[player])
    });
  };

  return (
    <Fragment>
      {buzzerBlocked ? (
        <div className="buzzerBlockedScreen">
          <div className="whoBuzzered">
            <span className="firstClicker">{whoClicked}</span>
            hat zuerst gedrückt!
          </div>
        </div>
      ) : null}
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
              <h2>{currentPoints.firstPlayer}</h2>
              <div className="pointsDivider"></div>
              <h2>{currentPoints.secondPlayer}</h2>
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
                  firstPlayer: e.target.value
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
      {user === "host" ? (
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
            <div className="button notAnswered">KEINE ANTWORT</div>
          </div>
          <div className="button" onClick={e => setBuzzerStatus(false)}>
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
            <div className="button notAnswered">KEINE ANTWORT</div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default GameCenter;
