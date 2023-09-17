/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'

type Props = {
  banner: string | undefined
}

export const ProfileBanner = ({ banner }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <div className="w-full h-48 relative">
      {!imageLoaded && (
        <div className="absolute animate-pulse  inset-0 flex items-center justify-center bg-slate-900">
          {/* Loading... */}
        </div>
      )}
      <img
        src={banner}
        alt="Banner"
        className={`w-full h-full object-cover ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleImageLoad}
      />
    </div>
  )
}
