import styles from "../Cards/Cards.module.css"


export function NumericLabel({ title, value }) {
  return (
    <div className={styles.timerValue}>
      <div className={styles.timerDescription}>{title}</div>
      <div>{value.toString().padStart(2, "0")}</div>
    </div>
  )
}
