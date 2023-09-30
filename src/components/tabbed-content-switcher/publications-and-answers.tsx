import { Notes } from '@/types/notes'
import { Note } from '../note'

type PublicationAndResponseProps = {
  notes: Notes[]
}

export const PublicationsAndAnswers = ({
  notes,
}: PublicationAndResponseProps) => {
  return (
    <div className="w-full flex items-center justify-between px-4 pt-4">
      <div className="flex flex-col w-full">
        {notes.map((note) => (
          <Note key={note.id} id={note.id} />
        ))}

        {!notes.length && (
          <div className="flex items-center justify-center w-full h-96">
            <span className="text-gray-500 text-xl text-center">
              Você ainda não respondeu nenhuma publicação
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
