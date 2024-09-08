import { useState } from "react"
import styles from "./Helpers.module.css"

import cn from "classnames"

import eyeImageUrl from "./images/eye.svg"
import pairImageUrl from "./images/pair.svg"


const data = {
  showCards: {
    title:       "Покажи карты",
    description: "Открой все карты на 5 секунд, потому что я некоторые не запомнил",
    image:       eyeImageUrl,
    alt:         "eye",
  },
  openPair: {
    title:       "Открой пару",
    description: "Убери одну закрытую пару карт, чтобы мне было попроще",
    image:       pairImageUrl,
    alt:         "pair",
  },
}

export function Helpers({ hasSeeing, hasOpening, showCards, openPair }) {
  return (
    <div className={styles.helpers}>
      <Helper data={data.showCards} disabled={!hasSeeing} onClick={showCards} />
      <Helper data={data.openPair} disabled={!hasOpening} onClick={openPair} />
    </div>
  )
}

function Helper({ data, disabled, onClick }) {
  const [opened, setOpened] = useState(false)

  function openHint() {
    if (disabled)
      return

    setOpened(true)
  }

  function closeHint() {
    setOpened(false)
  }

  function handleClick() {
    if (disabled)
      return

    if (opened)
      closeHint()

    onClick()
  }

  return (
    <div>
      {
        opened
          && (
            <>
              <div className={styles.blockedBack}/>
              <div className={styles.balloon}>
                <h3>{data.title}</h3>
                <p>{data.description}</p>
              </div>
            </>
          )
      }
      <img className={cn(styles.image, { [styles.disabledImage]: disabled })} src={data.image} alt={data.alt} onClick={handleClick} onMouseOver={openHint} onMouseOut={closeHint} />
    </div>
  )
}
