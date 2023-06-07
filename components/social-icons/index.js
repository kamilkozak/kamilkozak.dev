import Mail from './mail.svg'
import Github from './github.svg'
import Facebook from './facebook.svg'
import Youtube from './youtube.svg'
import Linkedin from './linkedin.svg'
import Twitter from './twitter.svg'
import Instagram from './instagram.svg'
import clsx from 'clsx'

// Icons taken from: https://simpleicons.org/

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
}

const SocialIcon = ({ className, children, kind, href, size = 8 }) => {
  if (
    !href ||
    (kind === 'mail' && !/^mailto:\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(href))
  )
    return null

  const SocialSvg = components[kind]

  return (
    <a
      className={clsx(
        'group flex text-sm font-medium text-gray-800 transition hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400',
        className
      )}
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`flex-none fill-gray-500 transition group-hover:fill-primary-500 h-${size} w-${size}`}
      />
      {children && <span className="ml-4">{children}</span>}
    </a>
  )
}

export default SocialIcon
