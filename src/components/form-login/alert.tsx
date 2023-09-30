export const Alert = () => {
  return (
    <div
      className="mt-4 flex flex-col space-x-3 w-full items-center rounded-lg bg-primary-100 py-3"
      role="alert"
    >
      <span className="text-sm text-yellow-500">
        <span className="text-lg">⚠️</span> Não compartilhe sua chave privada
        com ninguém. É importante que você a mantenha segura. É a única maneira
        de acessar sua conta. Se você perdê-la, perderá o acesso à sua conta.
      </span>
    </div>
  )
}
