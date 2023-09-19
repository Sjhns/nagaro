import { Header } from '@/components/header'

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Sobre" />

      <section className="p-3 pr-20 pb-20 space-y-10">
        <div className="space-y-5">
          <span className="text-xl font-bold">Sobre</span>
          <p className="text-gray-white-400">
            A Nagaro é uma rede social minimalista, mas com os recursos que você
            já conhece e ama.
          </p>

          <p className="text-gray-white-400">
            Nossa missão é fornecer uma plataforma de mídia social que seja
            simples, rápida e segura.
          </p>

          <ul className="space-y-2 list-disc pl-7">
            <li className="text-gray-white-400">
              <span className="font-bold">Simples:</span> Nossa interface é
              limpa e intuitiva. Não há anúncios, pop-ups ou conteúdo
              patrocinado.
            </li>
            <li className="text-gray-white-400">
              <span className="font-bold">Rápido:</span> Nossa plataforma é leve
              e rápida. Não há rastreadores, scripts ou cookies de terceiros.
            </li>
            <li className="text-gray-white-400">
              <span className="font-bold">Seguro:</span> Nossa plataforma é
              segura e privada. Não há coleta de dados, rastreamento de
              atividades ou compartilhamento de informações.
            </li>

            <li className="text-gray-white-400">
              <span className="font-bold">Privacidade:</span> Não solicitamos
              numero de telefone, e-mail ou qualquer outra informação pessoal.
              Basta apenas um nome ou pseudônimo para conseguir acessar a
              plataforma e começar a interagir com outros usuários.
            </li>
          </ul>
        </div>

        <div className="space-y-5">
          <span className="text-xl font-bold ">Versão</span>

          <ul className="space-y-2 list-disc pl-7">
            <li className="text-gray-white-400">
              <span className="font-bold">Nome:</span> Nagaro
            </li>

            <li className="text-gray-white-400">
              <span className="font-bold">Versão:</span> 1.0.0 (Beta)
            </li>

            <li className="text-gray-white-400">
              <span className="font-bold">Data de lançamento:</span> 01/09/2021
            </li>
          </ul>
        </div>

        <div className="space-y-5">
          <span className="text-xl font-bold">Redes Sociais</span>

          <ul className="space-y-2 list-disc pl-7">
            <li className="text-gray-white-400">
              <span className="font-bold">Twitter:</span>{' '}
              <a
                href="https://twitter.com/nagarosocial"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                @nagarosocial
              </a>
            </li>

            <li className="text-gray-white-400">
              <span className="font-bold">Instagram:</span>{' '}
              <a
                href="https://instagram.com/nagarosocial"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                @nagarosocial
              </a>
            </li>

            <li className="text-gray-white-400">
              <span className="font-bold">Linkedin:</span>{' '}
              <a
                href="https://www.linkedin.com/company/nagaro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                https://www.linkedin.com/company/nagaro
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}