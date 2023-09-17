import { RELAYS } from '@/constants/relays'
import { PoolSingleton } from '@/infra/providers/pool-singleton'
import { Post } from '../../note'
import { sortByDescendingDate } from '@/utils/sortByDescendingDate'
import { EventWithMetadata } from '@/@types/event-with-metadata'

type SearchListProps = {
  hashTags: string
}

export const SearchList = async ({ hashTags }: SearchListProps) => {
  // const [results, setResults] = useState<Event[]>([])

  const poolInstance = PoolSingleton.getInstance()
  const pool = poolInstance.getPool()

  const allEvents = await pool.list(RELAYS, [
    {
      kinds: [0, 1],
      '#t': [hashTags],
    },
  ])

  const events = sortByDescendingDate(allEvents)

  const extractPubkey = events.map((e) => e.pubkey)

  const authors = await pool.list(RELAYS, [
    {
      kinds: [0],
      authors: extractPubkey,
    },
  ])

  const eventWithAuthor = events.map((e) => {
    const authorInfo = authors.find((a) => a.pubkey === e.pubkey)

    return {
      ...e,
      author: JSON.parse(authorInfo?.content ?? '{}'),
    } as EventWithMetadata
  })

  pool.close(RELAYS)

  console.log(events)

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="flex items-center border-b border-divider-color">
        <span
          className="flex-1 flex items-center justify-center 
          bg-white-transparent p-3"
        >
          {events.length} resultados para{' '}
          <span className="font-bold ml-1">{hashTags}</span>
        </span>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        {eventWithAuthor &&
          eventWithAuthor.map((event) => (
            <Post
              key={event.id}
              id={event.id}
              name={
                event.author?.name ?? event.author?.display_name ?? 'Unknown'
              }
              avatar={
                event.author?.picture ??
                `https://api.dicebear.com/7.x/identicon/svg?seed=${event.pubkey}`
              }
              time={event.created_at}
              content={event.content}
              likes={0}
              comments={0}
              shares={0}
              tags={event.tags.filter((t) => t[0] === 't').map((t) => t[1])}
            />
          ))}
      </div>
    </div>
  )
}
