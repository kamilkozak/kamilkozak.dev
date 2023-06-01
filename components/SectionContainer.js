import clsx from 'clsx'

export default function SectionContainer({ children, className }) {
  return (
    <section className={clsx('mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0', className)}>
      {children}
    </section>
  )
}
