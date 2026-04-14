import { ChangeEvent, useEffect, useState } from 'react'
import Budget from '../components/Budget'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'
import { ROUTES } from '../ROUTES'
import { Link } from 'react-router-dom'
import { State } from "../App"
import styles from "../styles/ExpensePage.module.css"


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

  type ExpenseServer = {
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
    const [budget, setBudget] = useState<number | null>(null);
  
    const handleBudget = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
      setInputBudget(e.target.value);
    }

    useEffect(() => {
      const fetchBudget = async () => {
        const res = await fetch(`https://household-backend-1ncg.onrender.com/budget/${currentMonth}`);
        const data = await res.json();
        setBudget(data.amount);
      };

      fetchBudget();
    }, [currentMonth])

    useEffect(() => {
          const fetchTransactions = async () => {
            const res = await fetch(`https://household-backend-1ncg.onrender.com/transactions?month=${currentMonth}`)
    
            const data : Expense[] = await res.json()
    
            dispatch({type: "SET_ALL", payload: data})
          }
    
          fetchTransactions()
        },[currentMonth])
  
    const addBudget = async () => {
      const newBudget = Number(inputBudget);

      const res = await fetch("https://household-backend-1ncg.onrender.com/budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          month: currentMonth,
          amount: newBudget
        })
      })

      const data = await res.json();
      setBudget(data.amount);
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
  
    const handleADD = async() => {

      if (!expenseType) return;
      if (!costValue || costValue <= 0) return;

      const newExpense: ExpenseServer = {
        amount: costValue,
        category:expenseType === "fixed"
          ? fixedValue
          :variableValue,
        checked: false,
        type: expenseType,
        month: currentMonth
      }

      const response = await fetch("https://household-backend-1ncg.onrender.com/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newExpense)
      });

      const saveExpense: Expense = await response.json();
  
      dispatch({type:"ADD", payload:saveExpense});
  
      setVariableValue("");
      setFixedValue("");
      setExpenseType(null);
      setCostValue(0);
    }

    const handleDelete = async () => {
      console.log("削除クリック");
      const res = await fetch("https://household-backend-1ncg.onrender.com/transactions", {
        method: "DELETE"
      });

      const data = await res.json();

      console.log("DELETE後", data);
      
      dispatch({type: "SET_ALL", payload: data});
    }
  
    const handleChecked = async (id: number) => {

      const response = await fetch(`https://household-backend-1ncg.onrender.com/transactions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const updatedExpense: Expense = await response.json();

      dispatch({type: "CHECK", payload: updatedExpense.id})
    }
  
    useEffect(() => {
    if (!fixedValue && !variableValue) {
      setExpenseType(null);
    }

  }, [fixedValue, variableValue]);

    const filteredExpenses = state.expenses.filter(
      expense => expense.month === currentMonth
    )
  
    const total = filteredExpenses.reduce((sum, expense) => {
      return sum + expense.amount
    }, 0)

    
  
    const remaining = (budget ?? 0) - total;
  
    return (
      <>
  <div className={styles.page}>
      <header className={styles.pageHeader}>
        <h1>家計簿</h1>
        <input
          type="month"
          value={currentMonth}
          onChange={(e) => setCurrentMonth(e.target.value)}
          className={styles.monthInput}
        />
      </header>

      <div className={styles.topGrid}>
        <section className={styles.card}>
          <h2>予算設定</h2>
          <Budget
            onChange={handleBudget}
            remaining={remaining}
            onClick={addBudget}
          />
        </section>

        <section className={styles.card}>
          <h2>支出を追加</h2>
          <ExpenseForm
            fixedValue={fixedValue}
            variableValue={variableValue}
            costValue={costValue}
            expenseType={expenseType}
            onFixedChange={handleFixed}
            onVariableChange={handleVariable}
            onCostChange={handleCostValue}
          />

          <div className={styles.buttonRow}>
            <button
              type="button"
              className={styles.addButton}
              onClick={handleADD}
            >
              追加
            </button>
            <button
              type="button"
              className={styles.deleteButton}
              onClick={handleDelete}
            >
              削除
            </button>
          </div>
        </section>
      </div>

      <section className={styles.card}>
        <h2>支出一覧</h2>
        <ExpenseList expenses={filteredExpenses} onChange={handleChecked} />
      </section>

      <nav className={styles.linkRow}>
        <Link to={ROUTES.HOME}>ホームページへ</Link>
        <Link to={ROUTES.GRAPH}>グラフへ</Link>
      </nav>
    </div>
    </>
    )
}