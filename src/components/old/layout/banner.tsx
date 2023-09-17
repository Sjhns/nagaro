interface BannerProps {
  title: string
  description: string
}

export const Banner = ({ title, description }: BannerProps) => {
  return (
    <div
      className="mt-10 bg-[url('/imgs/wallpape.jpg')] bg-cover bg-no-repeat bg-center w-full h-56 rounded-sm 
    "
    >
      <div
        className="bg-gradient-to-t from-[#000000] to-[#00000081] w-full h-full
      flex items-start justify-center flex-col px-4
      "
      >
        <h2 className="text-3xl font-light">{title}</h2>
        <h3 className="mt-3 font-medium text-gray-white-400 text-sm">
          {description}
        </h3>
      </div>
    </div>
  )
}
