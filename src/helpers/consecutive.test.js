import { kInARow, kOpenEnded } from "./consecutive";

/* Testing functions that processes arrays of Xs and Ox */

test("kInARow returns Truthy and Falsy", () => {
  const truthy = ["", "", "x", "x", "x", "", ""];
  expect(kInARow(truthy, 3, "x")).toBeTruthy();

  const truthy2 = ["", "", "x", "x", "x", "x", ""];
  expect(kInARow(truthy2, 3, "x")).toBeTruthy();
  expect(kInARow(truthy2, 4, "x")).toBeTruthy();

  const truthy3 = ["x", "x", "x", "o", ""];
  expect(kInARow(truthy3, 3, "x")).toBeTruthy();

  const falsy = ["", "", "x", "x", "o", "x"];
  expect(kInARow(falsy, 3, "x")).toBeFalsy();

  const falsy2 = ["", "", "x", "x", "", "x"];
  expect(kInARow(falsy2, 3, "x")).toBeFalsy();

  const falsy3 = ["", "x", "", "x", "", "x", ""];
  expect(kInARow(falsy3, 3, "x")).toBeFalsy();

  const falsy4 = ["", "x", "o", "x", "x", "o", ""];
  expect(kInARow(falsy4, 3, "x")).toBeFalsy();
});

test("kInARow returns correct indices", () => {
  const truthy = ["", "", "x", "x", "x", "", ""];
  expect(kInARow(truthy, 3, "x")).toEqual([2, 4]);

  const truthy2 = ["", "", "x", "x", "x", "x", ""];
  expect(kInARow(truthy2, 4, "x")).toEqual([2, 5]);

  // If there are more tokens in a row than k, should still get just k
  expect(kInARow(truthy2, 3, "x")).toEqual([2, 4]);

  const truthy3 = ["x", "x", "x", "o", ""];
  expect(kInARow(truthy3, 3, "x")).toEqual([0, 2]);

  const truthy4 = ["", "o", "x", "x", "x"];
  expect(kInARow(truthy4, 3, "x")).toEqual([2, 4]);
});

test("kOpenEnded returns correct indices and Falsy", () => {
  const truthy = ["", "", "x", "x", "x", "", ""];
  expect(kOpenEnded(truthy, 3, "x")).toEqual([2, 4]);

  const truthy2 = ["", "", "x", "x", "x", "x", ""];
  expect(kOpenEnded(truthy2, 4, "x")).toEqual([2, 5]);

  // At the start
  const truthy3 = ["x", "x", "x", "x", "", ""];
  expect(kOpenEnded(truthy3, 4, "x")).toEqual([0, 3]);

  // At the end
  const truthy4 = ["", "", "x", "x", "x", "x"];
  expect(kOpenEnded(truthy4, 4, "x")).toEqual([2, 5]);

  // Both ends
  const truthy5 = ["x", "x", "x", "x"];
  expect(kOpenEnded(truthy5, 4, "x")).toEqual([0, 3]);

  const falsy = ["", "", "x", "x", "o", "x"];
  expect(kOpenEnded(falsy, 3, "x")).toBeFalsy();

  const falsy2 = ["", "", "x", "x", "", "x"];
  expect(kOpenEnded(falsy2, 3, "x")).toBeFalsy();

  const falsy3 = ["", "x", "", "x", "", "x", ""];
  expect(kOpenEnded(falsy3, 3, "x")).toBeFalsy();

  const falsy4 = ["", "x", "o", "x", "x", "o", ""];
  expect(kOpenEnded(falsy4, 3, "x")).toBeFalsy();

  const falsy5 = ["x", "x", "x", "o", ""];
  expect(kOpenEnded(falsy5, 3, "x")).toBeFalsy();
});
