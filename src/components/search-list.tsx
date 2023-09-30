'use client'

import { useSubscribe } from 'nostr-hooks'
import { Note } from './note'
import { RELAYS } from '@/constants/relays'

type Props = {
  hashTag: string
}

export const SearchList = ({ hashTag }: Props) => {
  const { events: noteEvents } = useSubscribe({
    relays: RELAYS,
    filters: [
      {
        kinds: [1],
        '#t': [hashTag],
        limit: 10,
      },
    ],
    options: {
      enabled: !!hashTag,
      invalidate: true,
    },
  })

  return (
    <div className="flex-1 flex flex-col w-full min-h-screen">
      <div className="flex items-center border-b border-divider-color">
        <span
          className="flex-1 flex items-center justify-center 
          bg-white-transparent p-3"
        >
          Foram encontrados {noteEvents.length} resultados para a busca por
          <span className="font-bold ml-1">{hashTag}</span>
        </span>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        {noteEvents.map((event) => (
          <Note key={event.id} id={event.id} />
        ))}
      </div>
    </div>
  )
}
