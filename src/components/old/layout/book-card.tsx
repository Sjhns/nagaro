'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

type BookCardProps = {
  id: number
  coverUrl: string
  size: 'small' | 'medium' | 'large' | 'xsmall'
}

export const BookCard = ({ coverUrl, id, size }: BookCardProps) => {
  const { push } = useRouter()

  const goToBookDetails = (id: number) => {
    push(`/book-details/d/${id}`)
  }

  return (
    <div
      className={`
      
      ${size === 'xsmall' && 'min-w-[6rem] w-[6rem]'}
      ${size === 'small' && 'min-w-[9rem] w-[9rem]'}
      ${size === 'medium' && 'min-w-[11rem] w-[11rem]'}
      ${size === 'large' && 'min-w-[13rem] w-[13rem]'}
      
       overflow-hidden transform hover:cursor-pointer transition-all duration-[.5s] ease-in-out hover:bg-[#181818] hover:scale-[1.05]`}
      onClick={() => goToBookDetails(id)}
    >
      <Image
        src={coverUrl}
        alt="Book cover"
        width={500}
        height={500}
        className="w-full h-full object-cover object-center"
      />
    </div>
  )
}
