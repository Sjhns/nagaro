'use client'

import { memo, useState } from 'react'
import { AiOutlineGlobal } from 'react-icons/ai'
import { TfiWrite } from 'react-icons/tfi'
import Feed from './feed'
import { WorkSpace } from './workspace'

const Global = () => {
  const [feedOrWorkspace, setFeedOrWorkspace] = useState<'feed' | 'workspace'>(
    'feed',
  )

  return (
    <div className="flex-1 relative w-full min-h-screen border-r border-white-transparent">
      <div className="pt-3 w-full flex items-center border-b border-divider-color">
        <div
          className={`flex-1 flex items-center justify-center hover:cursor-pointer
          p-3 ${
            feedOrWorkspace === 'feed'
              ? 'border-b-2 border-blue-500'
              : 'border-none  hover:bg-[#38383845]'
          }
 
            `}
          onClick={() => {
            setFeedOrWorkspace('feed')
          }}
        >
          {/* <button className="text-gray-300 font-semibold">Global</button> */}
          <AiOutlineGlobal className="text-lg mr-2" />
          Feed Global
        </div>
        <div
          className={`flex-1 flex items-center justify-center 
          hover:cursor-pointer p-3 ${
            feedOrWorkspace === 'workspace'
              ? 'border-b-2 border-blue-500'
              : 'border-none  hover:bg-[#38383845]'
          }
        `}
          onClick={() => {
            setFeedOrWorkspace('workspace')
          }}
        >
          <TfiWrite className="text-lg mr-2" />
          Área de Publicação
        </div>
      </div>

      {feedOrWorkspace === 'feed' && <Feed />}

      {feedOrWorkspace === 'workspace' && <WorkSpace />}
    </div>
  )
}

export default memo(Global)
