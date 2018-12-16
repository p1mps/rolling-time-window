const fs = require('fs')
const consoleTable = require('console.table');

const generateStats = (data, counter, sum, min, max) => {

  return {
    'Time': data.Time,
    'Value': data.Value,
    'N_0': counter,
    'Roll_Sum': data.Value + sum,
    'Min_Value': (data.Value < min) ? data.Value : min,
    'Max_Value': (data.Value >= max) ? data.Value : max
  }
}

const parseLine = (line) => {
  const data = line.split('\t')

  if (data.length != 2 || !data[0] || !data[1]) {
    throw new Error('Wrong data file format')
  }

  return {
    'Time': Number.parseInt(data[0]),
    'Value': Number.parseFloat(data[1])
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
          //const generateStats = (data, counter, sum, min, max) => {
          stats = generateStats(parsedLine, counter, 0, Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER)
        } else {
          stats = generateStats(parsedLine, counter, previousStats.Roll_Sum, previousStats.Min_Value, previousStats.Max_Value)
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
