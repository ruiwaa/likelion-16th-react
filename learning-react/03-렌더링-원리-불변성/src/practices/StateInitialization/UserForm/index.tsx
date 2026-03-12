import { useState, type SubmitEvent } from 'react'
import S from './style.module.css'


// 타입 별칭(Type Alias)
type UserRole = 'user' | 'admin' | ''


export default function UserForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<UserRole>('')

  const userRoleKR = role === 'admin' ? '관리자' : '일반 사용자'

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log({name, email, role});
    
  }

  const handleReset = () => {
    console.log('사용자가 입력한 폼 데이터 초기화');

    // 리액트에 의해 제어되고 있는 컨트롤(입력 필드, 셀렉트 박스)의 초기값을 직접 수행

    setName('')
    setEmail('')
    setRole('')
   }
  
  
  // 사용자 이름, 이메일, 역할
  return( 
  
  <form className={S.container} onSubmit={handleSubmit} onReset={handleReset}>

  <fieldset>
    <legend>사용자 정보 입력</legend>
    {/* 이름 입력 필드 */}
    <div className={S.fieldGroup}>
      <label htmlFor="username">이름</label>
      <input type="text" name="name" id="username" placeholder='예: 황주연' onChange={(e) => 
        setName(e.target.value.trim())} />
    </div>
    {/* 이메일 입력 필드 */}
      <div className={S.fieldGroup}>
      <label htmlFor="useremail">이메일</label>
      <input type="email" name="email" id="useremail" placeholder='예: react@learning.com' 
      onChange={
        (e) => setEmail(e.target.value.trim())
      } />
    </div>
    {/* 역할 입력 필드 */}
      <div className={S.fieldGroup}>
      <label htmlFor="usererole">역할</label>
      <select name="role" id="usererole" onChange={(e) => {
        const value = e.target.value as UserRole
        setRole(value)
        }}>
        <option value="">역할을 선택하세요.</option>
        <option value="user">일반 사용자</option>
        <option value="admin">관리자</option>
      </select>
      
    </div>
    <div role='group'
    style={{marginBlockStart:20, display:'flex',gap: 8}}>
      <button type="submit">제출</button>
      <button type="reset">초기화</button>
    </div>
  </fieldset>
    <output className={S.preview}>
      <strong>현재 입력 값:</strong>{' '}
      {name || '없음'} / {email || '없음'} ({userRoleKR})
    </output>
  </form>
  )
}
