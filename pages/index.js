import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import { sortedBlogPost, allCoreContent } from 'pliny/utils/contentlayer'
import NewsletterForm from '@/components/NewsletterForm'
import { allBlogs } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import clsx from 'clsx'
import Image from '@/components/Image'
import image1 from 'public/static/images/photos/image-1.jpg'
import image2 from 'public/static/images/photos/image-2.jpg'
import image3 from 'public/static/images/photos/image-3.jpg'
import image4 from 'public/static/images/photos/image-4.jpg'
import image5 from 'public/static/images/photos/image-5.jpg'
import logoMasterlease from 'public/static/images/logos/masterlease.png'
import logoHomfi from 'public/static/images/logos/homfi.png'
import logoWebchefs from 'public/static/images/logos/webchefs.png'
import logoPlaceholder from 'public/static/images/logos/placeholder.png'
import SectionContainer from '@/components/SectionContainer'
import { Button } from '@/components/Button'

const MAX_DISPLAY = 3
export const getStaticProps = async () => {
  const sortedPosts = sortedBlogPost(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return {
    props: {
      posts,
    },
  }
}

function BriefcaseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-gray-100 stroke-gray-400 dark:fill-gray-100/10 dark:stroke-gray-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-gray-400 dark:stroke-gray-500"
      />
    </svg>
  )
}

function ArrowDownIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Resume() {
  let resume = [
    {
      company: 'Masterlease',
      title: 'Senior PHP Developer',
      logo: logoMasterlease,
      start: '2022',
      end: {
        label: 'obecnie',
        dateTime: new Date().getFullYear(),
      },
    },
    {
      company: 'Protyre.pl',
      title: 'PHP Developer / Owner',
      logo: logoPlaceholder,
      start: '2015',
      end: {
        label: 'obecnie',
        dateTime: new Date().getFullYear(),
      },
    },
    {
      company: 'Homfi',
      title: 'Senior PHP Developer',
      logo: logoHomfi,
      start: '2022',
      end: '2022',
    },
    {
      company: 'Webchefs',
      title: 'Full Stack Developer',
      logo: logoWebchefs,
      start: '2021',
      end: '2022',
    },
    {
      company: 'FHU Jan Kozak',
      title: 'Programista PHP',
      logo: logoPlaceholder,
      start: '2008',
      end: '2014',
    },
  ]

  return (
    <div className="rounded-2xl border border-gray-100 p-6 dark:border-gray-700/40">
      <h2 className="flex text-sm font-semibold text-gray-900 dark:text-gray-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Doświadczenie</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-gray-800/5 ring-1 ring-gray-900/5 dark:border dark:border-gray-700/50 dark:bg-gray-800 dark:ring-0">
              <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Firma</dt>
              <dd className="w-full flex-none text-sm font-medium text-gray-900 dark:text-gray-100">
                {role.company}
              </dd>
              <dt className="sr-only">Stanowisko</dt>
              <dd className="text-xs text-gray-500 dark:text-gray-400">{role.title}</dd>
              <dt className="sr-only">Data</dt>
              <dd
                className="ml-auto text-xs text-gray-400 dark:text-gray-500"
                aria-label={`${role.start.label ?? role.start} until ${role.end.label ?? role.end}`}
              >
                <time dateTime={role.start.dateTime ?? role.start}>
                  {role.start.label ?? role.start}
                </time>{' '}
                <span aria-hidden="true">—</span>{' '}
                <time dateTime={role.end.dateTime ?? role.end}>{role.end.label ?? role.end}</time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      <Button
        href="/static/software_developer_kamil_kozak.pdf"
        variant="secondary"
        className="group mt-6 w-full"
        alt="Kamil Kozak - CV"
        target="_blank"
        rel="noopener noreferrer"
      >
        Pobierz CV
        <ArrowDownIcon className="h-4 w-4 stroke-gray-400 transition group-active:stroke-gray-600 dark:group-hover:stroke-gray-50 dark:group-active:stroke-gray-50" />
      </Button>
    </div>
  )
}

function Photos() {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 sm:w-72 sm:rounded-2xl',
              rotations[imageIndex % rotations.length]
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <SectionContainer>
        <div className="max-w-2xl">
          <div className="space-y-3 md:space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
              Programista PHP z pragmatycznym podejściem.
            </h1>
            <p className="leading-7 text-gray-600 dark:text-gray-400">{siteMetadata.description}</p>
            <div className="mt-6 flex gap-7">
              <SocialIcon kind="twitter" href={siteMetadata.twitter} size={5} />
              <SocialIcon kind="instagram" href={siteMetadata.instagram} size={5} />
              <SocialIcon kind="github" href={siteMetadata.github} size={5} />
              <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={5} />
              <SocialIcon kind="facebook" href={siteMetadata.facebook} size={5} />
              <SocialIcon kind="youtube" href={siteMetadata.youtube} size={5} />
            </div>
          </div>
        </div>
      </SectionContainer>

      <Photos />

      <SectionContainer className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              const { slug, date, title, summary, tags } = post
              return (
                <article key={slug} className="group relative flex flex-col items-start">
                  <h2 className="text-base font-semibold tracking-tight text-gray-800 dark:text-gray-100">
                    <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-gray-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-gray-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
                    <Link href={`/blog/${slug}`}>
                      <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                      <span className="relative z-10">{title}</span>
                    </Link>
                  </h2>
                  <time
                    className="relative z-10 order-first mb-3 flex items-center pl-3.5 text-sm text-gray-400 dark:text-gray-500"
                    dateTime={date}
                  >
                    <span
                      className="absolute inset-y-0 left-0 flex items-center"
                      aria-hidden="true"
                    >
                      <span className="h-4 w-0.5 rounded-full bg-gray-200 dark:bg-gray-500"></span>
                    </span>
                    {formatDate(date, siteMetadata.locale)}
                  </time>
                  <p className="relative z-10 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {summary}
                  </p>
                  <div
                    aria-hidden="true"
                    className="relative z-10 mt-4 flex items-center text-sm font-medium text-primary-500"
                  >
                    Czytaj dalej &rarr;
                  </div>
                </article>
              )
            })}
            {posts.length > MAX_DISPLAY && (
              <div className="flex justify-end text-base font-medium leading-6">
                <Link
                  href="/blog"
                  className="flex items-center text-sm text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="Wszystkie posty"
                >
                  Wszystkie posty &rarr;
                </Link>
              </div>
            )}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            {siteMetadata.newsletter.provider && (
              <div className="flex items-center justify-center pt-4">
                <NewsletterForm />
              </div>
            )}
            <Resume />
          </div>
        </div>
      </SectionContainer>
    </>
  )
}
