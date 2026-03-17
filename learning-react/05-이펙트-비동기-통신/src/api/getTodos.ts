
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

export const getTodos = async (userId: string, options?:RequestInit):Promise<Todo[]> => {

try{
  const response = await fetch(`${TODOS_URL}/api/todos?userId=${userId}`,options)
  const data: ResponseTodosData = await response.json()
  return data.todos

}catch(error){
  throw error instanceof Error ? error  :  new Error(String(error))
}



}


// 유틸리티 함수
export const getRandomCompletedTodos = (todos: Todo[]) =>
  todos.map((todo) => ({
    ...todo,
    completed: Math.random() >= 0.5,
  }))
