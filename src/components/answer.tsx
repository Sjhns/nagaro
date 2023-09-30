'use client'

import { formatTimeAgoTypeNumber } from '@/functions/dateUtils'
import { Avatar } from '@/components/avatar'
import Link from 'next/link'
import { BodyNote } from './note/body-note'
import { FooterNote } from './note/footer-note'
import { useNoteEventById } from '@/hooks/use-note'
import { useNoteIdConvertToHex } from '@/hooks/use-note-hex'
import { useProfile } from '@/hooks/use-profile'
import { useNoteReactions } from '@/hooks/use-note-reactions'
import { NoteLoadPulse } from './note/note-load-pulse'

type Props = {
  id: string
}

export const AnswerNote = ({ id }: Props) => {
  const hexId = useNoteIdConvertToHex(id)

  const { noteEvent, nip19NoteId, isFetching } = useNoteEventById(hexId)

  const { npub, profile, isFetchingMetadata } = useProfile(
    noteEvent?.pubkey || '',
  )

  const { answers, like, zap } = useNoteReactions(hexId)

  if (isFetching || isFetchingMetadata) {
    return <NoteLoadPulse />
  }

  return (
    <div
      className="cursor-pointer transition-all ease-in-out duration-200 hover:bg-white-hover-transparent flex w-full px-3 py-3.5 border-b border-divider-color
          hover:cursor-pointer"
    >
      <Link href={`/profile/${npub}`} className="h-10 w-10">
        <Avatar alt="Picture" src={profile.picture} size="md" />
      </Link>
      <div className="w-full ml-3.5">
        <AnswerNoteHeader
          name={profile.name}
          time={profile.created_at}
          npub={npub}
        />
        <BodyNote
          content={noteEvent.content}
          tags={noteEvent.tags}
          nip19NoteId={nip19NoteId}
        />

        <FooterNote likes={like} answers={answers} reposts={0} zap={zap} />
      </div>
    </div>
  )
}

const AnswerNoteHeader = ({
  name,
  time,
  npub,
}: {
  name: string | undefined
  time?: number
  npub: string
}) => {
  return (
    <div className="flex items-center w-full">
      <div className="flex items-center w-full">
        <Link href={`/profile/${npub}`}>
          <h3 className="font-semibold text-sm flex items-center text-gray-white-300">
            {name ?? 'Unknown'}
          </h3>
        </Link>
        <span className="mx-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-gray-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 12a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <span className="text-[11px] text-gray-600 font-semibold">
          {formatTimeAgoTypeNumber(time ?? 0)}
        </span>
      </div>
    </div>
  )
}
