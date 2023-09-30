import Home from '@/components/home'
import { Sidebar } from '@/components/sidebar'

export const HomeTemplate = () => {
  return (
    <div className="flex w-full min-h-screen">
      <Home />
      <Sidebar />
    </div>
  )
}
