// 서버 지시어를 추가한 파일의 모든 함수는 "서버 함수"
'use server' // 서버 지시어

//Node.js 모듈 읽어오기

import fs from 'node:fs/promises' //  FileSystem의 약자로, 파일 입출력 처리를 할 때 사용됨
import prcess from 'node:process'

import path from 'node:path'
import { isErrorObject } from '@/utils'
import { revalidatePath } from 'next/cache'

const dataPath = path.join(prcess.cwd(), 'src/data/likes.json')

// 데이터 읽기 (서버 전용 함수)
export async function readLikes() {
  try {
    const jsonString = await fs.readFile(dataPath, { encoding: 'utf-8' })
    // node.js는 문자열을 유니코드로 처리하여, 데터를 주고받거나 저장할 때 'utf-8'을  기본으로 사용
    const data = JSON.parse(jsonString) as { count: number } // JSON.parse 이용하여 서버가 실제로 다룰 수 있는 객체로 변환
    return data.count
  } catch {
    return 0
  }
}

// 데이터 쓰기 (서버 전용 함수)
export async function writeLikes(likeCount: number) {
  try {
    // 클라이언트에서 전달된 데이터 값 -> JSON 문자화
    const jsonString = JSON.stringify({ count: likeCount })
    //JSON 문자열을 fs.writeFile() API 서버의 likes.json 파일 쓰기
    await fs.writeFile(dataPath, jsonString, { encoding: 'utf-8' })
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    if (isErrorObject(error)) console.error(error.message)
    else console.error('[에러 발생]', String(error))

    return { success: false }
  }
}
