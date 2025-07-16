/* eslint-disable react/no-unescaped-entities */

import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { PiDevToLogoLight } from "react-icons/pi";
import { SlSocialLinkedin, SlSocialTwitter } from "react-icons/sl";
import { VscGithubAlt } from "react-icons/vsc";

import { Container } from '@/components/Container'
import { LinkedInIcon, GitHubIcon, XIcon } from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        target="_blank"
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-blue-500 dark:text-zinc-200 dark:hover:text-blue-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-blue-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
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

export const metadata = {
  title: 'About',
  description: `Hey! I'm Hardik`,
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            ML researcher trying to see & speak like robots.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
          <p className="mt-1 text-base text-zinc-600 dark:text-zinc-400">
          Hello! I'm Hardik, an undergraduate researcher at CVIT, IIITH pursuing a dual degree program, combining a B.Tech in Computer Science with an MS by Research in Computational Linguistics, with an anticipated graduation in 2026.
          <br></br>
          <br></br>

          
          In the summer of '25, I was also doing a part time internship with <b>Trexquant</b> as a Global Alpha Researcher, where I was developing machine learning and stats based models to beat the market and generate alpha.
          
          <br></br>
          <br></br>
           Along with the I'm engaged in projects related to multimodal video summarisation and their applications of helping content creators in making reels/shorts in a much faster pipeline with   
               {' '} <a href="https://makarandtapaswi.github.io/" style={{ textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">
                  Dr. Makarand Tapaswi
                </a>,{' '}
                <a href="https://faculty.iiit.ac.in/~vgandhi/" style={{ textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">
                  Dr. Vineet Gandhi
                </a>{' '}
                and{' '}
                <a href="https://www.linkedin.com/in/niranjanpedanekar/" style={{ textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">
                  Niranjan Pedanekar
                </a>
              </p>
          

            <p>
            When I’m not coding, you’ll find me jogging, playing football, drumming,{' '}
             <a href="/photography" style={{ textDecoration: 'underline' }}>
                  snapping photos
            </a>
            , editing videos, or geeking out over emerging technologies and startups or lost in mountains. Oh, and I also used to serve as the <b>Vice-Coordinator at E-Cell, IIITH</b>, where I get to collaborate with founders and like-minded students on product ideation and marketing strategies.
            </p>
            <p>
            <i>That’s a bit about me—now let’s hear about you! Feel free to drop me a message or email on any of my socials; I’d love to connect!</i>
            </p>

            
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink
              href="https://www.linkedin.com/in/mhardik003/"
              target="_blank" // Opens link in a new tab
              rel="noopener noreferrer" 
              icon={LinkedInIcon}
            >
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="https://github.com/mhardik003"
              target="_blank" // Opens link in a new tab
              rel="noopener noreferrer" 
              icon={GitHubIcon}
              className="mt-4"
            >
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="https://twitter.com/mhardik003"
              target="_blank" // Opens link in a new tab
              rel="noopener noreferrer" 
              icon={XIcon}
              className="mt-4"
            >
              Follow on X (Twitter)
            </SocialLink>
            <SocialLink
              href="mailto:hardik.mittal@research.iiit.ac.in"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              hardik[dot]mittal[at]research.iiit.ac.in
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
