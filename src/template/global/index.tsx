import FeedGlobal from '@/components/feed-global'
import { Sidebar } from '@/components/sidebar'

export const FeedGlobalTemplate = () => {
  return (
    <div className="flex w-full min-h-screen">
      <FeedGlobal />
      <Sidebar />
    </div>
  )
}
