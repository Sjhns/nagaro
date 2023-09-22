import { formatDistanceToNow } from 'date-fns'

export const formatTimeAgoTypeNumber = (createdAt: number) => {
  const date = new Date(createdAt * 1000)
  // return date.toISOString().split('T')[0]
  return formatDistanceToNow(date, { addSuffix: true })
}

export const formatTimeAgoTypeString = (createdAt: string) => {
  const date = new Date(createdAt)
  return formatDistanceToNow(date, { addSuffix: true })
}
