import styles from "../Cards/Cards.module.css"
import { NumericLabel } from "../NumericLabel/NumericLabel"


export function TimeLabel({ minutes, seconds }) {
  return (
    <div className={styles.timer}>
      <NumericLabel title="min" value={minutes} /> : <NumericLabel title="sec" value={seconds} />
    </div>
  )
}
