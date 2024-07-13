import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./Leaderboard.module.css"
import { Button } from "../Button/Button"

import API from "../../utils/api"
import { printTime } from "../../utils/cards"


/**
 * Компонент таблицы победителей
 */
export function Leaderboard() {
  const navigate = useNavigate()
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    API.readLeadersFromServer()
      .then((data) => {
        setLeaderboard(data.leaders.sort((a, b) => a.time - b.time).slice(0, 10))
      })
  }, [])

  function startGame() {
    navigate("/")
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          Таблица лидеров
        </div>
        <Button onClick={startGame}>Начать игру</Button>
      </div>

      <div className={styles.grid}>
        <div className={styles.line}>
          <p className={styles.head}>Позиция</p>
          <p className={styles.head}>Пользователь</p>
          <p className={styles.head}>Время</p>
        </div>
        {
          leaderboard.map((record) => (
            <div className={styles.line} key={record.id}>
              <p className={styles.element}>#{record.id}</p>
              <p className={styles.element}>{record.name}</p>
              <p className={styles.element}>{printTime(record.time)}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}
