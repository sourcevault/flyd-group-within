
_ = require "ramda"

chalk = require "chalk"

data = {}

  ..name =  "flyd-group-within"

  ..readmeURL = "github.com/sourcevault/flyd-group-within/readme.md"

  ..flydURL = "github.com/paldepind/flyd"


color = {}

  ..highlight  = chalk.bold.yellow

  ..main-attention =  chalk.red.bold

  ..attention =  chalk.blueBright

  ..focus =  chalk.redBright

  ..normal =  chalk.white


inform = {}

print-type-error  = (text) ->

  name = color.highlight data.name

  err-text = color.normal """

    [#{color.main-attention ('TYPE ERROR')}] from [#{name}]

      #{text}

      - more details on [#{name}] at:

        #{color.highlight(data.readmeURL)}

  """

  console.log err-text


inform.not-flyd-stream = !->

  text = """
  - second argument (stream) is of wrong type.
    - stream value should be a #{color.highlight('flyd stream')} object.
    - more details on [#{color.highlight('flyd')}] can be read at:

      #{color.highlight(data.flydURL)}
  """


  print-type-error text

inform.invalid-value-for-time = ({message,type})->


  current-val-str = color.main-attention message

  type-str = color.main-attention type


  text = """
  - first argument (time) is of wrong type [#{type-str}].
    - time value should be #{color.highlight('positive and a number')}.
    - current #{color.focus('incorrect')} value:

      #{current-val-str}
  """

  print-type-error text

is-postive-number = (input) ->

  type = typeof input

  data = {}

  data.type = type

  switch type

  | 'number' =>

    if 0 <= input < Infinity

      return [true]

    else

      return [false,input]

  | 'object' =>

    if input is null

      data.message = input

      return [false,data]

    else

      data.message = JSON.stringify input,1,""

      return [false,data]

  | 'boolean' =>

      data.message = input

      return [false,data]

  | 'undefined' =>

      data.message = input

      return [false,data]

  | 'function' =>

    data.message = input.toString!

    return [false,data]

  | 'string' =>

    data.message = input

    return [false,data]


module.exports =
  is-postive-number:is-postive-number
  inform:inform

