import { FollowingTemplate } from '@/template/following'

export default function Page({ params }: { params: { address: string } }) {
  const { address } = params

  return <FollowingTemplate address={address} />
}
