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
import TrexQuant from '@/images/logos/trexquant.jpeg'
import AIC from '@/images/logos/AIC.png'
import LG from '@/images/logos/lg.png'
import INDIAAI from '@/images/logos/indiaai.png'

import SERC from '@/images/logos/SERC.png'

export const metadata = {
  title: 'Experience',
  description: 'Thats my daily chore',
}

function BriefcaseIcon(props) {
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
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
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

function Resume() {
  let resume = [
    {
      company: 'Trexquant',
      title: 'Global Alpha Researcher',
      logo: TrexQuant,
      start: 'May 2025',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear().toString(),
      },
    },

    {
      company: 'CVIT, IIITH',
      title: 'Undergraduate Researcher',
      logo: CVIT,
      start: 'May 2023',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: 'E-Cell, IIITH',
      title: 'Vice Coordinator',
      logo: ECELL,
      start: 'September 2023',
      end: {
        label: 'April 2024',
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: 'AIC, IIITH',
      title: 'System Admin Intern',
      logo: AIC,
      start: 'Aug 2023',
      end: 'March 2024',
    },
    {
      company: '0x1337 Hacking Club, IIITH',
      title: 'Overall Coordinator',
      logo: HackingClub,
      start: 'May 2022',
      end: 'Nov 2024',
    },
    {
      company: 'SERC, IIITH',
      title: 'Full Stack Developer Intern',
      logo: SERC,
      start: 'Dec 2022',
      end: 'Jan 2023',
    },
    {
      company: 'SpinLogics Software Solutions Pvt Ltd',
      title: 'Block Chain Developer Intern',
      logo: SpinLogics  ,
      start: 'Jan 2023',
      end: 'May 2023',
    },
  ]
  return (
    <>
      <div className="mt-7 rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
        <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <BriefcaseIcon className="h-6 w-6 flex-none" />
          <span className="ml-3">Work experiences</span>
        </h2>
        <ol className="mt-6 space-y-4">
          {resume.map((role, index) => (
            <Role key={index} role={role} />
          ))}
        </ol>   
      </div>
    </>
  )
}


function Achievements() {
  let achievements = [
    {
      company: `IndiaAI Fellowship`,
      title: 'IndiaAI',
      logo: INDIAAI,
      start: '2025',
    },    
    {
      company: `'LIFE'S GOOD' Scholarship`,
      title: 'LG',
      logo: LG,
      start: '2024',
    },
    {
      company: `Dean's Award`,
      title: 'IIITH',
      logo: IIITH,
      start: '2023',
    },
    {
      company: 'Merit List',
      title: 'IIITH',
      logo: IIITH,
      start: '2022',
    },
    {
      company: 'Principal’s Award in Computer Science',
      title: 'Ann Mary School',
      logo: AMS,
      start: '2019',
    },
  ]

  return (
    <div className="mt-8 rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <CertificationsIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Achievements</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {achievements.map((achievement, index) => (
          <Achievement key={index} achievement={achievement} />
        ))}
      </ol>
    </div>
  )
}

function Achievement({ achievement }) {
  let startLabel =
    typeof achievement.start === 'string'
      ? achievement.start
      : achievement.start.label

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image src={achievement.logo} alt="" className="h-7 w-7" unoptimized />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {achievement.company}
        </dd>
        <dt className="sr-only">Title</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {achievement.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd className="ml-auto text-xs text-zinc-400 dark:text-zinc-500">
          <time dateTime={achievement.start}>{startLabel}</time>{' '}
        </dd>
      </dl>
    </li>
  )
}

function Educations() {
  let educations = [
    {
      company: `International Institute of Information Technology, Hyderabad`,
      title: 'B.Tech in Computer Science and Master of Science in Computational Linguistics by Research',
      logo: IIITH,
      start: '2021-2026',
    },
    {
      company: 'Ann Mary School',
      title: 'ICSE+ISC',
      logo: AMS,
      start: '2006-2021',
    },
  ]

  return (
    <div className="mt-8 rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <CertificationsIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Education</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {educations.map((education, index) => (
          <Education key={index} education={education} />
        ))}
      </ol>
    </div>
  )
}

function Education({ education }) {
  let startLabel =
    typeof education.start === 'string'
      ? education.start
      : education.start.label

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image src={education.logo} alt="" className="h-7 w-7" unoptimized />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {education.company}
        </dd>
        <dt className="sr-only">Title</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {education.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd className="ml-auto text-xs text-zinc-400 dark:text-zinc-500">
          <time dateTime={education.start}>{startLabel}</time>{' '}
        </dd>
      </dl>
    </li>
  )
}


export default function Speaking() {
  return (
    <SimpleLayout1
      title="Experience."
      intro="I am just getting started so nothing much to show here, oops."
      style
    >
    <Button
            href="https://drive.google.com/file/d/1LVl97NKSGx9gHV56uqH-xJkPhMAiEEhD/view"
            target="_blank" // Opens link in a new tab
            rel="noopener noreferrer" // Security measure to prevent potential vulnerabilities
            variant="secondary"
            className="group mt-8 mb-8 w-full"
          >
            Download CV
            <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
        </Button>
    <Resume />
    <Achievements />
    <Educations />

    </SimpleLayout1>
  )
}
