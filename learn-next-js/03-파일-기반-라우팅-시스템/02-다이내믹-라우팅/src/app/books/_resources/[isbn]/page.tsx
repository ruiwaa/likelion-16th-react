import { notFound } from 'next/navigation'
import { type Book, books } from '../data'

interface Props {
  params: Promise<{ isbn: Book['isbn'] }>
}

// 동적 세그먼트
export default async function BookDetailpage({ params }: Props) {
  const { isbn } = await params
  const book = books.find((book) => book.isbn === isbn)

  // 도서가 없는 경우 안내 메시지 표시
  if (!book) {
    notFound()
  }

  return (
    <section className="flex flex-col gap-4">
      {/* 도서의 제목 */}
      <h1 className="text-2xl font-black">도서 이름: {book.title}</h1>
      {/* 도서의 설명 */}
      <p>도서 소개 내용: {book.description}</p>
      {/* 도서의 저자 */}
      <p className="text-lg font-medium">도서의 저자: {book.author}</p>
      {/* 도서 이미지 */}
      <img src={book.image} alt={`${book.title} 도서 커버`} />
      {/* 도서의 고유 번호 */}
      <span>도서의 ISBN : {isbn}</span>
    </section>
  )
}
