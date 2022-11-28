const config = require('./config')
const { createLogger, format, transports } = require('winston')

const logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [new transports.Console()],
  exitOnError: false
})

/* istanbul ignore if */
if (config.node_env !== 'test') {
  logger.info('Loaded logger.')
}

module.exports = logger

// function that disables all winston logs
module.exports.disableLogs = async function () {
  logger.transports.forEach((t) => (t.silent = true))
}
