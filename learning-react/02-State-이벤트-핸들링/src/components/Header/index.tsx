import type { ReactNode } from 'react'
import S from './style.module.css'
import Wrapper from '../Wrapper'

interface HeaderProps {
  children: ReactNode
}

// import { createElement } from 'react'

// React.createElement API(함수)
// const myElement = createElement('dt', { 'data-name': 'definition term' })

// JSX (개발자를 위한 달콤한 문법)
// const myElement = <dt data-name="definition term">JSX</dt>
// console.log(myElement)

function Header(props : HeaderProps) {
  /**
   * 컴포넌트의 `children` 속성
   * - 부모 내부에 삽입되는 (리액트) 자식 요소들 (배열로 들어옴)
   * - 컴포넌트의 props.children을 통해 전달됨
   * - `children` prop 타입 정의 (인라인 → 인터페이스)
   */

  return (
    <header className={S.header}>
      <Wrapper>

     {props.children}
      </Wrapper>
    </header>
  )
}

export default Header
