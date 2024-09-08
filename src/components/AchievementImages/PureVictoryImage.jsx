import React from 'react'
import styles from "./AchievementImages.module.css"

import activeImageUrl from "./images/pure-victory.svg"
import inactiveImageUrl from "./images/pure-victory-inactive.svg"


const images = {
  "active":   activeImageUrl,
  "inactive": inactiveImageUrl,
}


export function PureVictoryImage({ isActive }) {
  const activity = isActive ? "active" : "inactive"

  return (
    <div className={styles.achievement}>
      <img className={styles.achievementImage} src={images[activity]} alt={"for pure victory"} />
      {
        isActive
          && <div className={styles.achievementBalloon}>Игра пройдена без супер-сил</div>
      }
    </div>
  )
}
