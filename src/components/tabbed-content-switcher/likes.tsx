import { EventMetadata } from '@/functions/get-events-from-user'
import { Note } from '../note'

type LikesProps = {
  events: EventMetadata[]
}

export const Likes = ({ events }: LikesProps) => {
  return (
    <div className="flex items-center justify-between px-4 pt-4">
      <div className="flex flex-col w-full">
        {events.map((event) => (
          <Note
            key={event.id}
            id={event.id}
            pubkey={event.pubkey}
            name={event.author?.name ?? event.author?.display_name}
            avatar={event.author?.picture}
            time={event.created_at}
            content={event.content}
            likes={0}
            answers={event.totalAnswers}
            shares={0}
            tags={event.tags}
          />
        ))}

        {!events.length && (
          <div className="flex items-center justify-center w-full h-96">
            <span className="text-gray-500 text-xl">
              Você ainda não curtiu nenhuma publicação
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
