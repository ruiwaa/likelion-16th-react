'use client' // 클라이언트에서 실행되는 코드임을 표시함

import { useEffect } from 'react'

export default function ProjectName() {
  console.log('클라이언트 컴포넌트')
  // 이펙트 동기화
  useEffect(() => {
    document.documentElement.dataset.projectName = 'my-next'
  }, [])

  return null
}
