import { Header } from '@/components/header'
import { SearchBox } from '@/components/search-box'
import { Sidebar } from '@/components/sidebar'

export default async function Page() {
  return (
    <div className="flex w-full min-h-screen">
      <div className="flex-1 px-2">
        <Header title={'Pesquisar'} />

        <div className="mt-5"></div>

        <SearchBox size="md" />
      </div>
      <Sidebar />
    </div>
  )
}
