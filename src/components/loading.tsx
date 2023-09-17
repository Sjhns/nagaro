import Image from 'next/image'

export const Loading = () => {
  return (
    // <div className="flex w-full items-center justify-center h-screen overflow-hidden">
    <Image
      src="/svgs/pac-man.svg"
      alt="Loading"
      width={200}
      height={200}
      className="w-36 h-36"
    />
    // </div>
  )
}
