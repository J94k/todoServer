import dotenv from 'dotenv'

dotenv.config()

const {
  ORIGIN_SOURCE,
  PORT: ENV_PORT,
  PGUSER = 'postgres',
  PGHOST = 'localhost',
  PGDATABASE = 'todo_db',
  PGPORT = 5432,
  PGPASSWORD = '',
} = process.env

export const DB_CONFIG = {
  PGUSER,
  PGHOST,
  PGDATABASE,
  PGPORT,
  PGPASSWORD,
}
export const PORT = ENV_PORT || 5000
export const ORIGIN = ORIGIN_SOURCE || 'http://localhost:3000'

export const STATUS = {
  unauthenticated: 401,
  success: 200,
  clientError: 400,
  serverError: 500,
  notFound: 404,
}
