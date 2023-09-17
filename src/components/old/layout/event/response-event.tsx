import { formatTimeAgoTypeNumber } from '@/utils/dateUtils'
import { Avatar } from '@/components/avatar'
import Link from 'next/link'
import { BodyPost } from '../../../note/body-note'
import { FooterPost } from '../../../note/footer-note'

type ResponseEventProps = {
  name: string | undefined
  avatar: string | undefined
  time: number
  content: string
  likes: number
  comments: number | undefined
  shares: number
  id: string
  pubkey: string
  tags?: string[]
}

export const ResponseEvent = ({
  name,
  avatar,
  content,
  id,
  time,
  comments,
  likes,
  pubkey,
  shares,
}: ResponseEventProps) => {
  return (
    <div
      className="cursor-pointer transition-all ease-in-out duration-200 hover:bg-white-hover-transparent flex w-full px-3 py-3.5 border-b border-divider-color
          hover:cursor-pointer"
    >
      <div className="w-full ml-3.5">
        <ResponseEventHeader
          name={name}
          avatar={avatar}
          time={time}
          pubkey={pubkey}
        />

        <BodyPost content={content} id={id} />
        <FooterPost likes={likes} comments={comments ?? 0} shares={shares} />
      </div>
    </div>
  )
}

const ResponseEventHeader = ({
  name,
  avatar,
  time,
  pubkey,
}: {
  name: string | undefined
  avatar: string | undefined
  time: number
  pubkey: string
}) => {
  return (
    <div className="flex items-center w-full">
      <Link href={`/profile/${pubkey}`}>
        <Avatar alt="Picture" src={avatar} size="md" />
      </Link>
      <div className="w-full ml-3.5">
        <div className="flex items-center w-full">
          <Link href={`/profile/${pubkey}`}>
            <h3 className="font-semibold text-sm flex items-center text-gray-white-300">
              {name}
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
            {formatTimeAgoTypeNumber(time)}
          </span>
        </div>
      </div>
    </div>
  )
}
