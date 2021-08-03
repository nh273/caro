import React from "react";
import { calculateWin } from "../helpers/calculateWin";
import "./Game.css";
import { db } from "./firebase";
import { UserContext } from "../context/UserProvider";
import { Square, StatusMessages, OnlineGameMessages } from "./GameComponents";
import { SignIn } from "./SignIn";

const BOARD_SIZE = 10; // 20 x 20 board
const DEFAULT_K = 3; // 4 in a row to win if open-ended, 5 if close-ended

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.generateBlankBoard(), // Nested arrays of rows containing cols
      isBlank: true,
      xIsNext: true,
      winner: null,

      playerX: null,
      playerO: null,
    };
  }

  static contextType = UserContext;

  componentDidMount() {
    if (!this.props.local) {
      const gameId = this.props.match.params.gameId;
      const gameRef = db.ref("games/" + gameId);
      this.setState({ gameId: gameId });
      gameRef.on("value", (snapshot) => {
        let loadedGameState = snapshot.val();
        this.setState(loadedGameState);

        // Once you have connected to the remote
        this._implicitlyJoinGameByLink(loadedGameState);
      });
    }
  }

  _implicitlyJoinGameByLink(loadedGameState) {
    /** Helper method to help user join a game that had been created
     * by clicking a link to the game
     */
    // gameId is the unique game identifier, parsed from the route
    const gameId = this.props.match.params.gameId;
    let user = this.context;
    if (
      user &&
      !loadedGameState.playerO &&
      loadedGameState.playerX !== user.uid
    ) {
      this.props.joinOnlineGame(gameId);
    } else if (user && !loadedGameState.playerX) {
      // If there is not already a player X, this player is player X
      this.setState({ playerX: user.uid });
    }
  }

  componentWillUnmount() {
    if (this.state.gameId) {
      const gameRef = db.ref("games/" + this.state.gameId);
      gameRef.off();
    }
  }

  componentDidUpdate() {
    // Update online game state
    if (this.state.gameId && !this.state.isBlank) {
      const gameRef = db.ref("games/" + this.state.gameId);
      gameRef.set(this.state);
    }
  }

  generateBlankBoard = () => {
    /** Generate a blank board (an empty nested array with dimensions
     * BOARD_SIZE x BOARD_SIZE)
     */
    const board = new Array(BOARD_SIZE);
    let i = 0;
    for (var x = 0; x < BOARD_SIZE; x++) {
      const row = new Array(BOARD_SIZE);
      for (var y = 0; y < BOARD_SIZE; y++) {
        // Each cell has a "winner" property for highlighting winning cells
        row[y] = { index: i, value: "", winner: false };
        i++;
      }
      board[x] = row;
    }
    return board;
  };

  updateBoard = (x, y) => {
    /** Update the board by adding the appropriate stone (X or O) to
     * coordinate (x, y) on the board
     */
    const turn_val = this.state.xIsNext ? "X" : "O";
    let oldBoard = this.state.board;
    let newBoard = [...oldBoard];
    newBoard[x][y].value = turn_val;

    this.setState({
      board: newBoard,
      xIsNext: !this.state.xIsNext,
      isBlank: false,
    });
    // check win after every move
    this.checkWin(x, y, turn_val, newBoard);
  };

  checkWin = (x, y, turn_val, board, k = DEFAULT_K) => {
    /** Check whether a move by player indicated a turn_val at x,y
     * on a board with state 'board' will lead to a win if the
     * winning threshold is k.
    */
    let winningLine = calculateWin([x, y], turn_val, board, k);

    // Will only setState if there is a winning line
    if (Array.isArray(winningLine) && winningLine.length !== 0) {
      let board = this.state.board;
      let winningIndices = winningLine.map(
        (winningSquare) => winningSquare.index
      );
      board.forEach((row) => {
        row.forEach((square) => {
          if (winningIndices.includes(square.index)) {
            square.winner = true;
          }
        });
      });
      this.setState({
        board: board,
        winner: turn_val,
      });
    }
  };

  isItMyTurn = () => {
    /** Determine if it's the local player's turn to play
     * Disable the board if it is not.
     */
    let user = this.context;
    if (this.props.local) {
      // always true if playing local game
      return true;
    } else if (this.state.winner) {
      // disable board if winner has been determined
      return false;
    } else if (user && user.uid === this.state.playerX) {
      // If you are player X
      return this.state.xIsNext;
    } else {
      return !this.state.xIsNext;
    }
  };

  renderOnlineMsg = () => {
    if (!this.props.local) {
      return (
        <OnlineGameMessages
          gameState={this.state}
          gameUrl={
            "https://caro-game-online.web.app/" + this.props.location.pathname
          }
        />
      );
    }
  };

  renderBoard = () => {
    var board = this.state.board.map((row, x) => {
      return (
        <div key={x} className="board-row">
          {row.map((square, y) => {
            return (
              <Square
                key={square.index}
                value={square.value}
                className={
                  square.winner ? "game square winning-square" : "game square"
                }
                onClick={() => this.updateBoard(x, y)}
              />
            );
          })}
        </div>
      );
    });
    return board;
  };

  render() {
    let isBoardClickable = this.isItMyTurn();

    return (
      <div className="game game-area">
        {!this.props.local && <SignIn />}
        {this.renderOnlineMsg()}
        <StatusMessages gameState={this.state} />
        <div
          className={
            isBoardClickable ? "game game-board" : "game disabled-game-board"
          }
        >
          {this.renderBoard()}
        </div>
      </div>
    );
  }
}

export default Game;
