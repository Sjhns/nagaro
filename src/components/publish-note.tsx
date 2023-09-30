'use client'

import { AuthContext } from '@/contexts/use-auth'
import { handleTextareaResize } from '@/functions/text-area-resize'
import { useContext, useState } from 'react'
import {
  EventTemplate,
  SimplePool,
  finishEvent,
  getEventHash,
} from 'nostr-tools'
import { RELAYS } from '@/constants/relays'
import { toast } from 'react-toastify'

function extractHashtags(text: string) {
  // Use uma expressão regular para encontrar todas as hashtags no texto
  const hashtagRegex = /#(\w+)/g
  const matches = text.match(hashtagRegex)

  if (!matches) {
    return []
  }

  const hashtags = matches.map((match) => {
    // Remova o caractere "#" e transforme todas as letras em minúsculas
    const hashtag = match.slice(1).toLowerCase()
    return ['t', hashtag]
  })

  return hashtags
}

export const CreateNote = () => {
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const pool = new SimplePool()
  const { user } = useContext(AuthContext)

  const count = content.length
  const max = 500
  const rest = max - count

  const HandlePublishNote = async () => {
    const hashTags = extractHashtags(content)

    if (!user?.priv) {
      const unsignedEvent: EventTemplate = {
        kind: 1,
        created_at: Math.floor(Date.now() / 1000),
        tags: hashTags,
        content,
      }

      try {
        const pubkey = await window.nostr.getPublicKey()
        const sig = (await window.nostr.signEvent(unsignedEvent)).sig

        const event = {
          ...unsignedEvent,
          sig,
          pubkey,
          id: getEventHash({ ...unsignedEvent, pubkey }),
        }

        pool.publish(RELAYS, event)

        toast.success('Publicação feita com sucesso')
        setContent('')
      } catch (error) {
        toast.error('Erro ao publicar')
      }
    }

    if (!window.nostr) {
      toast.error('Nenhuma extensão foi encontrada.')
      return
    }

    const unsignedEvent: EventTemplate = {
      kind: 1,
      created_at: Math.floor(Date.now() / 1000),
      tags: hashTags,
      content,
    }

    const signedEvent = finishEvent(unsignedEvent, user?.priv ?? '')

    if (!signedEvent.sig) {
      toast.error('Nenhuma assinatura foi encontrada')
    }

    try {
      pool.publish(RELAYS, signedEvent)

      toast.success('Publicação feita com sucesso')
      setContent('')
    } catch (error) {
      toast.error('Você rejeitou a solicitação')
    }
  }

  return (
    <div className="flex flex-col w-full pt-3 pb-3 border-b  px-3.5 border-white-transparent">
      <div className="flex-1 relative">
        {error && (
          <div className="flex right-0 -top-1 absolute">
            <span className="text-red-600 text-[10px]">{error}</span>
          </div>
        )}

        <textarea
          placeholder="O que você está pensando?"
          rows={2}
          value={content}
          onChange={(e) => {
            setContent(e.target.value)
            handleTextareaResize(e)
            setError('')
          }}
          className="w-full resize-none min-h-full p-2.5 bg-transparent text-lg focus:border-none text-gray-white-300 placeholder:text-gray-600 rounded-lg overflow-hidden"
        />

        {
          <div className="flex justify-end mt-3">
            <span
              className={`${
                rest < 0 ? 'text-red-600' : 'text-gray-600'
              } text-xs`}
            >
              {rest}
            </span>
          </div>
        }
      </div>

      <div className="flex items-center justify-end mt-4">
        <button
          className="bg-gray-100 hover:opacity-95 text-black text-xs 
          rounded-full px-5
          font-semibold py-2"
          onClick={HandlePublishNote}
        >
          Postar
        </button>
      </div>
    </div>
  )
}
