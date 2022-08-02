import { STATUS } from '../constants'

export function resolveResult(res: any, data: any) {
  if (data) {
    res.status(STATUS.success).json({
      data,
    })
    return
  }

  res.status(STATUS.notFound).json({
    msg: 'Not found',
  })
}
