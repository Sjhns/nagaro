import Image from 'next/image'
import Link from 'next/link'

import { AiFillStar } from 'react-icons/ai'
import { MdVerifiedUser } from 'react-icons/md'

export const Hero = () => {
  return (
    <main className="flex-1  rounded-lg flex items-center space-x-10 px-14">
      <div className="flex flex-col items-start flex-1">
        <span className="font-semibold text-[0.805rem] capitalize mb-5">
          Literatura - <i className="underline">Biblioteca Online</i>{' '}
        </span>
        <h1 className="text-6xl font-bold text-gray-200 uppercase">
          Para o sucesso <br /> Você precisa ler
        </h1>

        <p className="mt-3">
          Não sabe o que ler? Explore nossa biblioteca e encontre o livro ideal
          para você totalmente grátis.
        </p>

        <Link href="/library" prefetch={false}>
          <button className="mt-10 bg-[#603285] hover:bg-[#572c79] px-10 py-3 tracking-wider capitalize rounded-md">
            Explora agora
          </button>
        </Link>

        <div className="flex items-center justify-between space-x-16 mt-10">
          <div className="flex items-center">
            <span className="rounded-xl border-[1.5px] border-blue-gray-500 shadow-navy-blue  items-center justify-center p-2 mr-2 text-yellow-500">
              <AiFillStar />
            </span>
            5.0
          </div>

          <div className="flex items-center">
            <span className="rounded-xl border-[1.5px] border-blue-gray-500 shadow-navy-blue items-center justify-center p-2 mr-2 text-green-400">
              <MdVerifiedUser />
            </span>
            Gratuito e seguro
          </div>
        </div>
      </div>
      <div className="flex-1">
        <Image
          src="/imgs/reading_time.svg"
          role="img"
          alt="Library"
          width={0}
          height={0}
          className="w-full h-full object-cover object-center"
        />
      </div>
    </main>
  )
}
