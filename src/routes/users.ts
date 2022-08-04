import express from 'express'
import { STATUS } from '../constants'
import { resolveResult } from './common'
import { isValidAdminData, generateToken } from '../utils'
import auth from '../middlewares/auth'

const router = express.Router()

router
  .post('/login', async (req, res) => {
    try {
      const { username, hash } = req.body
      const result: { success: boolean; token?: string } =
        await isValidAdminData({
          username,
          passHash: hash,
        })

      if (result.success) {
        const jwtToken = generateToken(username)

        result.token = jwtToken
      }

      resolveResult(res, result)
    } catch (error) {
      res.status(STATUS.serverError).send({ error })
    }
  })
  .post('/auth', auth, async (req, res) => {
    res.status(STATUS.success).send({ success: true })
  })

export default router
