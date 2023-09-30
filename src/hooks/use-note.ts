import { RELAYS } from '@/constants/relays'
import { useSubscribe } from 'nostr-hooks'
import { nip19 } from 'nostr-tools'

export const useNoteEventById = (id: string) => {
  const { events: noteEvents, eose: noteEose } = useSubscribe({
    relays: RELAYS,
    filters: [{ ids: [id] }],
    options: {
      enabled: !!id,
    },
  })

  const isFetching = !noteEose && !noteEvents.length
  const isNoteEmpty = noteEose && !noteEvents.length

  const nip19NoteId = noteEvents.length
    ? nip19.noteEncode(noteEvents[0].id)
    : ''

  return {
    noteEvent: noteEvents[0],
    noteEose,
    isFetching,
    isNoteEmpty,
    nip19NoteId,
  }
}
