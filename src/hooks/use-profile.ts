'use client'

import { RELAYS } from '@/constants/relays'
import { ProfileMetadata } from '@/types/profile-metadata'
import { useSubscribe } from 'nostr-hooks'
import { nip05, nip19 } from 'nostr-tools'
import { useEffect, useState } from 'react'

// ----------------- 1 etapa ---------------------------
//   1 etapa: Obter o tipo de endereço do perfil
type profileAddressType = 'nip05' | 'nip19' | 'hex' | 'unknown'

const getProfileAddressType = (profileAddress: string): profileAddressType => {
  if (profileAddress.includes('%40')) {
    return 'nip05'
  } else if (profileAddress.startsWith('npub1')) {
    return 'nip19'
  } else if (profileAddress.length === 64) {
    return 'hex'
  } else {
    return 'unknown'
  }
}

// -----------------------2 etapa ---------------------
// 2 etapa: Converter o endereço do perfil para hex
export const convertProfileAddressToHex = async (profileAddress: string) => {
  const profileAddressType = getProfileAddressType(profileAddress)

  if (profileAddressType === 'nip05') {
    const profile = await nip05.queryProfile(profileAddress.replace('%40', '@'))

    if (!profile?.pubkey) {
      throw new Error('profile not found')
    }

    return profile.pubkey
  } else if (profileAddressType === 'nip19') {
    const { data } = nip19.decode(profileAddress)

    if (!data) throw new Error('profile not found')

    return data.toString()
  } else if (profileAddressType === 'hex') {
    return profileAddress
  } else {
    throw new Error('profile not found')
  }
}

// ---------------------- 3 etapa ---------------------
//  3 etapa: Obter o endereço hex do perfil
export const useProfileAddressHex = (profileAddress: string) => {
  const [profileHex, setProfileHex] = useState('')

  useEffect(() => {
    if (!profileAddress) return

    const profileAddressType = async () => {
      const hex = await convertProfileAddressToHex(profileAddress)

      setProfileHex(hex)
    }

    profileAddressType()
  }, [profileAddress])

  return profileHex
}

// ---------------- 4 etapa ---------------------
// 4 etapa: Obter os metadados do perfil

export const useProfile = (profileAddress: string) => {
  const profileHex = useProfileAddressHex(profileAddress)
  const [invalidated, setInvalidated] = useState(false)

  const handleInvalidate = () => {
    setInvalidated(true)
    // setTimeout(() => setInvalidated(false), 1000)
  }

  const { events: metadataEvents, eose: metadataEose } = useSubscribe({
    relays: RELAYS,
    filters: [{ authors: [profileHex], kinds: [0] }],
    options: { enabled: !!profileHex, invalidate: invalidated },
  })

  const isFetchingMetadata = !metadataEose && !metadataEvents.length
  const isMetadataEmpty = metadataEose && !metadataEvents.length

  const profileObject =
    metadataEvents.length && JSON.parse(metadataEvents[0].content || '{}')

  const profile: ProfileMetadata = {
    about: profileObject.about || '',
    banner: profileObject.banner || '',
    lud06: profileObject.lud06 || '',
    name: profileObject.name || '',
    nip05: profileObject.nip05 || '',
    picture: profileObject.picture || '',
    website: profileObject.website || '',
    displayName: profileObject.display_name || profileObject.name,
    lud16: profileObject.lud16 || '',
    username: profileObject.username || '',
    created_at: metadataEvents[0]?.created_at ?? 0,
    id: metadataEvents[0]?.id ?? '',
    tags: metadataEvents[0]?.tags || [],
  }

  const npub = metadataEvents.length
    ? nip19.npubEncode(metadataEvents[0].pubkey)
    : ''

  return {
    profile,
    npub,
    isFetchingMetadata,
    isMetadataEmpty,
    handleInvalidate,
  }
}
