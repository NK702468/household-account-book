import { ChangeEvent, useEffect, useState } from 'react'
import { useLocalStorage } from '../useLocalStorage'
import Budget from '../components/Budget'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'
import { ROUTES } from '../ROUTES'
import { Link } from 'react-router-dom'
import { State } from "../App"

type Props = {
  state: State
  dispatch: React.Dispatch<any>;
  currentMonth: string
  setCurrentMonth: React.Dispatch<React.SetStateAction<string>>
}

export type Expense = {
    id: number
    amount: number
    category:string
    checked: boolean
    type: "fixed" | "variable" | null
    month: string
  }

export default function ExpensePage({state, dispatch, currentMonth, setCurrentMonth}: Props) {
    const [variableValue, setVariableValue] = useState("");
    const [fixedValue, setFixedValue] = useState("");
    const [expenseType, setExpenseType] = useState<"fixed" | "variable" | null>(null)
    const [costValue, setCostValue] = useState(0);
    const [inputBudget, setInputBudget] = useState("");
    const [budget, setBudget] = useLocalStorage("budget", 0);
  
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
  
    const handleADD = () => {

      if (!expenseType) return;
      if (!costValue || costValue <= 0) return;

      const newExpense: Expense = {
        id:Date.now(),
        amount: costValue,
        category:expenseType === "fixed"
          ? fixedValue
          :variableValue,
        checked: false,
        type: expenseType,
        month: currentMonth
      }
  
      dispatch({type:"ADD", payload:newExpense});
  
      setVariableValue("");
      setFixedValue("");
      setExpenseType(null);
      setCostValue(0);
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