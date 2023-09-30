export const Relays = () => {
  const mapRelays = [
    { active: true, url: 'wss://nostr.fmt.wiz.biz' },
    { active: true, url: 'wss://relay.damus.io' },
    { active: true, url: 'wss://nostr-pub.wellorder.net' },
    { active: true, url: 'wss://offchain.pub' },
    { active: true, url: 'wss://nos.lol' },
    { active: true, url: 'wss://relay.snort.social' },
    { active: true, url: 'wss://relay.current.fyi' },
    { active: true, url: 'wss://soloco.nl' },
  ]
  return (
    <div className="pt-8">
      <h2 className="text-2xl font-bold mb-5">Rede</h2>
      <p className="text-gray-400 mb-10 pr-20">
        Relays são servidores (descentralizados) que armazenam as mensagens e
        informações de usuários do Nostr. Eles são usados para receber e enviar
        mensagens. Você pode escolher os relay para vai usar, ou pode usar o
        padrão.
      </p>

      <div className="space-y-2">
        {mapRelays.map((relay) => (
          <Relay key={relay.url} active={relay.active} url={relay.url} />
        ))}
      </div>
    </div>
  )
}

type RelayProps = {
  url: string
  active: boolean
}

const Relay = ({ active, url }: RelayProps) => {
  return (
    <div className="flex items-center ">
      {active ? (
        <span className="w-3 h-3 rounded-full bg-green-500"></span>
      ) : (
        <span className="w-3 h-3 rounded-full bg-red-500"></span>
      )}

      <div className="flex items-center justify-between w-full pr-24">
        <span className="ml-2">{url}</span>

        <div className=" space-x-2 flex items-center">
          <button
            className="ml-auto bg-blue-700 text-gray-200  py-1 px-3 rounded-full 
          text-xs cursor-pointer flex items-center"
          >
            Escrever
          </button>

          <button
            className="ml-auto bg-emerald-600 text-gray-200 py-1 px-3 rounded-full 
          text-xs cursor-pointer flex items-center"
          >
            Ler
          </button>
        </div>
      </div>
    </div>
  )
}
