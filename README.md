Attempting to show the difference between [bluebird](https://github.com/petkaantonov/bluebird), [q](https://github.com/kriskowal/q) and vanilla js callbacks for asynchronous calls.

#Realtime Performance

#Usage
`node benchmark/index.js`

##Examples
examples run using 1000 parallel executions

###Q
<pre>
benchmark took 189.762711 milliseconds
benchmark took 189.486015 milliseconds
benchmark took 197.8922 milliseconds
benchmark took 195.911679 milliseconds
benchmark took 186.620454 milliseconds
</pre>

###Bluebird
<pre>
benchmark took 132.285435 milliseconds
benchmark took 131.708112 milliseconds
benchmark took 133.602357 milliseconds
benchmark took 138.772284 milliseconds
benchmark took 137.005165 milliseconds
</pre>

###Vanilla Callbacks
<pre>
benchmark took 103.234374 milliseconds
benchmark took 106.310094 milliseconds
benchmark took 103.02496 milliseconds
benchmark took 101.188726 milliseconds
benchmark took 100.582985 milliseconds
</pre>

#Realtime Performance

##Usage
`node realtime/index.js`

##Examples
This version of the bench uses [benchmark.js](https://github.com/bestiejs/benchmark.js) to achieve statistically significant results.

###Q
<pre>
q x 8,176 ops/sec ±21.19% (26 runs sampled)
q x 8,104 ops/sec ±20.75% (25 runs sampled)
</pre>

###Bluebird
<pre>
bluebird x 22,789 ops/sec ±11.50% (58 runs sampled)
bluebird x 22,505 ops/sec ±8.81% (61 runs sampled)
</pre>

###Vanilla Callbacks
<pre>
vanilla x 97,123 ops/sec ±3.13% (69 runs sampled)
vanilla x 93,882 ops/sec ±4.43% (82 runs sampled)
</pre>