import "./App.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import GameCenter from "./components/GameCenter";
import LandingPage from "./components/LandingPage";

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/quiz/:user" component={GameCenter} />
    </Router>
  );
};

export default App;
