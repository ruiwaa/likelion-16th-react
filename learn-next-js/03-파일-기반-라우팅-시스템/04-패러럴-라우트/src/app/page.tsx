import LinkCard from '@/components/ui/link-card'

/**
 *
 * Next.js에서 layou.tsx가 있다면
 * page.tsx는 자동으로 @children 슬롯에 들어감
 * 따라서, 해당 대시보드 폴더 안의 슬롯은 총 4개인 구조를 띈다.
 *
 * @children     ← dashboard/page.tsx (암묵적)
 * @auth         ← dashboard/@auth/
 * @chart        ← dashboard/@chart/
 * @statistics   ← dashboard/@statistics/
 *
 */
export default function MainPage() {
  return (
    <div className="w-full py-12">
      <section className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        {/* 학습 문서(Docs) 카드 */}
        <LinkCard
          href={`/docs/${encodeURIComponent('기초')}`}
          title="학습 문서"
          description={
            <>
              Next.js의 라우팅 원리와
              <br />
              기초 개념을 차근차근 익혀보세요.
            </>
          }
          actionLabel="가이드 읽어보기"
        />

        {/* 쇼핑(Shop) 카드 */}
        <LinkCard
          href="/shop"
          title="쇼핑"
          color="emerald"
          description={
            <>
              복잡한 카테고리 구조를 가진
              <br />
              스토어 예제를 직접 확인해보세요.
            </>
          }
          actionLabel="스토어 입장하기"
        />
      </section>
    </div>
  )
}
