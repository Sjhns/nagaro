import {
  HiOutlineChatBubbleOvalLeft,
  HiOutlineArrowPath,
} from 'react-icons/hi2'
import { AiOutlineHeart } from 'react-icons/ai'
import { RxLightningBolt } from 'react-icons/rx'

type FooterNoteProps = {
  likes: number
  answers: number
  reposts: number
  zap: number
}

export const FooterNote = ({
  answers,
  likes,
  reposts,
  zap,
}: FooterNoteProps) => {
  return (
    <div className="flex items-center gap-x-16 mt-4 text-sm text-gray-600">
      <span className="cursor-pointer hover:text-red-700 flex items-center gap-x-1.5">
        <AiOutlineHeart className="text-lg" />
        {likes}
      </span>
      <span className="cursor-pointer hover:text-green-700 flex items-center gap-x-1.5">
        <HiOutlineChatBubbleOvalLeft className="text-lg" />
        {answers}
      </span>
      <span className="cursor-pointer hover:text-yellow-700 flex items-center gap-x-1.5">
        <RxLightningBolt className="text-lg" />
        {zap}
      </span>
      <span className="cursor-pointer hover:text-blue-700 flex items-center gap-x-1.5">
        <HiOutlineArrowPath className="text-lg" />
        {reposts}
      </span>
    </div>
  )
}
