import Button from '../components/button/Button';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Image from '../components/image/Image'
import FormFiled from '../components/form-filed/FormFiled';
import styles from './App.module.css'



/**
 * JSX (JavaScript eXtension: 자바스크립트 확장 (비표준: 브라우저 해석 못함: SyntaxError))
 * 빌드(컴파일 + 번들링) 도구에서만 JSX 사용 가능
 */

function App() {
  //return null; /* 아무 것도 반환하지 않음 (화면에 아무 것도 그리지 않음) */

// 함수가 JSX(React.ReactNode 타입) 반환
  // Build Tools (Vite, Webpack, Turbopack, ....)
  // *.tsx (TypeScript + JSX) -> TSC -> *.js (React API: React.createElement(type, props, ...children))

  // JSX (JavaScript 확장 구문: 마크업 (구조 설계 in JavaScript 파일))
  // JSX는 식이다.

   // 함수 안에 데이터 선언


  //JSX (javaScript )
  return (
    < >
      <Header/>
      <main className={styles.main}>
        <section>
          <h2>모든 태그는 반드시 닫혀야 합니다.</h2>
          <p>
            <dfn>
              <abbr title="Hyper Text Markup Language">HTML</abbr>
              에서는 허용되었던 {'<img>'} 태그도 반드시 닫아야 합니다.
            </dfn>
             {/* Image 위치 */}
            <Image />
          </p>
        </section>
        <section>
          <h2>
            <abbr>HTML</abbr>이 아닙니다.
          </h2>
         <FormFiled/>
        </section>
        <section>
          <h2>웹 표준과 접근성을 준수해야 합니다.</h2>
          {/* JSX 주석 */}
          {/* 클릭 이벤트 리스너 추가: jsx 이벤트 속성 onClick= {함수} */}
          {/* 키보드 접근이 불가능한 나쁜 코드 */}
        {/* <div onClick={() => alert('hello')}>모든 사용자 고려</div> */}

        {/* 좋은 코드 */}
       <Button />

        </section>
      </main>
      <Footer/>
    </>
  )
}

export default App;
