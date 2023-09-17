import { RELAYS } from '@/constants/relays'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NostrProviderSSR } from '../contexts/nostr-provider-ssr'

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
        <NostrProviderSSR relayUrls={RELAYS}>{children}</NostrProviderSSR>
      </body>
    </html>
  )
}
