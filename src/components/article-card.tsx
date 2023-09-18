import { formatTimeAgoTypeString } from '@/utils/dateUtils'
import Image from 'next/image'

type ArticleCardProps = {
  author: string
  publishedAt: string
  title: string
}

export const ArticleCard = ({
  author,
  publishedAt,
  title,
}: ArticleCardProps) => {
  return (
    <div className="px-3 py-4 flex  items-centers max-w-md rounded hover:bg-white-transparent ">
      <div className="mr-4">
        <div className="text-[10px] font-semibold flex items-center text-gray-500 mb-1">
          <span>{author}</span>

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

          <span className="text-gray-600 whitespace-nowrap">
            {formatTimeAgoTypeString(publishedAt)}
          </span>
        </div>
        <h3 className=" text-gray-200 font-semibold text-sm line-clamp-3">
          {title}
        </h3>
      </div>

      <Image
        src={'/images/news-default.jpeg'}
        width={10000}
        height={10000}
        alt="cover"
        className="w-20 h-20 my-auto rounded-md  object-cover object-center"
      />
    </div>
  )
}
