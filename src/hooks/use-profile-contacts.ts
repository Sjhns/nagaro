'use client'

import { useSubscribe } from 'nostr-hooks'

import { useProfileAddressHex } from './use-profile'
import { RELAYS } from '@/constants/relays'

export const useProfileContacts = (profileAddress: string) => {
  const profileHex = useProfileAddressHex(profileAddress)

  const { events: contactEvents, eose: contactEose } = useSubscribe({
    relays: RELAYS,
    filters: [{ authors: [profileHex], kinds: [3] }],
    options: { enabled: !!profileHex },
  })

  const isFetchingContacts = !contactEose && !contactEvents.length
  const isContactsEmpty = contactEose && !contactEvents.length

  const totalFollowing = contactEvents[0]?.tags.length ?? 0

  const followersIds =
    contactEvents[0]?.tags
      .filter((subarray) => subarray[0] === 'p') // Filtrar os subarrays que tenham 'p' no primeiro argumento
      .map((subarray) => subarray[1]) ?? []

  return {
    isFetchingContacts,
    isContactsEmpty,
    totalFollowing,
    followersIds,
    contactEose,
  }
}
