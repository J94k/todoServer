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

  async create({
    username,
    email,
    description,
  }: {
    username: string
    email: string
    description: string
  }) {
    /* 
    if the client exist
      take client_id and set a new task for him
    else
      create a new client
      take client_id and set a new task for him
    */
    return new Promise(async (resolve, reject) => {
      this.db.query(
        'INSERT INTO task(description) VALUES($1) RETURNING *',
        [description],
        (err: PostgresqlError, res: PostgresqlResponse<any>) => {
          if (err) return reject(err)

          resolve(res.rows[0])
        }
      )
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
          this.db.query(
            'SELECT * FROM task',
            (err: PostgresqlError, res: PostgresqlResponse<TodoRow>) => {
              if (err) return reject(err)

              resolve(res.rows)
            }
          )
          break
        case Read.task:
          response = await this.db.query(
            'SELECT * FROM task WHERE todo_id = $1',
            [id]
          )
          resolve(response.rows[0])
          break
        case Read.admin:
          response = await this.db.query(
            'SELECT id, name FROM client WHERE name = $1',
            [username]
          )

          if (!response.rowCount) return resolve(null)

          const admin = response.rows[0]

          response = await this.db.query(
            'SELECT pass FROM administrator WHERE client_id = $1',
            [admin.id]
          )

          resolve({ username: admin.name, hash: response.rows[0].pass })
        default:
          resolve(null)
      }
    })
  }

  async update() {
    return new Promise((resolve, reject) => {
      this.db.query(
        '',
        (err: PostgresqlError, res: PostgresqlResponse<any>) => {
          if (err) return reject(err)
        }
      )
    })
  }

  async delete() {
    return new Promise((resolve, reject) => {
      this.db.query(
        '',
        (err: PostgresqlError, res: PostgresqlResponse<any>) => {
          if (err) return reject(err)
        }
      )
    })
  }
}

export default new DB(DB_CONFIG)
