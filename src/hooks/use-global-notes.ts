'use client'

import { useSubscribe } from 'nostr-hooks'
import { RELAYS } from '@/constants/relays'

export const useGlobalNotes = () => {
  const oneHourAgo = new Date().getTime() - 3600000

  const { events: noteEvents, eose: noteEose } = useSubscribe({
    relays: RELAYS,
    filters: [{ kinds: [1], until: oneHourAgo, limit: 30 }],
    options: { invalidate: true },
  })

  const isFetching = !noteEose && !noteEvents.length
  const isNoteEmpty = noteEose && !noteEvents.length

  return {
    noteEvents,
    noteEose,
    isFetching,
    isNoteEmpty,
  }
}
