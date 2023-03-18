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

export function getAnti(matrix, coor) {
  /* Given a row - col matrix and a coordinate [n_row, n_col],
      return the anti-diagonal (left to right, bot to top) containing the coor */
  const board_len = matrix.length; // square
  const n_row = coor[0];
  const n_col = coor[1];

  // Above and on main anti-diag
  let col_start = 0; // anti-diag always contains first col
  // row_end contains the topmost row because we will decrement rows
  let row_end = 0; // always contains first row
  let row_start = n_col + n_row; // where we start to decrement, so the bottommost row
  let col_end = row_start; // because of diagonal symmetry

  if (n_row + n_col >= board_len) {
    // Change these values if below the main anti-diagonal
    col_end = board_len - 1; // anti-diag always contains last col
    row_start = board_len - 1; // always contains last row, which we decrement
    col_start = n_col + n_row - col_end;
    row_end = col_start; // because of diagonal symmetry
  }

  let diag = [];
  let x = row_start,
    y = col_start;
  while (x >= row_end && y <= col_end) {
    diag.push(matrix[x][y]);
    x--;
    y++;
  }

  return diag;
}

// There is a method to replicate what you've done in this file, albeit with
// higher effort and requiring more meticulous care, that completely eliminates
// the need for copying the values into a new array. Copying usually carries
// an overhead, and admittedly insignificant for the scope of this app, but well,
// an engineer does what an engineer does best: over-engineering.
// Here, I'm demonstrating how to create a Slice (or some might call a View) of
// the board. It's a shadow copy of the salient region of the board, which does
// not copy the values from the board but instead act as a magnifier into the
// actual board.

class MatrixRow {
  constructor(board, row) {
    this.board = board
    this.row = row
  }

  get length() { return this.board.size }
  get = (col) => { return this.board.get(this.row, col) }
}

class MatrixColumn {
  constructor(board, col) {
    this.board = board
    this.col = col
  }

  get length() { return this.board.size }
  get = (row) => { return this.board.get(row, this.col) }
}

class MatrixDiagonal {
  constructor(board, )
}
class Matrix {
  /** 
   * This is called an overloaded constructor, or more generally an overloaded 
   * function. What that means is that it can be called with different parameters,
   * and behaves differently when supplied with different kinds of parameters.
   * If we had written this in typescript, here are the two signatures:
   * 
   * ```
   * constructor(size: number)
   * constructor(values: number[][])
   * ```
   */
  constructor(sizeOrValues) {
    if (Array.isArray(sizeOrValues)) {
      // Passing in a new values array
      this.values = sizeOrValues
      this.size = sizeOrValues.length
    } else if (typeof sizeOrValues === 'number') {
      // Passing in a size value
      // A little magic of mine to populate a size x size 2-D array. 
      this.values = [new Array(sizeOrValues).fill().map((_, row) => (
        new Array(sizeOrValues).fill().map((_, col) => ({ index: row * size + col, value: '', winner: false }))
      ))]
      this.size = sizeOrValues
    } else {
      throw new Error('Invalid constructor parameter for Board:', sizeOrValues)
    }
  }

  /** Get the value at the specified coordinates  */
  get = (row, col) => this.values[row][col]

  /** Creates a deep clone of the board with the value changed */
  setting = (row, col, value) => new Matrix(this.values.map((rowValues, currentRow) => {
    if (row !== currentRow) return [...rowValues]
    return rowValues.map((cellValue, currentCol) => {
      if (col !== currentCol) return cellValue
      return { ...cellValue, value }
    })
  }))
  
  getRow = (row) => new MatrixRow(this, row)
  getCol = (col) => new MatrixColumn(this, col)
}

function demo() {
  const board = new Matrix(10)
  const board2ndCol = board.getCol(1)
  // This would print out all of the values from the 2nd column of `board`.
  // This approach does not require copying of values from the main matrix.
  for (let row = 0; row < board.size; row++) {
    console.log(board2ndCol.get(row))
  }
}

// Again, this stuff might be too advanced and an over-engineering of what might
// have been required. This is just to show you that, had this been a take-home
// assignment from a candidate, I'll value them much higher if they did a slice
// approach than a copying approach.
