import { createLogger, format, transports } from 'winston'
import path from 'path'
import 'winston-daily-rotate-file'

const { combine, timestamp, prettyPrint } = format

const fileRotateTransportHttp = new transports.DailyRotateFile({
  level: 'verbose',
  filename: path.join(__dirname, 'http.log'),
  maxFiles: '30d',
  maxSize: '10m'
})

const fileRotateTransportError = new transports.DailyRotateFile({
  level: 'error',
  filename: path.join(__dirname, 'error.log')
})

const fileRotateTransportTransaction = new transports.DailyRotateFile({
  level: 'info',
  filename: path.join(__dirname, 'transaction.log')
})

const loggerHttp = createLogger({
  level: 'verbose',
  format: combine(
    timestamp({
      format: 'DD MMM YYYY HH:mm:ss'
    }),
    prettyPrint()
  ),
  transports: [fileRotateTransportHttp]
})

const loggerTransaction = createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'DD MMM YYYY HH:mm:ss'
    }),
    prettyPrint()
  ),
  transports: [fileRotateTransportTransaction]
})

const loggerError = createLogger({
  level: 'error',
  format: combine(
    timestamp({
      format: 'DD MMM YYYY HH:mm:ss'
    }),
    prettyPrint()
  ),
  transports: [fileRotateTransportError]
})

export { loggerHttp, loggerTransaction, loggerError }
