import Image from 'next/image'
import { Button } from '@/components/Button' // Add Button component here
import { SimpleLayout1 } from '@/components/SimpleLayout'
import CVIT from '@/images/logos/cvit.png'
import SEMEVAL from '@/images/logos/semeval.jpeg'
import AMS from '@/images/logos/ams.jpeg'
import ECELL from '@/images/logos/ecell.png'
import IIITH from '@/images/logos/iiith.png'
import SpinLogics from '@/images/logos/SpinLogics.png'
import HackingClub from '@/images/logos/hacking.png'
import AIC from '@/images/logos/AIC.png'
import LG from '@/images/logos/lg.png'
import INDIAAI from '@/images/logos/indiaai.png'

import SERC from '@/images/logos/SERC.png'

export const metadata = {
  title: 'Publications',
  description: 'Manuscripts, I wrote those.',
}
function CertificationsIcon(props) {
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
        d="M4 6h16v12H4V6z" // Outer rectangle (achievement body)
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M4 6l8 6 8-6" // Top of the achievement (like a ribbon or banner)
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
      <circle
        cx="12"
        cy="14"
        r="2"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />{' '}
      {/* Circular part representing the seal */}
      <path
        d="M8 20l4-4 4 4"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />{' '}
      {/* Ribbon or banner at the bottom */}
    </svg>
  )
}

function ArrowDownIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Role({ role }) {
  let startLabel =
    typeof role.start === 'string' ? role.start : role.start.label
  let startDate =
    typeof role.start === 'string' ? role.start : role.start.dateTime

  let endLabel = typeof role.end === 'string' ? role.end : role.end.label
  let endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {role.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={startDate}>{startLabel}</time>{' '}
          <span aria-hidden="true">—</span>{' '}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  )
}

function Publications() {
  let publications = [
    {
      title: `Exploring Multimodal Emotion Cause Pair Extraction as Sequence Labelling Task`,
      conf: 'Semeval',
      logo: SEMEVAL,
      publication_date: '2024',
      link:'https://arxiv.org/pdf/2404.02088'
    },    
    {
      title: `On the trail of textual origins: Roberta-bilstm approach to detect ai-generated text`,
      conf: 'Semeval',
      logo: SEMEVAL,
      publication_date: '2024',
      link:'https://arxiv.org/pdf/2407.02978'
    },
    
  ]

  return (
    <div className="mt-8 rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <CertificationsIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Publications</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {publications.map((publication, index) => (
          <Publication key={index} publication={publication} />
        ))}
      </ol>
    </div>
  )
} 

function Publication({ publication }) {
  let startLabel =
    typeof publication.publication_date === 'string'
      ? publication.publication_date
      : publication.publication_date.label;

  return (
    <a href={publication.link} target="_blank" rel="noopener noreferrer">
      <li className="flex gap-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 p-2 rounded-lg transition-colors">
        <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
          <Image src={publication.logo} alt="" className="h-7 w-7" unoptimized />
        </div>
        <dl className="flex flex-auto flex-wrap gap-x-2">
          <dt className="sr-only">Conference</dt>
          <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {publication.conf}
          </dd>
          <dt className="sr-only">Paper title</dt>
          <dd className="text-xs text-zinc-500 dark:text-zinc-400">
            {publication.title}
          </dd>
          <dt className="sr-only">Publication Date</dt>
          <dd className="ml-auto text-xs text-zinc-400 dark:text-zinc-500">
            <time dateTime={publication.publication_date}>{startLabel}</time>
          </dd>
        </dl>
      </li>
    </a>
  );
}



export default function Speaking() {
  return (
    <SimpleLayout1
      title="Some outputs I got when I did some research."
      intro="Major conferences up ahead."
      style
    >

    <Publications />

    </SimpleLayout1>
  )
}
