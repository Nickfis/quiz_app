import React, {useState, Fragment, useEffect} from "react";
import "./LandingPage.css";
// import maxi from "./../resources/maxiBild.jpg";
import maxi from "./../resources/maurice.jpg";
// import siggi from "./../resources/siggiBild.jpg";
import siggi from "./../resources/stevo.jpg";
import nikki from "./../resources/nikkibild.jpeg";

const LandingPage = props => {
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
            <h2 className="playerName">MR. DIVIDENDE</h2>
          </li>
          <li
            className="selectOption"
            onClick={e => handleChoice("/quiz/kleines_gehirn")}
          >
            <img src={siggi} className="selectPicture" alt="siggi" />
            <h2 className="playerName">DIE DEUTSCHE EICHE</h2>
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
