import {Header, Footer, Wrapper} from '@/components'
import { ConditionalRendering } from '@/learns';
import S from "./style.module.css";

export default function App() {
  return (
    <div className={S.container}>
      <Header>
        <h1>컴포넌트 디자인</h1>
      </Header>
      <Wrapper>
      <ConditionalRendering />
      </Wrapper>
      {/* <div data-placeholder /> */}
      <Footer slogan={"완주 이후엔 스스로 학습이 가능!!!!!"} />
    </div>
  );
}
