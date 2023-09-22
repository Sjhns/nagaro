/* eslint-disable @next/next/no-img-element */
'use client'

import { handleTextareaResize } from '@/functions/text-area-resize'
import { ProfileMetadata } from '@/types/metadata'

import { useProfile } from 'nostr-react'
import { useState, ChangeEvent } from 'react'
import { UploadImage } from './upload-image'

export const Edit = () => {
  const { data: profile } = useProfile({
    pubkey: '2c54e621ece4ffdba085b70efd20d436b688b0f9f3e7bcfcac7a301805412087',
  })

  const [updateProfile, setUpdateProfile] = useState<ProfileMetadata>(
    profile! ?? {
      name: '',
      picture: '',
      banner: '',
      about: '',
      website: '',
      lud16: '',
      display_name: '',
      lud06: '',
      nip05: '',
      username: '',
      created_at: 0,
      npub: '',
    },
  )

  const handleUpdateProfile = () => {
    console.log(updateProfile)
  }

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
    type: 'picture' | 'banner',
  ) => {
    const file = event.target?.files && event.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target) {
          if (type === 'picture') {
            setUpdateProfile({
              ...updateProfile,
              picture: e.target.result as string,
            })
          } else {
            setUpdateProfile({
              ...updateProfile,
              banner: e.target.result as string,
            })
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
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
            value={updateProfile.name}
            onChange={(e) =>
              setUpdateProfile({ ...updateProfile, name: e.target.value })
            }
            className="w-full py-1.5 h-full bg-[transparent] 
   outline-0 text-sm text-gray-300 placeholder-gray-700"
          />
        </div>
      </div>

      {/* Campo de upload de imagem */}
      <UploadImage
        value={updateProfile.picture ?? ''}
        label="Foto de perfil"
        type="picture"
        handleImageChange={handleImageChange}
      />

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
          value={updateProfile.about}
          onChange={(e) => {
            handleTextareaResize(e)
            setUpdateProfile({ ...updateProfile, about: e.target.value })
          }}
          className="block p-2.5 w-full text-sm text-gray-200
             bg-[#2727279e] rounded-lg outline-none placeholder:text-gray-400 focus:ring-0 resize-none"
          placeholder="Sobre mim..."
        ></textarea>
      </div>

      {/* --------------------- */}

      <UploadImage
        value={updateProfile.banner ?? ''}
        label="Banner"
        type="banner"
        handleImageChange={handleImageChange}
      />

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
            value={updateProfile.website}
            onChange={(e) =>
              setUpdateProfile({ ...updateProfile, website: e.target.value })
            }
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
            value={updateProfile.lud16}
            onChange={(e) =>
              setUpdateProfile({ ...updateProfile, lud16: e.target.value })
            }
            className="w-full py-1.5 h-full bg-[transparent] 
   outline-0 text-sm text-gray-300 placeholder-gray-700"
          />
        </div>
      </div>

      <div className="mt-8">
        <p className="text-gray-300">
          <span className="font-bold">Conta registrada em:</span>
          <span className="ml-1">
            {updateProfile.created_at &&
              new Date(
                updateProfile?.created_at * 1000 ?? '',
              ).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
          </span>
        </p>
      </div>

      <button
        className="mt-10 bg-[#502574] hover:bg-[#572c79] px-10 py-3 tracking-wider capitalize rounded-md"
        onClick={handleUpdateProfile}
      >
        Salvar
      </button>
    </div>
  )
}
