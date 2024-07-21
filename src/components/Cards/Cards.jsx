import { useContext, useEffect, useState } from "react"
import { useAchievements } from "../../hooks/useAchievements"
import styles from "./Cards.module.css"
import { ChancesContext } from "../../context/ChancesContext/ChancesContext"
import { Button } from "../Button/Button"
import { TimeLabel } from "../TimeLabel/TimeLabel"
import { Helpers } from "../Helpers/Helpers"
import { Card } from "../Card/Card"
import { EndGameModal } from "../EndGameModal/EndGameModal"
import { chooseColorName, generateDeck, printTimer, printTries } from "../../utils/cards"
import { shuffle } from "lodash"

import cn from "classnames"


// Игра закончилась
const STATUS_LOST           = "STATUS_LOST"
const STATUS_WON            = "STATUS_WON"
// Идёт игра: карты закрыты, игрок может их открыть
const STATUS_IN_PROGRESS    = "STATUS_IN_PROGRESS"
// Начинается игра: игрок видит все карты в течение нескольких секунд
const STATUS_PREVIEW        = "STATUS_PREVIEW"
const STATUS_PREVIEW_HELPER = "STATUS_PREVIEW_HELPER"


function getTimerValue(startDate, endDate) {
  if (!startDate && !endDate)
    return {
      minutes: 0,
      seconds: 0,
    }

  if (endDate === null)
    endDate = new Date()

  const diffInSeconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000)

  return {
    minutes: Math.floor(diffInSeconds / 60),
    seconds: diffInSeconds % 60,
  }
}

/**
 * Основной компонент игры, внутри него находится вся игровая механика и логика.
 * pairsCount - сколько пар будет в игре
 * previewSeconds - сколько секунд пользователь будет видеть все карты открытыми до начала игры
 */
export function Cards({ pairsCount = 3, previewSeconds = 5 }) {
  // В cards лежит игровое поле - массив карт и их состояние открыта\закрыта
  const [cards, setCards] = useState([])
  // Предыдущая открытая карта, выбранная после удачной пары или сразу после начала игры
  const [previousCard, setPreviousCard] = useState(null)
  // Текущий статус игры
  const [status, setStatus] = useState(STATUS_PREVIEW)
  // Текущий статус проверки открытых карт
  const [isCheckingNow, setIsCheckingNow] = useState(false)

  // Дата начала игры
  const [gameStartDate, setGameStartDate] = useState(null)
  // Дата конца игры
  const [gameEndDate, setGameEndDate] = useState(null)

  // Состояние для таймера до начала игры
  const [timerToStart, setTimerToStart] = useState(previewSeconds)
  // Состояние для таймера, высчитывается в setInterval на основе gameStartDate и gameEndDate
  const [timer, setTimer] = useState({
    minutes: 0,
    seconds: 0,
  })

  const { achievements, updateAchievements } = useAchievements(pairsCount)
  const { useChances, getChancesCount } = useContext(ChancesContext)
  const [chancesCount, setChancesCount] = useState(getChancesCount())
  const [hasShowCardsHelper, setHasShowCardsHelper] = useState(true)
  const [hasOpenPairHelper, setHasOpenPairHelper] = useState(true)

  function startGame() {
    const startDate = new Date()

    setGameEndDate(null)
    setGameStartDate(startDate)
    setTimer(getTimerValue(startDate, null))
    setStatus(STATUS_IN_PROGRESS)
  }

  function finishGame(status = STATUS_LOST) {
    setGameEndDate(new Date())
    setStatus(status)
  }

  function resetGame() {
    setGameStartDate(null)
    setGameEndDate(null)
    setTimer(getTimerValue(null, null))
    setStatus(STATUS_PREVIEW)

    setIsCheckingNow(false)
    setPreviousCard(null)

    updateAchievements(false)
    setChancesCount(getChancesCount())
    setHasShowCardsHelper(true)
    setHasOpenPairHelper(true)
  }

  function helpShowCards() {
    if (!hasShowCardsHelper)
      return

    setStatus(STATUS_PREVIEW_HELPER)
    setTimerToStart(5)

    if (achievements.includes(2))
      updateAchievements(true)

    let time = previewSeconds

    const intervalId = setInterval(() => {
      if (time > 1) {
        --time
        return setTimerToStart(time)
      }

      clearInterval(intervalId)
      setStatus(STATUS_IN_PROGRESS)
      setHasShowCardsHelper(false)
    }, 1000)
  }

  function helpOpenPair() {
    if (!hasOpenPairHelper)
      return

    if (achievements.includes(2))
      updateAchievements(true)

    const closedCards = {}
    const usedSuits = []

    cards.forEach((card) => {
      if (card.open)
        return

      if (!closedCards[card.suit]) {
        closedCards[card.suit] = []
        usedSuits.push(card.suit)
      }

      if (!closedCards[card.suit].includes(card.rank))
        closedCards[card.suit].push(card.rank)
    })

    const suit = usedSuits[Math.floor(Math.random() * usedSuits.length)]
    const ranks = closedCards[suit]
    const rank = ranks.length === 1 ? ranks[0] : ranks[Math.floor(Math.random() * ranks.length)]

    console.log(`${suit} => ${rank}`)

    let openingCard = null

    cards.forEach((card) => {
      let opened = card.open

      if (!opened) {
        opened = card.suit === suit && card.rank === rank

        if (opened && !openingCard) {
          openingCard = card
          opened = false
        }
      }

      card.open = opened
    })

    openCard(openingCard)

    setHasOpenPairHelper(false)
  }

  /**
   * Обработка основного действия в игре - открытие карты.
   * После открытия карты игра может переходить в следующие состояния
   * - "Игрок выиграл", если на поле открыты все карты
   * - "Игрок проиграл", если на поле есть две открытые карты без пары
   * - "Игра продолжается", если не случилось первых двух условий
   */
  const openCard = (clickedCard) => {
    // Если карта уже открыта, то ничего не делаем
    if (clickedCard.open || isCheckingNow)
      return

    if (previousCard)
      setIsCheckingNow(true)

    // Игровое поле после открытия выбранной карты
    const nextCards = cards.map((card) => {
      if (card.id !== clickedCard.id)
        return card

      return {
        ...card,
        open: true,
      }
    })

    setCards(nextCards)

    const isPlayerWon = nextCards.every((card) => card.open)

    // Победа - все карты на поле открыты
    if (isPlayerWon)
      return finishGame(STATUS_WON)

    // Открытые карты на игровом поле
    const openCards = nextCards.filter((card) => card.open)

    // Ищем открытые карты, у которых нет пары среди других открытых
    const openCardsWithoutPair = openCards.filter((card) => {
      const sameCards = openCards.filter((openCard) => card.suit === openCard.suit && card.rank === openCard.rank)

      return sameCards.length < 2
    })

    switch (openCardsWithoutPair.length) {
      case 0:
        // "Игрок нашёл пару", т.к. на поле есть только пары одинаковых открытых карт
        setIsCheckingNow(false)
        return setPreviousCard(null)
      case 1:
        // "Игрок ищет пару", т.к. на поле есть нечётное количество открытых карт
        return setPreviousCard(clickedCard)
    }

    setChancesCount(chancesCount - 1)

    // "Игрок проиграл", т.к. на поле есть две открытые карты без пары
    if (chancesCount <= 1)
      return finishGame(STATUS_LOST)

    setPreviousCard(null)

    // Выбранные карты переворачиваем обратно
    setTimeout(() => {
      const nextCards = cards.map((card) => ({
        ...card,
        open: card.open && card.id !== clickedCard.id && card.id !== previousCard.id,
      }))

      setIsCheckingNow(false)
      setCards(nextCards)
    }, 800)
  }

  const isGameEnded = status === STATUS_LOST || status === STATUS_WON

  // Игровой цикл
  useEffect(() => {
    // В статусах кроме превью доп. логики не требуется
    if (status !== STATUS_PREVIEW)
      return

    if (pairsCount > 36)
      return alert("Столько пар сделать невозможно")

    setCards(() => {
      return shuffle(generateDeck(pairsCount))
    })

    let time = previewSeconds

    const intervalId = setInterval(() => {
      if (time > 1) {
        --time
        return setTimerToStart(time)
      }

      clearInterval(intervalId)
      startGame()
    }, 1000)
  }, [status, pairsCount, previewSeconds])

  // Обновляем значение таймера в интервале
  useEffect(() => {
    if (status === STATUS_LOST || status === STATUS_WON)
      return

    const intervalId = setInterval(() => {
      setTimer(getTimerValue(gameStartDate, gameEndDate))
    }, 300)
    return () => {
      clearInterval(intervalId)
    }
  }, [gameStartDate, gameEndDate])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {
          status === STATUS_PREVIEW || status === STATUS_PREVIEW_HELPER
            ? (
              <div className={styles.previewTimer}>
                <p className={styles.previewText}>Запоминайте пары!</p>
                <p className={styles.previewDescription}>
                  {`Игра ${status === STATUS_PREVIEW ? "начнётся" : "продолжится"} ${printTimer(timerToStart)}`}
                </p>
              </div>
            )
            : (
              <>
                <TimeLabel minutes={timer.minutes} seconds={timer.seconds} />

                {
                  status === STATUS_IN_PROGRESS
                    && (
                      <div className={styles.helpers}>
                        <Helpers hasSeeing={hasShowCardsHelper} hasOpening={hasOpenPairHelper} showCards={helpShowCards} openPair={helpOpenPair} />
                      </div>
                    )
                }
              </>
            )
        }

        {
          status === STATUS_IN_PROGRESS
            && (
              <div className={styles.right}>
                <Button onClick={resetGame}>Начать заново</Button>
              </div>
            )
        }
      </div>

      <div className={styles.cards}>
        {
          cards.map((card) => (
            <Card key={card.id} onClick={() => openCard(card)} open={status !== STATUS_IN_PROGRESS ? true : card.open} suit={card.suit} rank={card.rank} />
          ))
        }
      </div>
      {
        useChances && chancesCount > 0
          && <p className={cn(styles.chances, styles[chooseColorName(chancesCount)])}>{printTries(chancesCount)}</p>
      }

      {
        isGameEnded
          && (
            <div className={styles.modalContainer}>
              <EndGameModal isWon={status === STATUS_WON} achievements={achievements} gameDurationMinutes={timer.minutes} gameDurationSeconds={timer.seconds} onClick={resetGame} />
            </div>
          )
      }
    </div>
  )
}
