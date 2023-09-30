'use client'

import {
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlineSetting,
} from 'react-icons/ai'

import { CiSearch } from 'react-icons/ci'
import { BsInfoCircle } from 'react-icons/bs'
import Link from 'next/link'
import { BiLogOutCircle } from 'react-icons/bi'
import { useContext } from 'react'

import { AuthContext } from '@/contexts/use-auth'
import { useProfile } from '@/hooks/use-profile'
import { Avatar } from '../avatar'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export const DesktopMenu = () => {
  const { logout, user } = useContext(AuthContext)
  const { isFetchingMetadata, profile, npub } = useProfile(user?.npub ?? '')
  const pathname = usePathname()

  const items = [
    {
      id: 1,
      icon: <AiOutlineHome className="text-2xl" />,
      title: 'Home',
      url: '/global',
    },
    {
      id: 2,
      icon: <CiSearch className="text-2xl " />,
      title: 'Pesquisar',
      url: '/search',
    },
    {
      id: 3,
      icon: <AiOutlineMessage className="text-2xl" />,
      title: 'Mensagens',

      url: '/chat',
    },
    {
      id: 4,
      icon: <AiOutlineSetting className="text-2xl" />,
      title: 'Configurações',
      url: '/settings',
    },
    {
      id: 5,
      icon: <BsInfoCircle className="text-2xl" />,
      title: 'Sobre',
      url: '/about',
    },
  ]

  return (
    <aside
      className="sticky hidden lg:flex flex-col top-0 bottom-0 left-0 bg-[#000] h-screen
    min-w-[224px] w-56 pl-2 pt-5 pb-4 border-r border-white-transparent"
    >
      <div className="flex items-center mb-8 px-3">
        <Image
          width={100000}
          height={100000}
          src="/svgs/noodle-left.svg"
          alt="Logo"
          className="w-10 h-10 mr-2 relative top-2"
        />
        <h2 className="text-2xl font-bold text-gray-white-100">Nagaro</h2>
      </div>

      <ul className="space-y-5">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.url}
              className={`flex items-center gap-x-3 px-4 py-2.5 
              hover:bg-[#ffffff1a] hover:rounded-full w-max 
              hover:cursor-pointer
              ${pathname === item.url ? 'text-blue-500' : ''}
                `}
            >
              {item.icon}
              {item.title}
            </Link>
          </li>
        ))}

        <li
          className="flex items-center gap-x-3 px-4 py-2.5 hover:bg-[#ffffff1a] hover:rounded-full w-max hover:cursor-pointer"
          onClick={logout}
        >
          <BiLogOutCircle className="text-white text-2xl" />
          Sair
        </li>
      </ul>

      {isFetchingMetadata && (
        <div className="mt-auto flex items-center space-x-2 px-5 py-2 hover:bg-[#ffffff1a] hover:rounded-full w-max animate-pulses">
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
          <div className="w-12 h-4 bg-gray-700 rounded-full"></div>
        </div>
      )}

      {profile && !isFetchingMetadata && npub && (
        <Link
          href={`/profile/${npub}`}
          className="mt-auto flex items-center space-x-2 px-5 py-2 hover:bg-[#ffffff1a] hover:rounded-full w-max"
        >
          <Avatar src={profile.picture} alt="Profile" size="sm" />

          <h3 className="text-gray-white-300">
            {profile.name ?? profile.displayName ?? 'Unknown'}
          </h3>
        </Link>
      )}
    </aside>
  )
}
