import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ExpensePage from "./pages/ExpensePage"
import GraphPage from "./pages/GraphPage"
import "./App.css"

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/expense" element={<ExpensePage />}/>
        <Route path="/graph" element={<GraphPage />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
