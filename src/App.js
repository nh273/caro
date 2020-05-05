import React from "react";
import * as firebase from "firebase/app";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { db } from "./components/firebase";
import Welcome from "./components/Welcome";
import Game from "./components/Game";
import { SignIn } from "./components/SignIn";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      displayName: null,
    };
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.handleSignInSuccess(user);
      } else {
        this.setState({ uid: null, displayName: null });
      }
    });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  createOnlineGame = () => {
    // Create new game & get ID
    const gameRef = db.ref("games/").push();
    const gameId = gameRef.key;
    this.props.history.push("/online/" + gameId);
  };

  joinOnlineGame = (gameId) => {
    this.props.history.push("/online/" + gameId);
  };

  handleSignInSuccess = (user) => {
    var { uid, displayName } = user;
    this.setState({ uid: uid, displayName: displayName });
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
        {this.state.uid ? "Welcome " + this.state.displayName : ""}
        <Switch>
          <Route path="/local" component={Game} />
          <Route path="/online/:gameId" component={Game} />
          <Route
            exact
            path="/"
            render={(props) => (
              <Welcome
                {...props}
                createOnlineGame={this.createOnlineGame}
                joinOnlineGame={this.joinOnlineGame}
                signInUI={
                  <SignIn
                    signedIn={this.state.uid}
                    onSignInSuccess={this.handleSignInSuccess}
                  />
                }
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
