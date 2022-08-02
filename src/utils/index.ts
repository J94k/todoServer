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
