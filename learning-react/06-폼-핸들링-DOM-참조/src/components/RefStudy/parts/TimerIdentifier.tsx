/* eslint-disable react-hooks/refs */
import S from '../RefStudy.module.css'
import { useState, useRef } from 'react'
// --------------------------------------------------------
// 실습 가이드
// --------------------------------------------------------
// 1. time 상태 생성 (초기값: 로케일 타임 설정)
// 2. isTimerRunning 상태 생성 (초기값: false)
// 3. timerIdRef 참조 생성 (타이머 ID 저장용: 렌더링과 무관)
// 4. 타이머 시작 버튼 클릭 시, 실행될 startTimer 함수 로직 작성
// 5. 타이머 정지 버튼 클릭 시, 실행될 stopTimer 함수 로직 작성
// 6. 버튼 비활성화 제어 (접근성 고려)
// --------------------------------------------------------


const getLocaleTime = () => new Date().toLocaleTimeString()

// 웹 브라우저 / Node.js 양쪽 환경에서 사용 가능한 타입 지정
type Timeid = ReturnType<typeof setInterval> | undefined

export default function TimerIdentifier() {
  const [time, setTime] = useState(getLocaleTime) // 현재 로케일 타임
  const [isTimerRunning, setIsTimerRunning] = useState(false) // 타이머가 실행 중인지 여부 상태

  // 초기 current 값을 0으로 지정(키값은 변이 가능)
  const timerIdRef = useRef<Timeid>(undefined) // {current : 0}

  const startTimer = () => {
    // 이미 타이머가 작동 중이라면? 함수 종료
    if(isTimerRunning) return

    // 1초마다  외부 시스템인 웹 API 를 사용해
    // 관리 중인 타입 상태 업데이트
    setIsTimerRunning(true)

    //클릭하자마자, 화면 로케일 타임도 변경 (상태 업데이트 렌더링)
    const nextTime = getLocaleTime()
    setTime(nextTime)

    // 해당 useRef 값을 셋인터벌에 연결 (값을 저장)
    timerIdRef.current = setInterval(() => {
      console.log('타이머 작동중....');
      // 1초마다 화면의 로케일 타임 변경 (상태 업데이트)
       setTime(getLocaleTime)
      
    }, 1000)
  }

  const stopTimer = () => {
    // 타이머가 작동하고 있는 상태가 아니라면? 함수 종료
    if(!isTimerRunning) return


    // 타이머 정지 상태로 변경 (상태 업데이트)
   setIsTimerRunning(false)

    // 타이머 정지
    // 기억된 값이 저장되어있기 때문에, 그 값을 clearInterval에 연결해서 초기화 시킴
    clearInterval(timerIdRef.current)


    // 메모리 회수
    timerIdRef.current = undefined
  }

  

  return (
    <section className={S.section}>
      <h3 className={S.title}>내부 식별자 저장 (Timer ID)</h3>
      <div className={S.display}>
        <div>
          상태: <strong>{isTimerRunning ? '▶️ 실행 중' : '⏹️ 정지됨'}</strong>
        </div>
        <div>
          Timer ID (Ref): <strong>{timerIdRef.current ?? '없음'}</strong>
        </div>
      </div>
      <div role="group" className={S.inputGroup}>
        <button
          type="button"
          className={`${S.button} ${!isTimerRunning ? S.primary : ''}`}
          onClick={startTimer}
          aria-disabled = {isTimerRunning}
        >
          타이머 시작
        </button>
        <button type="button" className={S.button} onClick={stopTimer} aria-disabled = {!isTimerRunning}>
          타이머 정지
        </button>
        <time className={S.timeDisplay} aria-live="polite">
          {time}
        </time>
      </div>
      <p className={S.info}>
        로직에는 필요하지만 화면에는 그릴 필요가 없는 값을 저장합니다.
      </p>
    </section>
  )
}
