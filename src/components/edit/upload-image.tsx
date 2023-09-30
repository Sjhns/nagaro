/* eslint-disable @next/next/no-img-element */
import { ChangeEvent } from 'react'

type Props = {
  value: string
  label: string
  type: 'picture' | 'banner'
  handleImageChange: (
    event: ChangeEvent<HTMLInputElement>,
    type: 'picture' | 'banner',
  ) => void
}

export const UploadImage = ({
  handleImageChange,
  value,
  type,
  label,
}: Props) => {
  return (
    <div className="mt-8">
      <label htmlFor="image" className="text-sm text-gray-300 font-semibold">
        {label}
      </label>
      <div className="mt-1 flex w-full items-center justify-center bg-[#2727279e] px-3 rounded-full h-11">
        <input
          id="name"
          type="text"
          readOnly
          value={value}
          className="w-full py-1.5 h-full bg-[transparent] 
         outline-0 text-sm text-gray-300 placeholder-gray-700"
        />
      </div>

      <div className="mt-5 space-y-3">
        <input
          id="image"
          type="file" // Usar type="file" para permitir o upload de arquivos
          accept="image/*" // Aceitar apenas imagens
          onChange={(e) => handleImageChange(e, type)}
          className="mb-5 file:bg-[#444444] file:text-gray-200 file:py-1.5 file:text-sm file:px-2 file:rounded-l-full file:rounded-r-xl text-sm text-gray-300 file:border-0 file:font-medium file:hover:cursor-pointer focus:outline-none file:mr-2"
        />

        {value && (
          <img src={value} alt="Imagem" className="max-w-xl object-cover" />
        )}

        {!value && (
          <div className="w-20 h-20 bg-[#444444] rounded-full flex items-center justify-center text-gray-200">
            <span className="text-3xl">+</span>
          </div>
        )}
      </div>
    </div>
  )
}
