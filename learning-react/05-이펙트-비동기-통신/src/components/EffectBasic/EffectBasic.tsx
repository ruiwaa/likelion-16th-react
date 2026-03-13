import { useEffect, useState } from 'react'
import styles from './EffectBasic.module.css'



async function wait(delay = 1000) {
  return new Promise((resolve) => setTimeout(resolve, delay))
  
}
export default function EffectBasic() {
  
  const [count, setCount] = useState(0)
  

  const handleIncreament = async() => {
    await wait(1500)
    setCount((nextCount)=> nextCount + 1)
  }

  useEffect(() => {

    document.title = `현재 카운터:${count}`
  })


  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Effect 기초 학습</h2>

      <button type="button" className={styles.counterButton} onClick={handleIncreament} >
        카운트 증가: {count}
      </button>

      <p className={styles.statusText}>
        콘솔 로그를 통해 실행 순서를 확인해보세요.
      </p>
    </section>
  )
}
