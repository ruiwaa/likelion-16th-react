import { Footer, Header, Wrapper } from '@/components'
import { ControlledComponent } from '@/learns'
import S from './style.module.css'

export default function App() {
  return (
    <div className={S.container}>
      <Header>
        <h2 className={S.imageWrapper}>
          리액트 러닝 가이드
        </h2>
      </Header>

      <div className={S.main}>
        <Wrapper>
          <ControlledComponent />
        </Wrapper>
      </div>

      <Footer slogan={'모든 이들에게 행복을!'} />
    </div>
  )
}
