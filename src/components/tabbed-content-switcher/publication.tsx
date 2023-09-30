import { Notes } from '@/types/notes'
import { Note } from '../note'

type Props = {
  notes: Notes[]
}

export const Publication = ({ notes }: Props) => {
  return (
    <div className="w-full flex items-center justify-between pt-4">
      <div className="flex flex-col w-full">
        {notes.map((note) => (
          <Note key={note.id} id={note.id} />
        ))}

        {!notes.length && (
          <div className="flex items-center justify-center w-full h-96">
            <span className="text-gray-500 text-xl text-center">
              Nenhuma publicação encontrada
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
