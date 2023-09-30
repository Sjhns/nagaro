import { Profile } from '@/components/profile'
import { Sidebar } from '@/components/sidebar'

type Props = {
  address: string
}

export const ProfileTemplate = ({ address }: Props) => {
  return (
    <div className="flex w-full min-h-screen">
      <Profile address={address} />
      <Sidebar />
    </div>
  )
}
