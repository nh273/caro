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
    // Usage of `let` and `var` should be consistent. At the most basic level,
    // their usage are kind of the same and thus I would like to see either one 
    // of them, but not both. On a higher level, understanding their differences
    // could help too, and in which case I'd recommend `let` over `var` anyday.
    // In fact, my code is void of `var`'s. As to why, there are already tons of 
    // StackOverflow answers on the matter.
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
    // I get what you're trying to do here, which is great. We should always
    // create a copy of the old object to produce a new state, instead of
    // modifying the old state directly, which you have done here, only
    // partially. `oldBoard` is a 2-D array, whose contents are 1-D arrays,
    // which in turn are reference based objects too. They also need to be
    // copied. As it is right now, you're actually reusing the same arrays you
    // had from the beginning. What you have done here is a _shallow_ copy of
    // `oldBoard`. A deep copy is generally safer and demonstrate the
    // candidate's deeper understanding of what goes on under the hood. 
    //
    // However, creating a deep copy is a more involved process and could be
    // overlooked by certain reviewers since the candidate already demonstrated
    // awareness of copying over mutating. However, for brownie points, I
    // recommend looking at [ImmutableJS](https://immutable-js.com/). It's
    // helpful for complex state manipulation.
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
    // This function is lacking an `else` branch, which means when
    // `this.props.local` is truthy it is actually a `void` function, or it's
    // returning `undefined`. Well, since JavaScript is already a crime itself,
    // doing this actually is fine and permissible.  However, canonically,
    // rendering nothing in React requires you to return `null` (or `false`
    // under certain circumstances). Doing this shows that you're aware of the 
    // edge cases that might happen to your app, and are vigilant about covering
    // your ass and making sure it works for the end user no matter what.
    else {
      return null
    }
  };

  renderBoard = () => {
    // While returning an array of elements to a `render` function is fine and
    // permissible, it is usually the case that render functions return a single
    // element instead of an array of elements. In this case, I'd wrap them around
    // a <React.Fragment> pair of tags, or <></> for short, just to group them
    // under a single node.
    return (
      <>
        {this.state.board.map((row, x) => (
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
        ))}
      </>
    )
  };

  render() {
    // This value will never change after its initial value is calculated, it's
    // more idiomatic to use `const` instead of `let`
    const isBoardClickable = this.isItMyTurn();

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
