import styles from './Footer.module.css'

export default function Footer(){
  return (
        <footer className={styles.footer}>
        <small>
          COPYRIGHT RESERVED. © <abbr title="이듬(EUID)">EUID</abbr>. "완벽보단 완주를!"
        </small>
      </footer>
  )
}