import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.css";
import App from "./app/App";

// 방어적 프로그래밍
const rootElement = document.getElementById("root");

// rootElement가 null일 가능성을 방지해주기
if (!rootElement) {
  throw new Error("문서에 #root인 요소가 없습니다. 확인해보세요");
}

// React(Virtual) DOM (가짜 문서 객체 모델의 뿌리)
const ReactDOMRoot = createRoot(rootElement);
// console.log(ReactDOMRoot) // ReactDOMRoot { render, unmount }
ReactDOMRoot.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// createRoot(rootElement).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
