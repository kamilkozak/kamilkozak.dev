import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import { Container } from '@/components/Container'
import headerNavLinks from '@/data/headerNavLinks'

function NavLink({ href, children }) {
  return (
    <Link href={href} className="transition hover:text-primary-600 dark:hover:text-primary-400">
      {children}
    </Link>
  )
}

export default function Footer() {
  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="border-t border-gray-100 pb-16 pt-10 dark:border-gray-700/40">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                {headerNavLinks.map((link) => (
                  <NavLink key={link.title} href={link.href}>
                    {link.title}
                  </NavLink>
                ))}
              </div>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                &copy; {new Date().getFullYear()} {siteMetadata.author} - Web Artisan
              </p>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  )
}
