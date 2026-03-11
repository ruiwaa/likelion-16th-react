import { useState } from 'react';
import S from './style.module.css';


//CRUD : create read update delete

// 카트(장바구니) 배열 안에 상품 객체를 추가할 건데 이전에 타입을 지정해야 한다. 
//(약속): 타입슼크립트의 인터페이스  선언

interface Product{
  id: number
  name: string
  count: number
}



export default function ImmutabilityCRUD() {
const [appleCart, setAppleCart] = useState<Product[]>([])


const handleAddApple = () => {
    const newAppleProduct: Product = {
      id:Date.now(),
      name:'애플',
      count:1,
    }

    const nextCart = [newAppleProduct,...appleCart]
    setAppleCart(nextCart)

    
  }

  // 삭제: 사과 삭제하는 기능
  const handleDelete = (deleteId:number) => {
    //삭제할 id와 appleCart 내부의 아이템 중 id가 동일한 것을 제외한 나머지를 걸러라
    const nextAppleCart = appleCart.filter((apple) =>{
      if(apple.id !== deleteId) return true
      return false
    })

    setAppleCart(nextAppleCart)

  }
  // 수정: 사과의 카운트 증가/ 감소 기능
  const handleUpdateCount =  (id:number, amount: number) => {
    
    // appleCart은 배열이다.
    // 해결 방법) 배열 복제 또는 새로운 배열을 만들어서 다음 상태로 설정
    // -> 고유한 데이터 식별자 찾기
    // 원본 배열을 불변 유지하면서 새로운 배열을 생성하려면 "map 메서드" 활용
    const nextAppleCart = appleCart.map(apple => {

      // 맵 메서드가 순환하면서 해당 아이디를 찾아서 새로운 배열을 생성해줌
      if(apple.id === id ){
        return {
          ...apple,
          count:Math.max(1, apple.count + amount),
        }
        
      }
      return apple
      
    })

    setAppleCart(nextAppleCart)
    
  }



  return (
    <section className={S.container}>
      <h2 className={S.title}>사과 바구니 (Apple Cart)</h2>
      <button type="button" className={S.addButton} onClick={handleAddApple}>사과 추가하기</button>

      <ul className={S.itemList}>
       {appleCart.map((apple,index) => {
        const appleId = apple.id.toString().slice(10)
        return  (
           <li className={S.item} key={index} data-id = {apple.id}>
              <span className={S.info}>
                {apple.name} {appleId} (수량: {apple.count})
              </span>
              <div role="group" className={S.controls}>
                <button
                  type="button"
                  aria-label="수량 증가"
                  className={S.countButton}
                  onClick={() => handleUpdateCount(apple.id,1)}
                >
                  +
                </button>
                   <button
                  type="button"
                  aria-label="수량 감소"
                  className={S.countButton}
                  onClick={() => handleUpdateCount(apple.id,-1)}
                >
                  -
                </button>
                   <button
                  type="button"
                  className={S.deleteButton}
                  onClick={() => handleDelete(apple.id)}
                >
                  삭제
                </button>

              </div>
           </li>
        )

        })}
      </ul>
    </section>
  )
}
