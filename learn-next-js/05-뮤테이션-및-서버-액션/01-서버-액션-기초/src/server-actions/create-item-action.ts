'use server'

import { wait } from '@/utils'

//비동기 서버 함수
export async function createItemAction(formData: FormData) {
  // 사용자 입력 데이터 추출
  const title = formData.get('title')?.toString().trim()
  try {
    await wait(800)
    // 아이템의 글자 길이가 2글자 이상인지 확인
    if (!title || title.length < 2) {
      return {
        success: false,
        error: '아이템 이름은 최소 2글자 이상  입력이 필요합니다.',
      }
    }

    // 아이템 이름으로 비속어 사용했는지 확인
    if (/바보|멍청이|또라이/.test(title)) {
      return {
        success: false,
        error: '아이템으로 비속어는 사용할 수 없습니다. 다시 입력하세요.',
      }
    }

    if (Math.random() > 0.7) {
      throw new Error('데이터베이스 연결에 실패했습니다.')
    }
  } catch (error) {
    console.error('에러 발생', error)
    return {
      success: false,
      error: '서버에서 일시적인 장애로 에러가 발생했습니다.',
    }
  }

  return {
    success: true,
    message: `${title} 아이템이 성공적으로 생성되었습니다.`,
  }
}
