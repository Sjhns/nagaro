import { RELAYS } from '@/constants/relays'
import { useProfileAddressHex } from '@/hooks/use-profile'
import { useSubscribe } from 'nostr-hooks'

export const useProfileNotes = (profileAddress: string) => {
  const profileHex = useProfileAddressHex(profileAddress)

  const { events: noteEvents, eose: noteEose } = useSubscribe({
    relays: RELAYS,
    filters: [{ authors: [profileHex], kinds: [1], limit: 6 }],
    options: { enabled: !!profileHex, invalidate: true },
  })

  const isFetchingNotes = !noteEose && !noteEvents.length
  const isNoteEmpty = noteEose && !noteEvents.length

  return {
    isFetchingNotes,
    isNoteEmpty,
    noteEvents,
    noteEose,
  }
}
