'use client'

import { useSubscribe } from 'nostr-hooks'
import { RELAYS } from '@/constants/relays'
import { useState } from 'react'

export const useGlobalNotes = () => {
  const oneHourAgo = new Date().getTime() - 3600000

  const [updateEvent, setUpdateEvent] = useState(false)
  const toogleUpdateEvent = () => {
    setUpdateEvent((old) => true)
  }

  const { events: noteEvents, eose: noteEose } = useSubscribe({
    relays: RELAYS,
    filters: [{ kinds: [1], until: oneHourAgo, limit: 30 }],
    options: { invalidate: updateEvent },
  })

  const isFetching = !noteEose && !noteEvents.length
  const isNoteEmpty = noteEose && !noteEvents.length

  return {
    noteEvents,
    noteEose,
    isFetching,
    isNoteEmpty,
    toogleUpdateEvent,
  }
}
