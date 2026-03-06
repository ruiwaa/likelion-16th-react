import styles from './JsxExpression.module.css'

export default function JsxExpression() {
  // 기본(원시) 데이터

  // string, number
  const nickname = '이한영'
  const age = 26



  // 아래의 값들은 화면에 바로 출력이 안됨
  // boolean, null, undefined
  // 이 값들을 화면에 출력하려면 문자화 시켜야 함
  // 숫자 0 과 빈 문자열은 화면에 바로 출력 가능
  const isAdmin = !true
  const reference = null
  const undefinedValue = undefined

  // 객체형 데이터 (object, function, array)
  const userProfile = {
    name: nickname,
    id: 'u-01',
  }

  // 로직
  // 데이터 + 로직 = JSX 마크업
  return (
    <section className={styles.container}>
      <h2>JSX 표현식 (조건부 렌더링)</h2>
      <p>사용자 이름은 {nickname}입니다. </p>
      <p>나이는 {age}세 입니다.</p>
      <p>내년에는 {age + 1}세가 되요!</p>
      <p>관리자 모드: {isAdmin ? '관리자입니다': '게스트입니다. 환영합니다.'}</p>
      <output>null = {reference + ""} | undefined = {undefinedValue + ""}</output>
     <dl>
        <dt>ID</dt>
        <dd>{userProfile.id}</dd>
        <dt>이름</dt>
        <dd>{userProfile.name}</dd>
      </dl>
      {/* 객체 -> 문자로 변환하면? 출력 가능? */}
      <pre>{JSON.stringify(userProfile, null, 2)}</pre>
    </section>
  )
}