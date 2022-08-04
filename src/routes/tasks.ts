import express from 'express'
import { STATUS, REGEXP } from '../constants'
import db from '../db'
import { Read } from '../db/types'
import { resolveResult } from './common'
import { isTaskDataValid } from '../utils'
import auth from '../middlewares/auth'

const router = express.Router()

router
  .get('/all', async (req, res) => {
    try {
      const result = await db.read(Read.tasks)

      resolveResult(res, result)
    } catch (error) {
      res.status(STATUS.serverError).send({ error })
    }
  })
  .get('/:id', async (req, res) => {
    try {
      const { id } = req.params
      const result = await db.read(Read.task, {
        id,
      })

      resolveResult(res, result)
    } catch (error) {
      res.status(STATUS.serverError).send({ error })
    }
  })

router.post('/new', async (req, res) => {
  try {
    const { name, email, description, done } = req.body

    if (!isTaskDataValid({ username: name, email, description })) {
      res.status(STATUS.clientError).send({
        msg: 'Invalid data',
      })
      return
    }

    const result = await db.create({ username: name, email, description, done })

    resolveResult(res, result)
  } catch (error) {
    res.status(STATUS.serverError).send({ error })
  }
})

router.patch('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    const { description, done } = req.body

    if (!description.match(REGEXP) || typeof done !== 'boolean') {
      res.status(STATUS.clientError).json({
        msg: 'Invalid data',
      })
      return
    }

    const result = await db.update({ taskId: Number(id), description, done })

    resolveResult(res, result)
  } catch (error) {
    res.status(STATUS.serverError).send({ error })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    const result = await db.delete({ taskId: Number(id) })

    resolveResult(res, result)
  } catch (error) {
    res.status(STATUS.serverError).send({ error })
  }
})

export default router
