import { PrismaClient } from '@prisma/client'
import { loggerError, loggerTransaction } from '../log/logger'

export const prismaClient = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query'
    },
    {
      emit: 'event',
      level: 'error'
    },
    {
      emit: 'event',
      level: 'info'
    },
    {
      emit: 'event',
      level: 'warn'
    }
  ]
})

prismaClient.$on('error', (e: any) => {
  loggerError.error(e)
})

prismaClient.$on('warn', (e: any) => {
  loggerTransaction.warn(e)
})

prismaClient.$on('info', (e: any) => {
  loggerTransaction.info(e)
})

prismaClient.$on('query', (e: any) => {
  loggerTransaction.info(e)
})
