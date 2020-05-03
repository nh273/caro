import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Welcome from "./components/Welcome";
import Game from "./components/Game";
class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              <Link to="/">Caro</Link>
            </p>
          </header>
          <Switch>
            <Route path="/local" component={Game} />
            <Route path="/online" component={Game} />
            <Route path="/online/:gameId" component={Game} />
            <Route exactpath="/" component={Welcome} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
