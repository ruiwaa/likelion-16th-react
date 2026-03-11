import { useState, type ChangeEvent } from 'react'
import S from './style.module.css'


// 타입 별칭(Type Alias)
type UserRole = 'user' | 'admin'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomChangeEventType =ChangeEvent<HTMLInputElement|HTMLSelectElement>

export default function UserForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<UserRole>('user')

  const userRoleKR = role === 'admin' ? '관리자' : '일반 사용자'
  

  // 사용자 이름, 이메일, 역할
  return( 
  
  <form className={S.container} onSubmit={(e) => e.preventDefault()}>

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
  </fieldset>
    <output className={S.preview}>
      <strong>현재 입력 값:</strong>{' '}
      {name || '없음'} / {email || '없음'} ({userRoleKR})
    </output>
  </form>
  )
}
