import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import { Button } from '@/components/Button'
export default function FourZeroFour() {
  return (
    <>
      <PageSEO
        title="Nie znaleziono strony"
        description="Strona o ponadnym adresie nie została odnaleziona."
      />
      <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
        <div className="space-x-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:px-6 md:text-8xl md:leading-14">
            404
          </h1>
        </div>
        <div className="max-w-md">
          <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">Ups, nic tu nie ma</p>
          <p className="mb-6">Ta strona nie istnieje, ale są inne...</p>
          <Button href="/">Powrót do strony głównej</Button>
        </div>
      </div>
    </>
  )
}
