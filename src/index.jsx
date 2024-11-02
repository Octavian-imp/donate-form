import "@/index.scss"
import React from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, HashRouter } from "react-router-dom"
import App from "./App"
import PrepareQueryPage from "./PrepareQueryPage"
import routes from "./routes"

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <App />,
  },
  {
    path: routes.prepareQuery,
    element: <PrepareQueryPage />,
  },
])

createRoot(document.getElementById("root")).render(
  <HashRouter router={router} />
)
