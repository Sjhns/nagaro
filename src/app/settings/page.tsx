import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'

export default async function Page() {
  return (
    <div className="flex w-full min-h-screen">
      <div className="flex-1">
        <Header title="Configurações" />
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-center text-gray-500 text-2xl font-bold mt-10">
            Recurso em desenvolvimento.Em breve você poderá configurar sua conta
            nostr. Aguarde!
          </p>
        </div>
      </div>
      <Sidebar />
    </div>
  )
}
