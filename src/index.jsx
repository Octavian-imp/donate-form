import "@/index.scss"
import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "./App"
import PrepareQueryPage from "./PrepareQueryPage"
import routes from "./routes"

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename={process.env.basename}>
    <Routes>
      <Route path={routes.home} element={<App />} />
      <Route path={routes.prepareQuery} element={<PrepareQueryPage />} />
    </Routes>
  </BrowserRouter>
)
