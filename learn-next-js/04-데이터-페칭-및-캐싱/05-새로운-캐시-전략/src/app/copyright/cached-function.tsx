async function getCachedTime() {
  //현재 함수를 캐시할 것임을 선언
  'use cache'
  return new Date().getFullYear()
}

export default async function Copyright() {
  const currentYear = await getCachedTime()
  return <>© {currentYear} EUID. Copyright all reserved.</>
}
