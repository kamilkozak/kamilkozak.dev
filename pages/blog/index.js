import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import { sortedBlogPost, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
export const POSTS_PER_PAGE = 5
export const getStaticProps = async () => {
  const posts = sortedBlogPost(allBlogs)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }
  return {
    props: {
      initialDisplayPosts: allCoreContent(initialDisplayPosts),
      posts: allCoreContent(posts),
      pagination,
    },
  }
}
export default function BlogPage({ posts, initialDisplayPosts, pagination }) {
  return (
    <>
      <PageSEO
        title={`Blog - ${siteMetadata.author}`}
        description="Moje przemyślenia na temat programowania, architektury, PHP i Laravela."
      />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="Blog for Laravel Artisans"
      />
    </>
  )
}
