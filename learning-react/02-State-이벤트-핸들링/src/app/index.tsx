import Header from '@/components/Header'
import Footer from '@/components/Footer'
import S from './style.module.css'
//import { createElement } from 'react'

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
    <div data-placeholder />
    <Footer slogan ={'완주 이후엔 스스로 학습이 가능!!!!!'}/>
    
   {/* {createElement(
     // Component Name 
      Footer,
     // Component Props 
    { slogan: '완주 이후엔 스스로 학습이 가능!'},
      )} */}

  </div>
  )
}
