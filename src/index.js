import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import "./index.css"
import { ChancesProvider } from "./context/ChancesContext/ChancesContext"


const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <React.StrictMode>
    <ChancesProvider>
      <RouterProvider router={router} />
    </ChancesProvider>
  </React.StrictMode>,
)
