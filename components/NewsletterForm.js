import { useRef, useState } from 'react'

import siteMetadata from '@/data/siteMetadata'
import { Button } from '@/components/Button'

function MailIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-gray-100 stroke-gray-400 dark:fill-gray-100/10 dark:stroke-gray-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-gray-400 dark:stroke-gray-500"
      />
    </svg>
  )
}

const NewsletterForm = ({ title = 'Bądź na bieżąco' }) => {
  const inputEl = useRef(null)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = async (e) => {
    e.preventDefault()

    const res = await fetch(`/api/${siteMetadata.newsletter.provider}`, {
      body: JSON.stringify({
        email: inputEl.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { error } = await res.json()
    if (error) {
      setError(true)
      setMessage(
        'Wygląda na to, że podany email jest nieprawidłowy lub jesteś już zapisany do mojego newslettera.'
      )
      return
    }

    inputEl.current.value = ''
    setError(false)
    setSubscribed(true)
    setMessage(
      'Dzięki za subskrypcję!  🎉 \n' +
        'Wyślę Ci email za każdym razem, gdy opublikuję nowy post na blogu lub będę miał coś ciekawego do przekazania, o czym, jak sądzę, chciałbyś wiedzieć. Możesz zrezygnować z subskrypcji w dowolnym momencie, nie ma problemu.'
    )
  }

  return (
    <form
      onSubmit={subscribe}
      className="rounded-2xl border border-gray-100 p-6 dark:border-gray-700/40"
    >
      <div className="flex text-sm font-semibold text-gray-900 dark:text-gray-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">{title}</span>
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Otrzymuj powiadomienia, gdy opublikuję coś nowego i anuluj subskrypcję w dowolnym momencie.
      </p>
      <div className="mx-auto mt-6 flex max-w-2xl">
        <input
          autoComplete="email"
          className="min-w-0 flex-auto appearance-none rounded-md border border-gray-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-gray-800/5 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10 dark:border-gray-700 dark:bg-gray-700/[0.15] dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:border-primary-400 dark:focus:ring-primary-400/10 sm:text-sm"
          id="email-input"
          name="email"
          placeholder={subscribed ? 'Subskrybujesz newsletter !  🎉' : 'Adres Email'}
          ref={inputEl}
          required
          type="email"
          disabled={subscribed}
          aria-label="Adres Email"
        />
        <Button
          disabled={subscribed}
          type="submit"
          className={`ml-4 flex-none ${subscribed && 'cursor-default'}`}
        >
          {subscribed ? 'Dzięki!' : 'Dołącz'}
        </Button>
      </div>
      {error && <div className="pt-2 text-sm text-red-500 dark:text-red-400">{message}</div>}
      {!error && message && <div className="pt-2 text-sm">{message}</div>}
    </form>
  )
}

export default NewsletterForm

export const BlogNewsletterForm = ({ title }) => (
  <div className="not-prose">
    <NewsletterForm title={title} />
  </div>
)
