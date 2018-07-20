flyd = require "flyd"

{is-postive-number,inform} = require "./utils.js"

wait = (t,f) -> setTimeout f,t

main = (time,input) ->

  local = {}

    ..vals = []

    ..waiting = false

  flyd.combine do

    (input,self) ->

      local.vals.push input!

      if not local.waiting # not waiting, set up wait

        local.waiting = true

        <- wait time

        local.waiting = false # no more waits left

        self local.vals

        local.vals = []

      return void

    [input]



# returns null in case you want to wrap in a maybe monad not done by default for portability.

validate-input = (time,stream) ->

  if not (flyd.isStream stream)

    inform.not-flyd-stream!

    return null

  [is-correct,data] = is-postive-number time

  if not is-correct

    inform.invalid-value-for-time data

    return null

  main time,stream

curried-validate-input = flyd.curryN 2,validate-input

curried-validate-input.default = curried-validate-input

curried-validate-input.esModule = true

module.exports = curried-validate-input