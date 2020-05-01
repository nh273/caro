import { getCol, getDiag, getAnti } from "./getters";

const smallMatrix = [
  ["x", "o", " "],
  ["o", "o", " "],
  [" ", "o", "x"],
];
test("Test the AntiDiag getter", () => {
  expect(getAnti(smallMatrix, [0, 0])).toEqual(["x"]);
  expect(getAnti(smallMatrix, [1, 0])).toEqual(["o", "o"]);
  expect(getAnti(smallMatrix, [2, 1])).toEqual(["o", " "]);
  expect(getAnti(smallMatrix, [1, 2])).toEqual(["o", " "]);
});

test("Test the diag getter", () => {
  expect(getDiag(smallMatrix, [0, 0])).toEqual(["x", "o", "x"]);
  expect(getDiag(smallMatrix, [1, 0])).toEqual(["o", "o"]);
  expect(getDiag(smallMatrix, [2, 1])).toEqual(["o", "o"]);
  expect(getDiag(smallMatrix, [1, 2])).toEqual(["o", " "]);
});

test("Test the col getter", () => {
  expect(getCol(smallMatrix, [0, 0])).toEqual(["x", "o", " "]);
  expect(getCol(smallMatrix, [1, 0])).toEqual(["x", "o", " "]);
  expect(getCol(smallMatrix, [2, 1])).toEqual(["o", "o", "o"]);
  expect(getCol(smallMatrix, [1, 2])).toEqual([" ", " ", "x"]);
});

const medMatrix = [
  ["o", "o", " ", "x", " "],
  [" ", "o", " ", " ", " "],
  ["o", "x", " ", "x", "o"],
  [" ", "o", "x", " ", " "],
  ["x", " ", " ", "o", "x"],
];

test("Test the AntiDiag getter on the medium matrix", () => {
  expect(getAnti(medMatrix, [3, 0])).toEqual([" ", "x", " ", "x"]);
  expect(getAnti(medMatrix, [0, 0])).toEqual(["o"]);
  expect(getAnti(medMatrix, [2, 2])).toEqual(["x", "o", " ", " ", " "]);
  expect(getAnti(medMatrix, [2, 3])).toEqual([" ", "x", "x", " "]);
  expect(getAnti(medMatrix, [4, 2])).toEqual([" ", " ", "o"]);
});

test("Test the Diag getter on the medium matrix", () => {
  expect(getDiag(medMatrix, [3, 0])).toEqual([" ", " "]);
  expect(getDiag(medMatrix, [0, 0])).toEqual(["o", "o", " ", " ", "x"]);
  expect(getDiag(medMatrix, [2, 3])).toEqual(["o", " ", "x", " "]);
  expect(getDiag(medMatrix, [1, 4])).toEqual(["x", " "]);
});

test("Test the Col getter on the medium matrix", () => {
  expect(getCol(medMatrix, [0, 0])).toEqual(["o", " ", "o", " ", "x"]);
  expect(getCol(medMatrix, [3, 0])).toEqual(["o", " ", "o", " ", "x"]);
  expect(getCol(medMatrix, [2, 3])).toEqual(["x", " ", "x", " ", "o"]);
  expect(getCol(medMatrix, [1, 4])).toEqual([" ", " ", "o", " ", "x"]);
});
