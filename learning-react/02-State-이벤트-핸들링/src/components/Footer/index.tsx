import S from './style.module.css'

export default function Footer(props: {slogan:string}) {
    // 부모 컴포넌트가 자식 컴포넌트에 전달한 데이터 집합 = Props (Properties)
    // JavaScript : 함수이름(데이터) -> function 함수 이름(매개변수) {}
    // React : React.createElement(컴포넌트이름, { 키: 값 }) -> function 컴포넌트이름(props) {}
    console.log({props});

  /**
   * 데이터 바인딩 (Data Binding = Data + JSX = Markup)
   * - JavaScript 데이터(변수, 상수, 계산된 값 등)
   * - JSX 구문 안에 데이터 끼워넣기(Interpolation, {data})
   */

  const currentYear = new Date().getFullYear()

  /**
   * Props로 데이터 전달(부모 → 자식)
   * - 부모에서 자식으로 전달하는 데이터
   * - React.createElement API에서 Props
   * - Props 타입 정의 (인라인 → 인터페이스)
   */

  /**
   * 접근성 고려
   * - 사용자가 이해하기 쉽고 읽기 쉽도록 저작권 레이블(label) 구성
   */
  const copyrightLabel = `모든 저작권은 이듬(EUID)에 있습니다. ${props.slogan}`

  return (
    <footer className={S.footer}>
      <small aria-label={copyrightLabel}>
       {currentYear} COPYRIGHT RESERVED. © <abbr title="이듬(EUID)">EUID</abbr>.
       {props.slogan}
      </small>
    </footer>
  )
}
