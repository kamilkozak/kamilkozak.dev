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
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
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
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">{title}</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Otrzymuj powiadomienia, gdy opublikuję coś nowego i anuluj subskrypcję w dowolnym momencie.
      </p>
      <div className="mt-6 flex">
        <input
          autoComplete="email"
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
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
          className={`ml-4 flex-none ${
            subscribed && 'cursor-default hover:bg-gray-800 dark:hover:bg-gray-700'
          }`}
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
  <div className="flex items-center justify-center">
    <NewsletterForm title={title} />
  </div>
)
