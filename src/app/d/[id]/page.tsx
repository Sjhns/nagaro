'use client'
import { AnswerNote } from '@/components/answer'
import { Header } from '@/components/header'
import { Note } from '@/components/note'
import { Sidebar } from '@/components/sidebar'
import { EventMetadata } from '@/functions/get-events-from-user'
import { sortByDescendingDate } from '@/utils/sortByDescendingDate'
import { useNostrEvents, useProfile } from 'nostr-react'

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params

  //  Obter o evento e o perfil do autor
  const { events, isLoading: isLoadingEvent } = useNostrEvents({
    filter: {
      ids: [id],
      kinds: [1],
    },
  })

  // if (isLoadingEvent) {
  //   return <div>Carregando...</div>
  // }
  const event = events?.[0]

  // const ownProfile = {} as any
  const { data: ownProfile } = useProfile({
    pubkey: event?.pubkey ?? '',
  })

  // Obter as respostas e os perfis dos autores das respostas

  const { events: allAnswersEvents } = useNostrEvents({
    filter: {
      kinds: [1],
      '#e': [event?.id],
      '#p': [event?.pubkey],
    },
  })

  const firstsTenAnswers = allAnswersEvents.slice(0, 10)

  const extractPubkey = firstsTenAnswers.map((e) => e.pubkey)

  const { events: profiles, isLoading: isLoadingProfile } = useNostrEvents({
    filter: {
      authors: extractPubkey,
      kinds: [0],
    },
  })

  const answers = firstsTenAnswers.map((e): EventMetadata => {
    const data = profiles.find((a) => a.pubkey === e.pubkey)

    if (!data) {
      return {
        ...e,
        author: undefined,
      }
    }

    const author = JSON.parse(data.content)

    return {
      ...e,
      author,
    } as EventMetadata
  })

  return (
    <div className="flex w-full min-h-screen">
      <div className="flex-1">
        <Header title="Post" />

        {event && (
          <Note
            key={event.id}
            id={event.id}
            pubkey={event.pubkey}
            name={ownProfile?.name ?? ownProfile?.display_name}
            avatar={ownProfile?.picture}
            time={event.created_at}
            content={event.content}
            likes={0}
            answers={answers.length}
            shares={0}
            tags={event.tags}
          />
        )}

        {answers.map((answer) => (
          <AnswerNote
            key={answer.id}
            id={answer.id}
            pubkey={answer.pubkey}
            name={answer.author?.name ?? answer.author?.display_name}
            avatar={answer.author?.picture}
            time={answer.created_at}
            content={answer.content}
            likes={0}
            answers={0}
            shares={0}
            tags={answer.tags}
          />
        ))}
      </div>

      {/* <Sidebar /> */}
    </div>
  )
}

//   <Tooltip
//   content="You"
//   className=" bg-white text-black font-semibold text-xs  p-2 rounded-md"
// >
//   <svg
//     height="14"
//     width="14"
//     x="0px"
//     y="0px"
//     viewBox="0 0 191.667 191.667"
//     className="ml-1.5 text-iris-blue"
//   >
//     <path
//       fill="currentColor"
//       d="M95.833,0C42.991,0,0,42.99,0,95.833s42.991,95.834,95.833,95.834s95.833-42.991,95.833-95.834S148.676,0,95.833,0z M150.862,79.646l-60.207,60.207c-2.56,2.56-5.963,3.969-9.583,3.969c-3.62,0-7.023-1.409-9.583-3.969l-30.685-30.685 c-2.56-2.56-3.97-5.963-3.97-9.583c0-3.621,1.41-7.024,3.97-9.584c2.559-2.56,5.962-3.97,9.583-3.97c3.62,0,7.024,1.41,9.583,3.971 l21.101,21.1l50.623-50.623c2.56-2.56,5.963-3.969,9.583-3.969c3.62,0,7.023,1.409,9.583,3.969 C156.146,65.765,156.146,74.362,150.862,79.646z"
//     ></path>
//   </svg>
// </Tooltip>
