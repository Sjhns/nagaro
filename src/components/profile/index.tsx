'use client'

import { Avatar } from '@/components/avatar'
import { Header } from '@/components/header'
import { ProfileBanner } from '@/components/profile/profile-banner'
import { TabbedContentSwitcher } from '@/components/tabbed-content-switcher'
import { ToolsBoxProfile } from '@/components/profile/tools-box-profile'
import { useProfile } from '@/hooks/use-profile'
import Link from 'next/link'
import { AiOutlineGlobal } from 'react-icons/ai'
import { ProfileLoadPulse } from './profile-load-pulse'
import { useProfileNotes } from '@/hooks/use-profile-notes'
import { useProfileContacts } from '@/hooks/use-profile-contacts'

type Props = {
  address: string
}

export const Profile = ({ address }: Props) => {
  const { isFetchingMetadata, isMetadataEmpty, profile, npub } =
    useProfile(address)

  const { noteEvents } = useProfileNotes(address)

  const { totalFollowing } = useProfileContacts(address)

  if (isFetchingMetadata || isMetadataEmpty) {
    return <ProfileLoadPulse />
  }

  return (
    <div className="flex-1  border-r border-white-transparent">
      <Header title="Profile" />
      <ProfileBanner banner={profile?.banner} />

      <div className="flex items-center justify-between px-4 pt-4 z-50">
        <div className="-mt-24 w-max min-w-max z-40">
          <Avatar
            alt="profile"
            src={profile?.picture}
            withBorder={true}
            size="xl"
          />
        </div>

        <ToolsBoxProfile npub={npub} />
      </div>

      <div className="px-4 mt-2">
        <div className="flex items-center space-x-2">
          <h1 className="text-gray-200 font-medium text-2xl">
            {profile?.name ??
              profile?.username ??
              profile?.displayName ??
              'Unknown'}
          </h1>
        </div>

        <div className="mt-1 flex items-center text-gray-400 text-xs font-semibold">
          <Link
            href={`/following/${npub}`}
            prefetch={false}
            className="hover:cursor-pointer"
          >
            {totalFollowing} seguindo
          </Link>
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

          <span>* seguidores (Em breve)</span>
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

        {profile?.lud16 && (
          <button className="text-gray-500 text-xs hover:text-gray-400">
            ⚡{profile?.lud16}
          </button>
        )}

        <div className="mt-2">
          <p className="text-gray-200 text-sm">{profile?.about ?? ''}</p>
        </div>
      </div>

      <TabbedContentSwitcher notes={noteEvents} />
    </div>
  )
}
