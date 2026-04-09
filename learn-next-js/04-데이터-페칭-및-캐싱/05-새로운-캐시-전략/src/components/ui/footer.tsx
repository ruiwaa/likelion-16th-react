import Copyright from '@/app/copyright/cached-component'
import { Suspense } from 'react'

export default async function Footer() {
  return (
    <footer
      lang="en"
      className="border-t border-slate-100 py-8 text-center text-xs text-slate-400"
    >
      <Suspense>
        <Copyright />
      </Suspense>
    </footer>
  )
}
