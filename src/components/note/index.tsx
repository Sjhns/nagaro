import { HeaderNote } from './header-note'
import { BodyNote } from './body-note'
import { FooterNote } from './footer-note'
import { formatTimeAgoTypeNumber } from '@/utils/dateUtils'

type NotaProps = {
  name: string | undefined
  avatar: string | undefined
  time: number
  content: string
  likes: number
  answers: number | undefined
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
  return (
    <div className="flex flex-col w-full px-3.5 py-4 border-b border-divider-color">
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
