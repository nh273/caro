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
