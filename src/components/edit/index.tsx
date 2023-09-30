/* eslint-disable @next/next/no-img-element */
'use client'

import { handleTextareaResize } from '@/functions/text-area-resize'
import { ProfileMetadata } from '@/types/profile-metadata'

import { useState, ChangeEvent, useContext, useEffect } from 'react'
import { UploadImage } from './upload-image'
import { useProfile } from '@/hooks/use-profile'
import { AuthContext } from '@/contexts/use-auth'
import { Spinner } from '../spinner'
import { RELAYS } from '@/constants/relays'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import {
  Event,
  EventTemplate,
  SimplePool,
  finishEvent,
  getEventHash,
} from 'nostr-tools'
import { firebaseStore } from '@/store/firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'

export const Edit = () => {
  const { user } = useContext(AuthContext)
  const pool = new SimplePool()
  const { back } = useRouter()

  const { isFetchingMetadata, profile } = useProfile(user?.npub ?? '')

  const [updateProfile, setUpdateProfile] = useState<ProfileMetadata>({
    name: '',
    picture: '',
    banner: '',
    about: '',
    website: '',
    lud16: '',
    created_at: 0,
    displayName: '',
    id: '',
    lud06: '',
    nip05: '',
    username: '',
  })

  useEffect(() => {
    if (!isFetchingMetadata) {
      setUpdateProfile(profile)
    }
  }, [isFetchingMetadata])

  const handleUpdateProfile = async () => {
    if (!user?.priv) {
      try {
        const unsignedEvent = {
          kind: 0,
          created_at: Math.floor(Date.now() / 1000),
          tags: [],
          content: JSON.stringify(updateProfile),
        }

        const sig = (await window.nostr.signEvent(unsignedEvent)).sig

        const signedEvent: Event = {
          ...unsignedEvent,
          sig,
          pubkey: user?.npub ?? '',
          id: getEventHash({ ...unsignedEvent, pubkey: user?.npub ?? '' }),
        }

        pool.publish(RELAYS, signedEvent)

        toast.success('Perfil atualizado com sucesso')

        back()
      } catch (error) {
        toast.error('Você rejeitou a solicitação')
      }
    }

    const unsignedEvent: EventTemplate = {
      kind: 0,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content: JSON.stringify(updateProfile),
    }

    const signedEvent = finishEvent(unsignedEvent, user?.priv ?? '')

    console.log(signedEvent)

    if (!signedEvent.sig) {
      toast.error('Nenhuma assinatura foi encontrada')
    }

    try {
      pool.publish(RELAYS, signedEvent)

      toast.success('Perfil atualizado com sucesso')

      back()
    } catch (error) {
      toast.error('Você rejeitou a solicitação')
    }
  }

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>,
    type: 'picture' | 'banner',
  ) => {
    const file = event.target?.files && event.target.files[0]

    if (!file) {
      toast.error('Erro ao atualizar imagem')
      return
    }

    const { name } = file

    const fileName = crypto.randomUUID() + '.' + name.split('.').pop()

    const storageRef = ref(firebaseStore, 'proxy/' + fileName)

    await uploadBytes(storageRef, file, {
      contentType: file.type,
    })

    const listResult = await listAll(ref(firebaseStore, 'proxy'))

    const url = listResult.items.find((item) => item.name === fileName)

    if (!url) {
      toast.error('Erro ao atualizar imagem')
      return
    }

    const urlDownload = await getDownloadURL(url)

    if (type === 'picture') {
      setUpdateProfile({
        ...updateProfile,
        picture: urlDownload,
      })
    } else {
      setUpdateProfile({
        ...updateProfile,
        banner: urlDownload,
      })
    }

    toast.success('Imagem atualizada com sucesso')
  }

  if (isFetchingMetadata) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    )
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
                (updateProfile?.created_at ?? '') * 1000,
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
