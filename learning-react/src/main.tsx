import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// 방어적 프로그래밍
const rootElemnt = document.getElementById("root");

// rootElement가 null일 가능성을 방지해주기
if (!rootElemnt) {
  throw new Error("문서에 #root인 요소가 없습니다. 확인해보세요");
}

createRoot(rootElemnt).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
