import styles from '../form-filed/FormFiled.module.css'

export default function FormFiled(){
  return (
     <div className= {styles.field}>
            <label htmlFor="username">이름</label>
            <input type="text" id="username" className="input" placeholder="이름을 입력하세요"/>
     </div>
  )
}