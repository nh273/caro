import React from "react";
import "./Game.css";

const BOARD_SIZE = 20; // 20 x 20 board

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.generateBlankBoard(), // Nested arrays of rows containing cols
      x_is_next: true,
    };
  }

  generateBlankBoard = () => {
    const board = new Array(BOARD_SIZE);
    let i = 0;
    for (var n_row = 0; n_row < BOARD_SIZE; n_row++) {
      const row = new Array(BOARD_SIZE);
      for (var n_col = 0; n_col < BOARD_SIZE; n_col++) {
        row[n_col] = { index: i, value: "" };
        i++;
      }
      board[n_row] = row;
    }
    return board;
  };

  updateBoard = (n_row, n_col) => {
    const val = this.state.x_is_next ? "X" : "O";
    let oldBoard = this.state.board;
    let newBoard = [...oldBoard];
    newBoard[n_row][n_col].value = val;
    this.setState({ board: newBoard, x_is_next: !this.state.x_is_next });
  };

  render() {
    return (
      <div className="game-board">
        {this.state.board.map((row, n_row) => {
          return (
            <div key={n_row} className="board-row">
              {row.map((square, n_col) => {
                return (
                  <Square
                    key={square.index}
                    value={square.value}
                    onClick={() => this.updateBoard(n_row, n_col)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Game;
