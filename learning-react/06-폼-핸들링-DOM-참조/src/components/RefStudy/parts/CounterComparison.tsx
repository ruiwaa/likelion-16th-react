/* eslint-disable react-hooks/immutability */

import { useRef, useState } from 'react'
import S from '../RefStudy.module.css'


// useRef를 사용하는 이유: 값만 기억하고 화면을 렌더링 하고 싶을 때 사용한다.
// State는 기억도 하고 화면을 업데이트 시키므로, 다른 훅 함수가 필요하다

export default function CounterComparison() {
  // State (Memorized + Change View : 불변해야 함)
  const [countState, setCountState] = useState(0)
  const handleIncreamentState = () => setCountState((c) => c + 1)

  // Variable === render() 지역 변수
  let countVariable = 0
  const handleIncreamentVariable = () => {
    console.log(`지역 변수 count의 현재 값 ${countVariable}`)
    countVariable += 1
  }

  // Ref (Memorized: 변이 가능함) === this 멤버 (예. this.count)
  // 렌더링이랑 관련이 없는 함수이기때문에, 변이 가능
  // const countRef = { current: 0 } // 지역 변수이므로, 렌더링 될때마다 항상 초기화가 되서 사용할 수 없음
  const countRef = useRef(0) //React.useRef(number) -> React.RefOobject<number>
  const handleIncreamentRef = () => {
    console.log(`Ref 객체 countRef의 현재 값 ${countRef.current}`)
    // 일반 자바스크립트 오브젝트일 뿐 (변이 허용, 객체의 키값이 바뀌는 것이기때문)
    countRef.current += 1
  }

  return (
    <section className={S.section}>
      <h3 className={S.title}>State vs Ref 비교</h3>
      <div className={S.display}>
        <div>
          <dfn>State</dfn> 렌더링 <span aria-label="처리">⭕️</span>{' '}
          <strong>{countState}</strong>
        </div>
        <div>
          <dfn>Variable</dfn> 렌더링 <span aria-label="안함">❌</span>{' '}
          <strong>{countVariable}</strong>
        </div>
        <div>
          <dfn>Ref</dfn> 렌더링 <span aria-label="안함">❌</span>{' '}
          <strong>{countRef.current}</strong>
        </div>
      </div>
      <div role="group" className={S.inputGroup}>
        <button
          type="button"
          className={S.button}
          onClick={handleIncreamentState}
        >
          State 증가 ({countState})
        </button>
        <button
          type="button"
          className={S.button}
          onClick={handleIncreamentVariable}
        >
          Variable 증가 ({countVariable})
        </button>
        <button
          type="button"
          className={S.button}
          onClick={handleIncreamentRef}
        >
          Ref 증가 ({countRef.current})
        </button>
      </div>
    </section>
  )
}
