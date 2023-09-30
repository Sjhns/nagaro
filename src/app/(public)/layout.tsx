import { CurrentSessionPublic } from '@/contexts/current-session'

import { ReactNode } from 'react'

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return <CurrentSessionPublic>{children}</CurrentSessionPublic>
}
