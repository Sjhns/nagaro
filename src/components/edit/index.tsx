/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'

import { handleTextareaResize } from '@/functions/text-area-resize'

import { useState, ChangeEvent, useContext, useEffect } from 'react'
import { UploadImage } from './upload-image'
import { useProfile } from '@/hooks/use-profile'
import { AuthContext } from '@/contexts/use-auth'
import { Spinner } from '../spinner'
import { RELAYS } from '@/constants/relays'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Event, SimplePool, getEventHash, getSignature } from 'nostr-tools'
import { firebaseStore } from '@/store/firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'

export const Edit = () => {
  const { user } = useContext(AuthContext)
  const pool = new SimplePool()
  const { back } = useRouter()

  const { isFetchingMetadata, profile, handleInvalidate } = useProfile(
    user?.npub ?? '',
  )

  const [updateProfile, setUpdateProfile] = useState({
    name: '',
    picture: '',
    banner: '',
    about: '',
    website: '',
    lud16: '',
    displayName: '',
    lud06: '',
    nip05: '',
    username: '',
  })

  useEffect(() => {
    if (!isFetchingMetadata) {
      setUpdateProfile({
        about: profile?.about ?? '',
        banner: profile?.banner ?? '',
        name: profile?.name ?? '',
        picture: profile?.picture ?? '',
        displayName: profile?.displayName ?? '',
        lud06: profile?.lud06 ?? '',
        lud16: profile?.lud16 ?? '',
        nip05: profile?.nip05 ?? '',
        username: profile?.username ?? '',
        website: profile?.website ?? '',
      })
    }
  }, [isFetchingMetadata])

  const handleUpdateWithPublicKey = async () => {
    if (!user?.npub) {
      toast.error('Erro ao atualizar perfil')
      return
    }

    try {
      const unsignedEvent = {
        kind: 0,
        created_at: profile.created_at ?? Math.floor(Date.now() / 1000),
        tags: profile.tags ?? [],
        content: JSON.stringify(updateProfile),
        pubkey: user?.npub ?? '',
      }

      const sig = (await window.nostr.signEvent(unsignedEvent)).sig

      const signedEvent: Event = {
        ...unsignedEvent,
        sig,
        id: getEventHash(unsignedEvent),
      }

      pool.publish(RELAYS, signedEvent)

      toast.success('Perfil atualizado com sucesso')

      handleInvalidate()
      back()
    } catch (error) {
      toast.error('Você rejeitou a solicitação')
    }
  }

  const handleUpdateWithPrivateKey = async () => {
    if (!user?.priv || !user?.npub) {
      toast.error('Erro ao atualizar perfil')
      return
    }

    const unsignedEvent = {
      kind: 0,
      created_at: profile.created_at ?? Math.floor(Date.now() / 1000),
      tags: profile.tags ?? [],
      content: JSON.stringify(updateProfile),
      pubkey: user?.npub ?? '',
    }

    const signedEvent: Event = {
      ...unsignedEvent,
      sig: getSignature(unsignedEvent, user?.priv ?? ''),
      id: getEventHash(unsignedEvent),
    }

    console.log(signedEvent)

    if (!signedEvent.sig) {
      toast.error('Nenhuma assinatura foi encontrada')
    }

    try {
      pool.publish(RELAYS, signedEvent)

      toast.success('Perfil atualizado com sucesso')

      handleInvalidate()
      back()
    } catch (error) {
      toast.error('Você rejeitou a solicitação')
    }
  }

  const handleUpdateProfile = async () => {
    if (!profile) {
      toast.error('Erro ao atualizar perfil')
      return
    }

    if (!user?.priv) {
      handleUpdateWithPublicKey()
      return
    }

    handleUpdateWithPrivateKey()
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

      <UploadImage
        value={updateProfile.picture ?? ''}
        label="Foto de perfil"
        type="picture"
        handleImageChange={handleImageChange}
      />

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

      <UploadImage
        value={updateProfile.banner ?? ''}
        label="Banner"
        type="banner"
        handleImageChange={handleImageChange}
      />

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
            {profile.created_at &&
              new Date((profile?.created_at ?? '') * 1000).toLocaleDateString(
                'pt-BR',
                {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                },
              )}
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
