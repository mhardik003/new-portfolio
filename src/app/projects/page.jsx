import Image from 'next/image'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import CodeSVG from '@/images/logos/code.svg'
import RedditSVG from '@/images/logos/reddit.svg'
import nlpng from '@/images/logos/nlp.png'
import CyberSecSVG from '@/images/logos/cybersec.svg'
import LockPNG from '@/images/logos/lock.png'
import EyesPNG from '@/images/logos/eyes.svg'
import DFSPNG from '@/images/logos/dfs.png'
import BashPNG from '@/images/logos/bash.png'
import Brain from '@/images/logos/brain.jpg'
import JSON from '@/images/logos/json.png'
import { FaGithub } from 'react-icons/fa';




const projects = [
  {
    name: `Modelling video fMRI data`,
    description:
      'This project explores the neural representation of complex naturalistic stimuli by developing encoding and decoding models that link video content with brain activity captured using functional magnetic resonance imaging (fMRI).',
    link: {
      href: 'https://github.com/mhardik003/modelling_video_fMRI_data',
      label: 'hardik-mittal.in',
    },
    logo: Brain,
  },
  {
    name: `Structured output evaluation of LLMs`,
    description:
      'Evaluation of structured outputs, focusing primarily on JSON, and proposes a set of techniques and metrics that better capture the fidelity, accuracy, and usefulness of generated structured data.',
    link: {
      href: 'https://github.com/mhardik003/structured_output_evaluation_of_LLMs',
      label: 'hardik-mittal.in',
    },
    logo: JSON,
  },
  {
    name: `Improving 'The Change You Want to See'`,
    description:
      'Improvements tried to make the original paper called The Change You Want To See as part of Computer Vision course project',
    link: {
      href: 'https://github.com/mhardik003/Improving-The-Change-You-Want-to-See',
      label: 'hardik-mittal.in',
    },
    logo: EyesPNG,
  },
  {
    name: 'Lockness',
    description:
      'SMPC based protocol for secret sharing of ML models and data',
    link: {
      href: 'https://github.com/mhardik003/Lockness',
      label: 'hardik-mittal.in',
    },
    logo: LockPNG,
  },
  {
    name: 'Distributed File System',
    description:
      `A C-based Distributed File System that spreads files over several servers but looks like one thanks to a smart naming server. Scalable, resilient, and user-friendly, it's a robust solution for modern data management needs.`,
    link: {
      href: 'https://github.com/mhardik003/Distributed-File-System',
      label: 'FaSquareGithub',
    },
    logo: DFSPNG,
  },
  {
    name: 'She-Sells-C-Shells',
    description:
      'Implementation of Bash Shell in C, designed to emulate the functionality of Bash in Linux environments with functions like ls, warp, history, system commands etc.',
    link: {
      href: 'https://github.com/mhardik003/She-sells-c-shells',
      label: 'horizonenergysolution.com',
    },
    logo: BashPNG,
  },
  {
    name: 'Finetuning GPT-2',
    description:`Project made as part of iNLP course in which style based on Sheldon's persona was done using GPT-2 Medium model from hugging face`,
    link: { 
      href: 'https://github.com/mhardik003/Finetuning-GPT2',
      label: 'housetopic.com.au' 
    },
    logo: CodeSVG,
  },
  {
    name: 'GredIIIT',
    description:
      'GredIIT is a social media platform based on MERN stack with UI designed using MUI. It resembled to the original Reddit in a lot of aspects like subreddits, profile creation, upvoting, downvoting etc.',
    link: {
      href: 'https://github.com/mhardik003/greddIIT',
      label: 'audioaesthetics.co.uk',
    },
    logo: RedditSVG,
  },
  {
    name: 'NLP Projects',
    description:
      'Various projects I made while learning about Natural Language Processing',
    link: {
      href: 'https://github.com/mhardik003/Natural-Language-Processing',
      label: 'savicandleselections.com',
    },
    logo: nlpng,
  },
  {
    name: 'Custom CyberSec Tools',
    description:
      'Some basic cyber sec tools written in python like ARP Spoofer, Macchanger, Network Scanner, Packet Sniffer.',
    link: {
      href: 'https://github.com/mhardik003/Cyber-Sec-Tools',
      label: 'hardik-mittal.in',
    },
    logo: CyberSecSVG,
  },
]

function LinkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const metadata = {
  title: 'Projects',
  description: 'Apps I’ve made trying to put my dent in the universe.',
}

export default function Projects() {
  return (
    <SimpleLayout
      title="Apps I've created in an effort to make my mark on the universe."
      intro={
        <>
          Some of the projects I am most proud of. Many more at my {' '}
          <span className="inline-flex items-center space-x-1">
            <a
              href="https://github.com/mhardik003"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
            <FaGithub className="w-4 h-4" />
              
            </a>
          </span>.
          <hr className="my-6 border-t border-gray-300" />
        </>
      }
      >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >


        {projects.map((project) => (
          <Card as="li" key={project.name}>
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={project.logo}
                alt=""
                className="h-8 w-8"
                unoptimized
              />
            </div>
            <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <Card.Link href={project.link.href}  target="_blank">{project.name}</Card.Link>
            </h2>
            <Card.Description>{project.description}</Card.Description>
          </Card>
        ))}
      </ul>
    </SimpleLayout>
  )
}
