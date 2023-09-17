import Image from 'next/image'
import { fonts } from '@/fonts'
import { AiOutlineCloudDownload } from 'react-icons/ai'

export const BookDetails = () => {
  return (
    // bg-gradient-to-r from-[#0a1530] from-30% to-black to-70%
    <div
      className="flex-1 pl-5 pr-10 py-7 
    flex items-center justify-center gap-x-7"
    >
      <div className="min-w-[18rem] w-72">
        <Image
          src="/book-cover/4.jpg"
          alt="Book cover"
          width={500}
          height={500}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div>
        <span className="block text-sm text-gray-white-400 mb-2 tracking-wider">
          2023
        </span>
        <h1
          className="text-5xl text-gray-white-200 mb-2"
          style={{
            fontFamily: `${fonts.libreBaskervville.style.fontFamily}`,
          }}
        >
          Fiquei com seu número
        </h1>

        <h2
          className="text-3xl text-gray-white-400 mb-7"
          style={{
            fontFamily: `${fonts.josefinSlab.style.fontFamily}`,
          }}
        >
          Sophie Kinsella
        </h2>
        <div className="flex items-center justify-between gap-x-5 mb-7">
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">Editora</span>
            <p>Record</p>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">Gênero</span> Romance
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">Páginas</span> 462
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">ISBN</span> 9788501099503
          </div>
        </div>

        <span className="block text-gray-400 text-sm mb-1">Sinopse:</span>

        <p className="text-gray-200">
          Poppy Wyatt está prestes a se casar com o homem perfeito e não podia
          estar mais feliz... Até que, numa bela tarde, ela não só perde o anel
          de noivado (que está na família do noivo há três gerações) como também
          seu celular. Mas ela acaba encontrando um telefone abandonado no hotel
          em que está hospedada. Perfeito! Agora os funcionários podem ligar
          para ela quando encontrarem seu anel. <br /> Quem não gosta nada da
          história é o dono do celular, o executivo Sam Roxton, que não suporta
          a ideia de haver alguém bisbilhotando suas mensagens e sua vida
          pessoal. Mas, depois de alguns torpedos, Poppy e Sam acabam ficando
          cada vez mais próximos e ela percebe que a maior surpresa da sua vida
          ainda está por vir.
        </p>

        <div className="mt-10">
          <button
            className="mt-10 flex items-center gap-x-3 bg-[#52138a]
           hover:bg-[#4a107d] px-11 py-4 tracking-wider capitalize rounded-md"
          >
            <span className="text-2xl">
              <AiOutlineCloudDownload />
            </span>
            Baixar PDF
          </button>
        </div>
      </div>
    </div>
  )
}
