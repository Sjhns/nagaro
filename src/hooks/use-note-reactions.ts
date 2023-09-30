import { RELAYS } from '@/constants/relays'
import { useSubscribe } from 'nostr-hooks'

export const useNoteReactions = (noteId: string) => {
  const { events: reactionEvents, eose: reactionEose } = useSubscribe({
    relays: RELAYS,
    filters: [{ '#e': [noteId], kinds: [1, 7, 9735] }],
  })

  const isFetchingReactions = !reactionEose && !reactionEvents.length
  const isReactionsEmpty = reactionEose && !reactionEvents.length

  const answers = reactionEvents.filter((e) => e.kind === 1).length ?? 0
  const like = reactionEvents.filter((e) => e.kind === 7).length ?? 0
  const zap = reactionEvents.filter((e) => e.kind === 9735).length ?? 0

  return {
    answers,
    like,
    zap,
    reactionEvents,
    reactionEose,
    isFetchingReactions,
    isReactionsEmpty,
  }
}
