'use client'

import { HeaderNote } from './header-note'
import { BodyNote } from './body-note'
import { FooterNote } from './footer-note'

import { useNoteEventById } from '@/hooks/use-note'
import { useProfile } from '@/hooks/use-profile'
import { NoteLoadPulse } from './note-load-pulse'
import { useNoteIdConvertToHex } from '@/hooks/use-note-hex'
import { useNoteReactions } from '@/hooks/use-note-reactions'

type Props = {
  id: string
}

export const Note = ({ id }: Props) => {
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
      className={`flex flex-col w-full px-3.5 py-4 border-b border-divider-color
        hover:cursor-pointer hover:bg-[#38383830]/`}
    >
      <HeaderNote
        name={profile.name}
        npub={npub}
        avatar={profile.picture}
        time={profile.created_at}
      />

      <BodyNote
        content={noteEvent.content}
        tags={noteEvent.tags}
        nip19NoteId={nip19NoteId}
        npub={npub}
      />

      <FooterNote likes={like} answers={answers} reposts={0} zap={zap} />
    </div>
  )
}
