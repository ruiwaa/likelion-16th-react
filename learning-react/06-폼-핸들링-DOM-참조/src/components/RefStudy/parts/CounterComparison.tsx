/* eslint-disable react-hooks/refs */
import { useRef, useState } from 'react'
import S from '../RefStudy.module.css'

// --------------------------------------------------------
// 실습 가이드
// --------------------------------------------------------
// 1. State 생성 (초기값 0)
// 2. State 값 증가 로직을 포함하는 핸들러 작성
// 3. Ref 생성 (초기값 0)
// 4. Ref 값 증가 로직을 포함하는 핸들러 작성 (콘솔로 결과 확인)
// --------------------------------------------------------

export default function CounterComparison() {
  const [countState, setCountState] = useState(0)
  const handleIncreamentState = () => setCountState((c) => c + 1)
  
  const countRef = useRef(0) // RefObject { current: 0 }
  const handleIncreamentRef = () => {
    console.log(`Ref의 현재 값 ${countRef.current}`)
    countRef.current += 1
  }

  return (
    <section className={S.section}>
      <h3 className={S.title}>State vs Ref 비교</h3>
      <div className={S.display}>
        <div>
          State ( 렌더링 <span aria-label="처리">⭕️</span> ){' '}
          <strong>{countState}</strong>
        </div>
        <div>
          Ref ( 렌더링 <span aria-label="안함">❌</span> ){' '}
          <strong>{countRef.current}</strong>
        </div>
      </div>
      <div className={S.inputGroup}>
        <button
          type="button"
          className={S.button}
          onClick={handleIncreamentState}
          >
          State 증가
        </button>
        <button type="button" 
          className={S.button}
          onClick={handleIncreamentRef}
        >
          Ref 증가
        </button>
      </div>
    </section>
  )
}