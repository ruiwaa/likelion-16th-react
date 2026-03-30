import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/context";
import { NAVIGATION_PATH } from "@/configs/navigationPaths";

export default function ProtectedRoute({ children }: React.PropsWithChildren) {
  const { user, initializing } = useAuth();

  // 인증된 사용자가 아닐 시 로그인 페이지로 이동시켜줌
  // 유즈이펙트를 사용하게 되면
  // 로그인 페이지 이동 전에 마이페이지가 보이게 되는 현상 발생
  //원인: 컴포넌트 라이프 사이클(생명 주기)
  // 함수 실행(렌더) -> 리액트 엘리먼트 트리
  // 리액트 엘리먼트 트리 -> 리액트 돔 -> DOM 커밋
  // DOM 커밋 -> 브라우저 페인팅 (리플로우/리페인트)
  // 브라우저 페인팅 -> 이펙트 정리(클린업)
  // 이펙트 정리(클린업) -> 이펙트 설정(셋업) 함수 실행

  if (initializing) {
    return <p role="status">인증 상태 확인 중...</p>;
  }
  if (!user) {
    return <Navigate to={NAVIGATION_PATH.login} />;
  }

  return <>{children}</>;
}
