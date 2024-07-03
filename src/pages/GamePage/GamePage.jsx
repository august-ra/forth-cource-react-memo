import { useParams } from "react-router-dom"
import { Cards } from "../../components/Cards/Cards"


export function GamePage({ value }) {
  const { pairsCount = value } = useParams()

  return (
    <Cards pairsCount={parseInt(pairsCount, 10)} previewSeconds={5} />
  )
}
