import { useState } from 'react'
import { useRouter } from 'next/router'
import { formatDate } from 'pliny/utils/formatDate'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { Container } from '@/components/Container'
function Pagination({ totalPages, currentPage }) {
  const router = useRouter()
  const basePath = router.pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages
  return (
    <div className="space-y-2 pt-16 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            &laquo; Poprzednia
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            &laquo; Poprzednia
          </Link>
        )}
        <span>
          {currentPage} z {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Następna &raquo;
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Następna &raquo;
          </Link>
        )}
      </nav>
    </div>
  )
}
export default function ListLayout({ posts, title, initialDisplayPosts = [], pagination }) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts
  return (
    <Container className="mt-4 sm:mt-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          Moje przemyślenia na temat programowania, architektury, PHP i Laravela.
        </p>
        <div className="relative mt-6">
          <label>
            <span className="sr-only">Wyszukaj post</span>
            <input
              aria-label="Wyszukaj post"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Wyszukaj post"
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
          </label>
          <svg
            className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      <div className="mt-16 sm:mt-20">
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex flex-col space-y-16">
            {!filteredBlogPosts.length && 'Nie znaleziono postów.'}
            {displayPosts.map((post) => {
              const { path, date, title, summary, tags } = post
              return (
                <article key={path} className="md:grid md:grid-cols-4 md:items-baseline">
                  <div className="group relative flex flex-col items-start md:col-span-3">
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
                      <Link href={`/${path}`}>
                        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                        <span className="relative z-10">{title}</span>
                      </Link>
                    </h2>
                    <time
                      className="relative z-10 order-first mb-3 flex items-center pl-3.5 text-zinc-400 dark:text-zinc-500 md:hidden"
                      dateTime={date}
                    >
                      <span
                        className="absolute inset-y-0 left-0 flex items-center"
                        aria-hidden="true"
                      >
                        <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                      </span>
                      {formatDate(date, siteMetadata.locale)}
                    </time>
                    <p className="relative z-10 mt-2 text-zinc-600 dark:text-zinc-400">{summary}</p>
                    <div
                      aria-hidden="true"
                      className="relative z-10 mt-4 flex items-center font-medium text-teal-500"
                    >
                      Czytaj dalej &rarr;
                    </div>
                  </div>
                  <time
                    className="relative z-10 order-first mb-3 mt-1 flex hidden items-center text-zinc-400 dark:text-zinc-500 md:block"
                    dateTime={date}
                  >
                    {formatDate(date, siteMetadata.locale)}
                  </time>
                </article>
              )
            })}
          </div>
        </div>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </Container>
  )
}
