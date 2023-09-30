import { Menu } from '@/components/menu'
import { CurrentSessionPrivate } from '@/contexts/current-session'
import { ReactNode } from 'react'

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <CurrentSessionPrivate>
      <main className="flex w-full">
        <Menu />

        <div className="flex-1">{children}</div>
      </main>
    </CurrentSessionPrivate>
  )
}
