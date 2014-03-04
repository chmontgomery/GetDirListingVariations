Attempting to show the difference between [bluebird](https://github.com/petkaantonov/bluebird), [q](https://github.com/kriskowal/q) and vanilla js callbacks for asynchronous calls.

#Usage
Run all benchmark variations `node index.js`

#Performance

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