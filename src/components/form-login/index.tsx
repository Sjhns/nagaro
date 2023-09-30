'use client'

import { AuthContext } from '@/contexts/use-auth'
import { SimplePool, finishEvent, generatePrivateKey } from 'nostr-tools'

import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { BiKey } from 'react-icons/bi'

import Image from 'next/image'
import { RELAYS } from '@/constants/relays'
import { LoginWithExtensionNostr } from './form-with-extension-nostr'
import { Alert } from './alert'
import { LoginHeader } from './login-header'
import { validateKeyHex } from '@/functions/validate-key-hex'

export const Login = () => {
  const { push, refresh } = useRouter()
  const { isAuthenticated, loginWithPrivateKey, loginWithPublicKey } =
    useContext(AuthContext)
  const [isNewUser, setIsNewUser] = useState(false)
  const [displayName, setDisplayName] = useState<string>('')
  const pool = new SimplePool()

  useEffect(() => {
    if (isAuthenticated) {
      push('/global')
    }
  }, [isAuthenticated, push])

  const [privateKey, setPrivateKey] = useState('')

  const handleLoginWithExtensionNostr = async () => {
    try {
      if (!window.nostr) {
        toast.error(
          'Nenhuma extensão Nostr encontrada. Verifique se você instalou a extensão',
        )
        return
      }

      const pubkey = await window.nostr.getPublicKey()

      const isValidatedKey = validateKeyHex(pubkey)

      if (!isValidatedKey) {
        toast.error('A chave pública não é válida')
        return
      }

      if (!pubkey) {
        toast.error('Você rejeitou a solicitação')
        return
      }

      loginWithPublicKey(pubkey)

      push('/global')
    } catch (error) {
      toast.error('Você rejeitou a solicitação')
    }
  }

  const handleLoginWithPrivateKey = async () => {
    try {
      if (!privateKey) {
        toast.error('Por favor, insira sua chave privada')
        return
      }

      const isValidatedKey = validateKeyHex(privateKey)

      if (!isValidatedKey) {
        toast.error('A chave privada não é válida')
        return
      }

      loginWithPrivateKey(privateKey)

      push('/global')
    } catch (error) {
      toast.error('Você rejeitou a solicitação')
    }
  }

  const handleGeneratePrivateKey = async () => {
    const privateKey = await generatePrivateKey()

    setIsNewUser(true)

    setPrivateKey(privateKey)
  }

  const handleLoginNewUser = async () => {
    try {
      if (!privateKey) {
        toast.error('Por favor, insira sua chave privada')
        return
      }

      if (!displayName) {
        toast.error('Por favor, insira seu nome')
        return
      }

      const metadata = {
        name: displayName,
      }

      const unsignedEvent = {
        kind: 0,
        created_at: Math.floor(Date.now() / 1000),
        tags: [],
        content: JSON.stringify(metadata),
      }

      const signedEvent = finishEvent(unsignedEvent, privateKey)

      if (!signedEvent.sig) {
        toast.error('Nenhuma assinatura foi encontrada')
      }

      const handlePublish = async () => {
        try {
          pool.publish(RELAYS, signedEvent)
        } catch (error) {
          toast.error('Você rejeitou a solicitação')
        }
      }

      handlePublish()

      loginWithPrivateKey(privateKey)

      push('/global')
      refresh()
    } catch (error) {
      toast.error('Você rejeitou a solicitação')
    }
  }

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center relative">
        <div className="flex flex-col justify-center md:px-20 md:max-w-2xl w-full px-8 py-10 md:py-0">
          <LoginHeader />

          {!isNewUser && (
            <label
              htmlFor="privateKey"
              className="inline-block text-gray-300 text-sm font-semibold mb-3"
            >
              Sua chave de privada
            </label>
          )}

          {isNewUser && (
            <label
              htmlFor="displayName"
              className="inline-block text-gray-300 text-sm font-semibold mb-3"
            >
              Nome ou um pseudônimo
            </label>
          )}
          <div
            className="flex w-full items-center justify-center 
  bg-[#2727279e] pl-5 rounded h-12"
          >
            {!isNewUser && (
              <input
                type="text"
                name="privateKey"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="............"
                className="w-full py-2 h-full bg-[transparent] 
      outline-0 text-gray-300 placeholder-gray-700"
              />
            )}

            {isNewUser && (
              <input
                type="text"
                name="name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="............"
                className="w-full py-2 h-full bg-[transparent] 
      outline-0 text-gray-300 placeholder-gray-700"
              />
            )}
          </div>

          {!isNewUser && (
            <div className="flex justify-end mt-3 space-x-2 ">
              <span className="text-gray-400 text-xs">
                Não tem uma chave privada?
              </span>
              <button
                className="text-purple-500 hover:text-purple-600 hover:cursor-pointer text-xs flex items-center"
                onClick={handleGeneratePrivateKey}
              >
                Gere uma <BiKey className="ml-1 text-lg" />
              </button>
            </div>
          )}

          {isNewUser && <Alert />}

          <button
            className="mt-9 flex w-full items-center justify-center bg-blue-900 px-9 rounded py-3 hover:bg-[#2e39adc4] hover:cursor-pointer text-gray-200 font-semibold"
            onClick={isNewUser ? handleLoginNewUser : handleLoginWithPrivateKey}
          >
            Login
          </button>

          {/* ---------------------------------------- */}

          {!isNewUser && (
            <LoginWithExtensionNostr
              handleLoginWithExtensionNostr={handleLoginWithExtensionNostr}
            />
          )}
        </div>

        {/* ---------------- */}
        <div className="flex-1 h-screen w-full hidden md:block">
          <Image
            src="/images/nostr.jpg"
            alt="Background"
            width={100000}
            height={100000}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </>
  )
}
