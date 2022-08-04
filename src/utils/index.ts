import jwt from 'jsonwebtoken'
import db from '../db'
import { Read } from '../db/types'
import { REGEXP, JWT_SECRET } from '../constants'

export function isTaskDataValid({
  username,
  email,
  description,
}: {
  username: string
  email: string
  description: string
}) {
  return Boolean(
    username.match(REGEXP.username) &&
      email.match(REGEXP.email) &&
      description.match(REGEXP.taskDescription)
  )
}

export async function isValidAdminData({
  username,
  passHash,
}: {
  username: string
  passHash: string
}): Promise<{ success: boolean }> {
  try {
    const result = await db.read(Read.admin, {
      username,
    })

    return {
      //@ts-ignore
      success: result ? passHash === result.hash : false,
    }
  } catch (error) {
    throw error
  }
}

export function generateToken({
  username,
  passHash,
}: {
  username: string
  passHash: string
}) {
  return jwt.sign(
    {
      user: {
        name: username,
        passHash,
      },
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}
