import { Sidebar } from '@/components/sidebar'
import { Profile } from '@/template/profile'

export default async function Page({ params }: { params: { pubkey: string } }) {
  const { pubkey } = params

  return (
    <div className="flex w-full min-h-screen">
      <Profile pubkey={pubkey} />
      <Sidebar />
    </div>
  )
}
