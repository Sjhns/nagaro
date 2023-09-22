export interface Link {
  type: string
  value: string
  isLink: boolean
  href: string
  start: number
  end: number
}

export const extractMedias = (links: Link[]) => {
  const imageLinks: string[] = []
  const videoLinks: string[] = []
  const otherLinks: string[] = []

  links.forEach((link) => {
    if (link.type === 'url' && link.isLink) {
      const url = link.value.toLowerCase()

      // Verifique se a URL termina com uma extensão de imagem comum
      if (
        url.endsWith('.jpg') ||
        url.endsWith('.jpeg') ||
        url.endsWith('.png') ||
        url.endsWith('.gif') ||
        url.endsWith('.webp') ||
        url.endsWith('.svg') ||
        url.endsWith('.bmp')
      ) {
        // É uma imagem
        imageLinks.push(link.value)

        // Verifique se a URL termina com um vídeo
      } else if (
        url.endsWith('.mp4') ||
        url.endsWith('.webm') ||
        url.endsWith('.ogg') ||
        url.endsWith('.mov') ||
        url.endsWith('.avi') ||
        url.endsWith('.flv') ||
        url.endsWith('.wmv')
      ) {
        // É um vídeo
        videoLinks.push(link.value)
      } else {
        // É outro tipo de mídia
        otherLinks.push(link.value)
      }
    }
  })

  return { imageLinks, otherLinks, videoLinks }
}
