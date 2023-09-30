'use client'

import { useProfile } from '@/hooks/use-profile'
import Link from 'next/link'
import { Avatar } from '../avatar'

type Props = {
  address: string
}

export const FollowingCard = ({ address }: Props) => {
  const { profile, isFetchingMetadata, npub } = useProfile(address)

  if (isFetchingMetadata) {
    return (
      <div className="animate-pulse">
        <div className="flex items-center space-x-3">
          <div className="rounded-full bg-slate-800 h-12 w-12"></div>
          <div className="h-4 w-20 bg-slate-800 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center w-full">
      <Link
        href={`/profile/${npub}`}
        prefetch={false}
        className="hover:cursor-pointer flex items-center"
      >
        <Avatar alt="Avatar" src={profile.picture} size="lg" />
        <h3 className="ml-3 font-semibold text-base flex items-center text-gray-white-300">
          {profile.name ?? 'Unknown'}
        </h3>
      </Link>
    </div>
  )
}
