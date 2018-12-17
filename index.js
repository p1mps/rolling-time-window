const tableParser = require('./table-parser')
const argv = require('yargs').argv

const printUsage = () => {
  console.log('Usage:')
  console.log('npm start -- --file (path to the data file) [--tau (time window size)]')
}

const parseArgs = (argv) => {
  // tau is optional and set default to 60
  let tau = 60

  if (argv.tau != null) {
    tau = argv.tau
  }

  return {
    'tau': tau,
    'file': argv.file
  }
}

const args = parseArgs(argv)

// file is mandatory
if (!args.file) {
  printUsage()
  process.exit(0)
}

tableParser.printTable(args.file, args.tau)
