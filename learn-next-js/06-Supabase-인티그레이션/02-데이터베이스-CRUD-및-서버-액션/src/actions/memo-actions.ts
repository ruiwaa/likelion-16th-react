'use server'

import { revalidatePath } from 'next/cache'
import { createSupabase } from '@/lib/supabase/helper'
import { getErrorMessage } from '@/utils/get-error-message'
import z from 'zod'



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

// 생성 시 필요한  타입
export type MemoInsert =Pick<Memo,'title'  | 'content'>

// 수정 시 필요한 타입
export type MemoUpdate = Partial<MemoInsert>
// 응답 반환 타입

export type ActionResponse<T> =
|{
  success: true
  data: T 
} 
| {
    success: false
    error: string

}

//  zod 사용하여 메모 스키마 생성 -----------------------------------------------
const MemoSchema = z.object({
  title:z.string().trim().min(2,'메모 제목은 최소 2글자 이상 입력해야 합니다.').max(16),
  content:z.string().trim().min(5,'메모 내용은 최소 5글자 이상 입력해야 합니다.').max(100, '메모 내용은 최대 100글자로 작성해야 합니다.'),
})

export type MemoInput = z.infer<typeof MemoSchema>

// [READ] 메모리스트를 가져오는 서버 액션 (단순 조회용)
export const readMemoAction = async (limit = 10):Promise<ActionResponse<Memo[]>>=> {

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
export const createMemoAction = async (formData:FormData):Promise<ActionResponse<Memo>> => {

  // 사용자가 입력한 폼 데이터 값 추출
  const title  = formData.get('title')?.toString().trim()
  const content  = formData.get('content')?.toString().trim()

  // 서버 측 유효성 검사: 예측 가능한 에러 (사용자 실수)
  const result = MemoSchema.safeParse({title,content})
   // Supabase 데이터베이스에 연결할 필요없이 바로 실패 응답 결과 반환
  if (!result.success) {
    
    // 각 필드마다 에러를 표시하고자 할 경우 (클라이언트 화면용)
    // const treeifyError = z.treeifyError(result.error)
    // console.log(treeifyError)

    // 전체 에러 메시지를 화면에 표시할 경우 (서버 터미널 디버깅용)
    const prettifyError = z.prettifyError(result.error)

    return {
      success: false,
      error: prettifyError,
    }
  }
  try{
  // 쿠키 스토어 가져오기
  const supabase = await createSupabase()

  const newMemo:MemoInsert  = result.data

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


// [UPDATE] 기존 메모의 내용을 수정합니다.
export const updateMemoAction = async (memoId: Memo['id'], updateMemo: MemoUpdate) => {
  // 서버 측 유효성 검사: 예측 가능한 에러 (사용자 실수)
  // Zod를 사용한 입력 값 검증(Safe Parse -> Validation)
  const result = MemoSchema.safeParse(updateMemo)

  // Supabase 데이터베이스에 연결할 필요없이 바로 실패 응답 결과 반환
  if (!result.success) {
    
    // 각 필드마다 에러를 표시하고자 할 경우 (클라이언트 화면용)
    // const treeifyError = z.treeifyError(result.error)
    // console.log(treeifyError)

    // 전체 에러 메시지를 화면에 표시할 경우 (서버 터미널 디버깅용)
    const prettifyError = z.prettifyError(result.error)

    return {
      success: false,
      error: prettifyError,
    }
  }

  try {
    const supabase = await createSupabase()

    const { error, data } = await supabase
      .from(DB_NAME)
      .update(result.data)
      .eq('id', memoId)
      .select('*')
      .single()

    if (error) throw error

    revalidatePath(REVALIDATE_PATH)

    return {
      success: true,
      data: (data as Memo)
    }
  } catch(error) {
    console.error('메모 수정 실패', getErrorMessage(error))
    return {
      success: false,
      error: '메모 수정에 실패했습니다.'
    }
  }
}

// [DELETE]
export const deleteMemoAction = async (memoId: Memo['id']): Promise<ActionResponse<null>> => {

  if (!memoId) {
    return {
      success: false,
      error: '삭제할 메모 ID가 없습니다.'
    }
  }

  try {
    const supabase = await createSupabase()
    const { error } = await supabase.from(DB_NAME).delete().eq('id', memoId)

    if (error) throw error

    revalidatePath(REVALIDATE_PATH)

    return {
      success: true,
      data: null
    }

  } catch(error) {
    console.error('메모 삭제 실패', getErrorMessage(error))
    return {
      success: false,
      error: '메모 삭제에 실패했습니다.'
    }
  }

}
