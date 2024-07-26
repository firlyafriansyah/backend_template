import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { ResponseError } from '../error/response-error'

dotenv.config()

export default function GenerateAccessToken (payload: Record<string, string>): string {
  if (process.env.TOKEN_SECRET != null) {
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '86400s' })
  } else {
    throw new ResponseError(400, '')
  }
}
