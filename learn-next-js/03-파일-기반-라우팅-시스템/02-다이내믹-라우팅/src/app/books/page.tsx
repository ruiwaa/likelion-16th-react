import { LucideTrophy } from 'lucide-react'

import LinkCard from '@/components/ui/link-card'
import PageSectionTitle from '@/components/ui/page-section-title'
import { getAllBooks } from '@/services/books'
import Link from 'next/link'

export default async function BooksPage() {
  const allbooks = await getAllBooks()
  return (
    <div className="mx-auto space-y-8">
      <PageSectionTitle
        title="북 아카이브"
        description="현재 큐레이션 된 도서 목록입니다. 당신의 인생 책을 찾아보세요."
      />
      {/* ISBN 정보를 가진 데이터를 순환해 리스트 렌더링 */}
      <ul className="flex flex-col gap-y-6">
        {allbooks?.map((book) => (
          <li key={book.isbn} className="flex flex-col items-center gap-3">
            <Link href={`books/${book.isbn}`}>
              <img
                src={book.image}
                alt={book.title}
                className="w-80 grow transition-transform duration-500 hover:-translate-y-5"
              />
            </Link>
            <p className="text-xl">{book.title}</p>
          </li>
        ))}
      </ul>
      <LinkCard
        href="/books/best"
        title="베스트셀러"
        description="지금 가장 인기 있는 도서들을 확인해보세요."
        icon={LucideTrophy}
      />
    </div>
  )
}
