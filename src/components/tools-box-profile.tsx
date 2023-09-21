'use client'

import Link from 'next/link'
// import { GlobalContext } from '@/functions/context'
import { useContext } from 'react'
import { BsThreeDots } from 'react-icons/bs'

type ToolsBoxProfileProps = {
  pubkey: string
}

export const ToolsBoxProfile = ({ pubkey }: ToolsBoxProfileProps) => {
  // const sessionCurrent = useContext(GlobalContext)
  const sessionCurrent = {
    pubkey: 'pubkey',
  }

  return (
    <>
      {sessionCurrent.pubkey !== pubkey && (
        <div className="flex items-center space-x-3">
          <Link href={'/edit'} prefetch={false}>
            <button
              className="bg-gray-100 hover:opacity-95 text-black text-xs rounded-full px-4
          font-semibold py-2"
            >
              Editar perfil
            </button>
          </Link>

          <span className="ml-auto p-2 rounded-full hover:bg-white-transparent text-gray-500 hover:cursor-pointer text-lg">
            <BsThreeDots />
          </span>
        </div>
      )}

      {sessionCurrent.pubkey === pubkey && (
        <div className="flex items-center space-x-3">
          <button
            className="bg-gray-100 hover:opacity-95 text-black text-xs rounded-full px-4
              font-semibold py-2"
          >
            Seguir
          </button>

          <span className="ml-auto p-2 rounded-full hover:bg-white-transparent text-gray-500 hover:cursor-pointer text-lg">
            <BsThreeDots />
          </span>
        </div>
      )}
    </>
  )
}
