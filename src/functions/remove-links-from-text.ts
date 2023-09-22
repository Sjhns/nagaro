import { Link } from './extract-medias'

export const removeLinksFromText = (text: string, links: Link[]) => {
  let textWithoutLinks = text

  links.forEach((link) => {
    textWithoutLinks = textWithoutLinks.replace(link.value, '')
  })

  return textWithoutLinks
}
