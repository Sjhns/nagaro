'use client'

import { Textarea, IconButton, Button } from '@/material-tailwind'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar } from '../avatar'
import { finishEvent, EventTemplate, Event, getEventHash } from 'nostr-tools'
import { PoolSingleton } from '@/infra/providers/pool-singleton'
import { RELAYS } from '@/constants/relays'
import { GlobalContext } from '@/functions/context'
import { handleTextareaResize } from '@/functions/text-area-resize'

const handleCreateNote = async (
  content: string,
  setError: (message: string) => void,
  refresh: () => void,
  setContent: (content: string) => void,
) => {
  const poolInstance = PoolSingleton.getInstance()
  const pool = poolInstance.getPool()

  if (!window.nostr) {
    alert(
      'Nostr extension not found. Please install it from https://nostr.guru',
    )
    return
  }

  const baseEvent = {
    kind: 1,
    created_at: Math.floor(Date.now() / 1000),
    tags: [['t', 'nostr']],
    content,
  } as EventTemplate

  try {
    const pubkey = await window.nostr.getPublicKey()
    const sig = await (await window.nostr.signEvent(baseEvent)).sig

    const event: Event = {
      ...baseEvent,
      sig,
      pubkey,
      id: getEventHash({ ...baseEvent, pubkey }),
    }

    pool.publish(RELAYS, event)
    pool.close(RELAYS)
    setContent('')
    refresh()
  } catch (error) {
    alert('User rejected the request')
  }

  // this assigns the pubkey,  calculates the event id and signs the event in a single step
  // const signedEvent = finishEvent(event, sk)
  // await pool.publish(RELAYS, signedEvent)
}

export const CreateNote = () => {
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  const { refresh } = useRouter()
  const { user } = useContext(GlobalContext)

  const count = content.length
  const max = 500
  const rest = max - count

  return (
    <div className="flex flex-col w-full px-3.5 pt-3 pb-3 border-t border-b border-divider-color ">
      <div className="flex items-start space-x-3">
        <Avatar
          alt="Avatar"
          src={user.picture ?? 'https://api.dicebear.com/7.x/identicon/svg'}
          size="md"
        />
        <div className="flex-1 relative">
          {error && (
            <div className="flex right-0 -top-1 absolute">
              <span className="text-red-600 text-[10px]">{error}</span>
            </div>
          )}
          <Textarea
            variant="static"
            placeholder="O que você está pensando?"
            rows={1}
            resize={false}
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
              handleTextareaResize(e)
              setError('')
            }}
            className="min-h-full flex-1 !border-0 focus:border-transparent text-gray-white-300 placeholder:text-gray-700 text-lg"
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
          />

          {
            <div className="flex justify-end">
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
      </div>
      <div className="flex w-full justify-between py-1.5 mt-4">
        <IconButton variant="text" color="blue-gray" size="sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
            />
          </svg>
        </IconButton>
        <div className="flex gap-2">
          <Button
            size="sm"
            color="gray"
            variant="filled"
            className="rounded-md text-gray-300"
            onClick={async () => {
              await handleCreateNote(content, setError, refresh, setContent)
            }}
          >
            Compartilhar
          </Button>
        </div>
      </div>
    </div>
  )
}
