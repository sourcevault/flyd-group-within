var flyd, ref$, isPostiveNumber, inform, wait, main, validateInput;
flyd = require("flyd");
ref$ = require("./utils.js"), isPostiveNumber = ref$.isPostiveNumber, inform = ref$.inform;
wait = function(t, f){
  return setTimeout(f, t);
};
main = function(time, input){
  var x$, local;
  x$ = local = {};
  x$.vals = [];
  x$.waiting = false;
  return flyd.combine(function(input, self){
    local.vals.push(input());
    if (!local.waiting) {
      local.waiting = true;
      wait(time, function(){
        local.waiting = false;
        self(local.vals);
        return local.vals = [];
      });
    }
  }, [input]);
};
validateInput = function(time, stream){
  var ref$, isCorrect, data;
  if (!flyd.isStream(stream)) {
    inform.notFlydStream();
    return null;
  }
  ref$ = isPostiveNumber(time), isCorrect = ref$[0], data = ref$[1];
  if (!isCorrect) {
    inform.invalidValueForTime(data);
    return null;
  }
  return main(stream, time);
};
validateInput['default'] = validateInput;
validateInput.esModule = true;
module.exports = validateInput;