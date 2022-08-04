import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { STATUS, JWT_SECRET } from '../constants'

export default function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers?.authorization?.split(' ')[1]

    if (!token) {
      return res.status(STATUS.denied).json({ msg: 'Authorization denied' })
    }

    jwt.verify(token, JWT_SECRET, (error: unknown, user: any) => {
      if (error) {
        console.error(error)

        return res.status(STATUS.denied).json({ msg: 'Authorization denied' })
      }
      //@ts-ignore
      req.user = user
      next()
    })
  } catch (error) {
    res.status(STATUS.unauthenticated).json({ error })
  }
}
