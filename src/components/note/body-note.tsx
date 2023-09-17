'use client'

import Link from 'next/link'
import * as linkify from 'linkifyjs'

import { usePathname, useRouter } from 'next/navigation'
import { extractImagesFromLinks } from '@/functions/extract-images-from-links'
import { removeLinksFromText } from '@/functions/remove-links-from-text'

type BodyNoteProps = {
  content: string
  tags?: string[][]
  id: string
  handleEventDetails?: () => void
}

export const BodyNote = ({ content, tags, id }: BodyNoteProps) => {
  const { push } = useRouter()
  const path = usePathname()

  const links = linkify.find(content, 'url')
  const hashtags = tags?.filter((t) => t[0] === 't').map((t) => t[1])

  const { imageLinks, otherLinks, videoLinks } = extractImagesFromLinks(links)
  const textWithoutLinks = removeLinksFromText(content, links)

  const handlePostDetails = () => {
    if (path === `/details/${id}`) {
      return
    }

    push(`/details/${id}`)
  }

  return (
    <>
      <div className="mt-2">
        <p
          className="break-words text-gray-200 text-base max-w-2xl hover:cursor-pointer"
          onClick={handlePostDetails}
        >
          {textWithoutLinks}

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

          {imageLinks.map((link) => (
            <img
              key={link}
              src={link}
              alt="Media"
              className="my-2 rounded md:max-h-96 max-w-full cursor-pointer"
            />
          ))}

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
          <div className="flex flex-wrap mt-2 space-x-2">
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
    </>
  )
}
