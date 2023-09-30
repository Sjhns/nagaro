import { Following } from '@/components/following'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'

type Props = {
  address: string
}

export const FollowingTemplate = ({ address }: Props) => {
  return (
    <div className="flex w-full min-h-screen">
      <div className="flex-1">
        <Header title={'Seguindo'} />

        <Following address={address} />
      </div>

      <Sidebar />
    </div>
  )
}
