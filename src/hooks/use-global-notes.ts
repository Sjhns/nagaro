'use client'

import { useSubscribe } from 'nostr-hooks'
import { RELAYS } from '@/constants/relays'
import { useRef, useState } from 'react'
import { dateToUnix } from '@/functions/date-to-unix'
import { blackList } from '@/constants/black-list'

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

  const filteredNoteEvents = noteEvents.filter((event) => {
    const content = event.content.toLowerCase() // Converter para minúsculas para comparação não sensível a maiúsculas e minúsculas

    // Verificar se o conteúdo contém alguma palavra-chave proibida
    for (const bannedWord of blackList) {
      if (content.includes(bannedWord.toLowerCase())) {
        return false // Ignorar este evento
      }
    }

    return true // Manter o evento se não contiver palavras-chave proibidas
  })

  const isFetching = !noteEose && !noteEvents.length
  const isNoteEmpty = noteEose && !noteEvents.length

  return {
    noteEvents: filteredNoteEvents,
    noteEose,
    isFetching,
    isNoteEmpty,
    toogleUpdateEvent,
  }
}
