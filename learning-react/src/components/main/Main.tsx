import styles from './Main.module.css'
import Image from '../image/Image'
import FormFiled from '../form-filed/FormFiled'
import Button from '../button/Button'


export default function Main(){
  return(
         <main className={styles.main}>
        <section>
          <h2>모든 태그는 반드시 닫혀야 합니다.</h2>
          <p>
            <dfn>
              <abbr title="Hyper Text Markup Language">HTML</abbr>
              에서는 허용되었던 {'<img>'} 태그도 반드시 닫아야 합니다.
            </dfn>
             {/* Image 위치 */}
            <Image />
          </p>
        </section>
        <section>
          <h2>
            <abbr>HTML</abbr>이 아닙니다.
          </h2>
         <FormFiled/>
        </section>
        <section>
          <h2>웹 표준과 접근성을 준수해야 합니다.</h2>
          {/* JSX 주석 */}
          {/* 클릭 이벤트 리스너 추가: jsx 이벤트 속성 onClick= {함수} */}
          {/* 키보드 접근이 불가능한 나쁜 코드 */}
        {/* <div onClick={() => alert('hello')}>모든 사용자 고려</div> */}

        {/* 좋은 코드 */}
       <Button />

        </section>
      </main>
  )

}