import React from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { UserContext } from "./context/UserProvider";
import { db } from "./components/firebase";
import Welcome from "./components/Welcome";
import Game from "./components/Game";
class App extends React.Component {
  static contextType = UserContext;
  createOnlineGame = () => {
    // Create new game & get ID
    const gameRef = db.ref("games/").push();
    const gameId = gameRef.key;
    this.props.history.push("/online/" + gameId);

    const uid = this.context.uid;
    let updates = {};
    updates["games/" + gameId + "/playerX"] = uid;
    updates["users/" + uid + "/games/" + gameId] = true;
    db.ref().update(updates);
  };

  joinOnlineGame = (gameId) => {
    this.props.history.push("/online/" + gameId);

    const uid = this.context.uid;
    let updates = {};
    updates["games/" + gameId + "/playerO"] = uid;
    updates["users/" + uid + "/games/" + gameId] = true;
    db.ref().update(updates);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <Link to="/">Caro</Link>
          </p>
        </header>
        <Switch>
          <Route path="/local" component={Game} />
          <Route
            path="/online/:gameId"
            render={(props) => (
              <Game {...props} joinOnlineGame={this.joinOnlineGame} />
            )}
          />
          <Route
            exact
            path="/"
            render={(props) => (
              <Welcome
                {...props}
                createOnlineGame={this.createOnlineGame}
                joinOnlineGame={this.joinOnlineGame}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
