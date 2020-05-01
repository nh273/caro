import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Game from "./components/Game";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Caro</p>
      </header>
      <div className="game-body">
        This is the body
        <Game />
      </div>
    </div>
  );
}

export default App;
