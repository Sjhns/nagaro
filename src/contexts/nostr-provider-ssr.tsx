'use client'

import { NostrProvider } from 'nostr-react'

type Props = {
  children: React.ReactNode
  relayUrls: string[]
}

export const NostrProviderSSR = ({ children, relayUrls }: Props) => {
  return (
    <>
      <NostrProvider relayUrls={relayUrls} debug={false}>
        {children}
      </NostrProvider>
    </>
  )
}
