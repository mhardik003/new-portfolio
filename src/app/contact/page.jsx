import Link from 'next/link'
import { LinkedInIcon, XIcon } from '@/components/SocialIcons'
import { SimpleLayout } from '@/components/SimpleLayout'

export const metadata = {
  title: 'Contact',
  description: 'Contact me',
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-blue-600 dark:fill-blue-400 dark:group-hover:fill-blue-300" />
    </Link>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export default function Speaking() {
  return (
    <SimpleLayout
      title="Contact me."
      intro="Feel free to contact me via LinkedIn, X (Twitter), or email (DMs are open). I'll respond within a day. If you have an interesting project or collaboration opportunity, I'd love to hear from you."
    >
      <div className="mt-6 flex gap-6">
        <SocialLink
          href="https://www.linkedin.com/in/imuhammadessa/"
          aria-label="Follow on LinkedIn"
          icon={LinkedInIcon}
        />
        <SocialLink
          href="https://twitter.com/imuhammadessa"
          aria-label="Follow on X"
          icon={XIcon}
        />
        <SocialLink
          href="mailto:imuhammadessa@gmail.com"
          aria-label="Send an email"
          icon={MailIcon}
        />
      </div>
    </SimpleLayout>
  )
}
