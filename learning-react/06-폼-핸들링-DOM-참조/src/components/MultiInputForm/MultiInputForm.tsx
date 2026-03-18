import { useId, useState } from 'react'
import NicknameField from './parts/NicknameField'
import EmailField from './parts/EmailField'
import PasswordField from './parts/PasswordField'
import PasswordConfirmField from './parts/PasswordConfirmField'
import S from './MultiInputForm.module.css'

// -------------------------------------------------------------------
// 실습 가이드
// -------------------------------------------------------------------
// 1. 모든 필드의 초기값을 가진 객체 'INITIAL_STATE'를 컴포넌트 외부에 정의하세요.
// 2. INITIAL_STATE를 사용하는 하나의 'formState' 상태(객체형)를 선언합니다.
// 3. name과 value를 인자로 받아 formState를 업데이트하는 함수를 작성하세요.
// 4. 폼 초기화(reset) 이벤트 핸들러를 작성하세요.
// -------------------------------------------------------------------

// 데이터를 하나의 객체로 관리
const INITIAL_FORM_STATE = {
  nickname:'',
  email: '',
  password: '',
  passwordConfirm : ''
}

// 사용자 정의 타입 알리아스
type FormState =  typeof INITIAL_FORM_STATE
type FormStateKey = keyof FormState

export default function MultiInputForm() {
  const sectionId = useId()
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE)
  const [formResetKey, setFormResetKey] = useState(0)

  const changeFormState = (name:FormStateKey, value: string)=> {
    // 방법 1 상태 업데이트 함수에 전달
    setFormState({
    ...formState,
    [name]:value,
    })
  }


  //키값을 활용하여 폼 상태 초기화하기
 const handleReset:React.ReactEventHandler<HTMLFormElement>  = () => {
  setFormState(INITIAL_FORM_STATE)
  setFormResetKey((prev)=> prev + 1 )
 }
  return (
    <article className={S.card} aria-labelledby={sectionId}>
      <header className={S.header}>
        <h2 id={sectionId} className={S.title}>
          회원 가입
        </h2>
        <p className={S.description}>
          가입 정보를 입력하고 각 입력 필드의 검증 전략을 확인하세요.
        </p>
      </header>

      <form key={formResetKey} className={S.form} onReset={handleReset}>
        <NicknameField
          value={formState.nickname}
          onChange={(value) => {changeFormState('nickname',value)
            // 방법 2 업데이터 함수 활용
            // setFormState((prev) => ({...prev, nickname:value
            // }))
          }}
        />
        <EmailField
          value={formState.email}
          onChange={(value) => {changeFormState('email',value )}}
        />
        <PasswordField
          value={formState.password}
          onChange={(value) => {changeFormState('password',value)}}
        />
        <PasswordConfirmField
          value={formState.passwordConfirm}
          basePassword={formState.password}
          onChange={(value) => {changeFormState('passwordConfirm',value)}}
        />
        <div role="group" className={S.buttonGroup}>
          <button type="reset" className={S.resetButton}>
            취소
          </button>
          <button type="submit" className={S.submitButton}>
            가입
          </button>
        </div>
      </form>
    </article>
  )
}