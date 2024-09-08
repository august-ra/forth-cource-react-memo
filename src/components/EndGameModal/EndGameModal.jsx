import { useState } from "react"
import { Link } from "react-router-dom"
import styles from "./EndGameModal.module.css"
import { Button, EnterButton } from "../Button/Button"

import API from "../../utils/api"
import cn from "classnames"

import deadImageUrl from "./images/dead.png"
import celebrationImageUrl from "./images/celebration.png"


export function EndGameModal({ isWon, achievements, gameDurationMinutes, gameDurationSeconds, onClick }) {
  const title = isWon ? "Вы попали" : "Вы проиграли!"
  const secondLine = isWon ? "в таблицу лидеров!" : ""
  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl
  const imgAlt = isWon ? "celebration emoji" : "dead emoji"

  const [isSaved, setIsSaved] = useState(false)
  const [username, setUsername] = useState("")

  function handleChangeUsername(e) {
    setUsername(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    API.writeLeaderToServer({
      name:         username,
      time:         gameDurationMinutes * 60 + gameDurationSeconds,
      achievements: achievements,
    })
      .then(() => {
        setIsSaved(true)
      })
  }

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{title}{ secondLine && <><br/> {secondLine}</> }</h2>
      {
        isWon
          && (isSaved
            ? (
              <input className={cn(styles.username, styles.good)} value={username} readOnly />
            )
            : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <input className={styles.username} placeholder={"Пользователь"} value={username} onChange={handleChangeUsername} />
                <EnterButton className={styles.submit} />
              </form>
            )
          )
      }
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>
        {gameDurationMinutes.toString().padStart(2, "0")}:{gameDurationSeconds.toString().padStart(2, "0")}
      </div>

      <Button onClick={onClick}>Начать сначала</Button>

      <Link className={styles.leaderboard} to={"/leaderboard"}>Перейти к таблице лидеров</Link>
    </div>
  )
}
