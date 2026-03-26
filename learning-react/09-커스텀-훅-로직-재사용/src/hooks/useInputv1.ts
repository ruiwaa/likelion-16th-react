import  {useCallback, useState} from 'react'


export function useInputv1(initialValue = ''){

  const [value, setValue] = useState(initialValue)
  

  // 훅함수가 실행될때마다 onChange 함수는 매번 다른 값을 가리키므로, 동일한 참조값을 기억하기 위해서 useCallback을 사용
    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    }, [])
  
    // 초기값이 바뀌지 않는 이상 동일한 함수를 참조할 수 있게 됨 (useCallback을 사용하여 값 저장, 초기값을 종속에 넣어주기)
    const reset= useCallback(() => setValue(initialValue), [initialValue])


    return {
      props:{
        value,
        onChange
      },

      methods:{
      reset
      },
    }
}
