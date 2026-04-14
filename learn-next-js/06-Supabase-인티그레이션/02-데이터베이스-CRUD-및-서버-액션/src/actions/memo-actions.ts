'use server'

import { revalidatePath } from 'next/cache'
import { createSupabase } from '@/lib/supabase/helper'
import { getErrorMessage } from '@/utils/get-error-message'

const DB_NAME = 'memolist'
const REVALIDATE_PATH = '/memos-crud'

// 타입 정의 ------------------------------------------------------------

export type Memo = {
  id: string
  created_at: string
  updated_at: string
  title: string
  content: string
}

export type MemoInsert =Pick<Memo,'title'  | 'content'>

// 응답 반환 타입

export type ActionRespnse<T> =
|{
  success: true
  data: T 
} 
| {
    success: false
    error: string

}

// [READ] 메모리스트를 가져오는 서버 액션 (단순 조회용)
export const readMemoAction = async (limit = 10):Promise<ActionRespnse<Memo[]>>=> {

  const supabase = await createSupabase()

  try{
    // 데이터베이스에서 데이터 가져오기
  const { error, data } = await supabase
    .from(DB_NAME)
    .select()
    .order('created_at', { ascending: false }) // 최신순 정렬
    .limit(limit)

  // 예측할 수 없는 로직 , catch 절로 넘김 
  if (error) throw error

  return {
    success: true,
    data: data as Memo[] ??  []
  }

  }catch(error){
    console.error(getErrorMessage(error));
    return{
      success:false,
      error:'매모리스트 데이터 가져오기에 실패했습니다.'
    }
  }
  
}

// [CREATE]
export const createMemoAction = async (formData:FormData):Promise<ActionRespnse<Memo>> => {

  // 사용자가 입력한 폼 데이터 값 추출
  const title  = formData.get('title')?.toString().trim()
  const content  = formData.get('content')?.toString().trim()

  // 서버 측 유효성 검사: 예측 가능한 에러 (사용자 실수)
  if(!title  || !content){
    return{
      success: false,
      error:'메모 제목 또는 내용을 입력해야 합니다.',
    }
  }

  try{
  // 쿠키 스토어 가져오기
  const supabase = await createSupabase()

  const newMemo:MemoInsert  ={
    title:title,
    content:content
  }
  const {error,data} = await supabase
  .from(DB_NAME)
  .insert([newMemo])
  .select('*')
  .single()

  if(error) throw error // 에러 발생 시 catch로 보냄

  // 캐시 갱신 (목록 페이지에 즉시 반영)
  revalidatePath(REVALIDATE_PATH)

  // 일관된 결과를 반환해줌
  return{
    success:true,
    data:(data as Memo)
  }

  }catch(error){
     console.error(getErrorMessage(error));
    return{
      success:false,
      error:'메모를 생성하지 못했습니다.'
    }
  }




}

// [UPDATE]
export const updateMemoAction = async () => {}

// [DELETE]
export const deleteMemoAction = async () => {}