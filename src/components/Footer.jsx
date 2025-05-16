import Link from 'next/link'

import { ContainerInner, ContainerOuter } from '@/components/Container'

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="transition hover:text-blue-500 dark:hover:text-blue-400"
    >
      {children}
    </Link>
  )
}

export function Footer() {
  const lastUpdated = "May 2025"; // Replace with the appropriate month and year

  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <p className="text-sm text-zinc-400 dark:text-zinc-500 text-center sm:text-left">
                &copy; {new Date().getFullYear()} Hardik Mittal. All rights reserved.
              </p>
              <p className="text-sm text-zinc-400 dark:text-zinc-500 sm:text-right">
                Last updated in {lastUpdated}.
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  );
}


