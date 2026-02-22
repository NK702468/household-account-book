import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import GraphPage from "./pages/GraphPage"
import ExpensePage from "./pages/ExpensePage"
import "./App.css"
import { ROUTES } from "./ROUTES"
import { Expense } from "./pages/ExpensePage";
import { useEffect, useReducer } from "react"

export type State = {
      expenses:Expense[]
    }
  
    
  
function App() {
  
    const initialState: State = {
      expenses: []
    }
  
    type Action = 
    | {type: "ADD", payload: Expense}
    | {type:"CHECK",payload: number}
    | {type: "DELETE"}
    
    const reducer = (state: State, action: Action) => {
      switch(action.type){
        case "ADD":
          return {
            ...state,
            expenses: [...state.expenses, action.payload]
          }
        
        case "CHECK":
          return {
            ...state,
            expenses: state.expenses.map((expense) => {
              if(expense.id === action.payload){
                return {...expense, checked: !expense.checked};
              }
              return expense;
            })
          }
  
        case "DELETE":
          return {
            ...state,
            expenses: state.expenses.filter((expense)=> expense.checked != true)
          }
  
         default:
          return state;
      }
    }
  
    
    const init = (initialState: State): State => {
      if(typeof window === "undefined"){
        return initialState
      }
      const jsonValue = localStorage.getItem("expenses");
      if(jsonValue !== null) {
        return JSON.parse(jsonValue) as State;
      }
      return initialState;
    }

  const [state, dispatch] = useReducer(reducer, initialState, init);
  
    useEffect(() => {
      localStorage.setItem("expenses", JSON.stringify(state))
    }, [state])

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />}/>
        <Route path={ROUTES.EXPENSE} element={<ExpensePage state={state} dispatch={dispatch}/>}/>
        <Route path={ROUTES.GRAPH} element={<GraphPage state={state}/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
