import { getCol, getDiag } from "./helpers";

const smallMatrix = [
  ["x", "o", " "],
  ["o", "o", " "],
  [" ", "o", "x"],
];

test("Test the col getter", () => {
  expect(getCol(smallMatrix, [0, 0])).toEqual(["x", "o", " "]);
  expect(getCol(smallMatrix, [1, 0])).toEqual(["x", "o", " "]);
  expect(getCol(smallMatrix, [2, 1])).toEqual(["o", "o", "o"]);
  expect(getCol(smallMatrix, [1, 2])).toEqual([" ", " ", "x"]);
});

test("Test the diag getter", () => {
  expect(getDiag(smallMatrix, [0, 0])).toEqual(["x", "o", "x"]);
  expect(getDiag(smallMatrix, [1, 0])).toEqual(["o", "o"]);
  expect(getDiag(smallMatrix, [2, 1])).toEqual(["o", "o"]);
  expect(getDiag(smallMatrix, [1, 2])).toEqual(["o", " "]);
});

const medMatrix = [
  ["o", "o", " ", "x", " "],
  [" ", "o", " ", " ", " "],
  ["o", "x", " ", "x", "o"],
  [" ", "o", "x", " ", " "],
  ["x", " ", " ", "o", "x"],
];

test("Test the Col getter on the medium matrix", () => {
  expect(getCol(medMatrix, [0, 0])).toEqual(["o", " ", "o", " ", "x"]);
  expect(getCol(medMatrix, [3, 0])).toEqual(["o", " ", "o", " ", "x"]);
  expect(getCol(medMatrix, [2, 3])).toEqual(["x", " ", "x", " ", "o"]);
  expect(getCol(medMatrix, [1, 4])).toEqual([" ", " ", "o", " ", "x"]);
});

test("Test the Diag getter on the medium matrix", () => {
  expect(getDiag(medMatrix, [3, 0])).toEqual([" ", " "]);
  expect(getDiag(medMatrix, [0, 0])).toEqual(["o", "o", " ", " ", "x"]);
  expect(getDiag(medMatrix, [2, 3])).toEqual(["o", " ", "x", " "]);
  expect(getDiag(medMatrix, [1, 4])).toEqual(["x", " "]);
});
