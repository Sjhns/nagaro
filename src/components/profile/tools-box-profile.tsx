'use client'

import { AuthContext } from '@/contexts/use-auth'
import { useProfileAddressHex } from '@/hooks/use-profile'
import Link from 'next/link'
import { useContext } from 'react'
import { BsThreeDots } from 'react-icons/bs'

type Props = {
  npub: string
}

export const ToolsBoxProfile = ({ npub }: Props) => {
  const { user } = useContext(AuthContext)
  const addressHex = useProfileAddressHex(npub)

  return (
    <>
      {user?.npub === addressHex && (
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

      {user?.npub !== addressHex && (
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
