import { getRow, getCol, getDiag, getAnti } from "./getters";
import { kInARow, kOpenEnded } from "./consecutive";

export function calculateWin(move, token, board, k) {
  /* Given a new move [row, column] by token (X or O)
    and the state of the board after that move,
    calculate to see if the new move leads to a win,
    returning the winning squares

    Board contains the square {index, value} object representation
    */
  const x = move[0],
    y = move[1];

  const row = getRow(board, [x, y]);
  const col = getCol(board, [x, y]);
  const diag = getDiag(board, [x, y]);
  const anti = getAnti(board, [x, y]);

  let winningLine = [];

  for (let line of [row, col, diag, anti]) {
    let rawLine = line.map((item) => {
      return item.value;
    });

    // First try to see if there is a win by open-ended,
    // Then try to see if there is a win by closed-ended
    let winningIndices = kOpenEnded(rawLine, k, token)
      ? kOpenEnded(rawLine, k, token)
      : kInARow(rawLine, k + 1, token);

    if (winningIndices) {
      winningLine = line.slice(winningIndices[0], winningIndices[1] + 1);
      return winningLine;
    }
  }

  return winningLine;
}
