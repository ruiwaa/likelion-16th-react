import { useState } from 'react'
import S from './style.module.css'


const INITIAL_COUNT = 9

//let timeoutId = 0 // 부수 효과를 야기할 수 있음 (상수는 상관없음)

export default function SnapshotTest() {

  // 상태는 [특정 렌더링 시점의] 스냅샷이다.
  //-> 상태는 현재 렌더링 시점에서 바꿀 수 없다.
  //-> 업데이트 된 상태ㅐ는 다음 렌더링 시점에서 주어진다.

  // [리액트 관점]리액트에 의해 관리 중인 상태의 '현재 스냅샷'을 전달함
  const [count, setCount] = useState(INITIAL_COUNT)

  // 사이드 이펙트 side Effect를 유발하지 않고  상태를 선언 및 관리
  const [timeout] = useState({id:0})
 

  // 상태 업데이트 로직을 포함하는 핸들러 작성
 const handleIncreaseFive = () => {

    //사전에 설정된 타이머 해제
    clearTimeout(timeout.id)
    // 상태 업데이트 (리액트에게 요청) 
    // 이벤트가 끝나고 나서야 상태를 업데이트 한다.
    const nextCount = count + 5
    setCount(nextCount)

    // count 상태 로그
    console.log('현재 카운트 값', { count })
    console.log('다음 렌더링 시점의 카운트 값', { nextCount })

    // 비동기 알림 확인
    //이벤트가 실행되는 시점까지 이전의 값을 기억한다.
    //그러므로 상태 업데이트 전의 값이 표시됨
    timeout.id = setTimeout(() => {
      alert( `3초 뒤 알림창에 뜬 카운트 값: ${count}`)
    }, 3000)


  }
  const handleResetCount = () => {
    setCount(INITIAL_COUNT)
  }
  return <section className={S.container}>
    <h2 className={S.title}>현재 카운트: {count}</h2>

    <div role='group' className={S.buttonGroup}>
      <button type="button" className={S.button} onClick={handleIncreaseFive}>
        +5 증가 시키고 로그/알림 확인
        </button>
      <button type="button" className={`${S.button} ${S.reset}`} onClick={handleResetCount }>
          초기화
        </button>
    </div>
  </section>
}
