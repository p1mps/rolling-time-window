const printTable = require('./print-table')
const argv = require('yargs').argv

const printUsage = () => {
  console.log('Usage:')
  console.log('npm start -- -file (path to the data file) [--tau (time window size)]')
}

const parseArgs = (argv) => {
  let tau = 60

  if (argv.file == null) {
    return printUsage()
  }

  if (argv.tau != null) {
    tau = argv.tau
  }

  return {
    'tau': tau,
    'file': argv.file
  }
}

const args = parseArgs(argv)

if (args) {
  printTable.printTable(args.file, args.tau)
}
