import Link from 'next/link'
import { SearchBox } from './common/search-box'
import { Article } from '@/@types/article'
import { ArticleCard } from './layout/article-card'

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
      <div
        className="border-l border-white-transparent
         py-2 px-3 pt-4 md:mx-0 flex flex-col gap-4"
      >
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

              // <li
              //   key={post}
              //   className="border-b border-white-transparent p-3 flex"
              // >
              //   <Avatar
              //     src="https://randomuser.me/api/portraits/women/58.jpg"
              //     alt="Avatar"
              //     size="sm"
              //   />

              //   <div className="flex w-full flex-col ml-3">
              //     <div className="flex items-center w-full">
              //       <span className="text-gray-200 font-semibold text-sm">
              //         Maria
              //       </span>

              //       <span className="mx-1">
              //         <svg
              //           xmlns="http://www.w3.org/2000/svg"
              //           className="h-3 w-3 text-gray-600"
              //           viewBox="0 0 20 20"
              //           fill="currentColor"
              //         >
              //           <path
              //             fillRule="evenodd"
              //             d="M10 12a2 2 0 100-4 2 2 0 000 4z"
              //             clipRule="evenodd"
              //           />
              //         </svg>
              //       </span>
              //       <span className="text-[11px] text-gray-600 font-semibold">
              //         2h
              //       </span>
              //     </div>

              //     <span className="line-clamp-2 text-[11px] text-gray-500">
              //       Lorem ipsum dolor sit amet consectetur adipisicing
              //       elit. Impedit iure voluptates et ab quae veritatis
              //       sint mollitia soluta consequuntur voluptatibus debitis
              //       assumenda explicabo distinctio, vero ipsam sunt
              //       accusamus, porro blanditiis.
              //     </span>
              //   </div>
              // </li>
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
