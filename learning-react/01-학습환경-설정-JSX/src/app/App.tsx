import Header from '@/components/header/Header';
import Main from '@/components/main/Main';
import Footer from '@/components/footer/Footer';
import JsxExpression from '@/components/jsx-expression/JsxExpression';


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

  //JSX (javaScript )
  return (
    < >
    <JsxExpression />
    <Header/>
    <Main/>
    <Footer/>
    </>
  )
}

export default App;
