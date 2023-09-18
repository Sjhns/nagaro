type Props = {
  hashTags: string
}

export const SearchList = ({ hashTags }: Props) => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="flex items-center border-b border-divider-color">
        <span
          className="flex-1 flex items-center justify-center 
          bg-white-transparent p-3"
        >
          {/* {events.length} resultados para{' '} */}
          <span className="font-bold ml-1">{hashTags}</span>
        </span>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        {/* {eventWithAuthor &&
          eventWithAuthor.map((event) => (
            <Note
              pubkey={event.pubkey}
              key={event.id}
              id={event.id}
              name={event.author?.name ?? event.author?.display_name}
              avatar={event.author?.picture}
              time={event.created_at}
              content={event.content}
              likes={0}
              answers={0}
              shares={0}
              tags={event.tags}
            />
          ))} */}
      </div>
    </div>
  )
}
