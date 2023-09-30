'use client'

import { useEffect } from 'react'

type Props = {
  //   showLoadMoreButton: boolean
  setShowLoadMoreButton: (value: boolean) => void
}

export const LoadMoreButton = ({ setShowLoadMoreButton }: Props) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollThreshold = 200

      if (documentHeight - scrollY - windowHeight < scrollThreshold) {
        setShowLoadMoreButton(true)
      } else {
        setShowLoadMoreButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="fixed bottom-16 md:bottom-8 justify-center items-center z-10 flex w-full md:w-1/2 pb-safe-area">
      <button
        className="p-2 text-xs rounded-full opacity-90 hover:opacity-100 hover:bg-iris-blue bg-iris-blue text-white font-semibold"
        style={{ transition: 'opacity 0.3s ease' }}
      >
        Carregar mais eventos
      </button>
    </div>
  )
}
