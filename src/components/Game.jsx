import React from "react";
import { calculateWin } from "../helpers/calculateWin";
import "./Game.css";

const BOARD_SIZE = 20; // 20 x 20 board
const DEFAULT_K = 3; // 4 in a row to win if open-ended, 5 if close-ended

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.generateBlankBoard(), // Nested arrays of rows containing cols
      xIsNext: true,
      winner: null,
    };
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
    this.setState({ board: newBoard, xIsNext: !this.state.xIsNext });

    this.checkWin(x, y, turn_val, newBoard);
  };

  checkWin = (x, y, turn_val, board, k = DEFAULT_K) => {
    let winningLine = calculateWin([x, y], turn_val, board, k);
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

  render() {
    const whose_turn = this.state.xIsNext ? "X" : "O";
    const announcement = this.state.winner
      ? "The winner is: " + this.state.winner
      : whose_turn + "'s turn";
    return (
      <div className="game game-area">
        <p className="game turn-announcement">{announcement}</p>
        <div className="game game-board">
          {this.state.board.map((row, x) => {
            return (
              <div key={x} className="board-row">
                {row.map((square, y) => {
                  return (
                    <Square
                      key={square.index}
                      value={square.value}
                      className={
                        square.winner
                          ? "game square winning-square"
                          : "game square"
                      }
                      onClick={() => this.updateBoard(x, y)}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

function Square(props) {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Game;
