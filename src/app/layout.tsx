import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { RELAYS } from '@/constants/relays'
import { NostrProviderSSR } from '../contexts/nostr-provider-ssr'
import { AuthProvider } from '@/contexts/use-auth'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

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
        <AuthProvider>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <NostrProviderSSR relayUrls={RELAYS}>{children}</NostrProviderSSR>
        </AuthProvider>
      </body>
    </html>
  )
}
