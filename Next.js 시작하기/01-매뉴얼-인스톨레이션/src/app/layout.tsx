import '@/styles/globals.css'
import type { Metadata } from 'next'

// Metadata 내보내기
export const metadata: Metadata = {
  title: 'Next.js 러닝 가이드',
  description: 'Next.js 메타프레임 워크 학습하기',
}
export default function RootLayout({ children }: React.PropsWithChildren) {
  // [서버 사이드 렌더링]
  return (
    <html lang="ko-KR">
      <body className="overflow-y-scroll">{children}</body>
    </html>
  )
}
