import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'
import SectionContainer from '@/components/SectionContainer'
import Link from 'next/link'
export default function AuthorLayout({ content }) {
  const { name, avatar, email, twitter, linkedin, github, instagram } = content
  return (
    <SectionContainer className="mt-4 sm:mt-8">
      <PageSEO
        title={`O mnie - ${name}`}
        description="Nazywam się Kamil Kozak. Rozwiązuje problemy biznesowe za pomocą Laravela."
      />
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={avatar}
              alt="avatar"
              width={512}
              height={512}
              className="aspect-square rotate-3 rounded-2xl bg-gray-100 object-cover dark:bg-gray-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-800 dark:text-gray-100 sm:text-5xl">
            Nazywam się Kamil Kozak. Rozwiązuje problemy biznesowe za pomocą Laravela.
          </h1>
          <div className="mt-6 space-y-7 text-base text-gray-600 dark:text-gray-400">
            <p>
              Od ponad 10 lat zdobywam doświadczenie tworząc systemy dla branż bankowej,
              nieruchomości oraz motoryzacyjnej dla firm zatrudniających od kilkunastu do kilkuset
              pracowników. Pasjonuje mnie programowanie obiektowe i wszystko co związane z
              architekturą oprogramowania. Nie zapominając jednocześnie, że software powstaje, aby
              dostarczać wartość dla biznesu.
            </p>
            <p>
              W codziennej pracy łączę doświadczenie i pragmatyzm dlatego specjalizuje się w PHP i
              Laravelu. Śledzę społeczność tej technologii, jego twórców oraz najnowsze informacje z
              branży. Staram się łączyć Laravela i podejścia takie jak Domain Driven Design, które
              pomagają przy pracy nad rozbudowanymi projektami. O moich próbach przeczytasz na tym
              blogu.
            </p>

            <p>
              Skupiam się na wytwarzaniu oprogramowania dla swoich pracodawców. Po godzinach jednak,
              rozwijam własny produkt dla branży oponiarskiej -
              <Link
                href="https://protyre.pl"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary-500 dark:text-primary-400"
              >
                protyre.pl.
              </Link>
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <div>
            <SocialIcon kind="twitter" href={twitter} size={5}>
              Twitter
            </SocialIcon>
            <SocialIcon kind="instagram" href={instagram} size={5} className="mt-4">
              Instagram
            </SocialIcon>
            <SocialIcon kind="github" href={github} size={5} className="mt-4">
              Github
            </SocialIcon>
            <SocialIcon kind="linkedin" href={linkedin} size={5} className="mt-4">
              Linkedin
            </SocialIcon>
            <SocialIcon
              kind="mail"
              href={`mailto:${email}`}
              size={5}
              className="mt-8 border-t border-gray-100 pt-8 dark:border-gray-700/40"
            >
              {email}
            </SocialIcon>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
