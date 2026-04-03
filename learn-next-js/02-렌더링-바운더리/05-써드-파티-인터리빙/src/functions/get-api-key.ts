import 'server-only'

// 서버 전용 함수 (민감한 정보는 클라이언트에 노출되면 안됨)

export const getApiKey = () => {
  return process.env.SECRET_API_KEY
}
