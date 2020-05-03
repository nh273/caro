import React, { useState } from "react";

export function OnlineGameForm(props) {
  const [gameId, setGameId] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    props.joinGame(gameId);
  };
  return (
    <div className="online-game-form">
      <button onClick={props.createOnlineGame}>Create Online Game</button>
      <form onSubmit={handleSubmit}>
        Join game:{" "}
        <input
          type="text"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
        />{" "}
        <input type="submit" value="Join game" />
      </form>
    </div>
  );
}

function Square(props) {
  let disabled = props.value ? true : false;
  return (
    <button
      className={props.className}
      disabled={disabled}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
