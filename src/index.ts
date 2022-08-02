import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { ORIGIN, STATUS, PORT } from './constants'
import todos from './routes/todos'

const app = express()

app.disable('x-powered-by')
app.use(
  helmet({
    referrerPolicy: { policy: 'no-referrer' },
  })
)
app.use(express.json())
app.use(
  cors({
    origin: ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
)
app.use(express.urlencoded({ extended: true }))
app.use('/todos', todos)

app.use((req, res) => {
  res.status(STATUS.clientError).send('Unknown problem')
})

app.use((err: Error, req: any, res: any) => {
  console.error(err.stack)
  res.status(STATUS.serverError).send(err?.message || 'Unknown problem')
})

app.listen(PORT, () => console.log('Listening on ' + PORT))
