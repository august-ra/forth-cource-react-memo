import { createBrowserRouter } from "react-router-dom"
import { GamePage } from "./pages/GamePage/GamePage"
import { LeaderboardPage } from "./pages/LeaderboardPage/LeaderboardPage"
import { SelectLevelPage } from "./pages/SelectLevelPage/SelectLevelPage"


export const router = createBrowserRouter(
  [
    {
      path:    "/",
      element: <SelectLevelPage />,
    },
    {
      path:    "/game",
      element: <GamePage value={2} />,
    },
    {
      path:    "/game/:pairsCount",
      element: <GamePage />,
    },
    {
      path:    "/leaderboard",
      element: <LeaderboardPage />,
    },
  ],
  /**
   * basename нужен для корректной работы в GitHub Pages
   * он же указан в homepage package.json и в index.html
   */
  { basename: "/react-memo" },
)
