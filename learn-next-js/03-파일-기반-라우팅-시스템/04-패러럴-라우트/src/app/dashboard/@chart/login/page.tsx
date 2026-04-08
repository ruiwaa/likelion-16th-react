import Link from 'next/link'

export default function DashboardPage() {
  return (
    <section className="flex h-110 flex-col gap-4 self-stretch bg-teal-100 p-5">
      <h1 className="text-2xl font-bold text-teal-700">
        /dashboard/login 페이지 {'{children}'}
      </h1>
      <span className="text-sm text-teal-800">
        (src/app/dashboard/chart/login/page.tsx)
      </span>
      <div>
        <Link href="/dashboard" className="rounded-full bg-teal-200 p-2 px-4">
          대시보드
        </Link>
      </div>
    </section>
  )
}
