'use client'

import { useState } from 'react'
import { Login } from './login'
import { Register } from './register'

export const FormLogin = () => {
  const [loginOrRegister, setLoginOrRegister] = useState<'login' | 'register'>(
    'register',
  )

  const toggleLoginOrRegister = (type: 'login' | 'register') => {
    setLoginOrRegister(type)
  }

  return (
    <div className="w-full h-screen max-h-screen overflow-hidden flex flex-col items-center justify-center relative">
      <div className="w-32 h-32 absolute top-0 opacity-70 md:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="256"
          height="173"
          viewBox="0 0 256 173"
          fill="none"
        >
          <circle
            cx="128.109"
            cy="44.6784"
            r="127.36"
            transform="rotate(-0.143373 128.109 44.6784)"
            fill="url(#paint0_radial_2_64)"
          />
          <defs>
            <radialGradient
              id="paint0_radial_2_64"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(190.713 -40.3436) rotate(92.517) scale(203.734)"
            >
              <stop stop-color="#E46BBB" />
              <stop offset="0.298916" stop-color="#EB78BD" />
              <stop offset="0.736299" stop-color="#B72EB2" />
              <stop offset="1" stop-color="#81249A" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="w-32 h-32 absolute top-0 left-0 md:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="138"
          height="138"
          viewBox="0 0 138 138"
          fill="none"
        >
          <circle
            cx="68.8654"
            cy="68.8654"
            r="68.6937"
            transform="rotate(-0.143373 68.8654 68.8654)"
            fill="url(#paint0_radial_2_61)"
          />
          <defs>
            <radialGradient
              id="paint0_radial_2_61"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(38.3349 33.2464) rotate(59.144) scale(115.955)"
            >
              <stop stop-color="#646464" />
              <stop offset="0.604593" stop-color="#292929" />
              <stop offset="0.796202" stop-color="#0F0F0F" />
              <stop offset="1" stop-color="#1B1B1B" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="w-32 h-32 absolute bottom-0 right-3 md:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="138"
          height="138"
          viewBox="0 0 138 138"
          fill="none"
        >
          <circle
            cx="68.8654"
            cy="68.8654"
            r="68.6937"
            transform="rotate(-0.143373 68.8654 68.8654)"
            fill="url(#paint0_radial_2_61)"
          />
          <defs>
            <radialGradient
              id="paint0_radial_2_61"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(38.3349 33.2464) rotate(59.144) scale(115.955)"
            >
              <stop stop-color="#646464" />
              <stop offset="0.604593" stop-color="#292929" />
              <stop offset="0.796202" stop-color="#0F0F0F" />
              <stop offset="1" stop-color="#1B1B1B" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="w-32 h-32 absolute bottom-0 left-0 opacity-60 rotate-180 md:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="256"
          height="173"
          viewBox="0 0 256 173"
          fill="none"
        >
          <circle
            cx="128.109"
            cy="44.6784"
            r="127.36"
            transform="rotate(-0.143373 128.109 44.6784)"
            fill="url(#paint0_radial_2_64)"
          />
          <defs>
            <radialGradient
              id="paint0_radial_2_64"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(190.713 -40.3436) rotate(92.517) scale(203.734)"
            >
              <stop stop-color="#E46BBB" />
              <stop offset="0.298916" stop-color="#EB78BD" />
              <stop offset="0.736299" stop-color="#B72EB2" />
              <stop offset="1" stop-color="#81249A" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <section className="flex flex-col items-center justify-center z-30">
        <h1 className="text-5xl font-bold text-gray-500 mb-1 text-center">
          Bem-vindo ao Nagaro
        </h1>
        <h2 className="text-xl font-bold text-gray-500 text-center">
          Uma rede social minimalista e simples de usar para você
        </h2>
        <h3 className="font-bold text-center text-gray-600 mb-7">
          Crie uma conta com apenas um clique ou faça login com sua chave de
          acesso para <br /> começar a usar e interagir com a comunidade
        </h3>

        {loginOrRegister === 'login' && (
          <Login toggleLoginOrRegister={toggleLoginOrRegister} />
        )}

        {loginOrRegister === 'register' && (
          <Register toggleLoginOrRegister={toggleLoginOrRegister} />
        )}
      </section>
    </div>
  )
}
