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
  let row_end = board_len - 1; // always contains last row
  let col_end = row_end - col_start; // because of diagonal symmetry

  if (n_row < n_col) {
    // Change these values if above the main diagonal
    row_start = 0; // diag always contains first row
    col_start = n_col - n_row;
    col_end = board_len - 1; // always contains last col
    row_end = col_end - col_start; // because of diagonal symmetry
  }

  let diag = [];
  let x = row_start,
    y = col_start;
  while (x <= row_end && y <= col_end) {
    diag.push(matrix[x][y]);
    x++;
    y++;
  }

  return diag;
}
