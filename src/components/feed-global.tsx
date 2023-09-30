'use client'

import { Note } from '@/components/note'
import { useGlobalNotes } from '@/hooks/use-global-notes'
import { memo, useEffect, useState } from 'react'
import { AiOutlineGlobal } from 'react-icons/ai'
import { TfiWrite } from 'react-icons/tfi'
import { LoadMoreButton } from './load-more-button'
import { Spinner } from './spinner'
import { CreateNote } from './publish-note'

const FeedGlobal = () => {
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false)
  const [feedOrPublish, setFeedOrPublish] = useState<'feed' | 'publish'>('feed')

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
    <div className="flex-1 relative min-h-screen border-r border-white-transparent">
      <div className="pt-3 flex items-center border-b border-divider-color">
        <div
          className={`flex-1 flex items-center justify-center hover:cursor-pointer
          p-3 ${
            feedOrPublish === 'feed'
              ? 'border-b-2 border-blue-500'
              : 'border-none  hover:bg-[#38383845]'
          }
 
            `}
          onClick={() => {
            setFeedOrPublish('feed')
          }}
        >
          {/* <button className="text-gray-300 font-semibold">Global</button> */}
          <AiOutlineGlobal className="text-lg mr-2" />
          Feed Global
        </div>
        <div
          className={`flex-1 flex items-center justify-center 
          hover:cursor-pointer p-3 ${
            feedOrPublish === 'publish'
              ? 'border-b-2 border-blue-500'
              : 'border-none  hover:bg-[#38383845]'
          }
        `}
          onClick={() => {
            setFeedOrPublish('publish')
          }}
        >
          {/* <button className="text-gray-300 font-semibold">Publicações</button> */}
          <TfiWrite className="text-lg mr-2" />
          Área de Publicação
        </div>
      </div>

      {feedOrPublish === 'feed' && (
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
      )}

      {feedOrPublish === 'publish' && (
        <div className="pt-1">
          <CreateNote />
        </div>
      )}
    </div>
  )
}

export default memo(FeedGlobal) // o memo faz com que o componente não seja renderizado novamente caso não haja alteração no estado
