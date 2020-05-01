export function kInARow(arr, k, token) {
  /* return [startIndex, endIndex] if there are k uninterrupted tokens in the array arr
    Return something falsy if there aren't*/
  let continuous = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === token) {
      // Found the first token, begin checking the contiguous elements
      for (let next = i; next < arr.length; next++) {
        if (arr[next] !== token) {
          // The next element is something else, so we reset the count
          continuous = 0;
          // And move on to the next i
          break;
        } else {
          // The next element is the same, so we increment the count
          if (++continuous === k) {
            // And return if the incremented count is equals to k
            return [i, next];
          }
        }
      }
    }
  }
}

export function kOpenEnded(arr, k, token, emptyToken = "") {
  /* return [startIndex, endIndex] if there are k uninterrupted tokens in the array arr
    with both ends being either emptyToken or nothing (arr start or arr end)
    Return something falsy if there aren't*/
  let continuous = 0;
  for (let i = 0; i < arr.length; i++) {
    // If at beginning of array or previous position is empty
    if (arr[i] === token && (i === 0 || arr[i - 1] === emptyToken)) {
      // begin checking
      for (let next = i; next < arr.length; next++) {
        if (arr[next] !== token) {
          // The next element is something else, so we reset the count
          continuous = 0;
          // And move on to the next i
          break;
        } else {
          // The next element is the same, so we increment the count
          if (
            ++continuous === k &&
            (next + 1 === arr.length || arr[next + 1] === emptyToken)
          ) {
            // And return if the incremented count is equals to k
            // And at the end or the next + 1 element is empty
            return [i, next];
          }
        }
      }
    }
  }
}

export function getRow(matrix, coor) {
  /* Given a row - col matrix and a coordinate [n_row, n_col],
    return the row containing the coor */
  return matrix[coor[0]];
}

export function getCol(matrix, coor) {
  /* Given a row - col matrix and a coordinate [n_row, n_col],
    return the col containing the coor */
  let col = new Array(matrix.length);
  const n_col = coor[1];
  for (let n_row = 0; n_row < matrix.length; n_row++) {
    col[n_row] = matrix[n_row][n_col];
  }
  return col;
}

export function getDiag(matrix, coor) {
  /* Given a row - col matrix and a coordinate [n_row, n_col],
    return the diagonal (left to right, top to bot) containing the coor */
  const board_len = matrix.length; // square
  const n_row = coor[0];
  const n_col = coor[1];

  // Below and on main diag
  let col_start = 0; // diag always contains first col
  let row_start = n_row - n_col;
  let col_end = board_len - col_start; // because of diagonal symmetry
  let row_end = board_len; // always contains last row

  if (n_row < n_col) {
    // Change these values if above the main diagonal
    row_start = 0; // diag always contains first row
    col_start = n_col - n_row;
    row_end = board_len - col_start; // because of diagonal symmetry
    col_end = board_len; // always contains last col
  }

  const diag_len = board_len - Math.max([row_end, col_end]);
  let diag = new Array[diag_len]();
  let i = 0;
  for (let x = row_start; x <= row_end; x++) {
    for (let y = col_start; y <= col_end; y++) {
      diag[i] = matrix[x][y];
      i++;
    }
  }
}
