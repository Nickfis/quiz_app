import React, {useState, Fragment, useEffect} from "react";
import "./GameCenter.css";
import maxi from "./../resources/maurice.jpg";
import siggi from "./../resources/stevo.jpg";
import io from "socket.io-client";
import Player from "./Player";
import AdminPanel from "./AdminPanel";

const socket = io.connect("https://fussi.herokuapp.com/");

const GameCenter = props => {
  const user = props.match.params.user;

  useEffect(() => {
    socket.on("buzzerClicked", ({player}) => {
      setBuzzerStatus(true);
      setBuzzerClicker(player);
    });
    socket.on("buzzerReset", () => {
      setBuzzerStatus(false);
    });
    socket.on("setStakes", newStakes => {
      setCurrentStakes(newStakes);
    });
    socket.on("setPoints", newPoints => {
      setCurrentPoints(newPoints);
    });
    socket.on("setAnsweredQuestions", newAnsweredQuestions => {
      setAnsweredQuestions(newAnsweredQuestions);
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
  let [answeredQuestions, setAnsweredQuestions] = useState({
    firstPlayer: 0,
    secondPlayer: 0
  });

  let [whoClicked, setBuzzerClicker] = useState("");
  let [buzzerBlocked, setBuzzerStatus] = useState(false);

  const handleBuzzerClick = () => {
    setBuzzerStatus(true);
    setBuzzerClicker(user.split("_").join(" "));
    socket.emit("buzzerClicked", {player: user.split("_").join(" ")});
  };

  const handleCorrectAnswer = player => {
    let newPoints = {
      ...currentPoints,
      [player]:
        parseInt(currentPoints[player]) + parseInt(currentStakes[player])
    };
    let newAnsweredQuestions = {
      ...answeredQuestions,
      [player]: answeredQuestions[player] + 1
    };
    setCurrentPoints();
    socket.emit("setPoints", newPoints);
    setAnsweredQuestions(newAnsweredQuestions);
    socket.emit("setAnsweredQuestions", newAnsweredQuestions);
    socket.emit("buzzerReset");
  };

  const handleWrongAnswer = player => {
    let newPoints = {
      ...currentPoints,
      [player]:
        parseInt(currentPoints[player]) - parseInt(currentStakes[player])
    };
    setCurrentPoints(newPoints);
    let newAnsweredQuestions = {
      ...answeredQuestions,
      [player]: answeredQuestions[player] + 1
    };
    setAnsweredQuestions(newAnsweredQuestions);
    socket.emit("setPoints", newPoints);
    socket.emit("setAnsweredQuestions", newAnsweredQuestions);
    socket.emit("buzzerReset");
  };

  const handleBuzzerReset = () => {
    socket.emit("buzzerReset");
  };

  const updateStakes = (value, player) => {
    setCurrentStakes({
      ...currentStakes,
      [player]: value
    });
    socket.emit("setStakes", {...currentStakes, [player]: value});
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
          <Player
            name={"Die deutsche Eiche"}
            picture={siggi}
            stakes={currentStakes.firstPlayer}
          />
          <div className="scoreContainer">
            <h2 className="playerName">Punktestand</h2>
            <div className="pointsContainer">
              <h2>{currentPoints ? currentPoints.firstPlayer : null}</h2>
              <div className="pointsDivider"></div>
              <h2>{currentPoints ? currentPoints.secondPlayer : null}</h2>
            </div>
          </div>
          <Player
            name={"Maxi"}
            picture={maxi}
            stakes={currentStakes.secondPlayer}
          />
        </div>
        <div className="metrics">
          <div className="changeStakes">
            <h3 className="changeStakesText">Beantwortete Fragen:</h3>
            <h3 className="numberOfQuestions">
              {answeredQuestions.firstPlayer}
            </h3>
            <h3 className="changeStakesText">Einsatz ändern</h3>
            <input
              type="text"
              onChange={e => updateStakes(e.target.value, "firstPlayer")}
              value={currentStakes.firstPlayer}
              placeholder={0}
              className="inputStakes"
            ></input>
          </div>
          <div
            className="buzzer"
            onClick={e => handleBuzzerClick("Die Deutsche Eiche")}
          >
            BUZZER
          </div>
          <div className="changeStakes">
            <h3 className="changeStakesText">Beantwortete Fragen:</h3>
            <h3 className="numberOfQuestions">
              {answeredQuestions.secondPlayer}
            </h3>
            <h3 className="changeStakesText">Einsatz ändern</h3>
            <input
              type="text"
              onChange={e => updateStakes(e.target.value, "secondPlayer")}
              value={currentStakes.secondPlayer}
              placeholder={0}
              className="inputStakes"
            />
          </div>
        </div>
      </div>
      {user === "host" ? (
        <AdminPanel
          handleCorrectAnswer={handleCorrectAnswer}
          handleWrongAnswer={handleWrongAnswer}
          handleBuzzerReset={handleBuzzerReset}
        />
      ) : null}
    </Fragment>
  );
};

export default GameCenter;
