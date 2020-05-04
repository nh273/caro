import React from "react";
import { calculateWin } from "../helpers/calculateWin";
import "./Game.css";
import { db } from "./firebase";
import { Square, StatusMessages } from "./GameComponents";

const BOARD_SIZE = 20; // 20 x 20 board
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

  componentDidMount() {
    console.log("did mount");
    const gameId = this.props.match.params.gameId;
    const gameRef = db.ref("games/" + gameId);
    this.setState({ gameId: gameId });
    gameRef.on("value", (snapshot) => {
      if (this.state.isBlank) {
        console.log("blank, update from online");
        this.setState(snapshot.val());
      } else {
        console.log("not blank, set online");
        gameRef.set(this.state);
      }
    });
  }

  componentWillUnmount() {
    if (this.state.gameId) {
      const gameRef = db.ref("games/" + this.state.gameId);
      gameRef.off();
    }
  }

  componentDidUpdate() {
    console.log("did update");
    // Update online game state
    if (this.state.gameId && !this.state.isBlank) {
      const gameRef = db.ref("games/" + this.state.gameId);
      gameRef.set(this.state);
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

    this.setState({
      board: newBoard,
      xIsNext: !this.state.xIsNext,
      isBlank: false,
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
    return (
      <div className="game game-area">
        <StatusMessages
          xIsNext={this.state.xIsNext}
          winner={this.state.winner}
        />

        <div className="game game-board">{this.renderBoard()}</div>
      </div>
    );
  }
}

export default Game;
