import { Sidebar } from '@/components/sidebar'
import { FeedGlobal } from '@/template/global'

export default function Page() {
  return (
    <div className="flex w-full min-h-screen">
      <FeedGlobal />
      <Sidebar />
    </div>
  )
}
