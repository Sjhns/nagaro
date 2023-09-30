'use client'

import { nip19 } from 'nostr-tools'

export const useNoteIdConvertToHex = (noteAddress: string) => {
  const noteId = noteAddress.startsWith('note')
    ? nip19.decode(noteAddress).data.toString()
    : noteAddress

  return noteId
}
