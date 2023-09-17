'use client'

import { TfiBackLeft } from 'react-icons/tfi'
import { HiArrowRight } from 'react-icons/hi'
import { redirect, useRouter } from 'next/navigation'
import { ToggleLoginOrRegister } from './type'
import { ResponseAPI } from '@/@types/response-api'

export const Login = ({ toggleLoginOrRegister }: ToggleLoginOrRegister) => {
  const { push } = useRouter()

  const handleLoginWithWalletNostr = async () => {
    if (!window.nostr) {
      alert(
        'Nostr extension not found. Please install it from https://nostr.guru',
      )
      return
    }

    try {
      const pubkey = await window.nostr.getPublicKey()

      if (!pubkey) {
        alert('User rejected the request')
        return
      }

      const output = await fetch('/external/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pubkey,
        }),
      })

      const { success, error } = (await output.json()) as ResponseAPI

      if (!success) {
        alert(error)
        return
      }

      redirect('/global')
    } catch (error) {
      alert('User rejected the request')
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-4">
      <div
        className="flex w-full items-center justify-center 
  bg-[#2727279e] pl-5 rounded-full h-12"
      >
        <input
          type="text"
          // onC  hange={(e) => setKey(e.target.value)}
          placeholder="Chave de acesso"
          className="w-full py-2 h-full bg-[transparent] 
  outline-0 text-gray-500 placeholder-gray-700"
        />

        <button
          className="flex items-center justify-center bg-[#2727279e] px-5 rounded-full h-full hover:bg-[# 272727df]"
          // onClick={handleLogin}
        >
          <HiArrowRight className="text-gray-200 text-lg" />
        </button>
      </div>

      <span className="text-gray-500 text-sm text-center">
        Ou faça login com uma extensão do Nostr para acessar sua conta
      </span>

      <button
        className="flex items-center justify-center bg-[#2727279e] px-9 rounded-full py-3 hover:bg-[#272727df] text-gray-200 font-semibold"
        onClick={handleLoginWithWalletNostr}
      >
        <img
          src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/connect-wallet/1/metamask-logo.png"
          alt="Wallet"
          className="w-10 h-10 object-cover object-center mr-2"
        />
        Usar uma extensão do Nostr
      </button>

      <div className=" flex items-center justify-center space-x-2">
        <TfiBackLeft className="text-purple-800 hover:text-purple-700 cursor-pointer font-bold" />
        <span
          className="text-purple-800 hover:text-purple-700 cursor-pointer font-bold"
          onClick={() => toggleLoginOrRegister('register')}
        >
          Voltar
        </span>
      </div>
    </div>
  )
}
