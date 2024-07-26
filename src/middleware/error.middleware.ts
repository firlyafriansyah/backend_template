import { type Response, type Request, type NextFunction } from 'express'
import { ZodError } from 'zod'
import { ResponseError } from '../error/response-error'
import { loggerError } from '../log/logger'

export const errorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  if (error instanceof ZodError) {
    loggerError.error({
      ip: req.socket.remoteAddress ?? undefined,
      type: 'Validation',
      error: JSON.stringify(error)
    })
    res.status(400).json({
      status: 'error',
      message: `Validation Error : ${JSON.stringify(error)}`
    })
  } else if (error instanceof ResponseError) {
    loggerError.error({
      ip: req.socket.remoteAddress ?? undefined,
      type: 'Response',
      error: error.message
    })
    res.status(error.status).json({
      status: 'error',
      message: error.message
    })
  } else {
    loggerError.error({
      ip: req.socket.remoteAddress ?? undefined,
      type: 'Server',
      error: error.message
    })
    res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
}
