import styles from "./Button.module.css"

import cn from "classnames"


export function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  )
}

export function EnterButton({ onClick }) {
  return (
    <button onClick={onClick} className={cn(styles.button, styles.enter)}>
      ↵
    </button>
  )
}
