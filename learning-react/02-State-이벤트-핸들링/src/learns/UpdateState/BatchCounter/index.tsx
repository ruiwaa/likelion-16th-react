import { useState } from 'react'
import S from './style.module.css'

const INITIAL_COUNT = 0

export default function BatchCounter() {
  //컴포넌트 상태 선언
  const [count, setCount] = useState(INITIAL_COUNT)

  // 이벤트 핸들러 선언
  //초기화 이벤트 핸들러
  const handleResetCount = () => setCount(INITIAL_COUNT)

  // +1 증가 이벤트 핸들러
  const handleIncreseSingle = () => {
    const nextIncrease = count + 1
    setCount(nextIncrease)
  }

  //+3 증가 이벤트 핸들러
  const handleIncreseTripple = () =>{
    // const nextTrippleIncrease = count + 3
    // setCount(nextTrippleIncrease)
    
    //batch 일괄적으로 한꺼번에 업데이트
    // 조건: setCount 함수를 3번 사용
    setCount((prevCount /* 0 */) => prevCount + 1 /* 0 + 1 = 1 */)
    setCount((prevCount /* 1 */) => prevCount + 1 /* 1 + 1 = 2 */)
    setCount((prevCount /* 2 */) => prevCount + 1 /* 2 + 1 = 3 */)
    

    // 현재 렌더링 시점
    // count = 0

    // 다음 렌더링 시점
    // 큐에 쌓여있다가 한꺼번에 처리 
    // Queue [
    //   (prevCount /* 0 */) => prevCount + 1,
    //   (prevCount /* 1 */) => prevCount + 1,
    //   (prevCount /* 2 */) => prevCount + 1,
    // ]
  }

  return (
    <article className={S.container}>
      <h3 className={S.display} aria-label={`배치 카운터 현재 값: ${count}`}>
        {count}
      </h3>

      <div className={S.actions}>
        <button
          type="button"
          className={S.button}
          onClick={handleResetCount}
        >
          초기화
        </button>
           <button type="button" className={`${S.button} ${S.primary}`}
           onClick={handleIncreseSingle}>
          +1 증가 (single)
        </button>
        <button type="button" className={`${S.button} ${S.primary}`}
        onClick={handleIncreseTripple}>
          +3 증가 (Batching)
        </button>
      </div>

      <p>리액트의 상태 업데이트는 큐(Queue)를 사용해 처리됩니다.</p>
    </article>
  )
}

