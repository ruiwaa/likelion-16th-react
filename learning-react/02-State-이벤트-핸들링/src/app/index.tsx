import Footer from '@/components/Footer'
import S from './style.module.css'
//import { createElement } from 'react'

export default function App() {
  return (<div className={S.container}>
    <h1>React App</h1>
    <Footer slogan ={'완주 이후엔 스스로 학습이 가능!'}/>
    
   {/* {createElement(
     // Component Name 
      Footer,
     // Component Props 
    { slogan: '완주 이후엔 스스로 학습이 가능!'},
      )} */}

  </div>
  )
}
