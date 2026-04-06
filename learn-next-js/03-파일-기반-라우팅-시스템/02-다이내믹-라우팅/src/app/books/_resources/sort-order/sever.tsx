import { cn } from '@/utils'
import Link from 'next/link'

interface Props {
  sortKey: 'title' | 'pubdate' | 'isbn'
  orderBy: 'asc' | 'desc'
}

function SortOrder({ sortKey, orderBy }: Props) {
  {
    /* 정렬(이름, 출판일순, isbn 순) 기능 구현 */
  }
  ;<div className="flex gap-5 rounded-xl border border-slate-400 p-5">
    {/* Link 사용 */}
    {/* 서버 컴포넌트는 사용자와 상호작용할 수 없음 */}
    <Link
      className={cn(
        'text-foreground/70 hover:text-foreground',
        sortKey.includes('title') &&
          orderBy.includes('asc') &&
          'font-black text-blue-600',
      )}
      href="?sortKey=title&orderBy=asc"
    >
      이름순 정렬 (오름차순)
    </Link>
    <Link
      className={cn(
        'text-foreground/70 hover:text-foreground',
        sortKey.includes('title') &&
          orderBy.includes('desc') &&
          'font-black text-blue-600',
      )}
      href="?sortKey=title&orderBy=desc"
    >
      이름순 정렬 (내림차순)
    </Link>
  </div>
}

export default SortOrder
