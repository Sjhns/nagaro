'use client'

import { Note } from '@/components/note'
import { useGlobalNotes } from '@/hooks/use-global-notes'
import { memo, useState } from 'react'
import { AiOutlineGlobal } from 'react-icons/ai'
import { TfiWrite } from 'react-icons/tfi'
import { LoadMoreButton } from './load-more-button'
import { Spinner } from './spinner'
import { CreateNote } from './publish-note'

const FeedGlobal = () => {
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false)
  const [feedOrPublish, setFeedOrPublish] = useState<'feed' | 'publish'>(
    'publish',
  )

  const { isFetching, isNoteEmpty, noteEvents } = useGlobalNotes()

  if (isNoteEmpty)
    return (
      <div className="flex-1 flex items-center justify-center  relative min-h-screen">
        <p className="text-gray-300 font-semibold">No Posts</p>
      </div>
    )

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
            <LoadMoreButton setShowLoadMoreButton={setShowLoadMoreButton} />
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
