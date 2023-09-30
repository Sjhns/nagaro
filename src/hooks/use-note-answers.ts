'use client'

import { RELAYS } from '@/constants/relays'
import { useSubscribe } from 'nostr-hooks'
import { useProfileAddressHex } from './use-profile'
import { useNoteIdConvertToHex } from './use-note-hex'
import { useSearchParams } from 'next/navigation'

export const useNoteAnswers = (noteId: string) => {
  const searchParams = useSearchParams()
  const npubAuthor = searchParams.get('npub')!

  const noteIdHex = useNoteIdConvertToHex(noteId)
  const authorHex = useProfileAddressHex(npubAuthor)

  const { events: answersEvents, eose: answersEose } = useSubscribe({
    relays: RELAYS,
    filters: [{ '#e': [noteIdHex], '#p': [authorHex], kinds: [1] }],
    options: {
      enabled: !!noteIdHex && !!authorHex,
    },
  })

  console.log({
    noteIdHex,
    authorHex,
    answersEvents,
    answersEose,
  })

  const isFetchingAnswers = !answersEose && !answersEvents.length
  const isAnswersEmpty = answersEose && !answersEvents.length

  return {
    answersEvents,
    answersEose,
    isFetchingAnswers,
    isAnswersEmpty,
  }
}
