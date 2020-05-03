import React from "react";
import { db } from "./firebase";
import { calculateWin } from "../helpers/calculateWin";
import "./Game.css";
import { OnlineGameForm, Square } from "./GameComponents";

const BOARD_SIZE = 20; // 20 x 20 board
const DEFAULT_K = 3; // 4 in a row to win if open-ended, 5 if close-ended

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.generateBlankBoard(), // Nested arrays of rows containing cols
      xIsNext: true,
      winner: null,

      // For online games
      gameId: this.props.match.params.gameId, // null if the game is local
      playerX: null,
      playerO: null,
    };
  }

  componentDidMount() {
    if (this.props.location.pathname === "/online") {
      this.createOnlineGame();
    }
  }

  generateBlankBoard = () => {
    const board = new Array(BOARD_SIZE);
    let i = 0;
    for (var x = 0; x < BOARD_SIZE; x++) {
      const row = new Array(BOARD_SIZE);
      for (var y = 0; y < BOARD_SIZE; y++) {
        row[y] = { index: i, value: "", winner: false };
        i++;
      }
      board[x] = row;
    }
    return board;
  };

  updateBoard = (x, y) => {
    const turn_val = this.state.xIsNext ? "X" : "O";
    let oldBoard = this.state.board;
    let newBoard = [...oldBoard];
    newBoard[x][y].value = turn_val;

    // Update game state after setState is done
    this.setState({ board: newBoard, xIsNext: !this.state.xIsNext }, () => {
      this.updateOnlineGameState();
    });
    this.checkWin(x, y, turn_val, newBoard);
  };

  checkWin = (x, y, turn_val, board, k = DEFAULT_K) => {
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

  createOnlineGame = () => {
    // Create new game & get ID
    const newGameRef = db.ref("games/").push();
    const gameId = newGameRef.key;
    this.setState({ gameId: gameId, board: this.generateBlankBoard() }, () => {
      newGameRef.set(this.state);
      this.props.history.push("online/" + gameId);
    });
  };

  joinOnlineGame = (gameId) => {
    var gameRef = db.ref("games/" + gameId);
    gameRef.on("value", (gameState) => {
      this.setState(gameState.val(), () =>
        this.props.history.push("online/" + gameId)
      );
    });
  };

  updateOnlineGameState = () => {
    if (this.state.gameId) {
      var gameRef = db.ref("games/" + this.state.gameId);
      gameRef.set(this.state);
    }
  };

  renderBoard = () => {
    this.state.board.map((row, x) => {
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
  };

  render() {
    const whose_turn = this.state.xIsNext ? "X" : "O";
    const announcement = this.state.winner
      ? "The winner is: " + this.state.winner
      : whose_turn + "'s turn";
    return (
      <div className="game game-area">
        <p className="game turn-announcement">{announcement}</p>
        <OnlineGameForm
          joinGame={this.joinOnlineGame}
          createOnlineGame={this.createOnlineGame}
        />
        <div className="game game-board">{this.renderBoard()}</div>
      </div>
    );
  }
}

export default Game;
