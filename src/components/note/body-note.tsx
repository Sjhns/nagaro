'use client'

import Link from 'next/link'
import * as linkify from 'linkifyjs'

import { extractMedias } from '@/functions/extract-medias'
import { removeLinksFromText } from '@/functions/remove-links-from-text'
import { usePathname, useRouter } from 'next/navigation'

type BodyNoteProps = {
  content: string
  tags?: string[][]
  nip19NoteId: string
  npub?: string
}

export const BodyNote = ({
  content,
  tags,
  nip19NoteId,
  npub,
}: BodyNoteProps) => {
  const links = linkify.find(content, 'url')
  const hashtags = tags?.filter((t) => t[0] === 't').map((t) => t[1])

  const { imageLinks, otherLinks, videoLinks } = extractMedias(links)
  const textWithoutLinks = removeLinksFromText(content, links)

  const { push } = useRouter()
  const path = usePathname()
  const isNoteDetails = path === `/d/${nip19NoteId}`

  const handleNoteDetails = () => {
    if (isNoteDetails) {
      return
    }

    push(`/d/${nip19NoteId}?npub=${npub}`)
  }

  return (
    <div className={`mt-2 overflow-hidden`}>
      <p
        className={`w-max break-words text-gray-200 text-base max-w-2xl
         `}
        onClick={isNoteDetails ? undefined : handleNoteDetails}
      >
        {textWithoutLinks}
      </p>
      <p className="mt-2 max-w-2xl w-max">
        {otherLinks.map((link) => (
          <Link href={link} target="_blank" key={link} prefetch={false}>
            <span
              key={link}
              className="text-xs block text-blue-700 hover:cursor-pointer hover:underline"
            >
              {link}
            </span>
          </Link>
        ))}
      </p>

      <p>
        {imageLinks.map((link) => (
          <img
            key={link}
            src={link}
            alt="Media"
            className="my-2 rounded md:max-h-96 max-w-full cursor-pointer"
          />
        ))}
      </p>

      <p>
        {videoLinks.map((link) => (
          <video
            key={link}
            src={link}
            controls
            className="my-2 rounded md:max-h-96 max-w-full cursor-pointer"
          />
        ))}
      </p>

      {hashtags && (
        <div className="flex flex-wrap mt-2 space-x-2 max-w-2xl">
          {hashtags.map((tag) => (
            <Link href={`/search/${tag}`} key={tag} prefetch={false}>
              <span className="text-xs text-blue-700 hover:cursor-pointer hover:underline">
                #{tag}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
