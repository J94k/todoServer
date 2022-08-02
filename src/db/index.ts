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
    return new Promise(async (resolve, reject) => {
      this.db.query(
        'INSERT INTO todo(description) VALUES($1) RETURNING *',
        [description],
        (err: PostgresqlError, res: PostgresqlResponse<any>) => {
          if (err) return reject(err)

          resolve(res.rows[0])
        }
      )
    })
  }

  async read(target: Read, id?: string) {
    return new Promise((resolve, reject) => {
      switch (target) {
        case Read.all:
          this.db.query(
            'SELECT * FROM todo',
            (err: PostgresqlError, res: PostgresqlResponse<TodoRow>) => {
              if (err) return reject(err)

              resolve(res.rows)
            }
          )
          break
        case Read.one:
          this.db.query(
            'SELECT * FROM todo WHERE todo_id = $1',
            [id],
            (err: PostgresqlError, res: PostgresqlResponse<TodoRow>) => {
              if (err) return reject(err)

              resolve(res.rows[0])
            }
          )
          break
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
