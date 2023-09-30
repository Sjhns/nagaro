'use client'

import { AuthContext } from '@/contexts/use-auth'
import { nip19 } from 'nostr-tools'
import { useContext } from 'react'
import { BiKey } from 'react-icons/bi'

export const Account = () => {
  const { user } = useContext(AuthContext)

  const npub = nip19.npubEncode(user?.npub ?? '0x0')
  const npriv = user?.priv ? nip19.nsecEncode(user?.priv) : null

  return (
    <div className="pt-12 pl-3">
      <h2 className="text-2xl font-bold mb-5">Conta</h2>

      {user?.priv && (
        <p className="text-gray-300 mb-12">
          Faça backup da sua chave privada primeiro! Ou então não conseguirá
          logar novamente
        </p>
      )}

      <div>
        <h3 className="text-xl font-semibold mb-2">Chave publica</h3>

        <div className="flex items-center space-x-1 my-2">
          <BiKey className="text-purple-500 text-2xl relative bottom-1" />

          <p className="text-sm font-semibold text-gray-200 mb-2">{npub}</p>
        </div>

        <p className="text-sm text-gray-500 pr-20 mb-7">
          A chave publica é usada para identificar sua conta, ela é usada para
          logar, identificar você na rede, enviar mensagens para outros usuários
          etc. Ela é publica e pode ser compartilhada com qualquer pessoa.
        </p>

        <div className="flex items-center space-x-6">
          <button
            className="bg-purple-700 text-gray-200 font-semibold px-3.5  py-2 rounded-full text-xs"
            onClick={(event) => {
              navigator.clipboard.writeText(npub)

              const button = event.target as HTMLButtonElement

              button.innerText = 'Copiado!'

              setTimeout(() => {
                button.innerText = 'Copiar Npub'
              }, 2000)
            }}
          >
            Copiar Npub
          </button>
          <button
            className="bg-purple-700 text-gray-200 font-semibold px-3.5  py-2 rounded-full text-xs"
            onClick={(event) => {
              navigator.clipboard.writeText(user?.npub ?? '0x0')

              const button = event.target as HTMLButtonElement
              button.innerText = 'Copiado!'

              setTimeout(() => {
                button.innerText = 'Copiar Hex'
              }, 2000)
            }}
          >
            Copiar Hex
          </button>
        </div>
      </div>

      {user?.priv && (
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-2">Chave privada</h3>

          <p className="text-sm text-gray-500 pr-20 mb-7">
            A chave privada é usada para logar na sua conta, ela é privada e não
            deve ser compartilhada com ninguém. Ela é usada para assinar
            transações, enviar mensagens privadas e etc.
          </p>

          <div className="flex items-center space-x-6">
            <button
              className="bg-purple-700 text-gray-200 font-semibold px-3.5  py-2 rounded-full text-xs"
              onClick={(event) => {
                navigator.clipboard.writeText(npriv ?? '')

                const button = event.target as HTMLButtonElement
                button.innerText = 'Copiado!'

                setTimeout(() => {
                  button.innerText = 'Copiar Nsec'
                }, 2000)
              }}
            >
              Copiar Nsec
            </button>

            <button
              className="bg-purple-700 text-gray-200 font-semibold px-3.5  py-2 rounded-full text-xs"
              onClick={(event) => {
                navigator.clipboard.writeText(user?.priv ?? '0x0')

                const button = event.target as HTMLButtonElement
                button.innerText = 'Copiado!'

                setTimeout(() => {
                  button.innerText = 'Copiar Hex'
                }, 2000)
              }}
            >
              Copiar Hex
            </button>
          </div>
        </div>
      )}

      {!user?.priv && (
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-2">Chave privada</h3>

          <p className="text-sm text-gray-500 pr-20 mb-7">
            Nenhuma chave privada foi encontrada, muito bem!
          </p>
        </div>
      )}
    </div>
  )
}
