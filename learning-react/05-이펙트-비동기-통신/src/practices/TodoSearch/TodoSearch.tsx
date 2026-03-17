import { useEffect, useState } from 'react'
import S from './TodoSearch.module.css'
import { getTodos, type Todo , getRandomCompletedTodos} from '@/api/getTodos'

//디바운스 시간
const DEBOUNCE_TIME = 500

export default function TodoSearch() {

  // 상태 선언(로딩,할일 목록, 사용자 아이디)
  const [isLoading, setLoading] = useState(false)
  const [todos,setTodos] = useState<Todo[]>([])  
  const [userId, setUserId] = useState('')



// 사용자 ID 값이 변경될 때마다 이펙트 함수 실행
  useEffect(() => {

    // 아직 응답하지 않은 이전의 네트워크 요청 중단
    const controller = new AbortController() 
    const { signal } = controller 

    // 비동기 함수 (데이터 페칭(GET 가져오기))
    // 디바운스 시간만큼 사용자 입력이 더 없다면 그때서야 데이터 가져오기 요청
    
   const fetchTodos = async() => {
    // userId 상태 값이 빈 문자열인 경우, 함수 종료(todos 상태 초기화)
    if(userId === '') return setTodos([]) 
    // loading 상태 업데이트 (로딩 화면 표시)
    setLoading(true)

  try{
    // 데이터 요청/ 응답(비동기 처리)
    const todos = await getTodos(userId,{signal})
    // todos 상태 업데이트
    setTodos(todos)

}catch(error){
  // 개발자 확인용(abortError가 아닐 때만 에러 메시지 출력)
  if( error instanceof Error && error.name !== 'AbortError'){
    console.error('데이터 로드 실패');
    setTodos([]) // 상태초기화
  }

}finally{
  //abort
  if(!signal.aborted){
    setLoading(false)
  }
}
    
   }
  
  const debounceId = setTimeout(fetchTodos, DEBOUNCE_TIME)

    //클린 업 함수
   // 중복된 또는 응답되지 않은 이전의 요청 중단
    return () => {
      controller.abort() 
      clearTimeout(debounceId)
    }

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
