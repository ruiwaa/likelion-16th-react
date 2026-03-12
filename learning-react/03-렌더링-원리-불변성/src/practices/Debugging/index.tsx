import { useState } from 'react'
import UserForm from '../StateInitialization/UserForm'
import S from './style.module.css'

export default function Debugging() {
  const [resetKey, setResetKey] = useState(0)
  const [message, setMessage] = useState('')

  return (
    <section className={S.container}>
      <h2 className={S.title}>디버깅 (Debugging)</h2>

      <div className={S.inputGroup}>
        <label htmlFor="debugging-input">메시지</label>
        <input
          id="debugging-input"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value.trim())}
          placeholder="여기에 입력하면 컴포넌트 트리가 번쩍입니다."
        />
      </div>

      <div className={S.displayArea}>
        <strong>실시간 결과: </strong> {message}
      </div>

      <UserForm key={resetKey} />
      <div style={{ marginBlockStart: 12 }}>
        <button type="button" onClick={() => setResetKey((k) => k + 1)}>
          폼 초기화
        </button>
      </div>
    </section>
  )
}