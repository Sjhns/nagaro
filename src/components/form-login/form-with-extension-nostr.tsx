import Link from 'next/link'

type Prosp = {
  handleLoginWithExtensionNostr: () => void
}

export const LoginWithExtensionNostr = ({
  handleLoginWithExtensionNostr,
}: Prosp) => {
  return (
    <div className="w-full">
      <div className="flex items-center my-8">
        <span className="h-[1px] w-full bg-gray-300"></span>
        <span className="text-gray-300 text-sm px-2 font-semibold whitespace-nowrap">
          Ou continue com
        </span>
        <span className="h-[1px] w-full bg-gray-300"></span>
      </div>

      <button
        className="flex w-full items-center justify-center px-9 rounded py-3  text-gray-200 hover:cursor-pointer font-semibold bg-purple-950 hover:opacity-90"
        onClick={handleLoginWithExtensionNostr}
      >
        Extensão do browser (Recomendado)
      </button>

      <p className="mt-5 text-sm text-gray-400 space-x-2">
        <span>Você não tem uma extensão?</span>

        <Link
          href="https://getalby.com/"
          target="_blank"
          className="text-blue-600 hover:underline text-sm"
        >
          Que tal essa?
        </Link>
      </p>
    </div>
  )
}
