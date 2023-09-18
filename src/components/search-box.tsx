import { FiSearch } from 'react-icons/fi'

type Props = {
  size?: 'sm' | 'md' | 'lg'
}

export const SearchBox = ({ size = 'sm' }: Props) => {
  const sizeList = {
    sm: 'h-9',
    md: 'h-10',
    lg: 'h-12',
  }

  return (
    <div
      className={`flex w-full items-center justify-center 
        bg-[#2727279e] px-3 rounded-full ${sizeList[size]}`}
    >
      <FiSearch className="text-gray-700 text-lg mr-2" />
      <input
        type="text"
        placeholder="Pesquisar..."
        className="w-full py-1.5 h-full bg-[transparent] 
   outline-0 text-sm text-gray-500 placeholder-gray-700"
      />
    </div>
  )
}
