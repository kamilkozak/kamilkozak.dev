import { useState } from 'react'
import { Comments } from 'pliny/comments'
import { formatDate } from 'pliny/utils/formatDate'
import PageTitle from '@/components/PageTitle'
import { BlogSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { Container } from '@/components/Container'
import { useRouter } from 'next/router'
import { BlogNewsletterForm } from '@/components/NewsletterForm'
import { Button } from '@/components/Button'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`

const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${siteMetadata.siteUrl}/blog/${slug}`
  )}`

function ArrowLeftIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function TwitterIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  )
}

export default function PostLayout({
  content,
  authorDetails,
  next,
  prev,
  children,
  previousPathname,
}) {
  const [loadComments, setLoadComments] = useState(false)
  const { filePath, path, slug, date, title, tags } = content
  let router = useRouter()
  return (
    <Container className="mt-4 lg:mt-8">
      <BlogSEO url={`${siteMetadata.siteUrl}/${path}`} {...content} />
      <ScrollTopAndComment />
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          {previousPathname && (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back to articles"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-gray-800/5 ring-1 ring-gray-900/5 transition dark:border dark:border-gray-700/50 dark:bg-gray-800 dark:ring-0 dark:ring-white/10 dark:hover:border-gray-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-gray-500 transition group-hover:stroke-gray-700 dark:stroke-gray-500 dark:group-hover:stroke-gray-400" />
            </button>
          )}
          <article>
            <header className="flex flex-col">
              <PageTitle className="mt-6">{title}</PageTitle>
              <time
                dateTime={date}
                className="order-first flex items-center text-base text-gray-400 dark:text-gray-500"
              >
                <span className="h-4 w-0.5 rounded-full bg-gray-200 dark:bg-gray-500" />
                <span className="ml-3">{formatDate(date, siteMetadata.locale)}</span>
              </time>
            </header>
            <div className="prose mt-8 max-w-none dark:prose-dark">{children}</div>
          </article>

          <div className="mt-14 space-y-8 border-t border-gray-100 pt-14 dark:border-gray-700/40">
            <BlogNewsletterForm title="Podoba Ci się to co czytasz?" />

            <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
              <Button
                href={editUrl(filePath)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
                variant="secondary"
              >
                Edytuj <GithubIcon className="h-4 w-4 fill-current" />
              </Button>

              <Button
                href={discussUrl(slug)}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-full"
                variant="secondary"
              >
                Skomentuj <TwitterIcon className="h-4 w-4 fill-current" />
              </Button>
            </div>

            {siteMetadata.comments && (
              <div id="comment">
                {!loadComments && (
                  <Button
                    className="w-full"
                    variant="secondary"
                    onClick={() => setLoadComments(true)}
                  >
                    Wyświetl komentarze &darr;
                  </Button>
                )}
                {loadComments && <Comments commentsConfig={siteMetadata.comments} slug={slug} />}
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}
