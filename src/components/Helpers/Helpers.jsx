import { useState } from "react"
import styles from "./Helpers.module.css"

import cn from "classnames"

import eyeImageUrl from "./images/eye.svg"
import pairImageUrl from "./images/pair.svg"


export function Helpers({ hasSeeing, hasOpening, showCards, openPair }) {
  const [mark, updateComponent] = useState(false)

  /*
   * I got the superpower over React! I can use an object without setState and have got all the functionality
   * but ... I don't need that too for single components. I can make states out the components. See line no. 10
   * And I need just one using state to update the hole component
   *
   * const [opened] = useState({ left: false, right: false })
   */

  function toggleOpen(key, value) {
    if (key === "left" && !hasSeeing || key === "right" && !hasOpening)
      return

    opened[key] = value
    updateComponent(!mark)
  }

  const openLeft = () => toggleOpen("left", true)
  const closeLeft = () => toggleOpen("left", false)

  const openRight = () => toggleOpen("right", true)
  const closeRight = () => toggleOpen("right", false)

  function clickLeft() {
    if (opened.left)
      closeLeft()

    showCards()
  }

  function clickRight() {
    if (opened.right)
      closeRight()

    openPair()
  }

  return (
    <div className={styles.helpers}>
      <div>
        {
          opened.left
            && (
              <>
                <div className={styles.blockedBack}/>
                <div className={styles.balloon}>
                  <h3>Покажи карты</h3>
                  <p>Открой все карты на 5 секунд, потому что я некоторые не запомнил</p>
                </div>
              </>
            )
        }
        <img className={cn(styles.image, { [styles.disabledImage]: !hasSeeing })} src={eyeImageUrl} alt="eye" onClick={clickLeft} onMouseOver={openLeft} onMouseOut={closeLeft} />
      </div>

      <div>
        {
          opened.right
            && (
              <>
                <div className={styles.blockedBack}/>
                <div className={styles.balloon}>
                  <h3>Открой пару</h3>
                  <p>Убери одну закрытую пару карт, чтобы мне было попроще</p>
                </div>
              </>
            )
        }
        <img className={cn(styles.image, { [styles.disabledImage]: !hasOpening })} src={pairImageUrl} alt="pair" onClick={clickRight} onMouseOver={openRight} onMouseOut={closeRight} />
      </div>
    </div>
  )
}
