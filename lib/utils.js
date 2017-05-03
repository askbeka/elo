const path = require('path');

const SPACE = ' ';
const NEW_LINE = '\n';
const LINE_SEPARATOR = `${NEW_LINE}-----------------------------------------------------------${NEW_LINE}`;

module.exports = {
  SPACE,
  NEW_LINE,
  LINE_SEPARATOR,
  isZero: value => value === 0,
  splitBySpace: value => value.toString().split(SPACE),
  handleError: (error) => {
    console.error(error);
    process.exit(1);
  },
  getAbsolutePath: file => path.join(process.cwd(), file),
  getArguments: () => {
    const [,, ...args] = process.argv;
    return args;
  },
  isEven: number => number % 2 === 0,
};
