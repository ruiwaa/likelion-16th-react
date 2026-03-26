import { useState, useEffect } from "react"



export function useDebounce(value: string, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value) // 사용자 입력 값이 멈추면 그 때 서버 요청!

// 디바운스 처리를 위한 이펙트
useEffect(() => {
  // 타이머 API (지연 처리: 비동기 작업)
  const timerId = setTimeout(() => {
    setDebouncedValue(value)
  }, delay) 

  // 클린업: 컴포넌트가 업데이트될 때마다 정리
  return () => clearTimeout(timerId)
}, [value, delay])

return [debouncedValue, setDebouncedValue] as const
}