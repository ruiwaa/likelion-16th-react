import { QueryProvider } from '@/contexts/query-context'
import { cn } from '@/utils'
import Link from 'next/link'
export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="ko-KR">
      <body
        className={cn(
          'flex flex-col',
          'min-h-screen overflow-y-scroll',
          'bg-background text-foreground antialiased',
          'selection:bg-foreground selection:text-background',
          'focus:outline-none',
          '[&_*:focus-visible]:ring-foreground [&_*:focus-visible]:ring-2 [&_*:focus-visible]:ring-offset-2',
          '[&_*:focus-visible]:ring-offset-background',
        )}
      >
        <QueryProvider hideDevtools>
          <header className="bg-slate-50 p-5">
            <nav>
              <ul>
                <li>
                  <Link href="/">home</Link>
                </li>
                <li>
                  <Link href="/pokemon">pokemon</Link>
                </li>
                <li>
                  <Link href="/types">Types</Link>
                </li>
              </ul>
            </nav>
          </header>

          <main className={cn('container mx-auto grow')}>{children}</main>

          <footer className="flex justify-center bg-slate-100 p-7">
            <small lang="en" className="text-sm font-medium">
              {/* 저작권 등 사이트 정보 */}
              &copy; {new Date().getFullYear()} Copylight All Reserved.
            </small>
          </footer>
        </QueryProvider>
      </body>
    </html>
  )
}
