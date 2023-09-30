import { Note } from '@/components/note'
import { useGlobalNotes } from '@/hooks/use-global-notes'
import { memo, useEffect, useState } from 'react'

import { Spinner } from '../spinner'

const Feed = () => {
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false)

  const { isFetching, noteEvents, toogleUpdateEvent } = useGlobalNotes()

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

  if (isFetching)
    return (
      <div className="flex-1 flex items-center justify-center  relative min-h-screen">
        <Spinner />
      </div>
    )

  return (
    <div>
      {noteEvents.map((note) => (
        <Note key={`global@${note.id}.${note.pubkey}`} id={note.id} />
      ))}

      {showLoadMoreButton && (
        <div className="fixed bottom-16 md:bottom-8 justify-center items-center z-10 flex w-full md:w-1/2 pb-safe-area">
          <button
            className="p-2 text-xs rounded-full opacity-90 hover:opacity-100 hover:bg-iris-blue bg-iris-blue text-white font-semibold"
            style={{ transition: 'opacity 0.3s ease' }}
            onClick={toogleUpdateEvent}
          >
            Carregar mais eventos
          </button>
        </div>
      )}
    </div>
  )
}

export default memo(Feed)
