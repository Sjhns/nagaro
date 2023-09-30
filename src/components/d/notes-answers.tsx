'use client'

import { useNoteAnswers } from '@/hooks/use-note-answers'
import { AnswerNote } from '../answer'

type Props = {
  id: string
}

export const NotesAnswers = ({ id }: Props) => {
  const { answersEvents } = useNoteAnswers(id)

  return (
    <>
      {answersEvents.map((answer) => (
        <AnswerNote key={answer.id} id={answer.id} />
      ))}
    </>
  )
}
