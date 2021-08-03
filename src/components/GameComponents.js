import React, { useState, useRef } from "react";

export function OnlineGameForm(props) {
  /** Form to create or join online game */
  const [gameId, setGameId] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    props.joinOnlineGame(gameId);
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

export function Square(props) {
  /** A single square in the game. Unclickable if disabled */
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

export function OnlineGameMessages(props) {
  let { playerX, playerO } = props.gameState;
  if (!!playerX && !playerO) {
    return (
      <div className="invite-prompt">
        "Waiting for player O. Invite by sending them the link to the game"
        <CopyTextArea textToCopy={props.gameUrl} />
      </div>
    );
  } else {
    return "";
  }
}

function CopyTextArea(props) {
  /** Provide a convenient text area that can be copied
   * by clicking a button to easily get game link.
   */
  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    setCopySuccess("Copied!");
  }

  return (
    <div>
      {
        /* Logical shortcut for only displaying the
          button if the copy command exists */
        document.queryCommandSupported("copy") && (
          <div>
            <button onClick={copyToClipboard}>Copy</button>
            {copySuccess}
          </div>
        )
      }
      <form>
        <textarea readOnly ref={textAreaRef} value={props.textToCopy} />
      </form>
    </div>
  );
}

export function StatusMessages(props) {
  const whose_turn = props.gameState.xIsNext ? "X" : "O";
  const announcement = props.gameState.winner
    ? "The winner is: " + props.gameState.winner
    : whose_turn + "'s turn";
  return <div className="game turn-announcement">{announcement}</div>;
}
