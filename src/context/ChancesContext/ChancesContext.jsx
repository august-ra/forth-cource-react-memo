import { createContext, useState } from "react"


export const ChancesContext = createContext(null)

export function ChancesProvider({ children }) {
  const [useChances, setUseChances] = useState(null)

  function selectChances(value) {
    setUseChances(value)
  }

  function getChancesCount() {
    return useChances ? 3 : 0
  }

  return <ChancesContext.Provider value={{ useChances, selectChances, getChancesCount }}>{children}</ChancesContext.Provider>
}
