/* eslint-disable @next/next/no-img-element */
'use client'

import { Header } from '@/components/header'
import { handleTextareaResize } from '@/functions/text-area-resize'
import { useState, ChangeEvent } from 'react'

export default function Page() {
  const [selectedImageProfile, setSelectedImageProfile] = useState<
    string | null
  >(null)
  const [selectedImageBanner, setSelectedImageBanner] = useState<string | null>(
    null,
  )

  const handleImageProfileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files && event.target.files[0]

    if (file) {
      // Ler o arquivo de imagem como uma URL de dados
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target) {
          setSelectedImageProfile(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    } else {
      setSelectedImageProfile(null)
    }
  }
  const handleImageBannerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files && event.target.files[0]

    if (file) {
      // Ler o arquivo de imagem como uma URL de dados
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target) {
          setSelectedImageBanner(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    } else {
      setSelectedImageBanner(null)
    }
  }

  return (
    <div className="w-full min-h-screen mb-20">
      <Header title="Perfil" />

      <div className="px-5 mt-2 max-w-2xl">
        <h3 className="text-lg tracking-wide text-gray-100 font-semibold mb-5">
          Editar Perfil
        </h3>

        <div>
          <label htmlFor="name" className="text-sm text-gray-300 font-semibold">
            Nome
          </label>
          <div
            className="mt-1 flex w-full items-center justify-center 
        bg-[#2727279e] px-3 rounded-xl h-11"
          >
            <input
              id="name"
              type="text"
              className="w-full py-1.5 h-full bg-[transparent] 
   outline-0 text-sm text-gray-300 placeholder-gray-700"
            />
          </div>
        </div>

        {/* Campo de upload de imagem */}
        <div className="mt-8">
          <label
            htmlFor="image"
            className="text-sm text-gray-300 font-semibold"
          >
            Imagem de Perfil
          </label>
          <div className="mt-1 flex w-full items-center justify-center bg-[#2727279e] px-3 rounded-full h-11">
            <input
              id="name"
              type="text"
              readOnly
              value={selectedImageProfile ?? ''}
              className="w-full py-1.5 h-full bg-[transparent] 
   outline-0 text-sm text-gray-300 placeholder-gray-700"
            />
          </div>
        </div>
        <div className="mt-5">
          <input
            id="image"
            type="file" // Usar type="file" para permitir o upload de arquivos
            accept="image/*" // Aceitar apenas imagens
            onChange={handleImageProfileChange} // Manipular a mudança de imagem
            className="mb-5 file:bg-[#444444] file:text-gray-200 file:py-1.5 file:text-sm file:px-2 file:rounded-l-full file:rounded-r-xl text-sm text-gray-300 file:border-0 file:font-medium file:hover:cursor-pointer focus:outline-none file:mr-2"
          />

          {selectedImageProfile ? (
            // Exibir a imagem carregada
            <img
              src={selectedImageProfile}
              alt="Imagem de Perfil"
              className="w-80 max-w-sm object-cover"
            />
          ) : (
            // Exibir um ícone de upload ou qualquer outro conteúdo desejado
            <div className="w-20 h-20 bg-[#444444] rounded-full flex items-center justify-center text-gray-200">
              <span className="text-3xl">+</span>
            </div>
          )}
        </div>

        {/* ------------------------- */}

        <div className="mt-8">
          <label
            htmlFor="about"
            className="text-sm text-gray-300 font-semibold block mb-1"
          >
            Sobre mim
          </label>

          <textarea
            id="about"
            rows={6}
            className="block p-2.5 w-full text-sm text-gray-200
             bg-[#2727279e] rounded-lg outline-none placeholder:text-gray-400 focus:ring-0 resize-none"
            placeholder="Sobre mim..."
            onChange={(e) => handleTextareaResize(e)}
          ></textarea>
        </div>

        {/* --------------------- */}

        <div className="mt-8">
          <label
            htmlFor="banner"
            className="text-sm text-gray-300 font-semibold"
          >
            Banner
          </label>
          <div className="mt-1 flex w-full items-center justify-center bg-[#2727279e] px-3 rounded-full h-11">
            <input
              id="banner"
              type="text"
              readOnly
              value={selectedImageBanner ?? ''}
              className="w-full py-1.5 h-full bg-[transparent] 
   outline-0 text-sm text-gray-300 placeholder-gray-700"
            />
          </div>
          <div className="mt-5">
            <input
              id="banner"
              type="file" // Usar type="file" para permitir o upload de arquivos
              accept="image/*" // Aceitar apenas imagens
              onChange={handleImageBannerChange} // Manipular a mudança de imagem
              className="mb-5 file:bg-[#444444] file:text-gray-200 file:py-1.5 file:text-sm file:px-2 file:rounded-l-full file:rounded-r-xl text-sm text-gray-300 file:border-0 file:font-medium file:hover:cursor-pointer focus:outline-none file:mr-2"
            />

            {selectedImageBanner ? (
              // Exibir a imagem carregada
              <img
                src={selectedImageBanner}
                alt="Imagem de Perfil"
                className="max-w-xl object-cover"
              />
            ) : (
              // Exibir um ícone de upload ou qualquer outro conteúdo desejado
              <div className="w-20 h-20 bg-[#444444] rounded-full flex items-center justify-center text-gray-200">
                <span className="text-3xl">+</span>
              </div>
            )}
          </div>
        </div>

        {/* ----------------------- */}

        <div className="mt-8">
          <label htmlFor="name" className="text-sm text-gray-300 font-semibold">
            Website
          </label>
          <div
            className="mt-1 flex w-full items-center justify-center 
        bg-[#2727279e] px-3 rounded-xl h-11"
          >
            <input
              id="name"
              type="text"
              className="w-full py-1.5 h-full bg-[transparent] 
   outline-0 text-sm text-gray-300 placeholder-gray-700"
            />
          </div>
        </div>

        <div className="mt-8">
          <label htmlFor="name" className="text-sm text-gray-300 font-semibold">
            Bitcoin lightning address ⚡ (lud16):
          </label>
          <div
            className="mt-1 flex w-full items-center justify-center 
        bg-[#2727279e] px-3 rounded-xl h-11"
          >
            <input
              id="name"
              type="text"
              className="w-full py-1.5 h-full bg-[transparent] 
   outline-0 text-sm text-gray-300 placeholder-gray-700"
            />
          </div>
        </div>

        <div className="mt-8">
          <p className="text-gray-300">
            <span className="font-bold">Conta registrada em:</span> 2023
          </p>
        </div>

        <button className="mt-10 bg-[#502574] hover:bg-[#572c79] px-10 py-3 tracking-wider capitalize rounded-md">
          Salvar
        </button>
      </div>
    </div>
  )
}
