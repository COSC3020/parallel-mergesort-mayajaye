# Parallel Mergesort

Implement a parallel version of mergesort (both the original recursive and the
iterative in-place version from a previous exercise are fine). You may use any
parallelization framework or method.

I have not provided any test code, but you can base yours on test code from
other exercises. Your tests must check the correctness of the result of running
the function and run automatically when you commit through a GitHub action.

## Runtime Analysis

What is the span of the parallel program, in terms of worst-case $\Theta$? Hint:
It may help to consider the DAG of the parallel program.

The factors that contribute to the span are:
1. Reach the base case. $\Theta(logn)$
    1. Divide n by 2 at each level. The summation of $\frac{n}{2^i}$ ends up being $\Theta(n)$
    2. Merge the subarrays. $\Theta(n)$

The runtime equation is: $log_{2}n \cdot 2n$

Ignoring the asymptotically insignificant terms:

$T_{\inf}(n) \in \Theta(nlogn)$

#### Sources

I very heavily used your d&c example code so I hope that is ok. I basically just 
changed the join from adding to merging. I didn't end up getting your createWorker 
function to work properly, so I had chatGPT help me with the forking. I also used 
chatGPT to figure out how to do asynchronus tests with jsverify.

I also used [this](https://www.doabledanny.com/merge-sort-javascript) in place of my in place merge function.

"I certify that I have listed all sources used to complete this exercise,
including the use of any Large Language Models. All of the work is my own, except
where stated otherwise. I am aware that plagiarism carries severe penalties and
that if plagiarism is suspected, charges may be filed against me without prior
notice."
