import Link from 'next/link'
import { SearchBox } from './search-box'
import { ArticleCard } from './article-card'

type Article = {
  source: {
    id: null | number
    name: string
  }
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}

export const getArticle = async (pageSize: number): Promise<Article[]> => {
  const keyApiNews = process.env.NEXT_PUBLIC_KEY_API_NEWS
  const url = `https://newsapi.org/v2/top-headlines?country=pt&pageSize=${pageSize}&apiKey=${keyApiNews}`
  const response = await fetch(url, {
    cache: 'no-cache',
  })
  const data = await response.json()

  return data.articles
}

export const Sidebar = async () => {
  const articles = await getArticle(4)
  return (
    <div className="flex-col hidden lg:flex lg:w-1/3 min-w-min">
      <div className="py-2 px-3 pt-4 md:mx-0 flex flex-col gap-4">
        <SearchBox size="md" />

        {/* --------------- */}

        <div className="rounded-lg border-t border-l border-r border-b  border-white-transparent">
          <h3 className="text-gray-200 text-lg font-semibold border-b border-white-transparent px-3 py-2 flex items-center">
            🔥 As últimas notícias
          </h3>

          <ul>
            {articles.map((article) => (
              <li key={article.source.id}>
                <Link
                  href={article.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <ArticleCard
                    author={article.author}
                    publishedAt={article.publishedAt}
                    title={article.title}
                  />
                </Link>
              </li>
            ))}

            <li>
              <Link href="/articles" className="w-full h-full">
                <button className="w-full text-center text-[#1DA1F2] font-semibold py-2 hover:bg-[#2727279e]">
                  Ver mais
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <span className="text-gray-500 text-sm my-7 pl-3">
        Tem alguma sugestão?{' '}
        <Link
          href="https://forms.gle/B9F9bcjtuE7kieX96"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Clique aqui
        </Link>{' '}
        para enviar.
        <br />
      </span>
      <AlertDeveloper />
    </div>
  )
}

const AlertDeveloper = () => {
  return (
    <div className="w-full px-2 pt-3 sticky top-0">
      <div className="flex flex-col px-3 pb-5 rounded-lg shadow border border-white-transparent">
        <div className="flex flex-col items-center text-center">
          <div className="inline-block p-4 rounded-full">
            <svg
              className="w-12 h-12 fill-current text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
            </svg>
          </div>
          <h2 className="mt-2 font-semibold text-gray-200 text-lg">
            A nagaro ainda está em desenvolvimento
          </h2>
          <p className="mt-2 text-sm text-gray-300 leading-relaxed">
            A Nagaro ainda está em desenvolvimento, então, algumas
            funcionalidades podem não está funcionando corretamente ou não
            estarem disponíveis ainda. Agradecemos a compreensão. Estamos
            trabalhando para melhorar a Nagaro a cada dia e sua opinião é muito
            importante para nós.
          </p>
        </div>
      </div>
    </div>
  )
}
