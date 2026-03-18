import { useId, useState } from 'react'
import NicknameField from './parts/NicknameField'
import EmailField from './parts/EmailField'
import PasswordField from './parts/PasswordField'
import PasswordConfirmField from './parts/PasswordConfirmField'
import S from './FormSubmission.module.css'
import { wait } from '@/utils'
import SuccessMessage from './parts/SuccessScreen'

const INITIAL_STATE = {
  nickname: '',
  email: '',
  password: '',
  passwordConfirm: '',
}

type FormState = typeof INITIAL_STATE
type FormStateKey = keyof FormState

// ---------------------------------------------------------------
// 실습 가이드
// ---------------------------------------------------------------
// 1. 제출 중(isSubmitting), 성공(isSuccess) 상태를 추가해보세요.
// 2. 파생된 상태(Derived State)를 만들어보세요.
//    별도 상태 만들지 않고, formState의 값들을 확인하여 결정합니다.
//    - isAllInputed: 모든 필드에 값이 입력되었는가? (Object.values 활용)
//    - isSomeInputed: 필드 중 하나라도 값이 입력되었는가?
// 3. 폼 제출 핸들러(handleSubmit)를 완성하세요.
//    - 브라우저 기본 새로고침 방지
//    - 방어 로직: 이미 제출 중이거나 모든 필드가 채워지지 않았다면 실행 중단 -> Control Abort
//    - 제출 시작: 로딩 상태(isSubmitting)를 true로 변경
//    - 비동기 통신 시뮬레이션: 1.5초 대기 (setTimeout + Promise 활용)
//    - 제출 성공: 성공 상태로 변경하고 폼 초기화 핸들러 호출
//    - 제출 오류: '가입에 실패했습니다.' 오류 메시지 안내
//    - 제출 종료: 성공/실패 여부와 상관없이 로딩 상태를 false로 변경
// 4. 성공 화면을 조건부 렌더링으로 처리하세요.
//    - 성공 상태라면 <SuccessMessage /> 컴포넌트를 반환합니다.
//    - onBack 속성에 상태를 복구하는 로직을 추가하세요.
// 5. 사용자 경험과 접근성을 고려해 가입/취소 버튼의 상태를 제어하세요.
//    - 가입 버튼의 비활성화 상태(aria-disabled)를 설정합니다.
//    - 폼 제출 중에는 가입 버튼의 레이블을 '처리 중...'으로 변경합니다.
//    - 취소 버튼의 비활성화 상태(aria-disabled)를 설정합니다.
// 6. 폼 초기화 핸들러에 방어 로직을 추가하세요.
//    - 제출 중이거나 입력된 내용이 없을 때 초기화되지 않도록 방어합니다.
// ---------------------------------------------------------------

export default function FormSubmission() {
  const sectionId = useId()
  const [formState, setFormState] = useState<FormState>(INITIAL_STATE)
  const [formResetKey, setFormResetKey] = useState(0)

  // 폼 제출 상태 선언
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 폼 제출 성공 상태 선언
  const [isSuccess, setIsSuccess] = useState(false)

  // [파생된 상태] 모두 입력이 되었는지
  const isAllInputed = Object.values(formState).every(Boolean)
  // [파생된 상태] 일부 입력
  const isSomeInputed = Object.values(formState).some(Boolean)


  const changeFormState = (name: FormStateKey, value: string) => {
    setFormState({ ...formState, [name]: value })
  }

  const handleReset = () => {
    setFormState(INITIAL_STATE)
    setFormResetKey((prev) => prev + 1)

  }

  const handleSubmit = async(e:React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // 방어(폼 제출 중이거나 모든 입력 필드가 채워지지않았다면 실행 중단)
    if(isSubmitting || !isAllInputed) return


    // 지연된 처리: 비동기 작업
    try{
    setIsSubmitting(true)
    
    await wait()
    alert('가입 성공')
      setIsSuccess(true)
      handleReset()
    }catch{
      alert('가입 실패')
    }finally{
      setIsSubmitting(false)
    }
    
    
  }

  // 가입에 성공했다면 성공 화면을 렌더링하세요!
  if (isSuccess) {
    return <SuccessMessage onBack={() => setIsSuccess(false)} />
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

      <form
        key={formResetKey}
        className={S.form}
        onReset={handleReset}
        onSubmit={handleSubmit}
        noValidate
      >
        <NicknameField
          value={formState.nickname}
          onChange={(value) => changeFormState('nickname', value)}
        />
        <EmailField
          value={formState.email}
          onChange={(value) => changeFormState('email', value)}
        />
        <PasswordField
          value={formState.password}
          onChange={(value) => changeFormState('password', value)}
        />
        <PasswordConfirmField
          value={formState.passwordConfirm}
          basePassword={formState.password}
          onChange={(value) => changeFormState('passwordConfirm', value)}
        />
        <div role="group" className={S.buttonGroup}>
          <button type="reset" className={S.resetButton} aria-disabled = {(isSubmitting || !isSomeInputed)? 'true': 'false'}>
            취소
          </button>
          <button type="submit" className={S.submitButton} aria-disabled={(isSubmitting|| !isAllInputed)? 'true': 'false'}>
          {isSubmitting? '처리 중...' : '가입'}
          </button>
        </div>
      </form>
    </article>
  )
}
