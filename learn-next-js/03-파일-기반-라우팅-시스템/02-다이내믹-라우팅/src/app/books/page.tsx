import { LucideTrophy } from 'lucide-react'

import LinkCard from '@/components/ui/link-card'
import PageSectionTitle from '@/components/ui/page-section-title'
import Link from 'next/link'
import { books } from './_resources/data'
import { cn } from '@/utils'
import SortOrder from './_resources/sort-order/client'

interface Props {
  searchParams: Promise<{
    sortKey: 'title' | 'pubdate' | 'isbn'
    orderBy: 'asc' | 'desc'
    page: number
    size: number
  }>
}

export default async function BooksPage({ searchParams }: Props) {
  // const orderBy = (await searchParams).orderBy ?? 'desc' // 내림차순
  // const sortKey = (await searchParams).sortKey ?? 'pubdate' // 출간일
  // const page = (await searchParams).page ?? '1' // 1 페이지
  // const size = (await searchParams).size ?? '6' // 한 화면에 6개씩 표시

  const {
    orderBy = 'desc',
    sortKey = 'title',
    page = 1,
    size = 6,
  } = await searchParams
  console.log({ orderBy, sortKey, page, size })

  //  정렬된 도서 목록
  const filteredBooks = books.toSorted((a, b) => {
    const aEl = String(a[sortKey] ?? '')
    const bEl = String(b[sortKey] ?? '')
    const comparison = aEl.localeCompare(bEl)

    return orderBy == 'asc' ? comparison : -comparison
  })

  return (
    <div className="mx-auto space-y-8">
      <PageSectionTitle
        title="북 아카이브"
        description="현재 큐레이션 된 도서 목록입니다. 당신의 인생 책을 찾아보세요."
      />
      <SortOrder />
      {/* <SortOrder  sortKey = {sortKey} orderBy= {orderBy}/> */}

      {/* ISBN 정보를 가진 데이터를 순환해 리스트 렌더링 */}
      <nav
        aria-label="도서 목록"
        className="flex flex-col gap-2 rounded-xl border p-5"
      >
        {filteredBooks.map((book) => (
          <Link
            key={book.isbn}
            href={`/books/${book.pubdate}/${book.title}`}
            className={cn(
              'px-2 pt-1 pb-1.5',
              'text-foreground/80 hover:text-foreground font-medium',
            )}
          >
            {book.title}
          </Link>
        ))}
      </nav>
      {/* <ul className="flex flex-col gap-y-6">
        {allbooks?.map((book) => (
          <li key={book.isbn} className="flex flex-col items-center gap-3">
            <Link href={`/books/${book.isbn}`}>
              <img
                src={book.image}
                alt={book.title}
                className="w-80 grow transition-transform duration-500 hover:-translate-y-5"
              />
            </Link>
            <p className="text-xl">{book.title}</p>
          </li>
        ))}
      </ul> */}
      <LinkCard
        href="/books/best"
        title="베스트셀러"
        description="지금 가장 인기 있는 도서들을 확인해보세요."
        icon={LucideTrophy}
      />
    </div>
  )
}
