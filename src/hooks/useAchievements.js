import { useState } from "react"


export function useAchievements(pairsCount) {
  const [achievements, setAchievements] = useState(pairsCount >= 9 ? [1, 2] : [2])

  function updateAchievements(usedHelper) {
    if (pairsCount >= 9 && !usedHelper)
      setAchievements([1, 2])
    else if (pairsCount >= 9)
      setAchievements([1])
    else if (!usedHelper)
      setAchievements([2])
    else
      setAchievements([])
  }

  return { achievements, updateAchievements }
}
