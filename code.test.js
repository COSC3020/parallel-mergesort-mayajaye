const fs  = require('fs');
const jsc = require('jsverify');
eval(fs.readFileSync('code.js') + "");

function parallelMSPromise(arr) {
  return new Promise(resolve => parallelMS(arr, resolve));
}

const asyncSortProp = jsc.forall("array nat", async arr => {
  var a1 = arr.slice();
  var a2 = arr.slice();
  return JSON.stringify(await parallelMSPromise(a1)) ==
        JSON.stringify(a2.sort(function(a, b)
            { return a - b; }))
});

(async () => {
  await jsc.assert(asyncSortProp, {tests: 1000});
})();
