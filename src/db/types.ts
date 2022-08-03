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
  id: number
  client_id: number
  description: string
  done: boolean
}

export enum Read {
  tasks,
  task,
  users,
  user,
  admins,
  admin,
}
