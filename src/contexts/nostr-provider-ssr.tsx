/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable spaced-comment */

'use client'

import { NostrProvider as NostrProviderFromNostrReact } from 'nostr-react'
//@ts-ignore
import { NostrProvider as NostrProviderFromUseNostr } from '@cmdcode/use-nostr'

type Props = {
  children: React.ReactNode
  relayUrls: string[]
}

export const NostrProviderFromNostrReactSSR = ({
  children,
  relayUrls,
}: Props) => {
  return (
    <>
      <NostrProviderFromNostrReact relayUrls={relayUrls} debug={true}>
        {children}
      </NostrProviderFromNostrReact>
    </>
  )
}

export const NostrProviderFromUseNostrSSR = ({ children }: Partial<Props>) => {
  return (
    <>
      <NostrProviderFromUseNostr>{children}</NostrProviderFromUseNostr>
    </>
  )
}
