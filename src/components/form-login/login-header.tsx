import Image from 'next/image'
import Link from 'next/link'

export const LoginHeader = () => {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-300 mb-8 uppercase flex items-center">
        <Image
          width={100000}
          height={100000}
          src="/svgs/noodle-left.svg"
          alt="Logo"
          className="w-10 h-10 mr-2 relative top-2"
        />
        Nagaro
      </h3>
      <h1 className="text-3xl font-bold text-gray-300 mb-1">
        Faça login com sua conta NOSTR
      </h1>

      <h3 className="text-sm flex items-center mt-4 mb-10 space-x-2">
        <span className="text-sm text-gray-400">O que é o Nostr?</span>
        <Link
          href="https://nostr.com/"
          target="_blank"
          className="text-blue-600 hover:underline text-sm"
        >
          Aprenda mais sobre o Nostr
        </Link>
      </h3>
    </div>
  )
}
