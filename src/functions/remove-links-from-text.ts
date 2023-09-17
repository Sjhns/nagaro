import { Link } from './extract-images-from-links'

export const removeLinksFromText = (text: string, links: Link[]) => {
  let textWithoutLinks = text

  links.forEach((link) => {
    textWithoutLinks = textWithoutLinks.replace(link.value, '')
  })

  return textWithoutLinks
}
