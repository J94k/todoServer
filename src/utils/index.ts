import db from '../db'
import { Read } from '../db/types'

export function isTaskDataValid({
  username,
  email,
  description,
}: {
  username: string
  email: string
  description: string
}) {
  return Boolean(username && email && description)
}

export async function isValidAdminData({
  username,
  passHash,
}: {
  username: string
  passHash: string
}): Promise<boolean | unknown> {
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
