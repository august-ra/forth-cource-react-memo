import { useContext } from "react"
import { Link } from "react-router-dom"
import styles from "./SelectLevelPage.module.css"
import { ChancesContext } from "../../context/ChancesContext/ChancesContext"


export function SelectLevelPage() {
  const { useChances, selectChances } = useContext(ChancesContext)

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        {
          useChances === null
            ? (
              <>
                <h2 className={styles.title}>Выберите<br />количество шансов<br />на ошибку</h2>
                <ul className={styles.levels}>
                  <li className={`${styles.level} ${styles.chance}`}>
                    <p className={styles.levelLink} onClick={() => selectChances(false)}>
                      0
                    </p>
                    <p className={styles.subtext}>Только <b>«hardcore»</b></p>
                  </li>
                  <li className={`${styles.level} ${styles.chance}`}>
                    <p className={styles.levelLink} onClick={() => selectChances(true)}>
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
      </div>
    </div>
  )
}
