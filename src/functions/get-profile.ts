import { RELAYS } from '@/constants/relays'
import { NostrSingleton } from '@/infra/providers/pool-singleton'

export type User =
  | {
      pubkey: string
      name?: string | undefined
      username?: string | undefined
      display_name?: string | undefined
      picture?: string | undefined
      banner?: string | undefined
      about?: string | undefined
      website?: string | undefined
      lud06?: string | undefined
      lud16?: string | undefined
      nip05?: string | undefined
    }
  | undefined

export const getProfile = async (pubkey: string): Promise<User> => {
  const poolInstance = NostrSingleton.getInstance()
  const nostrClient = poolInstance.getClient()

  const sub = await nostrClient.list(RELAYS, [
    {
      kinds: [0],
      authors: [pubkey],
    },
  ])

  if (!sub || sub.length === 0) {
    return undefined
  }

  const profile = sub[0]?.content

  const data = JSON.parse(profile)

  return { ...data, pubkey }
}
