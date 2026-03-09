import S from './style.module.css'
import {useState} from 'react'


function Counter() {
  // 컴포넌트 내부에 일반 로컬 변수
  let localCount:number = 0

  // 일반 로컬 변수를 업데이트 하는 함수
const handleIncreaseLocalCount = () => {
  // 일반 변수 업데이트 목적
  localCount += 1
   console.log({ localCount })
}


  // 컴포넌트 상태 관리
  // 컴포넌트 상태(기억된 값 관리) 추가
  const [stateCount,setStateCount] = useState(0) //[]

  // 상태 변수를 업데이트 하는 함수
  const handleIncreaseStateCount = () =>{{
    // 상태 변수 업데이트 로직
    const nextStateCount = stateCount + 1

    // 상태 업데이트 방법: 다음 번에 화면에 그릴 상태 변수 값을 설정
   setStateCount(nextStateCount)
   console.log(stateCount);
   console.log(nextStateCount);
   
   
  }}

  
  return (
    <section className={S.container}>
      <h2 className={S.title}>상태 관리 기초</h2>
      <div role="group" className={S.displayGroup}>
        {/* 일반 로컬 변수 영역 */}
        <div className={S.card}>
          <span className={S.label}>일반 로컬 변수</span>
          <strong className={S.value}>{localCount}</strong>
        </div>

        {/* State 변수 영역 */}
        <div className={`${S.card} ${S.highlight}`}>
          <span className={S.label}>리액트 상태 변수</span>
          <strong className={S.value}>{stateCount}</strong>
        </div>
      </div>

      <div className={S.buttonGroup}>
        <button type="button" className={S.button} onClick={handleIncreaseLocalCount}>
          일반 로컬 변수 증가
        </button>
        <button type="button" className={`${S.button} ${S.primary}`} onClick={ handleIncreaseStateCount
        }>
          리액트 상태 변수 증가
        </button>
      </div>
    </section>
  )
}

export default Counter