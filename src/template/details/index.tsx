import { NotesAnswers } from '@/components/d/notes-answers'
import { Header } from '@/components/header'
import { Note } from '@/components/note'
import { Sidebar } from '@/components/sidebar'

type Props = {
  id: string
}

export const NoteDetailsTemplate = ({ id }: Props) => {
  return (
    <div className="flex w-full min-h-screen">
      <div className="flex-1">
        <Header title="Post" />
        <Note id={id} />
        <NotesAnswers id={id} />
      </div>

      <Sidebar />
    </div>
  )
}
