import { Edit } from '@/components/edit'
import { Header } from '@/components/header'

export const EditTemplate = () => {
  return (
    <div className="w-full min-h-screen mb-20">
      <Header title="Perfil" />

      <Edit />
    </div>
  )
}
