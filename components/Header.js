import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import Image from '@/components/Image'
import logo from '@/data/logo.jpg'
import SectionContainer from '@/components/SectionContainer'
const Header = () => {
  return (
    <header className="py-10">
      <SectionContainer className="flex items-center justify-between">
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
          <div className="hidden sm:block">
            {headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
              >
                {link.title}
              </Link>
            ))}
          </div>
          <ThemeSwitch />
          <MobileNav />
        </div>
      </SectionContainer>
    </header>
  )
}
export default Header
