'use client'

import { Avatar } from '@/components/avatar'
import { Header } from '@/components/header'
import { Loading } from '@/components/loading'
import { ProfileBanner } from '@/components/profile-banner'
import { TabbedContentSwitcher } from '@/components/tabbed-content-switcher'
import { ToolsBoxProfile } from '@/components/tools-box-profile'
import Link from 'next/link'
import { useNostrEvents, useProfile } from 'nostr-react'
import { AiOutlineGlobal } from 'react-icons/ai'

type Props = {
  pubkey: string
}

export const Profile = ({ pubkey }: Props) => {
  const { data: profile } = useProfile({
    pubkey,
  })

  const { events } = useNostrEvents({
    filter: {
      authors: [pubkey],
      // since: 0,
      kinds: [1],
      limit: 10,
    },
  })

  const eventsFromCurrentUser = events?.map((event) => {
    return {
      ...event,
      author: profile,
    }
  })

  //   if (!profile || !eventsFromCurrentUser) {
  //     return (
  //       <div className="flex items-center justify-center min-h-screen">
  //         <div className="flex flex-col items-center justify-center">
  //           <Loading />
  //         </div>
  //       </div>
  //     )
  //   }

  return (
    <div className="w-full min-h-screen">
      <Header title="Profile" />
      <div className="flex-1 max-w-5xl mx-auto">
        <ProfileBanner banner={profile?.banner} />

        <div className="flex items-center justify-between px-4 pt-4 z-50">
          <div className="-mt-24 w-max min-w-max z-40">
            <Avatar alt="profile" src={profile?.picture} size="xl" />
          </div>

          <ToolsBoxProfile pubkey={pubkey} />
        </div>

        <div className="px-4 mt-2">
          <div className="flex items-center space-x-2">
            <h1 className="text-gray-200 font-medium text-2xl">
              {profile?.name ??
                profile?.username ??
                profile?.display_name ??
                'Unknown'}
            </h1>
          </div>

          <div className="flex items-center text-gray-500 text-sm">
            <span>0 seguidores</span>
            <span className="mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </span>

            <span>0 seguindo</span>
          </div>

          {profile?.website && (
            <div className="flex items-center mt-2">
              <Link
                href={profile.website}
                prefetch={false}
                target="_blank"
                className="text-gray-500 text-xs hover:underline"
              >
                <AiOutlineGlobal className="inline-block mr-1" />
                {profile.website}
              </Link>
            </div>
          )}

          <div className="mt-2">
            <p className="text-gray-200 text-sm">{profile?.about ?? ''}</p>
          </div>
        </div>

        <TabbedContentSwitcher
          totalPublications={eventsFromCurrentUser?.length ?? 0}
          events={eventsFromCurrentUser}
        />
      </div>

      {/* <Sidebar /> */}
    </div>
  )
}
