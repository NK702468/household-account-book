import { ChangeEvent, useEffect, useReducer, useState } from 'react'
import { useLocalStorage } from '../useLocalStorage'
import Budget from '../components/Budget'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'
import { ROUTES } from '../ROUTES'
import { Link } from 'react-router-dom'

export type Expense = {
    id: number
    amount: number
    category:string
    checked: boolean
    type: "fixed" | "variable" | null
  }
export default function ExpensePage() {
  const [variableValue, setVariableValue] = useState("");
    const [fixedValue, setFixedValue] = useState("");
    const [expenseType, setExpenseType] = useState<"fixed" | "variable" | null>(null)
    const [costValue, setCostValue] = useState(0);
    const [inputBudget, setInputBudget] = useState("");
    const [budget, setBudget] = useLocalStorage("budget", 0);
    const [currentMonth, setCurrentMonth] = useState(() => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      return `${year}-${String(month).padStart(2, "0")}`
    })
  
    const handleBudget = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
      setInputBudget(e.target.value);
    }
  
    const addBudget = () => {
      setBudget(Number(inputBudget));
    }
  
    const handleFixed = (e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
      setFixedValue(e.target.value);
      setExpenseType("fixed");
    }
  
    const handleVariable = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
      setVariableValue(e.target.value);
      setExpenseType("variable");
    }
  
    const handleCostValue = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
      setCostValue(Number(e.target.value));
    }
  
    type State = {
      expenses:Expense[]
    }
  
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
  
    const handleADD = () => {
      const newExpense: Expense = {
        id:Date.now(),
        amount: costValue,
        category:expenseType === "fixed"
          ? fixedValue
          :variableValue,
        checked: false,
        type: expenseType
      }
  
      dispatch({type:"ADD", payload:newExpense});
  
      setVariableValue("");
      setFixedValue("");
      setExpenseType(null);
      setCostValue(0);
      console.log(state.expenses);
    }
  
    const handleChecked = (id: number) => {
      dispatch({type: "CHECK", payload: id})
    }
  
    useEffect(() => {
    if (!fixedValue && !variableValue) {
      setExpenseType(null);
    }
  }, [fixedValue, variableValue]);
  
    const total = state.expenses.reduce((sum, expense) => {
      return sum + expense.amount
    }, 0)
  
    const remaining = budget - total;
  
    return (
      <>
      <input type="month" value={currentMonth} onChange={(e) => setCurrentMonth(e.target.value)}/>
  
      <h1>家計簿</h1>
  
      <Budget onChange={handleBudget} remaining={remaining} onClick={addBudget}/>
  
      <ExpenseForm
        fixedValue={fixedValue}
        variableValue={variableValue}
        costValue={costValue}
        expenseType={expenseType}
        onFixedChange={handleFixed}
        onVariableChange={handleVariable}
        onCostChange={handleCostValue}
        />
  
      <button type="button" onClick={() => handleADD()}>追加</button>
      <button type="button" onClick={() => dispatch({type: "DELETE"})}>削除</button>
  
      <ExpenseList expenses={state.expenses} onChange={handleChecked} />
      <Link to={ROUTES.HOME}>ホームページへ</Link>
      <Link to={ROUTES.GRAPH}>グラフへ</Link>
      </>
    )
}