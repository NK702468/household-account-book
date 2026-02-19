import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ExpensePage from "./pages/ExpensePage"
import GraphPage from "./pages/GraphPage"
import "./App.css"
import { ROUTES } from "./ROUTES"

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />}/>
        <Route path={ROUTES.EXPENSE} element={<ExpensePage />}/>
        <Route path={ROUTES.GRAPH} element={<GraphPage />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
