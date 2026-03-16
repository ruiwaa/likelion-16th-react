const { VITE_API_URL } = import.meta.env


export interface Post {
  id:number
  title:string
  content:string
  imgUrl:string
  createdAt:string
  userId: number
}

interface ResponsePostsData{
  hasNextPage:boolean
  limit:number
  messeage:string
  page:number
  posts:Post[]
}

// 옵션의 기본값 설정
//{ page = 1, limit = 5 } = {} 
export const getPosts = async ({ page = 1, limit = 5 } = {}): Promise<ResponsePostsData> =>  {
  try {
    const response = await fetch(`${VITE_API_URL}/api/posts?page=${page}&limit=${limit}`)
    
    if (!response.ok) {
      throw new Error('포스트 리스트 데이터 가져오기에 실패했습니다.')
    }
    return  response.json()
  } catch(error) {
      // 에러가 던져지면, 이를 다시 던져서 이 함수를 호출한 쪽에서 캐치(catch)할 수 있게 합니다.
    throw error instanceof Error ? error : new Error(String(error))
  }
}

// 원시 데이터 타입은 타입스크립트가 타입을 추론할 수 있음
function add(x: number, y: number): number {
  return x + y
}
add(1, 2) // undefined

// 비동기 함수같은 복잡한 구조일 때, 타입스크립트가 현재 인자의 타입을 알 수 없음
// 비동기 함수는 Promise를 받기 때문에 뒤에 타입을 지정해줘야 한다. 
const addAsync = async (x: number, y: number): Promise<number> => {
  const result: number = x + y
  return new Promise((resolve) => setTimeout(() => resolve(result), 1000))
}

const resolvedValue = await addAsync(10, 7)
console.log(resolvedValue.toLocaleString()) // number