'use client'

import { useSubscribe } from 'nostr-hooks'
import { RELAYS } from '@/constants/relays'
import { useRef, useState } from 'react'
import { dateToUnix } from '@/functions/date-to-unix'

export const useGlobalNotes = () => {
  const [updateEvent, setUpdateEvent] = useState(false)

  const toogleUpdateEvent = () => {
    setUpdateEvent(true)
  }

  const now = useRef(new Date())

  const { events: noteEvents, eose: noteEose } = useSubscribe({
    relays: RELAYS,
    filters: [
      {
        kinds: [1],
        until: dateToUnix(now.current),
        limit: 30,
      },
    ],
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
