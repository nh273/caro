import React, { useState } from "react";

export function OnlineGameForm(props) {
  const [gameId, setGameId] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    props.joinGame(gameId);
  };
  return (
    <form onSubmit={handleSubmit}>
      Join game:{" "}
      <input
        type="text"
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
      />{" "}
      <input type="submit" value="Join game" />
    </form>
  );
}
