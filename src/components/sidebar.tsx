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
        <SearchBox />

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
              <Link href="/articles">
                <button className="w-full text-center text-[#1DA1F2] font-semibold py-2 hover:bg-[#2727279e]  ">
                  Ver mais
                </button>
              </Link>
            </li>
          </ul>
        </div>

        {/* ---------------- */}

        <span className="text-gray-500 text-xs mt-2">
          Terms of Service Privacy Policy Cookie Policy Ads info More © 2023
          Nagaro, Inc.
        </span>
      </div>
    </div>
  )
}
