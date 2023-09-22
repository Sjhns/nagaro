'use client'

import { Note } from '@/components/note'
import { EventMetadata } from '@/functions/get-events-from-user'
import { dateToUnix, useNostrEvents, useProfile } from 'nostr-react'
import { Event } from 'nostr-tools'
import { useEffect, useRef, useState } from 'react'
import { AiOutlineGlobal } from 'react-icons/ai'
import { TfiWrite } from 'react-icons/tfi'

export const FeedGlobal = () => {
  const now = useRef(new Date())
  const maxEventsToShow = 100

  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false)

  const [visibleEvents, setVisibleEvents] = useState(maxEventsToShow)

  const { events, isLoading } = useNostrEvents({
    filter: {
      since: dateToUnix(now.current),
      kinds: [1],
    },
  })

  const extractPubkey = events.map((e) => e.pubkey)

  const { events: profiles, isLoading: isLoadingProfile } = useNostrEvents({
    filter: {
      authors: extractPubkey,
      kinds: [0],
    },
  })

  const data = events.map((e): EventMetadata => {
    const data = profiles.find((a) => a.pubkey === e.pubkey)

    if (!data) {
      return e
    }

    const author = JSON.parse(data.content)

    return {
      ...e,
      author,
    } as EventMetadata
  })

  // remover eventos duplicados
  const eventsMetadata = data.reduce((acc, event) => {
    const eventAlreadyExists = acc.find((e) => e.id === event.id)

    if (!eventAlreadyExists) {
      acc.push(event)
    }

    return acc

    // return acc.find((e) => e.id === event.id) ? acc : [...acc, event]
  }, [] as EventMetadata[])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollThreshold = 200

      if (documentHeight - scrollY - windowHeight < scrollThreshold) {
        setShowLoadMoreButton(true)
      } else {
        setShowLoadMoreButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="flex-1 relative min-h-screen">
      <div className="flex items-center border-b border-divider-color">
        <div
          className="flex-1 flex items-center justify-center
         bg-white-transparent p-3"
        >
          {/* <button className="text-gray-300 font-semibold">Global</button> */}
          <AiOutlineGlobal className="text-xl ml-2" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          {/* <button className="text-gray-300 font-semibold">Publicações</button> */}
          <TfiWrite className="text-xl ml-2" />
        </div>
      </div>

      <div>
        {eventsMetadata.map((event) => (
          <Note
            key={event.id}
            id={event.id}
            pubkey={event.pubkey}
            avatar={event.author?.picture}
            name={event.author?.username ?? event.author?.name}
            time={event.created_at}
            content={event.content}
            likes={0}
            shares={0}
            tags={event.tags}
          />
        ))}
      </div>

      {!events.length && (
        <div className="flex items-center justify-center w-full min-h-screen">
          <span className="text-gray-500 text-xl text-center">
            Clique em &quot;Carregar mais eventos&quot; para carregar os eventos
          </span>
        </div>
      )}

      {showLoadMoreButton && (
        <div className="fixed bottom-16 md:bottom-8 justify-center items-center z-10 flex w-full md:w-1/2 pb-safe-area">
          <button
            className="p-2 text-xs rounded-full opacity-90 hover:opacity-100 hover:bg-iris-blue bg-iris-blue text-white font-semibold"
            onClick={() => setVisibleEvents(visibleEvents + maxEventsToShow)}
            style={{ transition: 'opacity 0.3s ease' }}
          >
            Carregar mais eventos
          </button>
        </div>
      )}
    </div>
  )
}
