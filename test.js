var MODULE_NAME, groupWithin, fail, ret, flyd, wait, send, vals;
MODULE_NAME = "flyd-group-within";
groupWithin = require("./main.js");
fail = function(num){
  console.error("[TEST ERROR] originating from module [ github.com/sourcevault/" + MODULE_NAME + " ]\\n\t - 'npm test' failed at TEST " + num + ". \n");
  process.exitCode = 1;
};
ret = groupWithin(null, send);
if (!(ret === null)) {
  fail(1);
}
ret = groupWithin({}, send);
if (!(ret === null)) {
  fail(2);
}
ret = groupWithin(-100, send);
if (!(ret === null)) {
  fail(3);
}
ret = groupWithin([10], send);
if (!(ret === null)) {
  fail(4);
}
ret = groupWithin(true, send);
if (!(ret === null)) {
  fail(5);
}
ret = groupWithin(undefined, send);
if (!(ret === null)) {
  fail(6);
}
ret = groupWithin(function(){}, send);
if (!(ret === null)) {
  fail(7);
}
ret = groupWithin(100, undefined);
if (!(ret === null)) {
  fail(8);
}
ret = groupWithin['default'](undefined, 100);
if (!(ret === null)) {
  fail(9);
}
flyd = require("flyd");
wait = function(t, f){
  return setTimeout(f, t);
};
send = flyd.stream();
wait(0, function(){
  return send(1);
});
wait(100, function(){
  return send(2);
});
wait(200, function(){
  return send(3);
});
wait(300, function(){
  return send(4);
});
wait(400, function(){
  return send(5);
});
wait(1100, function(){
  return send(6);
});
wait(2000, function(){
  return send(7);
});
wait(3200, function(){
  return send(8);
});
vals = [];
groupWithin(1000, send).map(function(x){
  return vals.push(x);
});
wait(4300, function(){
  if (!vals[0].length === 5) {
    fail(10);
  }
  if (!vals[1].length === 2) {
    fail(10);
  }
  if (!vals[2].length === 1) {
    return fail(10);
  }
});