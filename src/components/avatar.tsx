type AvatarProps = {
  src: string | undefined
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const Avatar = ({ src, alt, size = 'md' }: AvatarProps) => {
  const sizeMap = {
    sm: 'h-9 w-9',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'w-[128px] h-[128px]',
  }

  return (
    <img
      about="Avatar"
      src={src ?? `https://api.dicebear.com/7.x/identicon/svg?seed=${alt}`}
      alt={alt}
      className={`rounded-full object-cover object-center ${sizeMap[size]}`}
    />
  )
}
