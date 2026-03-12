import { useState } from 'react'
import S from './style.module.css'
import UserForm from './UserForm'


//컴포넌트 인스턴스는 키를 기반으로 갱신되고 재사용됩니다.
//인스턴스 = 설계도(컴포넌트)를 기반으로 생성된 객체를 기반으로 갱신된다.


// 부모 컴포넌트 (함수)
export default function StateInitialization() {
  const[version, setVersion] = useState(0)

  return <div className={S.container}>
    <header className={S.header}>
      <h2>회원 가입 (버전: {version})</h2>
      <button type="button" className={S.resetButton} onClick={() => setVersion(version + 1)}>폼 초기화</button>
    </header>

    {/* 자식 컴포넌트 */}
    <UserForm key={version}/>
  </div>
}
