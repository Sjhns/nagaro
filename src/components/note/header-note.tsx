import Link from 'next/link'
import { BsThreeDots } from 'react-icons/bs'
import { Avatar } from '../avatar'

type HeaderNoteProps = {
  name: string | undefined
  avatar: string | undefined
  time: string
  pubkey: string
}

export const HeaderNote = ({ avatar, name, time, pubkey }: HeaderNoteProps) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center w-full">
        <div className="flex items-center w-full">
          <Link
            href={`/profile/${pubkey}`}
            prefetch={false}
            className="hover:cursor-pointer flex items-center"
          >
            <Avatar
              alt="Avatar"
              src={
                avatar ??
                `https://api.dicebear.com/7.x/identicon/svg?seed=${pubkey}`
              }
              size="md"
            />
            <h3 className="ml-3 font-semibold text-sm flex items-center text-gray-white-300">
              {name ?? 'Unknown'}
              {/* <Tooltip
              content="You"
              className=" bg-white text-black font-semibold text-xs  p-2 rounded-md"
            >
              <svg
                height="14"
                width="14"
                x="0px"
                y="0px"
                viewBox="0 0 191.667 191.667"
                className="ml-1.5 text-iris-blue"
              >
                <path
                  fill="currentColor"
                  d="M95.833,0C42.991,0,0,42.99,0,95.833s42.991,95.834,95.833,95.834s95.833-42.991,95.833-95.834S148.676,0,95.833,0z M150.862,79.646l-60.207,60.207c-2.56,2.56-5.963,3.969-9.583,3.969c-3.62,0-7.023-1.409-9.583-3.969l-30.685-30.685 c-2.56-2.56-3.97-5.963-3.97-9.583c0-3.621,1.41-7.024,3.97-9.584c2.559-2.56,5.962-3.97,9.583-3.97c3.62,0,7.024,1.41,9.583,3.971 l21.101,21.1l50.623-50.623c2.56-2.56,5.963-3.969,9.583-3.969c3.62,0,7.023,1.409,9.583,3.969 C156.146,65.765,156.146,74.362,150.862,79.646z"
                ></path>
              </svg>
            </Tooltip> */}
            </h3>
          </Link>
          {/* <span className="text-xs text-gray-500 ml-1">•</span> */}

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
            {time}
          </span>

          <span className="ml-auto p-2 rounded-full hover:bg-white-transparent text-gray-500 hover:cursor-pointer text-lg">
            <BsThreeDots />
          </span>
        </div>
      </div>
    </div>
  )
}
