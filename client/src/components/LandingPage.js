import React, {useState, Fragment, useEffect} from "react";
import "./LandingPage.css";
import maxi from "./../resources/maxiBild.jpg";
import siggi from "./../resources/siggiBild.jpg";
import nikki from "./../resources/nikkibild.jpeg";

const LandingPage = props => {
  let [whoClicked, setBuzzerClicker] = useState("Marcel");

  console.log(props.history);
  const handleChoice = choice => {
    props.history.push(choice);
  };

  return (
    <Fragment>
      <div className="gameCenter">
        <ul className="selectPlayer">
          <li
            className="selectOption"
            onClick={e => handleChoice("/quiz/ober_alman")}
          >
            <img src={maxi} className="selectPicture" alt="maxi" />
            <h2 className="playerName">OBER ALMAN</h2>
          </li>
          <li
            className="selectOption"
            onClick={e => handleChoice("/quiz/kleines_gehirn")}
          >
            <img src={siggi} className="selectPicture" alt="siggi" />
            <h2 className="playerName">KLEINES GEHIRN</h2>
          </li>
          <li
            className="selectOption"
            onClick={e => handleChoice("/quiz/host")}
          >
            <img src={nikki} className="selectPicture" alt="nikki" />
            <h2 className="playerName">Questionmaster</h2>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default LandingPage;
