import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  //URL의 pathname 또는 search 값이 바뀌면 글로벌디스.scrollTo(0,0) 적용

  useEffect(() => {
    const timerId = setTimeout(() => {
      globalThis.scrollTo(0, 0);
    }, 50);

    // 클린업(메모리 누수방지)
    return () => clearTimeout(timerId);
  }, [pathname, search]);

  return null;
}
