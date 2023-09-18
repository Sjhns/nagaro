import { RELAYS } from '@/constants/relays'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {
  NostrProviderFromUseNostrSSR,
  NostrProviderFromNostrReactSSR,
} from '../contexts/nostr-provider-ssr'
import { Menu } from '@/components/menu'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nagaro',
  description: 'Nagaro',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <NostrProviderFromNostrReactSSR relayUrls={RELAYS}>
          <NostrProviderFromUseNostrSSR>
            <main className="flex w-full">
              <Menu />

              <div className="flex-1">{children}</div>
            </main>
          </NostrProviderFromUseNostrSSR>
        </NostrProviderFromNostrReactSSR>
      </body>
    </html>
  )
}
