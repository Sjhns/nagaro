import { ToggleLoginOrRegister } from './type'
import { HiArrowRight } from 'react-icons/hi'

import { IoMdLogIn } from 'react-icons/io'

export const Register = ({ toggleLoginOrRegister }: ToggleLoginOrRegister) => {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-4">
      <div
        className="flex w-full items-center justify-center 
    bg-[#2727279e] pl-5 rounded-full h-12"
      >
        <input
          type="text"
          placeholder="Nome ou pseudônimo"
          // onChange={(e) => setName(e.target.value)}
          className="w-full py-2 h-full bg-[transparent] 
outline-0 text-gray-500 placeholder-gray-700"
        />

        <button
          className="flex items-center justify-center bg-[#2727279e] px-5 rounded-full h-full hover:bg-[#272727df]"
          // onClick={handleRegister}
        >
          <HiArrowRight className="text-gray-200 text-lg" />
        </button>
      </div>

      <div className="flex items-center justify-center space-x-2">
        <h3 className="text-gray-500 text-sm">Já tem uma conta?</h3>
        <span
          className="text-purple-800 hover:text-purple-700 cursor-pointer 
          font-bold flex items-center justify-center space-x-1"
          onClick={() => toggleLoginOrRegister('login')}
        >
          Entrar
          <IoMdLogIn className="text-lg inline-block ml-1" />
        </span>
      </div>
    </div>
  )
}
