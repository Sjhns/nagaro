'use client'

import { HiArrowLeft } from 'react-icons/hi'
import { useRouter } from 'next/navigation'

type HeaderProps = {
  title: string
  hideBackButton?: boolean
}

export const Header = ({ title, hideBackButton = false }: HeaderProps) => {
  const { back } = useRouter()

  const backToPreviousPage = () => {
    back()
  }

  return (
    <header
      className="sticky top-0 left-0 z-50 w-full px-2 
    bg-black bg-opacity-70 backdrop-blur-md flex items-center
     h-12 overflow-hidden
    "
    >
      {!hideBackButton && (
        <span
          className="text-2xl hover:cursor-pointer"
          onClick={backToPreviousPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            width="24"
          >
            <path
              fill-rule="evenodd"
              d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
          {/* <HiArrowLeft /> */}
        </span>
      )}

      <span className="text-gray-300 font-medium mx-auto">
        {/* <span className="text-gray-500 font-semibold text-lg mr-1">#</span> */}
        {title}
      </span>
    </header>
  )
}
