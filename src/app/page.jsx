/* eslint-disable react/no-unescaped-entities */

import Image from 'next/image'
import Link from 'next/link'

import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button' // Add Button component here

import { GitHubIcon, LinkedInIcon, XIcon} from '@/components/SocialIcons'
import { FaDev } from "react-icons/fa";
import { PiDevToLogoLight } from "react-icons/pi";
import { SlSocialLinkedin, SlSocialTwitter } from "react-icons/sl";
import { VscGithubAlt } from "react-icons/vsc";

// import { ReactComponent as DevTo} from '../images/logos/dev-to.svg';

import CVIT from '@/images/logos/cvit.png'
import PSYDUCK from '@/images/logos/psyduck.svg'
import ECELL from '@/images/logos/ecell.png'
import IIITH from '@/images/logos/iiith.png'
import SpinLogics from '@/images/logos/SpinLogics.png'
import HackingClub from '@/images/logos/hacking.png'
import AIC from '@/images/logos/AIC.png'
import SERC from '@/images/logos/SERC.png'

import { getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

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

function RightArrowIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 4.75L11.25 8m0 0L7.25 11.25M11.25 8H3.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
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

function Article({ article }) {
  return (
    <Card as="article">
      <Card.Title href={article.url}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
    </Card>
  )
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
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

function Achievements() {
  let achievements = [
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
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
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

function Resume() {
  let resume = [
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
        label: 'Present',
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
      <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
        <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <BriefcaseIcon className="h-6 w-6 flex-none" />
          <span className="ml-3">Work experiences</span>
        </h2>
        <ol className="mt-6 space-y-4">
          {resume.map((role, index) => (
            <Role key={index} role={role} />
          ))}
        </ol>
        <Button
            href="https://drive.google.com/file/d/1LVl97NKSGx9gHV56uqH-xJkPhMAiEEhD/view"
            target="_blank" // Opens link in a new tab
            rel="noopener noreferrer" // Security measure to prevent potential vulnerabilities
            variant="secondary"
            className="group mt-6 w-full"
          >
            Download CV
            <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
        </Button>
                
      </div>
    </>
  )
}

export default async function Home() {
  let articles = (await getAllArticles()).slice(0, 4)

  return (
    <>
      <Container className="mt-9 pb-20 mb-28">
        <div className="max-w-3xl">
        <span style={{ display: 'inline-flex', alignItems: 'stretch', marginBottom: -50 }}>

          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">  
              Hi there, I'm Hardik  &nbsp;  
          </h1>

              <svg xmlns="http://www.w3.org/2000/svg"
              
              >
                <path d="M57,44a6.19,6.19,0,0,1-.13,1.08C56.43,47.4,54.37,52.65,45,52l2.83-4L50,45Z" data-name="&lt;Path&gt;" fill="#d6a62d" id="c9a5c15e-5957-44a8-86cf-e08d3c5e3980"/>\
                <path d="M57,44a6.19,6.19,0,0,1-.13,1.08c-1.56,1.69-4.29,3.12-9,3L50,45Z" data-name="&lt;Path&gt;" fill="#ffd466" id="70a78d9f-91cf-49a5-abc3-b713be6041de"/>
                <path d="M50,45l7-1s0,8.83-12,8Z" data-name="&lt;Path&gt;" fill="none" id="caab3b9a-29d8-4baa-8a2f-87eb52751659" stroke="#001c63" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>\
                <path d="M16,53s-4,2.83-4,4,3,1,3,1a1.79,1.79,0,0,0,1,2,2.7,2.7,0,0,0,.76.23,4.77,4.77,0,0,0,4.53-1.94L23,56Z" data-name="&lt;Path&gt;" fill="#fff0c9" id="52cbfe14-caff-4e85-b737-2b905da70639" stroke="#001c63" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path d="M40,53s4,2.83,4,4-3,1-3,1a1.79,1.79,0,0,1-1,2,2.7,2.7,0,0,1-.76.23,4.77,4.77,0,0,1-4.53-1.94L33,56Z" data-name="&lt;Path&gt;" fill="#fff0c9" id="798fc051-e975-4f45-a9fd-c729e41d59d6" stroke="#001c63" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><g data-name="&lt;Group&gt;" id="14ee5cbd-b29b-411d-a84c-66953bd61ab7"><path d="M39,55q-1.3.52-2.55.93C20.63,61,11,51.27,11,43.75A20.89,20.89,0,0,1,11.66,39a19.46,19.46,0,0,1,2.69-5.9L14,33c-.25-.57-.47-1.12-.65-1.65C9.51,20.54,17,16,17,16l.47.08C18,12.78,20,8.79,26,6c8.73-4,16.8.29,20.29,7.29.12-.15.25-.29.38-.29h0A.7.7,0,0,1,47,13s3.67,2.16,3,11a25.69,25.69,0,0,1-1.23,6.45l.73.12A6.71,6.71,0,0,1,51,32.46a9.57,9.57,0,0,1,.59,1.2C53.88,39.17,52.92,49.31,39,55Z" data-name="&lt;Path&gt;" fill="#ffd466" id="eaeb54a6-f12a-45e4-b916-f2541b98739b"/></g><ellipse cx="36" cy="18.5" data-name="&lt;Path&gt;" fill="#001c63" id="a94ce72e-4ac9-45f8-bc93-1351368169af" rx="1" ry="1.5"/><path d="M38,48.5a18.29,18.29,0,0,1-1.55,7.43C20.63,61,11,51.27,11,43.75A20.89,20.89,0,0,1,11.66,39,14.05,14.05,0,0,1,23.5,32C31.51,32,38,39.39,38,48.5Z" data-name="&lt;Path&gt;" fill="#f0c763" id="1c7d44e7-459c-4a71-814a-5dc1a8108f75"/><path d="M39,55c-17.33,7.08-28-3.33-28-11.25a19.5,19.5,0,0,1,3.35-10.68L14,33c-.25-.57-.47-1.12-.65-1.65L14,32l4-2c-.2.45-8.48,12.56-3,18,10.5,10.38,24.12,5.5,30,0,5.12-4.78,5.43-6.87,6.61-14.34C53.88,39.17,52.92,49.31,39,55Z" data-name="&lt;Path&gt;" fill="#f0c763" id="f0044952-acc2-4c20-aef4-b21e43dcf927"/><ellipse cx="21" cy="17.5" data-name="&lt;Path&gt;" fill="#001c63" id="0b5913b6-02c1-4709-a4fb-fb0e276bf356" rx="1" ry="1.5"/><line data-name="&lt;Path&gt;" fill="none" id="bc3ffd40-cce9-40ac-92a3-ec3dcf3f5049" stroke="#001c63" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="34" x2="33" y1="6" y2="2"/><line data-name="&lt;Path&gt;" fill="none" id="8bd34b54-b4bb-4f27-a80d-d541c9b94bbc" stroke="#001c63" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="34" x2="26" y1="6" y2="2"/><path d="M51,32.46c-2.7,2.07-4.85,3-4,.54,1.88-5.62-1-18-1-18l.67-2h0A.7.7,0,0,1,47,13s3.67,2.16,3,11a25.76,25.76,0,0,1-1.23,6.46l.73.12A6.71,6.71,0,0,1,51,32.46Z" data-name="&lt;Path&gt;" fill="#f0c763" id="ed48c155-f32b-4570-bdaf-bd229e9032cb"/><g data-name="&lt;Group&gt;" id="e1cacd22-f7d7-487c-88ef-c471c04c21da"><path d="M18,22a12.71,12.71,0,0,1-.53-5.92C18,12.78,20,8.79,26,6a15.72,15.72,0,0,1,21,7" data-name="&lt;Path&gt;" fill="none" id="bdaaeba4-f384-4068-8140-4e6f2d5b3dde" stroke="#001c63" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path d="M38,28s3.67-4.67,4-9,3-1,3-1,.43-3.59,1.29-4.71h0c.22-.27.45-.39.71-.28,0,0,3.67,2.17,3,11a25.78,25.78,0,0,1-1.23,6.46C47.57,34,46,35,46,35" data-name="&lt;Path&gt;" fill="none" id="aff8d462-5b72-4bf1-bc50-daae90ceb95e" stroke="#001c63" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path d="M17,30a15.2,15.2,0,0,0-2.65,3.07A19.5,19.5,0,0,0,11,43.75C11,51.67,21.67,62.08,39,55S53.58,33.92,49.5,30.58" data-name="&lt;Path&gt;" fill="none" id="e46249c2-3dd4-46ba-a4c6-b0a2448a0c4d" stroke="#001c63" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path d="M17,16s-8.25,5-3,17" data-name="&lt;Path&gt;" fill="none" id="ecef5e93-671a-4aa9-8302-e49fe27496a7" stroke="#001c63" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></g><path d="M30,28c-3.26,1.24-15.42,3-19,0a5.17,5.17,0,0,1-1.35-1.56C8.55,24.37,11,23.14,13,23c2.5-.17,8.83-1.25,10-3s4-1,4-1c2,.24,2.85,2.16,6.52,3.79L34,23C38.08,24.67,33.5,26.67,30,28Z" data-name="&lt;Path&gt;" fill="#ffdb7d" id="b5e28079-1bb2-4651-a980-454b72be535c"/><path d="M33.52,22.79C33.07,24,30.3,25.12,28,26c-3.08,1.17-14.14,2.81-18.35.44C8.55,24.37,11,23.14,13,23c2.5-.17,8.83-1.25,10-3s4-1,4-1C29,19.24,29.85,21.16,33.52,22.79Z" data-name="&lt;Path&gt;" fill="#fff0c9" id="7fd61f71-ea1b-429a-9c82-df66f31a723a"/><path d="M27,19s-2.83-.75-4,1-7.5,2.83-10,3-5.58,2-2,5,15.74,1.24,19,0c3.5-1.33,8.08-3.33,4-5S29.08,19.25,27,19Z" data-name="&lt;Path&gt;" fill="none" id="46906dd2-9f77-4c5e-bae1-6e6546de82f5" stroke="#001c63" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><circle cx="27.5" cy="22.5" data-name="&lt;Path&gt;" fill="#001c63" id="65ef35bb-4471-4ea4-bb31-f934deb39888" r="0.5"/><circle cx="22.5" cy="22.5" data-name="&lt;Path&gt;" fill="#001c63" id="3dd32ec7-56cc-4a7a-b428-c962a7febfad" r="0.5"/><path d="M37,8a6.83,6.83,0,0,1,5,4" data-name="&lt;Path&gt;" fill="none" id="666c6737-521f-441f-85cf-74a4f3c81fcb" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><circle cx="43" cy="14" data-name="&lt;Path&gt;" fill="#fff" id="aefe60db-7355-4044-9349-56f8f1bb15fc" r="1"/>
              </svg>
            
        </span>
            
          <p className="mt-1 text-base text-zinc-600 dark:text-zinc-400">
          I’m a CV/NLP undergraduate researcher from India with a knack for exploring models and a curiosity for what’s next in AI. Learning, experimenting, and contributing—one breakthrough at a time!
          </p>
          <div className="mt-4 mb-9">
        
        <div className="mt-3 flex gap-3">
          <Button
            href="/about"
            rel="noopener noreferrer" // Security measure to prevent potential vulnerabilities
            variant="secondary"
            className="group mt-6"
          >
            About Me
            <RightArrowIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
          </Button> 
          <Button
            href="/work"
            rel="noopener noreferrer" // Security measure to prevent potential vulnerabilities
            variant="secondary"
            className="group mt-6 ml-4"
            
          >
            My Work
            <RightArrowIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
          </Button> 
          <Button
            href="https://drive.google.com/file/d/1LVl97NKSGx9gHV56uqH-xJkPhMAiEEhD/view"
            target="_blank" // Opens link in a new tab
            rel="noopener noreferrer" // Security measure to prevent potential vulnerabilities
            variant="secondary"
            className="group mt-6 ml-4"
          >
            Download CV
            <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
          </Button>            
          </div>
          </div>
          {/* <h3 className="mt-8 text-2xl font-bold tracking-tight text-zinc-800 sm:text-2xl dark:text-zinc-100">  
              Contact  
          </h3> */}
          <div className="mt-3 flex gap-6">
            <SocialLink
              href="https://www.linkedin.com/in/mhardik003"
              aria-label="Follow on LinkedIn"
              icon={SlSocialLinkedin}
            />
            <SocialLink
              href="https://github.com/mhardik003"
              aria-label="Follow on GitHub"
              icon={VscGithubAlt}
            />
            <SocialLink
              href="https://twitter.com/mhardik003"
              aria-label="Follow on X"
              icon={SlSocialTwitter}
            />
            <SocialLink
              href="https://dev.to/mhardik003"
              aria-label="Follow on Dev To"
              icon={PiDevToLogoLight}
            />
          </div>

          
        </div>

        <hr className="my-6 border-t border-zinc-100 dark:border-zinc-700/40" />

      </Container>


      {/* <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
          {articles
            .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort articles by date in descending order
            .slice(0, 3) // Take the top 3 articles
            .map((article) => (
              <Article key={article.url} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Resume />
            <Achievements />
          </div>
        </div>
      </Container> */}
    </>
  )
}
