import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import styles from "./SelectLevelPage.module.css"
import { ChancesContext } from "../../context/ChancesContext/ChancesContext"

import cn from "classnames"


export function SelectLevelPage() {
  const [page, setPage] = useState(0)
  const { useChances, selectChances } = useContext(ChancesContext)

  function secondPage(valueOfUseChances) {
    setPage(page + 1)
    selectChances(valueOfUseChances)
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        {
          page === 0
            ? (
              <>
                <h2 className={styles.title}>Выберите<br />количество шансов<br />на ошибку</h2>
                <ul className={styles.levels}>
                  <li className={cn(styles.level, styles.chance)} onClick={() => secondPage(false)}>
                    <p className={styles.levelLink}>
                      0
                    </p>
                    <p className={styles.subtext}>Только <b>«hardcore»</b></p>
                  </li>
                  <li className={cn(styles.level, styles.chance)} onClick={() => secondPage(true)}>
                    <p className={styles.levelLink}>
                      3
                    </p>
                    <p className={styles.subtext}>Режим <b>«lite»</b>, пожалуйста</p>
                  </li>
                </ul>
              </>
            )
            : (
              <>
                {
                  useChances === false
                    ? <p className={styles.useChances}>Решили не дать себе и шанса на ошибку — поддерживаем <b>&#128515;</b></p>
                    : <p className={styles.useChances}>Решили играть с тремя попытками —<br />неплохо и, главное, честно <b>&#128522;</b></p>
                }
                <h2 className={styles.title}>Выберите сложность</h2>
                <ul className={styles.levels}>
                  <li className={styles.level}>
                    <Link className={styles.levelLink} to="/game/3">
                      1
                    </Link>
                  </li>
                  <li className={styles.level}>
                    <Link className={styles.levelLink} to="/game/6">
                      2
                    </Link>
                  </li>
                  <li className={styles.level}>
                    <Link className={styles.levelLink} to="/game/9">
                      3
                    </Link>
                  </li>
                </ul>
              </>
            )
        }
        <Link className={styles.leaderboard} to={"/leaderboard"}>Перейти к таблице лидеров</Link>
      </div>
    </div>
  )
}
