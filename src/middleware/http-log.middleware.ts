import { type NextFunction, type Request, type Response } from 'express'
import { loggerHttp } from '../log/logger'

export const httpLogMiddleware = async (
  error: Error,
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.method === 'POST') {
    loggerHttp.verbose({
      ip: req.socket.remoteAddress,
      path: req.url,
      method: req.method,
      data: {
        headers: req.headers,
        body: req.body,
        params: req.params
      }
    })
  } else if (req.method === 'PUT') {
    loggerHttp.verbose({
      ip: req.socket.remoteAddress,
      path: req.url,
      method: req.method,
      data: {
        headers: req.headers,
        body: req.body,
        params: req.params
      }
    })
  } else if (req.method === 'GET') {
    loggerHttp.verbose({
      ip: req.socket.remoteAddress,
      path: req.url,
      method: req.method,
      data: {
        headers: req.headers,
        params: req.params,
        query: req.query
      }
    })
  } else if (req.method === 'DELETE') {
    loggerHttp.verbose({
      ip: req.socket.remoteAddress,
      path: req.url,
      method: req.method,
      data: {
        headers: req.headers,
        params: req.params
      }
    })
  } else {
    loggerHttp.verbose({
      ip: req.socket.remoteAddress,
      path: req.url,
      method: req.method,
      data: {
        headers: req.headers,
        params: req.params,
        body: req.body,
        query: req.query
      }
    })
  }

  next(error)
}
