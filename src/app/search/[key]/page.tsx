import { Header } from '@/components/header'
import { SearchList } from '@/components/search-list'
import { Sidebar } from '@/components/sidebar'

export default async function Page({ params }: { params: { key: string } }) {
  const { key } = params
  return (
    <div className="flex w-full min-h-screen">
      <div className="flex-1">
        <Header title={`Buscar por ${key}`} />
        <SearchList hashTags={String(key)} />
      </div>
      <Sidebar />
    </div>
  )
}
