import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import { sortedBlogPost, allCoreContent } from 'pliny/utils/contentlayer'
import { NewsletterForm } from 'pliny/ui/NewsletterForm'
import { allBlogs } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import clsx from 'clsx'
import Image from '@/components/Image'
import image1 from 'public/static/images/photos/image-1.jpg'
import image2 from 'public/static/images/photos/image-2.jpg'
import image3 from 'public/static/images/photos/image-3.jpg'
import image4 from 'public/static/images/photos/image-4.jpg'
import image5 from 'public/static/images/photos/image-5.jpg'
import SectionContainer from '@/components/SectionContainer'

const MAX_DISPLAY = 5
export const getStaticProps = async () => {
  const sortedPosts = sortedBlogPost(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return {
    props: {
      posts,
    },
  }
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
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
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
            <h1 className="text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
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

      <SectionContainer>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </SectionContainer>

      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
