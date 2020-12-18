import React, {useState, Fragment, useEffect} from "react";
import "./GameCenter.css";
import maxi from "./../resources/maxiBild.jpg";
import siggi from "./../resources/siggiBild.jpg";
import io from "socket.io-client";
// connecting to the socket server
// const socket = io.connect("http://127.0.0.1:4001");
const socket = io.connect("https://fussi.herokuapp.com/");

const GameCenter = props => {
  const user = props.match.params.user;
  // const [response, setResponse] = useState("");
  // connecting to the socket server
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
          <div className="playerContainer">
            <h2 className="playerName">Kleines Gehirn</h2>
            <img className="playerPicture" src={siggi} alt="siggi" />
            <h4 className="stakes">
              Aktueller Einsatz: {currentStakes.firstPlayer}
            </h4>
          </div>
          <div className="scoreContainer">
            <h2 className="playerName">Punktestand</h2>
            <div className="pointsContainer">
              <h2>{currentPoints ? currentPoints.firstPlayer : null}</h2>
              <div className="pointsDivider"></div>
              <h2>{currentPoints ? currentPoints.secondPlayer : null}</h2>
            </div>
          </div>
          <div className="playerContainer">
            <h2 className="playerName">Ober Alman</h2>
            <img className="playerPicture" src={maxi} alt="maxi" />
            <h4 className="stakes">
              Aktueller Einsatz: {currentStakes.secondPlayer}
            </h4>
          </div>
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
            onClick={e => handleBuzzerClick("Kleines Gehirn")}
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
      ) : null}
    </Fragment>
  );
};

export default GameCenter;
