import { ArticleCard } from '@/components/article-card'
import { Header } from '@/components/header'
import { getArticle } from '@/components/sidebar'
import Link from 'next/link'

export default async function Page() {
  const articles = await getArticle(30)

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header title="Notícias" />

      <div className="flex-1 flex flex-wrap items-center justify-around gap-y-7">
        {articles.map((article) => (
          <Link
            key={article.source.id}
            href={article.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <ArticleCard
              key={article.source.id}
              author={article.author}
              publishedAt={article.publishedAt}
              title={article.title}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
