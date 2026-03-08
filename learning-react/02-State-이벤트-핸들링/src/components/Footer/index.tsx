import S from './style.module.css'

export default function Footer() {
  /**
   * 데이터 바인딩 (Data Binding)
   * - JavaScript 데이터(변수, 계산된 값 등)
   * - JSX 구문 안에 데이터 끼워넣기(Interpolation)
   */
  const currentYear = 2026

  /**
   * Props로 데이터 전달(부모 → 자식)
   * - 부모에서 자식으로 전달하는 데이터
   * - React.createElement API에서 Props
   * - Props 타입 정의 (인라인 → 인터페이스)
   */
  const slogan = '완벽보다 완주를!'

  /**
   * 접근성 고려
   * - 사용자가 이해하기 쉽고 읽기 쉽도록 저작권 레이블(label) 구성
   */
  const copyrightLabel = '모든 저작권은 이듬(EUID)에 있습니다. 완벽보다 완주를!'

  return (
    <footer className={S.footer}>
      <small>
        COPYRIGHT RESERVED. © <abbr title="이듬(EUID)">EUID</abbr>.
      </small>
    </footer>
  )
}
