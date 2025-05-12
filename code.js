//Maya Conway
//code.js
//Parallel Mergesort
//5-12-25

const { fork } = require('child_process');

function parallelMS(arr, done) {
  const thresh = 10;
  if (arr.length <= thresh) { //if yes, execute the sequential part
    if(done === undefined) process.send(mergesort(arr));
    else done(mergesort(arr));
    return;
  }

  //same splits as the d&c example work here
  let left = arr.slice(0, arr.length/2),
      right = arr.slice(arr.length/2, arr.length);

  //fork
  let res = undefined;
  let t = fork(__filename, ['--worker'], { stdio:['inherit','inherit','inherit','ipc'] });

  //sort the left
  t.on('message', function(n) {
    //if res is still undefined, no other worker has finished, so define res
    if (res === undefined) res = n;
    else {
      //when we have the partial result, we can do the 'join' (which is merge)
      if(done === undefined) process.send(merge(res, n)); //join
      else done(merge(res, n));
    }
    t.kill();
  }).send(left);

  //sort the right
  parallelMS(right, function(n) {
    if (res === undefined) res = n;
    else {
      if(done === undefined) process.send(merge(res, n)); //join
      else done(merge(res, n));
    }
  });
}

//iterative in place merge for arrays less than the threshold
function mergesort(arr) {
    var i, k;

    for (i = 1; i < arr.length; i *= 2) {
        for (k = 0; k + i < arr.length; k += 2 * i) {
            var mid = k + i;
            var lo = k;
            var hi = Math.min(k + 2 * i - 1, arr.length - 1);
            myMerge(arr, lo, mid, hi); 
        }
    }
    return arr;
}

function myMerge(arr, lo, mid, hi) {
    while (lo < mid && mid <= hi) {
        if (arr[lo] <= arr[mid]) {
            lo++;
        } else {
            var val = arr[mid];
            var index = mid;
            while (index > lo) {
                arr[index] = arr[index - 1];
                index--;
            }
            arr[lo] = val;
            lo++;
            mid++;
        }
    }
}

//my in place merge does not take 2 arrays, so I used this simpler merge
function merge(left, right) {
  let sorted = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      sorted.push(left.shift())
    } else {
      sorted.push(right.shift())
    }
  }
  return sorted.concat(left.slice()).concat(right.slice());
}
