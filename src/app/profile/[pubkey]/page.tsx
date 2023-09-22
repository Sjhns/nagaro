import { ProfileTemplate } from '@/template/profile'

export default async function Page({ params }: { params: { pubkey: string } }) {
  const { pubkey } = params

  return <ProfileTemplate pubkey={pubkey} />
}
