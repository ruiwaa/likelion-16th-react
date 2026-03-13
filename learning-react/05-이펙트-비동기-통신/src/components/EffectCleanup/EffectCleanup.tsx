import { useEffect, useState } from 'react'
import S from './EffectCleanup.module.css'

export default function EffectCleanup() {
  //타이머 표시/감춤 상태 선언
  const [isShow, setIsShow] =useState(false)


  return (
    <article className={S.container}>
      <header>
        <h2>이펙트(Effect) 클린업</h2>
        <p>컴포넌트의 소멸과 자원 정리 과정을 관찰합니다.</p>
      </header>

      <button type="button" className={S.toggleButton} onClick={() => setIsShow(!isShow)} aria-pressed = {isShow}>
       타이머 {isShow? '제거' : '추가'}
      </button>

      <div role="region" aria-live="polite">
        {isShow? <Timer /> : null}
      </div>
    </article>
  )
}

function Timer() {

  //리액트의 상태 선언 (상태 = 반응성 데이터 = 변경되면 리액트가 반응한다.)
  const [seconds, setSeconds] = useState(0)
  
  // 특정 시간마다 콜백 함수를 실행하는 방법
  // 리액트 관점에서 보면 타이머는 리액트의 렌더링과 관련이 없음
  // 타이머 조작은 side Effect 이다.  
  // 그러므로 useEffect 사용
  useEffect(() => {
    // 오직 처음 렌더링할 때 한 번만 타이머를 가동하면 된다.
    // 1초마다 실행되도록 제공하는 web API : setInterval

    const intervalId = setInterval(() => {setSeconds((s) => s +1)},1000)

    return () => {
      // 여기서 정리
      // 예) 타이머 정리
      clearInterval(intervalId)
      console.log('타이머 클린업');
      
    }
  },[])


  return (
    <div className={S.card}>
      <p className={S.info}>실시간 타이머</p>
      <output 
        className={S.timerDisplay} 
        aria-live="polite" 
        aria-atomic="true"
      >
        {seconds}s
      </output>
      <span className={S.info}>
        이 카드가 사라지면 콘솔 로그도 멈춰야 합니다.
      </span>
    </div>
  )
}
