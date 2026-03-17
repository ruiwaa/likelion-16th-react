import { useEffect, useState } from 'react'
import S from './TodoSearch.module.css'
import { getTodos, type Todo , getRandomCompletedTodos} from '@/api/getTodos'


export default function TodoSearch() {

  // 상태 선언(로딩,할일 목록, 사용자 아이디)
  const [isLoading, setLoading] = useState(false)
  const [todos,setTodos] = useState<Todo[]>([])  
  const [userId, setUserId] = useState('')


// 사용자 ID 값이 변경될 때마다 이펙트 함수 실행
  useEffect(() => {
    // 비동기 함수 (데이터 페칭(GET 가져오기))
   const fetchTodos = async() => {

    // userId 상태 값이 빈 문자열인 경우, 함수 종료 (상태 초기화)
    if(userId === ''){
       // todos 상태 초기화
      setTodos([])
    }
    // loading 상태 업데이트 (로딩 화면 표시)
    setLoading(true)

    // 데이터 요청/ 응답(비동기 처리)
    const todos = await getTodos(userId)

    // todos 상태 업데이트
    setTodos(todos)
    
    //isLoading 상태 업데이트
    setLoading(false)
   }
    
    fetchTodos()
  }, [userId])
  
   // 파생된 상태 (Derived State)
  // 테스트를 목적으로 todos 순환하여 랜덤으로 completed 상태 전환
  const dummyTodos = getRandomCompletedTodos(todos)

return (
    <section className={S.container}>
      <header>
        <h2>사용자 ID로 할 일 찾기</h2>
        <p className={S.info}>사용자 ID를 입력해 목록을 확인하세요.</p>
      </header>

      <div className={S.searchField}>
        <label htmlFor="user-id-input" className="sr-only">
          사용자 ID
        </label>
        <input
          id="user-id-input"
          type="number"
          min={1}
          max={20}
          placeholder="사용자 ID를 입력하세요 (예: 1 ~ 20)"
          value={userId}
          onChange={(e) => setUserId(e.target.value.trim())}
        />
      </div>

      {!isLoading && todos.length > 0 && (
        <ul className={S.list}>
          {dummyTodos.map(({ id, content, completed }) => {
            const doneClassname = completed ? S.completed : ''

            return (
              <li key={id} className={S.item}>
                <span className={`${S.textContent} ${doneClassname}`}>
                  {content}
                </span>
                <span
                  aria-label={completed ? '완료' : '예정'}
                  style={{ opacity: completed ? 1 : 0.3 }}
                >
                  {completed ? '✅' : '❎'}
                </span>
              </li>
            )
          })}
        </ul>
      )}

      <div role="status" className={S.statusRegion}>
        {isLoading && <p className={S.loading}>데이터를 가져오고 있습니다...</p>}

        {!isLoading && userId && todos.length === 0 && (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </section>
  )
}
