
const TODOS_URL = import.meta.env.VITE_API_URL

export interface Todo {
   id: number
   content:string
   completed: boolean
   userId: number
}

interface ResponseTodosData{
  message: string
  todos: Todo[]
}

export const getTodos = async (userId: string) => {

const response = await fetch(`${TODOS_URL}/api/todos?userId=${userId}`)
const data: ResponseTodosData = await response.json()

return data.todos

// if(!response.ok){
//   throw new Error (`해당되는 사용자 아이디 ${userId}가 존재하지 않습니다.`)
// }

}


// 유틸리티 함수
export const getRandomCompletedTodos = (todos: Todo[]) =>
  todos.map((todo) => ({
    ...todo,
    completed: Math.random() >= 0.5,
  }))
