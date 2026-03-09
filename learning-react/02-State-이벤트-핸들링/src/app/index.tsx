import {Header, Footer, Section, Button} from '@/components'
import S from "./style.module.css";

export default function App() {
  return (
    <div className={S.container}>
      <Header>
        <h1>내맘대로 헤더!</h1>
      </Header>

      <Header>
        <h2>내 맘대로 컴포넌트 조립하기!</h2>
        <p>컴포넌트를 조립해서 쓰니 유지보수가 편해요!</p>
      </Header>
      <Section title="리액트는 리액션" isShowTitle>
        <p>react는 사용자의 행동에 따라 리액션을 제공한다.</p>
        <div
          lang="en"
          style={{ display: "flex", gap: 6, marginBlockStart: 12 }}
        >
          <Button onNoti={() => alert("리액션!")}>Reaction</Button>
          <Button onNoti={() => alert("리액티브!")} isDisabled>
            Reactive
          </Button>
          <Button onNoti={() => alert("리액티비티!")}>Reactivity</Button>
        </div>
      </Section>
      <div data-placeholder />
      <Footer slogan={"완주 이후엔 스스로 학습이 가능!!!!!"} />
    </div>
  );
}
