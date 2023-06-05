import clsx from 'clsx'

export default function PageTitle({ className, children }) {
  return (
    <h1
      className={clsx(
        'text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl',
        className
      )}
    >
      {children}
    </h1>
  )
}
