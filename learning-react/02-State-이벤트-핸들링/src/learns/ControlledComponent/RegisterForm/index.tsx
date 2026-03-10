import { useState, type ChangeEvent } from 'react'
import S from './style.module.css'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const REG_EMAIL_CHECK = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export default function RegisterForm() {

  // 리액트에 화면을 그리도록 요청하기 위해 상태 선언
  const [formState, setFormState] = useState({
    name: '지훈',
    email: 'yamoo9@naver.com',
    job: '강사',
    location: '서울',
    hobby: ['강의'],
  })

  // 폼 데이터를 업데이트 할 수 있는 단 하나의 핸들러 함수 활용
const handleChangeFormState = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target


  //set 함수 사용법
  //방법 1 nextState 값으로 설정하기
  // 계산된 속성(Computed Property)을 사용해 폼 상태를 수정(update)
  // const nextFormState = {
  //   ...formState,
  //   [name]: value.trim(),
  // }
  
  //방법 2 업데이트 함수 사용해ㅐ 이전 값을 기반으로 상태값 설정하기
  setFormState((formState) => ({
    ...formState,
    [name]: value.trim()
  }))

}

  return (
    <form className={S.form} onSubmit={(e) => e.preventDefault()}>
      <div className={S.field}>
        <label htmlFor="username" className={S.label}>
          이름
        </label>
        <input
          id="username"
          name="name"
          type="text"
          className={S.input}
          placeholder="이름을 입력해주세요."
          value={formState.name}
          onChange={handleChangeFormState}
        />
      </div>

      <div className={S.field}>
        <label htmlFor="useremail" className={S.label}>
          이메일
        </label>
        <input
          id="useremail"
          name="email"
          type="email"
          className={S.input}
          placeholder="user@company.io"
          value={formState.email}
          onChange={handleChangeFormState}
        />
      </div>

      <button type="submit" className={S.button}>
        제출
      </button>

      <p className={S.preview}>
        <b>폼 데이터</b>: {formState.name} / {formState.email}
      </p>
    </form>
  )
}