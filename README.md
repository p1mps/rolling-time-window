# rolling-time-window
Rolling time window implementation in nodejs

## node version:
v11.1.0

## To run the script:
- npm start -- --file (path to the data file) [--tau (time window size)]
- file is the only mandatory parameter, tau defaults to 60 if omitted

## Dependencies:
- fs: for reading the data file
- yargs: for parsing the command line arguments
- console.table: for pretty printing the results table

TODO if I had more time:

- tests are completely missing, unit tests would have sufficed
- wrap more code with promises/async/await in order to leverage the async programming style of node
