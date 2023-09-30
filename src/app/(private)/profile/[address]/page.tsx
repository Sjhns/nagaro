import { ProfileTemplate } from '@/template/profile'

export default async function Page({
  params,
}: {
  params: { address: string }
}) {
  const { address } = params

  return <ProfileTemplate address={address} />
}
