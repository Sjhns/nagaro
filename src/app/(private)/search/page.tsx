import { SearchBox } from '@/components/search-box'
import { Sidebar } from '@/components/sidebar'

export default async function Page() {
  return (
    <div className="flex w-full min-h-screen">
      <div className="flex-1 px-2">
        {/* <Header title={'Pesquisar'} /> */}

        <div className="mt-5"></div>

        <SearchBox size="md" />

        <div className="flex flex-col items-center justify-center mt-10">
          <p className="text-gray-600 text-base mt-3 text-center">
            Encontre pessoas, comunidades e conteúdos que você se interessa.
          </p>
        </div>
      </div>
      <Sidebar />
    </div>
  )
}
