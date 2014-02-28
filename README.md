#Performance

###Bluebird
example runs using 1000 parallel executions
<pre>
benchmark took 132.285435 milliseconds
benchmark took 131.708112 milliseconds
benchmark took 133.602357 milliseconds
benchmark took 138.772284 milliseconds
benchmark took 137.005165 milliseconds
benchmark took 130.734027 milliseconds
benchmark took 135.179099 milliseconds
</pre>

###Vanilla Callbacks
example runs using 1000 parallel executions
<pre>
benchmark took 103.234374 milliseconds
benchmark took 106.310094 milliseconds
benchmark took 103.02496 milliseconds
benchmark took 101.188726 milliseconds
benchmark took 100.582985 milliseconds
benchmark took 104.616164 milliseconds
benchmark took 103.611433 milliseconds
</pre>

#Function length
I updated the two functions to match styles. I removed all error handling logic, followed best practice code formatting conventions (e.g. [always use curly braces](http://jshint.com/docs/options/#curly)), and removed all empty lines (to be fair). After doing so, the line count is as follows:

###Bluebird
30

###Vanilla Callbacks
37