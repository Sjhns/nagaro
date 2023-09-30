import { Header } from '@/components/header'
import { SettingTemplate } from '@/template/setting'

export default async function Page() {
  return (
    <div className=" w-full min-h-screen">
      <Header title="Configurações" />
      <SettingTemplate />
    </div>
  )
}
