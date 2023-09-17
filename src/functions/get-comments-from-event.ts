import { RELAYS } from '@/constants/relays'
import { NostrSingleton } from '@/infra/providers/pool-singleton'
import { sortByDescendingDate } from '@/utils/sortByDescendingDate'

export const getAnswersFromEvent = async (id: string, pubkeyAuthor: string) => {
  const poolInstance = NostrSingleton.getInstance()
  const nostrClient = poolInstance.getClient()

  const allAnswersToEvent = await nostrClient.list(RELAYS, [
    {
      kinds: [1],
      '#e': [id],
      '#p': [pubkeyAuthor],
    },
  ])

  const extractPubkey = allAnswersToEvent.map((e) => e.pubkey)

  const allAuthors = await nostrClient.list(RELAYS, [
    {
      kinds: [0],
      authors: extractPubkey,
    },
  ])

  const answers = allAnswersToEvent.map((event) => {
    const data = allAuthors.find((a) => a.pubkey === event.pubkey)

    if (!data) {
      return event
    }

    const author = JSON.parse(data.content)

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
  })

  return sortByDescendingDate(answers)
}
