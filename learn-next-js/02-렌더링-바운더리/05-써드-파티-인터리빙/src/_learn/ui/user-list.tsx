'use client'

import { ArrowRight, Mail, MapPinHouse, User } from 'lucide-react'

import { cn } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../api/users'
import UserListSkeleton from './user-list-skeleton'

export function UserList() {
  const { isPending, data, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  // 리액트 방식
  // const [isPending, startTransition] = useTransition()
  // const [data, setData] = useState<ResponseUserData | null>(null)
  // useEffect(() => {
  //   startTransition(async () => {
  //     try {
  //       const responseData = await getUsers()
  //       await wait(1200) // 느린 네트워크 환경의 사용자 경험 간접적으로 체험
  //       setData(responseData)
  //     } catch (error) {
  //       if (isErrorObject(error)) console.error(error.message)
  //       else console.error(String(error))
  //     }
  //   })
  // }, [])

  if (isPending) {
    return <UserListSkeleton />
  }

  return (
    <>
      <button
        type="button"
        onClick={() => refetch()}
        className="rounded-xl' rounded-xl border px-2 py-0.5"
      >
        refetch
      </button>
      <ul className="grid gap-4" aria-label="사용자 목록">
        {data?.users?.map((user) => (
          <li key={user.id}>
            <a
              href={`https://example.com/users/${user.id}`}
              target="_blank"
              rel="noreferrer"
              className={cn(
                'group flex items-center justify-between rounded-xl border border-transparent p-4',
                'bg-white transition-all duration-300',
                'hover:border-slate-200 hover:bg-slate-50 hover:shadow-sm',
                'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none',
              )}
              aria-label={`${user.username}의 상세 정보 보기 (새 창)`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    'flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-100',
                    'transition-colors group-hover:bg-white group-hover:shadow-sm',
                  )}
                  aria-hidden="true"
                >
                  <User className="h-5 w-5 text-slate-500" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                    {user.username}
                  </h3>
                  <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Mail className="h-3 w-3" aria-hidden="true" />
                      <span className="sr-only">이메일:</span> {user.email}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <MapPinHouse className="h-3 w-3" aria-hidden="true" />
                      <span className="sr-only">주소:</span> {user.address}
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={cn(
                  'rounded-full p-2 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100',
                  'text-slate-400 group-hover:text-blue-600',
                )}
                aria-hidden="true"
              >
                <ArrowRight className="h-5 w-5" />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}
