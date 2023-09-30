import { formatDistanceToNow } from 'date-fns'

export const formatTimeAgoTypeNumber = (createdAt: number) => {
  return formatDistanceToNow(createdAt * 1000, { addSuffix: true })
}

export const formatTimeAgoTypeString = (createdAt: string) => {
  const date = new Date(createdAt)
  return formatDistanceToNow(date, { addSuffix: true })
}
