var _, chalk, x$, data, y$, color, inform, printTypeError, isPostiveNumber;
_ = require("ramda");
chalk = require("chalk");
x$ = data = {};
x$.name = "flyd-group-within";
x$.readmeURL = "github.com/sourcevault/flyd-group-within/readme.md";
x$.flydURL = "github.com/paldepind/flyd";
y$ = color = {};
y$.highlight = chalk.bold.yellow;
y$.mainAttention = chalk.red.bold;
y$.attention = chalk.blueBright;
y$.focus = chalk.redBright;
y$.normal = chalk.white;
inform = {};
printTypeError = function(text){
  var name, errText;
  name = color.highlight(data.name);
  errText = color.normal("\n[" + color.mainAttention('TYPE ERROR') + "] from [" + name + "]\n\n  " + text + "\n\n  - more details on [" + name + "] at:\n\n    " + color.highlight(data.readmeURL) + "\n");
  return console.log(errText);
};
inform.notFlydStream = function(){
  var text;
  text = "- second argument (stream) is of wrong type.\n  - stream value should be a " + color.highlight('flyd stream') + " object.\n  - more details on [" + color.highlight('flyd') + "] can be read at:\n\n    " + color.highlight(data.flydURL);
  printTypeError(text);
};
inform.invalidValueForTime = function(arg$){
  var message, type, currentValStr, typeStr, text;
  message = arg$.message, type = arg$.type;
  currentValStr = color.mainAttention(message);
  typeStr = color.mainAttention(type);
  text = "- first argument (time) is of wrong type [" + typeStr + "].\n  - time value should be " + color.highlight('positive and a number') + ".\n  - current " + color.focus('incorrect') + " value:\n\n    " + currentValStr;
  return printTypeError(text);
};
isPostiveNumber = function(input){
  var type, data;
  type = typeof input;
  data = {};
  data.type = type;
  switch (type) {
  case 'number':
    if (0 <= input && input < Infinity) {
      return [true];
    } else {
      return [false, input];
    }
    break;
  case 'object':
    if (input === null) {
      data.message = input;
      return [false, data];
    } else {
      data.message = JSON.stringify(input, 1, "");
      return [false, data];
    }
    break;
  case 'boolean':
    data.message = input;
    return [false, data];
  case 'undefined':
    data.message = input;
    return [false, data];
  case 'function':
    data.message = input.toString();
    return [false, data];
  case 'string':
    data.message = input;
    return [false, data];
  }
};
module.exports = {
  isPostiveNumber: isPostiveNumber,
  inform: inform
};