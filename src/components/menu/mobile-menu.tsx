'use client'

import React, { useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineMessage,
  AiOutlineSetting,
} from 'react-icons/ai'
import { BiLogOutCircle } from 'react-icons/bi'
import { BsInfoCircle } from 'react-icons/bs'
import { AuthContext } from '@/contexts/use-auth'
import { useProfile } from '@/hooks/use-profile'
import { Avatar } from '../avatar'

export const MobileMenu = () => {
  const { logout, user } = useContext(AuthContext)

  const { isFetchingMetadata, profile, npub } = useProfile(user?.npub ?? '')
  const pathname = usePathname()

  const items = [
    {
      id: 1,
      icon: <AiOutlineHome />,
      title: 'Home',
      url: '/global',
    },
    {
      id: 2,
      icon: <AiOutlineSearch />,
      title: 'Pesquisar',
      url: '/search',
    },
    {
      id: 3,
      icon: <AiOutlineMessage />,
      title: 'Mensagens',
      url: '/chat',
    },
    {
      id: 89,
      icon: (
        <Profile
          name={profile.name ?? profile.displayName}
          picture={profile.picture}
          show={!!profile && !isFetchingMetadata}
          npub={npub}
          activate={pathname.includes(`/profile`)}
        />
      ),
      title: '',
      url: `/profile/${npub}`,
    },
    {
      id: 4,
      icon: <AiOutlineSetting />,
      title: 'Configurações',
      url: '/settings',
    },
    {
      id: 5,
      icon: <BsInfoCircle />,
      title: 'Sobre',
      url: '/about',
    },
  ]

  return (
    <div className="fixed bottom-0 z-50 left-0 w-full bg-[#000] p-2 lg:hidden">
      <div className="flex justify-around items-center text-white">
        {items.map((item) => (
          <Link href={item.url} key={item.id}>
            <div
              className={`flex flex-col items-center ${
                pathname === item.url ? 'text-blue-500' : ''
              }`}
            >
              {item.icon}
              {item.title}
            </div>
          </Link>
        ))}

        <div
          className="flex flex-col items-center hover:cursor-pointer"
          onClick={logout}
        >
          <BiLogOutCircle />
          Sair
        </div>
      </div>
    </div>
  )
}

type ProfileProps = {
  name?: string
  npub?: string
  picture?: string
  show: boolean
  activate: boolean
}

const Profile = ({ name, npub, picture, show, activate }: ProfileProps) => {
  return (
    <>
      <Link
        href={`/profile/${npub}`}
        className="mt-auto flex flex-col items-center space-x-2 px-5 py-2 w-max"
      >
        <Avatar src={picture} alt="Profile" size="sm" />

        <h3
          className={`text-gray-white-300 text-sm font-semibold ${
            activate ? 'text-blue-500' : ''
          }`}
        >
          {name ?? 'Desconhecido'}
        </h3>
      </Link>
    </>
  )
}
