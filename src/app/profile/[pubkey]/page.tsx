import { Profile } from '@/template/profile'

export default function Page({ params }: { params: { pubkey: string } }) {
  const { pubkey } = params

  return (
    <>
      <Profile pubkey={pubkey} />
    </>
  )
}
