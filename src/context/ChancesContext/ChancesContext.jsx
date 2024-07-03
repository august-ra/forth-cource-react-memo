import { createContext, useState } from "react"


export const ChancesContext = createContext(null)

export function ChancesProvider({ children }) {
  const [useChances, setUseChances] = useState(null)

  function selectChances(value) {
    setUseChances(value)
  }

  return <ChancesContext.Provider value={{ useChances, selectChances }}>{children}</ChancesContext.Provider>
}
