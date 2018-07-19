
MODULE_NAME = "flyd-group-within"

group-within = require "./main.js"


fail = (num) !->

  console.error "[TEST ERROR] originating from module [ github.com/sourcevault/#{MODULE_NAME} ]\\n

  \t - 'npm test' failed at TEST #{num}. \n

  "

  process.exitCode = 1


#  TEST TYPE :: Catch Input Errors

# # <| TEST 1 |>


ret = group-within null,send

if not (ret is null)

  fail 1

# # <| TEST 2 |>

ret = group-within {},send



if not (ret is null)

  fail 2


# # <| TEST 3 |>

ret = group-within -100,send

if not (ret is null)

  fail 3

# # <| TEST 4 |>

ret = group-within [10],send

if not (ret is null)

  fail 4

# # <| TEST 5 |>

ret = group-within true,send

if not (ret is null)

  fail 5

# # <| TEST 6 |>

ret = group-within undefined,send

if not (ret is null)

  fail 6

# # <| TEST 7 |>

ret = group-within !-> , send

if not (ret is null)

  fail 7

# # <| TEST 8 |>

ret = group-within 100,undefined

if not (ret is null)

  fail 8

# # <| TEST 9 |>


ret = group-within.default undefined,100

if not (ret is null)

  fail 9


#  TEST TYPE :: Functionality Tests

# # <| TEST 10 |>

flyd = require "flyd"

wait = (t,f) -> setTimeout f,t

send = flyd.stream!

do

  <- wait 0

  send 1

do

  <- wait 100

  send 2

do

  <- wait 200

  send 3

do

  <- wait 300

  send 4

do

  <- wait 400

  send 5

do

  <- wait 1100

  send 6

do

  <- wait 2000

  send 7

do

  <- wait 3200

  send 8


vals = []

group-within  1000,send

.map (x) ->

   vals.push x




<- wait 4300

if not (vals[0].length) is 5

  fail 10

if not (vals[1].length) is 2

  fail 10

if not (vals[2].length) is 1

  fail 10
