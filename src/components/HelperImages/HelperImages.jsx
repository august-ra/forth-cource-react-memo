import styles from "./HelperImages.module.css"

import cn from "classnames"

import eyeImageUrl from "./images/eye.svg"
import pairImageUrl from "./images/pair.svg"


export function HelperImages({ hasSeeing, hasOpening }) {
  return (
    <div className={styles.helpers}>
      <div>
        <div className={styles.blockedBack} />
        <img className={cn(styles.image, { [styles.disabledImage]: !hasSeeing })} src={eyeImageUrl} alt="eye" />
        <div className={styles.balloon}>
          <h3>Покажи карты</h3>
          <p>Открой все карты на 5 секунд, потому что я некоторые не запомнил</p>
        </div>
      </div>

      <div>
        <div className={styles.blockedBack} />
        <img className={cn(styles.image, { [styles.disabledImage]: !hasOpening })} src={pairImageUrl} alt="pair" />
        <div className={styles.balloon}>
          <h3>Открой пару</h3>
          <p>Убери одну закрытую пару карт, чтобы мне было попроще</p>
        </div>
      </div>
    </div>
  )
}
