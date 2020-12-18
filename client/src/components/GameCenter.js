import React, {useState, Fragment, useEffect} from "react";
import "./GameCenter.css";
import maxi from "./../resources/maxiBild.jpg";
import siggi from "./../resources/siggiBild.jpg";
import io from "socket.io-client";
// connecting to the socket server
const socket = io.connect("http://127.0.0.1:4001");

const GameCenter = props => {
  const player = props.match.params.user;
  // const [response, setResponse] = useState("");
  // connecting to the socket server
  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT);
  //   socket.on("FromAPI", data => {
  //     setResponse(data);
  //   });
  // }, []);

  // state initialization
  let [currentStakes, setCurrentStakes] = useState({
    firstPlayer: 0,
    secondPlayer: 0
  });
  let [answeredQuestions, setAnsweredQuestions] = useState(0);
  let [whoClicked, setBuzzerClicker] = useState("");
  let [buzzerBlocked, setBuzzerStatus] = useState(false);

  const handleBuzzerClick = () => {
    setBuzzerStatus(true);
    setBuzzerClicker(player.split("_").join(" "));
    socket.emit("buzzerClicked", {player: player.split("_").join(" ")});
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
      <div className="adminPanel">
        <div className="firstPlayerPanel">
          <div className="button"></div>
          <div className="button"></div>
        </div>
        <div className="button" onClick={e => setBuzzerStatus(false)}>
          Buzzer freischalten
        </div>
        <div className="secondPlayerPanel">
          <div className="button"></div>
          <div className="button"></div>
        </div>
      </div>
    </Fragment>
  );
};

export default GameCenter;
