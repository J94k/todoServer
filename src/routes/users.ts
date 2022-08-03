import express from 'express'
import { STATUS } from '../constants'
import { resolveResult } from './common'
import { isValidAdminData } from '../utils'

const router = express.Router()

router.post('/login', async (req, res) => {
  try {
    const { username, pass: passHash } = req.body
    const result = await isValidAdminData({
      username,
      passHash,
    })

    resolveResult(res, result)
  } catch (error) {
    res.status(STATUS.serverError).send({ error })
  }
})

export default router
