import { getBookByISBN } from '@/services/books'

type Props = {
  params: Promise<{ isbn: string }>
}

// 동적 세그먼트
export default async function BookDetailpage({ params }: Props) {
  const { isbn } = await params
  const book = await getBookByISBN(isbn)

  if (!book) {
    return <p>도서가 존재하지 않습니다.</p>
  }

  return (
    <section className="flex flex-col items-center space-y-3 rounded-xl bg-slate-100 p-7 shadow-md">
      <h1 className="text-2xl">도서 &ldquo; ISBN: {isbn}&rdquo; 상세페이지 </h1>
      <img src={book.image} alt={book.title} />
      <p className="text-xl">도서 이름 {book.title}</p>
    </section>
  )
}
