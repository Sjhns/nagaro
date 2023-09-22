'use client'

import { useNostrEvents } from 'nostr-react'
import { Note } from './note'

type Props = {
  hashTag: string
}

export const SearchList = ({ hashTag }: Props) => {
  const { events: allEvents } = useNostrEvents({
    filter: {
      kinds: [1],
      '#t': [hashTag],
    },
    enabled: !!hashTag,
  })

  const firstsTenEvents = allEvents.slice(0, 50)

  const extractPubkey = firstsTenEvents.map((e) => e.pubkey)

  const { events: profiles, isLoading: isLoadingProfile } = useNostrEvents({
    filter: {
      authors: extractPubkey,
      kinds: [0],
    },
  })

  const eventsMetadata = firstsTenEvents.map((e) => {
    const data = profiles.find((a) => a.pubkey === e.pubkey)

    if (!data) {
      return e
    }

    const author = JSON.parse(data.content)

    return {
      ...e,
      author,
    } as any
  })

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="flex items-center border-b border-divider-color">
        <span
          className="flex-1 flex items-center justify-center 
          bg-white-transparent p-3"
        >
          Os {firstsTenEvents.length} primeiros resultados para
          <span className="font-bold ml-1">{hashTag}</span>
        </span>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        {eventsMetadata?.map((event) => (
          <Note
            pubkey={event.pubkey}
            key={event.id}
            id={event.id}
            name={event.author?.name ?? event.author?.display_name}
            avatar={event.author?.picture}
            time={event.created_at}
            content={event.content}
            likes={0}
            answers={0}
            shares={0}
            tags={event.tags}
          />
        ))}
      </div>
    </div>
  )
}
