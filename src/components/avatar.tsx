/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'

type AvatarProps = {
  src: string | undefined
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  withBorder?: boolean
}

export const Avatar = ({
  src,
  alt,
  withBorder = false,
  size = 'md',
}: AvatarProps) => {
  const sizeMap = {
    sm: 'h-9 w-9',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'w-[128px] h-[128px]',
  }

  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <div className={`relative ${sizeMap[size]}`}>
      {!imageLoaded && (
        <div className="absolute animate-pulse inset-0 flex items-center justify-center bg-slate-900 rounded-full w-full h-full">
          {/* Loading... */}
        </div>
      )}
      <img
        onLoad={handleImageLoad}
        about="Avatar"
        src={src ?? `https://api.dicebear.com/7.x/identicon/svg?seed=${alt}`}
        alt={alt}
        className={`rounded-full object-cover object-center bg-slate-900 ${
          sizeMap[size]
        }
        ${imageLoaded ? 'opacity-100' : 'opacity-0'}

        ${withBorder ? 'ring-2 ring-gray-200' : ''}
        `}
      />
    </div>
  )
}
