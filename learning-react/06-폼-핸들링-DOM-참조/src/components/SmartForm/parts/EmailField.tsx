import { useId, useState } from 'react'
import S from '../SmartForm.module.css'
import { createValidator} from './util'


interface Props {
  value: string
  onChange: (val: string) => void
}

// 이메일 검사를 위한 정규식
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// 유효성 검사 함수 생성
const validateEmail = createValidator('이메일 입력이 필요합니다.', (value) => {
  return EMAIL_PATTERN.test(value)
    ? ''
    : '유효한 이메일 주소를 입력해야 합니다.'
})

export default function EmailField({ value, onChange }: Props) {
  const filedId = useId()
  const messageId = useId()
  const [isTouched, setIsTouched] = useState(false)
  const [error, showError] = validateEmail(value, isTouched)

  return (
    <div className={S.field}>
      <label htmlFor={filedId} className={S.label}>
        이메일
      </label>
      <input
        id={filedId}
        type="email"
        placeholder="user@email.com"
        className={showError ? S.inputError : S.input}
        aria-invalid={showError ? 'true' : 'false'}
        aria-describedby={messageId}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setIsTouched(true)}
        value={value}
      />

      {showError ? (
        <p id={messageId} role="alert" className={S.errorMessage}>
          {error}
        </p>
      ) : (
          <p id={messageId} className={S.infoMessage}>올바른 이메일 주소 입력</p>
        )}
    </div>
  )
}
