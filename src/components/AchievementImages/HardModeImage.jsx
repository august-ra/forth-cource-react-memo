import React from 'react'
import styles from "./AchievementImages.module.css"

import cn from "classnames"

import activeImageUrl from "./images/hard-mode.svg"
import inactiveImageUrl from "./images/hard-mode-inactive.svg"


const images = {
  "active":   activeImageUrl,
  "inactive": inactiveImageUrl,
}


export function HardModeImage({ isActive }) {
  const activity = isActive ? "active" : "inactive"

  return (
    <div className={styles.achievement}>
      <img className={styles.achievementImage} src={images[activity]} alt={"for hard mode"} />
      {
        isActive
          && <div className={cn(styles.achievementBalloon, styles.hardMode)}>Игра пройдена<br />в сложном режиме</div>
      }
    </div>
  )
}
