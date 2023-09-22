import { Profile } from '@/components/profile'
import { Sidebar } from '@/components/sidebar'

type Props = {
  pubkey: string
}

export const ProfileTemplate = ({ pubkey }: Props) => {
  return (
    <div className="flex w-full min-h-screen">
      <Profile pubkey={pubkey} />
      <Sidebar />
    </div>
  )
}
