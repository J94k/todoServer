import express from 'express'
import { STATUS } from '../constants'
import db from '../db'
import { Read } from '../db/types'
import { resolveResult } from './common'
import { isTaskDataValid } from '../utils'

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
    const { username, email, description } = req.body

    if (!isTaskDataValid({ username, email, description })) {
      res.status(STATUS.clientError).send({
        msg: 'Invalid data',
      })
      return
    }

    const result = await db.create({ username, email, description })

    resolveResult(res, result)
  } catch (error) {
    res.status(STATUS.serverError).send({ error })
  }
})

router.put('/', async (req, res) => {
  try {
    res.status(STATUS.serverError).send({
      msg: 'Unavailable',
    })
  } catch (error) {
    res.status(STATUS.serverError).send({ error })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    res.status(STATUS.serverError).send({
      msg: 'Unavailable',
    })
  } catch (error) {
    res.status(STATUS.serverError).send({ error })
  }
})

export default router
