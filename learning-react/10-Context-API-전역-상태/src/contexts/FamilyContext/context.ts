import { createContext , type Dispatch, type SetStateAction } from "react";

// 컨텍스트 데이터(값) 타입 정의
export interface FamilyContextValue {
  // 상태
  name: string
  email: string
  checked: boolean

  // 액션(함수)
  setName: Dispatch<SetStateAction<string>>
  setEmail: Dispatch<SetStateAction<string>>
  setChecked: Dispatch<SetStateAction<boolean>>
}

// 리액트 컨텍스트 생성
export const FamilyContext = createContext<FamilyContextValue|null>(null)
