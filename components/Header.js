import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import Image from '@/components/Image'
import logo from '@/data/logo.jpg'
import { Container } from '@/components/Container'
import { useRouter } from 'next/router'
import clsx from 'clsx'

function NavItem({ href, children }) {
  let isActive = useRouter().pathname === href

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'relative block px-3 py-2 transition',
          isActive
            ? 'text-primary-500 dark:text-primary-400'
            : 'hover:text-primary-600 dark:hover:text-primary-400'
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-primary-500/0 via-primary-500/40 to-primary-500/0 dark:from-primary-400/0 dark:via-primary-400/40 dark:to-primary-400/0" />
        )}
      </Link>
    </li>
  )
}

function DesktopNav(props) {
  return (
    <nav {...props}>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-gray-800 shadow-lg shadow-gray-800/5 ring-1 ring-gray-900/5 backdrop-blur dark:bg-gray-800/90 dark:text-gray-200 dark:ring-white/10">
        {headerNavLinks.map((link) => (
          <NavItem key={link.title} href={link.href}>
            {link.title}
          </NavItem>
        ))}
      </ul>
    </nav>
  )
}

const Header = () => {
  return (
    <header className="py-10">
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                <div className="mr-3">
                  <Image
                    src={logo}
                    width={64}
                    height={64}
                    alt="avatar"
                    className="h-16 w-16 rounded-full"
                  />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="hidden h-6 text-2xl font-semibold sm:block">{null}</div>
                ) : null}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <DesktopNav className="hidden sm:block" />
            <ThemeSwitch />
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  )
}
export default Header
