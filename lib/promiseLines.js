const fs = require('fs');
const readLine = require('readline');

function promiseLines(path, lineParser = line => line) {
  return new Promise((resolve, reject) => {
    const lines = [];
    let lineReader;

    try {
      lineReader = readLine.createInterface({
        input: fs.createReadStream(path),
      });
    } catch (error) {
      reject(error);
    }

    lineReader.on('line', (line) => {
      lines.push(lineParser(line));
    });

    lineReader.on('close', () => resolve(lines));
  });
}

module.exports = promiseLines;
