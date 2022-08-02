export interface DBConfig {
  PGUSER: string
  PGHOST: string
  PGDATABASE: string
  PGPORT: string | number
  PGPASSWORD: string
}

export interface PostgresqlError {}

export interface PostgresqlResponse<T> {
  rows: T[]
}

export interface TodoRow {
  todo_id: number
  description: string
}

export enum Read {
  all,
  one,
}
