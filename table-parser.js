const fs = require('fs')
const consoleTable = require('console.table');

const parseLine = (line) => {
  const data = line.split('\t')

  if (data.length != 2 || !data[0] || !data[1]) {
    throw new Error('Wrong data file format')
  }

  return {
    'Time': Number.parseInt(data[0]),
    'Value': Number.parseFloat(data[1]),
    'N_0': 0,
    'Roll_Sum': 0,
    'Min_Value': 0,
    'Max_Value': 0
  }
}

const printTable = (file, tau) => {
  fs.readFile(file, 'utf8', (err, contents) => {

    if (err) throw err
    const lines = contents.split('\n')
    let observations = []
    let index = 0

    lines.forEach((line) => {
      let sum = 0
      let min = Number.MAX_SAFE_INTEGER
      let max = Number.MIN_SAFE_INTEGER

      if (line !== '') {
        const parsedLine = parseLine(line)
        observations.push(parsedLine)

        observations.forEach(obs => {

          if (parsedLine.Time - obs.Time <= tau &&
              (parsedLine.Time - obs.Time >= 0)) {

            min = Math.min(min, obs.Value)
            max = Math.max(max, obs.Value)
            sum += obs.Value
            observations[index].N_0++
            observations[index].Roll_Sum = Number.parseFloat(sum).toPrecision(6)
            observations[index].Min_Value = min
            observations[index].Max_Value = max
          }
        })
      }
      index++
    })
    const table = consoleTable.getTable(observations)
    console.log(table)
  })
}

exports.printTable = printTable
