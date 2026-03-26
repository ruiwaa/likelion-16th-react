import { useCallback, useRef, useState } from 'react'

/**
 * useInput 커스텀 훅 v3
 * @param initialValue 초기값
 * @returns props: JSX 요소에 주입할 속성 모음
 * @returns methods: 입력 제어를 위한 메서드 모음
 */

// T는 HTMLInputElement의 기능을 모두 가지고 있는 어떤 타입이라는 의미이다.
export function useInputV3<T extends HTMLInputElement>(initialValue = '') {
  const [value, setValue] = useState(initialValue)

  const onChange = useCallback((e: React.ChangeEvent<T>) => {
    setValue(e.target.value)
  }, [])

  const reset = useCallback(() => {
    setValue(initialValue)
  }, [initialValue])

  const ref = useRef<T>(null)
  const focus = useCallback(() => { ref.current?.focus() }, [])
  const select = useCallback(() => { ref.current?.select() }, [])

  return { 
    props: { ref, value, onChange }, 
    methods: { reset, focus, select } 
  }
}