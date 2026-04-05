import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import { cn } from '@/utils'
import '@/styles/globals.css'
import { ToastProvider } from '@/contexts/toast-context'

// 컨테스트 프로바이더 인터리빙
// - `children`으로 외부에서 추가된 서버 컴포넌트는 서버 렌더링 경계 유지
// - 클라이언트 컴포넌트 내부에 직접 포함된 서버 컴포넌트는 클라이언트 컴포넌트화

const notoSansKR = Noto_Sans_KR({ variable: '--font-noto' })

export const metadata: Metadata = {
  title: 'Next.js 러닝 가이드',
  description:
    '보다 나은 웹 경험을 위한 Next.js 프레임워크 사용 방법을 학습합니다.',
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="ko-KR">
      <body
        className={cn(
          'overflow-y-scroll',
          notoSansKR.variable,
          'selection:bg-foreground selection:text-background',
        )}
      >
        {/* Notification Context Provider */}
        {/* 내부에 직접 포함시키지 않았기때문에 자신의 성질을 유지할 수 있음 */}
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}
