import { Event } from 'nostr-tools'

export const sortByDescendingDate = (events: Event[]) => {
  events.sort((eventA, eventB) => {
    const dataA = eventA.created_at
    const dataB = eventB.created_at

    return dataB - dataA
  })

  return events
}
