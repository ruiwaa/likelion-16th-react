import { LucideServer } from 'lucide-react'

//프리즈마 인스턴스 가져오기
import { prisma } from '@/lib/prisma'

export default async function OrmAndDBPage() {
  // db 또는 ORM 을 통해ㅐ 직접 데이터 페칭
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  })
  return (
    <section className="m-6 space-y-6 md:mx-0">
      <header className="border-b border-b-slate-200 pb-4">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
          <span className="h-8 w-1 rounded-full bg-blue-500" />
          <abbr
            className="cursor-help no-underline"
            title="Object-Relational Mapping"
          >
            ORM
          </abbr>{' '}
          데이터베이스
        </h1>
        <p className="mt-2 flex items-center gap-3 text-sm text-slate-500">
          <LucideServer className="size-4" />
          서버에서 데이터를 직접 조회하여 완성된 HTML을 전달하므로
          <br className="md:hidden" />
          초기 로딩 속도가 빠르고 SEO에 최적화되어 있습니다.
        </p>
      </header>
      <pre>{JSON.stringify(allUsers, null, 2)}</pre>
    </section>
  )
}
