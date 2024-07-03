import { Button } from "../Button/Button"
import styles from "./EndGameModal.module.css"

import deadImageUrl from "./images/dead.png"
import celebrationImageUrl from "./images/celebration.png"


export function EndGameModal({ isWon, gameDurationMinutes, gameDurationSeconds, onClick }) {
  const title = isWon ? "Вы победили!" : "Вы проиграли!"
  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl
  const imgAlt = isWon ? "celebration emoji" : "dead emoji"

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>
        {gameDurationMinutes.toString().padStart(2, "0")}:{gameDurationSeconds.toString().padStart(2, "0")}
      </div>

      <Button onClick={onClick}>Начать сначала</Button>
    </div>
  )
}
