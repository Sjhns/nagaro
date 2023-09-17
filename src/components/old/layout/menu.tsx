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
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { GlobalContext } from '@/functions/context'

export const Menu = () => {
  const { refresh } = useRouter()
  const { user } = useContext(GlobalContext)

  const handleLogout = async () => {
    await fetch('http://localhost:3000/external/api', {
      method: 'DELETE',
    })
    refresh()
  }

  const items = [
    {
      id: 1,
      icon: <AiOutlineHome className="text-white text-2xl" />,
      title: 'Home',
      url: '/global',
    },
    {
      id: 2,
      icon: <CiSearch className="text-white text-2xl " />,
      title: 'Search',
      url: '/search',
    },
    {
      id: 3,
      icon: <AiOutlineMessage className="text-white text-2xl" />,
      title: 'Mensagens',

      url: '/messages',
    },
    {
      id: 4,
      icon: <AiOutlineSetting className="text-white text-2xl" />,
      title: 'Configurações',
      url: '/settings',
    },
    {
      id: 5,
      icon: <BsInfoCircle className="text-white text-2xl" />,
      title: 'Sobre',
      url: '/about',
    },
  ]

  return (
    <aside
      className="sticky hidden lg:flex flex-col top-0 bottom-0 left-0 bg-[#000] h-screen
    min-w-[224px] w-56 pl-2 pt-5 pb-4 border-r border-white-transparent"
    >
      <div className="flex items-end gap-x-2 mb-8 px-3">
        {/* <img src="" alt="Logo" role="img" width={34} height={34} /> */}
        <h2 className="text-2xl font-bold text-gray-white-100">Nagaro</h2>
      </div>

      <ul className="space-y-5">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.url ?? ''}
              className="flex items-center gap-x-3 px-4 py-2.5 hover:bg-[#ffffff1a] hover:rounded-full w-max hover:cursor-pointer"
            >
              {item.icon}
              {item.title}
            </Link>
          </li>
        ))}

        <li
          className="flex items-center gap-x-3 px-4 py-2.5 hover:bg-[#ffffff1a] hover:rounded-full w-max hover:cursor-pointer"
          onClick={handleLogout}
        >
          <BiLogOutCircle className="text-white text-2xl" />
          Sair
        </li>
      </ul>

      <Link
        href={`/profile/${user.pubkey}`}
        className="mt-auto flex items-center space-x-2 px-5 py-2 hover:bg-[#ffffff1a] hover:rounded-full w-max"
      >
        <img
          src={user.picture ?? `https://api.dicebear.com/7.x/identicon/svg`}
          alt="Logo"
          role="img"
          width={32}
          height={32}
          className="object-cover object-center rounded-full"
        />

        <h3 className="text-gray-white-300">
          {user.name ?? user.display_name ?? 'Unknown'}
        </h3>
      </Link>
    </aside>
  )
}
