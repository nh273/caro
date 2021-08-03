export function kInARow(arr, k, token) {
  /* return [startIndex, endIndex] if there are k uninterrupted tokens in the array arr
    Return something falsy if there aren't*/

  // This is algorithm-related stuff, some engineering companies who can't get
  // off their high horses will be anal about the efficiency of such a thing.
  // Let's get your ass primed for them.
  // First off, the algorithm is O(n^2) where n is the number of elements in `arr`.
  // We can reduce this slightly by setting the end condition of the loop to
  // `i < arr.length - k`. This is because if we start at an `i` where there are
  // less than `k` tokens left, we are 100% sure they won't fulfil the criterion.
  // Second thing we notice is that, if we fail to validate a continuous series 
  // of tokens, then we can skip to the end of whatever we went through. As of now,
  // we are naïvely continuing to the very next token.
  // 
  // To illustrate this, consider this example: 
  //    kInARow([x, x, x, o, x, x, x, x], 4, 'x')
  // We start off at index 0, all is good, we've got our x match. We toil ourself
  // to check until index 3 where suddenly we met an 'o'--what rotten luck, let's
  // move on. So we should check index 4, right? Since everything before that is
  // basically invalid anyway. Yet, in this implementation, we're dragging our
  // foot back to index 1, just to fall into the fly trap of index 3, not once
  // but twice, until we could move on.
  //
  // And before we finish the whole thing off, let's handle some edge cases
  // first. Bitches (read: reviewers) be lovin' these.
  if (arr.length < k) {
    // There's no way we can find k tokens or more in a shorter array
    return null;
  }
  if (k <= 1) {
    // We don't want to handle this kind of case. k == 0 gives us invalid
    // result, whereas the k == 1 is a trivial case. Depending on
    // implementation, you might wanna allow k == 1.
    return null;
  }

  // With the above improvements, we now can actually design a O(n) -- linear
  // time algorithm to check for matches.
  // 
  //   > Look ma! No nested loops!
  //
  let matchStartIndex = null
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === token) {
      if (matchStartIndex === null) {
        matchStartIndex = i;
      } else if (i - matchStartIndex + 1 >= k) {
        // Found our match
        return [matchStartIndex, i]
      }
    } else {
      // Here, arr[i] !== token
      matchStartIndex = null; // We reset the start index
      if (i >= arr.length - k) {
        // If we are past k tokens before end of array, and we get a mismatch, we
        // know that we definitely won't get any other matches
        return null; // Explicit null return
      }
    }
  }
  return null; // If we had a match, it would have been found before this point
  
  // Also, you didn't return anything in the old implementation when no series
  // was found. I always prefer to be explicit in my code, so I return a `null`
  // everywhere a negative result is expected. It could be anything falsy or
  // anything else that helps you to determine failure, but you have to be 
  // explicit about it.

  // In general, you might even ask, "Yeah this is all algo crap that unless you
  // mug LeetCode 24/7 there's no way I figure out a O(n) algorithm during a live
  // interview!". To that I say, while there is a grain of truth in that statement,
  // the larger truth is that you just have to ask yourself the right questions.
  // Most people, when confronted with the truth that their algorithm could
  // be too inefficient, often ask themselves: "Can we do better?". Yet, the
  // right question to ask is, "What's the best I could do? How might we do
  // worse than the best?" 
  // Perhaps even a kid in elementary school could also tell you that if you had
  // given him 100 candies and ask him to pick out 5 candies of the same color
  // placed together sequentially, he'd tell you he can do it in one counting,
  // 1 to 100, no more, no less. And it makes sense, you just have to go through
  // 100 candies at most once to pick out the series.
  // Close your eyes, try to solve an abstract version of the algorithm in your
  // brain, physically. What's the best you can do? If you can do better in your
  // brain, you can do better in your code. And, the efficiency you had in your
  // brain is the efficiency of the right answer.
  // Philosophical stuff, if you like to hear me blabber sponsor my YouTube channel.
  
  // let continuous = 0;
  // for (let i = 0; i < arr.length; i++) {
  //   if (arr[i] === token) {
  //     // Found the first token, begin checking the contiguous elements
  //     for (let next = i; next < arr.length; next++) {
  //       if (arr[next] !== token) {
  //         // The next element is something else, so we reset the count
  //         continuous = 0;
  //         // And move on to the next i
  //         break;
  //       } else {
  //         // The next element is the same, so we increment the count
  //         if (++continuous === k) {
  //           // And return if the incremented count is equals to k
  //           return [i, next];
  //         }
  //       }
  //     }
  //   }
  // }
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
