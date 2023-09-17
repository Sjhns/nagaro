import { RELAYS } from '@/constants/relays'
import { NostrSingleton } from '@/infra/providers/pool-singleton'
import { User, getProfile } from './get-profile'
import { sortByDescendingDate } from '@/utils/sortByDescendingDate'
import { getAnswersFromEvent } from './get-comments-from-event'

export type EventMetadata = {
  id: string
  sig: string
  kind: number
  created_at: number
  tags: string[][]
  content: string
  pubkey: string

  totalAnswers?: number
  author?: User
}

export const getEventsFromUser = async (
  pubkey: string,
): Promise<EventMetadata[]> => {
  const poolInstance = NostrSingleton.getInstance()
  const nostrClient = poolInstance.getClient()

  const allEvents = await nostrClient.list(RELAYS, [
    {
      kinds: [1],
      authors: [pubkey],
      since: 0,
    },
  ])

  const author = await getProfile(pubkey)

  const events = allEvents.map((event) => {
    return {
      content: event.content,
      created_at: event.created_at,
      id: event.id,
      kind: event.kind,
      pubkey: event.pubkey,
      sig: event.sig,
      tags: event.tags,
      author,
    }
  }) as EventMetadata[]

  // for (let i = 0; i < events.length; i++) {
  //   const event = events[i]
  //   const countAnswers = await getAnswersFromEvent(event.id, event.pubkey)

  //   events[i] = {
  //     ...event,
  //     totalAnswers: countAnswers.length,
  //   }
  // }

  // console.log('dentro', events)

  return sortByDescendingDate(events)
}
