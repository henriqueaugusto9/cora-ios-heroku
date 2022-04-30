const chalk = require('chalk');
const lightFormat = require('date-fns/lightFormat');

const getTimestamp = () => {
  return lightFormat(new Date(), ' HH:mm:ss dd/MM ')
}

const error = (message, timestamp = false) => console.log(chalk.bold.bgRedBright.black(` ERRO ${timestamp ? getTimestamp() : ''}`), chalk.red(message))
const warn = (message, timestamp = false) => console.log(chalk.bold.bgYellow.black(` WARN ${timestamp ? getTimestamp() : ''}`), chalk.yellow(message))
const ok = (message, timestamp = false) => console.log(chalk.bold.bgGreen.black(`  OK ${timestamp ? getTimestamp() : ''}`), chalk.green(message))
const info = (message, timestamp = false) => console.log(chalk.bold.bgBlue.black(` INFO ${timestamp ? getTimestamp() : ''}`), message)

module.exports = {
  error,
  warn,
  ok,
  info
}