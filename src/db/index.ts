import { Pool } from 'pg'
import { DB_CONFIG } from '../constants'
import {
  DBConfig,
  PostgresqlError,
  PostgresqlResponse,
  TodoRow,
  Read,
} from './types'

class DB {
  protected db: any

  constructor(config: DBConfig) {
    const { PGUSER, PGHOST, PGDATABASE, PGPASSWORD, PGPORT } = config

    this.db = new Pool({
      user: PGUSER,
      host: PGHOST,
      database: PGDATABASE,
      password: PGPASSWORD,
      port: Number(PGPORT),
    })
  }

  async disconnect() {
    return new Promise((resolve) => {
      this.db.end(() => {
        resolve(true)
      })
    })
  }

  async create({
    username,
    email,
    description,
  }: {
    username: string
    email: string
    description: string
  }) {
    return new Promise(async (resolve, reject) => {
      let response = await this.db.query(
        'SELECT id, name FROM client WHERE name = $1;',
        [username]
      )

      if (!response.rowCount) {
        response = await this.db.query(
          'INSERT INTO client(name, email) VALUES($1, $2) RETURNING *;',
          [username, email]
        )
      } else {
        const { email: savedEmail } = response.rows[0]

        if (savedEmail !== email) return reject(new Error('Wrong email'))
      }

      const result = await this.db.query(
        'INSERT INTO task(client_id, description) VALUES($1, $2) RETURNING *;',
        [response.rows[0].id, description]
      )

      resolve(result.rows[0])
    })
  }

  async read(
    target: Read,
    { id, username }: { id?: string; username?: string } = {}
  ) {
    return new Promise(async (resolve, reject) => {
      let response

      switch (target) {
        case Read.tasks:
          response = await this.db.query(
            'SELECT task.*, client.name, client.email FROM client INNER JOIN task ON client.id = task.client_id;'
          )
          resolve(response.rows)
          break

        case Read.task:
          response = await this.db.query(
            'SELECT * FROM task WHERE todo_id = $1;',
            [id]
          )
          resolve(response.rows[0])
          break

        case Read.admin:
          response = await this.db.query(
            'SELECT id, name FROM client WHERE name = $1;',
            [username]
          )

          if (!response.rowCount) return resolve(null)

          const admin = response.rows[0]

          response = await this.db.query(
            'SELECT pass FROM administrator WHERE client_id = $1;',
            [admin.id]
          )

          resolve({ username: admin.name, hash: response.rows[0].pass })
        default:
          resolve(null)
      }
    })
  }

  async update({
    taskId,
    description,
    done,
  }: {
    taskId: number
    description: string
    done: boolean
  }) {
    return new Promise(async (resolve) => {
      const response = await this.db.query(
        'UPDATE task SET description = $1, done = $2 WHERE id = $3 RETURNING *;',
        [description, done, taskId]
      )

      resolve(response.rows[0])
    })
  }

  async delete({ taskId }: { taskId: number }) {
    return new Promise(async (resolve, reject) => {
      const response = await this.db.query(
        'DELETE FROM task WHERE id = $1 RETURNING *;',
        [taskId]
      )

      resolve(response.rows[0])
    })
  }
}

export default new DB(DB_CONFIG)
