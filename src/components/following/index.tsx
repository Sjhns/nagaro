'use client'

import { Spinner } from '../spinner'
import { FollowingCard } from './follow-card'
import { useProfileContacts } from '@/hooks/use-profile-contacts'

type Props = {
  address: string
}

export const Following = ({ address }: Props) => {
  const { followersIds, totalFollowing, isFetchingContacts, isContactsEmpty } =
    useProfileContacts(address)

  if (isFetchingContacts) {
    return (
      <div className="flex-1 flex items-center justify-center h-screen">
        <Spinner />
      </div>
    )
  }

  if (isContactsEmpty) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h3 className="text-gray-400 font-medium text-2xl  mb-4">
          Você não está seguindo ninguém ainda
        </h3>
      </div>
    )
  }

  return (
    <div className="px-4">
      <h3 className="text-gray-200 font-medium text-2xl mt-1  mb-4">
        Seguindo {totalFollowing}
      </h3>

      <div className="space-y-3">
        {followersIds.map((followerId) => (
          <FollowingCard key={followerId} address={followerId} />
        ))}
      </div>
    </div>
  )
}
