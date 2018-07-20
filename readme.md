#  ```flyd-group-within```

[![Build Status](https://travis-ci.org/sourcevault/flyd-group-within.svg?branch=dev)](https://travis-ci.org/sourcevault/flyd-group-within)

```
                                     500 ms        500 ms
(S = start, E = End) Timer          S        E    S       E
                                    |        |    |       |     
upstream: (ticks represent 100ms) [-:1-2-3---:----:5-6----:-----]
flydGroupWithin(500,upstream):    [----------.------------.-----]
downstream:                                  [1,2,3]      [5,6]
```

*install..*

```
npm install flyd-group-within
npm install sourcevault/flyd-group-within#dist 
```



*simple example ..*

```js

var groupWithin = require ("flyd-group-within") 

var send = flyd.stream()

setTimeout (function(){send(1)},100)
setTimeout (function(){send(2},200)
setTimeout (function(){send(3)},300)
setTimeout (function(){send(4)},1000)
setTimeout (function(){send(5)},1100)

groupWithin(send,500)
.map function (x){
   console.log(x) 
}
// [1,2,3]
// [4,5]

```

### Why ? ..

1. **Lower Bound Buffering**

- Lets say you are sendind data to a server over HTTP. 

- You kown the *lower bound* overhead to physically send a packet and process the data is 200 ms.

- you have a `send` function that can be used to send the data.

- If the `send` function is called every *< 200ms*, by definition there will be backpressure which if left unresolved will cause the **recieving** server to either run of memory, be unresponsive or in the worst case crash.

- A simple protective measure is to multiplex multiple `send` operation into a single packet minimizing the handshake overhead - it's the same principal of using trains and buses to reduce road traffic.

Any type of `IO` where there is an constant overhead of doing the `IO` itself can find this type of buffering useful. There is another option that involves grouping *n* `send` calls, however that type of design provides no garantee regarding maximum wait time for the buffered `send` to be dispatched.


`setTimeout` also does not give a hard garantee regarding dispatch time - you can observe it when `send` operations are queud in the timeout boundaries of `flyd-group-within`, but that is besides the point since no system that does cooperative concurrency will give you that garantee anyway. Just make sure your callbacks in the main eventloop is not blocking or running a long loop.


2. **GUI IO Time Slicing**


Double mouse click is a good example of this application, buffer *all* mouse clicks in a 200ms windows, if there are 2 mouse clicks within a 200ms window, it becomes a double click, 3 mouse click becomes a triple click, so on and so on . . 

If you would like to add your usecase do not hesitate to submit a pull request.

## LICENCE

Code and documentation is released under MIT Licence, see [LICENSE](https://github.com/sourcevault/flyd-group-within/blob/dist/LICENCE) for details.