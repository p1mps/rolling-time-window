const fs = require('fs')
const consoleTable = require('console.table');

const generateStats = (data, sum, min, max) => {

  return {
    'timestamp': data.timestamp,
    'value': data.value,
    'sum': data.value + sum,
    'min': (data.value < min) ? data.value : min,
    'max': (data.value >= max) ? data.value : max
  }
}

const parseLine = (line) => {
  const data = line.split('\t')

  if (data.length != 2 || !data[0] || !data[1]) {
    throw new Error('Wrong data file format')
  }

  return {
    'timestamp': Number.parseInt(data[0]),
    'value': Number.parseFloat(data[1])
  }
}

const printTable = (file, tau) => {
  fs.readFile(file, 'utf8', (err, contents) => {

    if (err) throw err
    const lines = contents.split('\n')
    let stats = null
    let previousStats = null
    let results = []
    let counter = 0

    lines.forEach((line) => {

      if (line !== '' && counter < tau) {
        const parsedLine = parseLine(line)
        if (!previousStats) {
          stats = generateStats(parsedLine, 0, Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER)
        } else {
          stats = generateStats(parsedLine, previousStats.sum, previousStats.min, previousStats.max)
        }
        counter++
        previousStats = stats
        results.push(stats)
      }
    })

    const table = consoleTable.getTable(results)
    console.log(table)
  })
}

exports.printTable = printTable
