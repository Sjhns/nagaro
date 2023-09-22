'use client'

import { HeaderNote } from './header-note'
import { BodyNote } from './body-note'
import { FooterNote } from './footer-note'
import { formatTimeAgoTypeNumber } from '@/functions/dateUtils'
import { usePathname, useRouter } from 'next/navigation'

type NotaProps = {
  name: string | undefined
  avatar: string | undefined
  time: number
  content: string
  likes: number
  answers?: number | undefined
  shares: number
  id: string
  pubkey: string
  tags?: string[][]
}

export const Note = ({
  id,
  avatar,
  answers,
  content,
  likes,
  name,
  shares,
  time,
  tags,
  pubkey,
}: NotaProps) => {
  const { push } = useRouter()
  const path = usePathname()

  const isDetailsNote = path === `/d/${id}`

  const handlePostDetails = () => {
    if (isDetailsNote) {
      return
    }

    push(`/d/${id}`)
  }

  return (
    <div
      className={`flex flex-col w-full px-3.5 py-4 border-b border-divider-color
    ${
      isDetailsNote
        ? 'cursor-default'
        : 'hover:cursor-pointer hover:bg-[#38383830]'
    }
    `}
      onClick={isDetailsNote ? undefined : handlePostDetails}
    >
      <HeaderNote
        name={name}
        pubkey={pubkey}
        avatar={avatar}
        time={formatTimeAgoTypeNumber(time)}
      />
      <BodyNote content={content} tags={tags} id={id} />
      <FooterNote likes={likes} answers={answers} shares={shares} />
    </div>
  )
}
