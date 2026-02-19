import { Expense } from "../pages/ExpensePage"

type ExpenseListProps = {
    expenses: Expense[]
    onChange: (id: number) => void
}

export default function ExpenseList({expenses, onChange}: ExpenseListProps) {
  return (
    <div>
        <ul>
      {expenses.map((expense) => {
        return <li key={expense.id}>
          <input type="text" value={expense.category} disabled={!expense.checked} />
          {`¥${expense.amount}`}
          <input type="checkbox" checked={expense.checked} onChange={() => onChange(expense.id)} />
        </li>
      })}
    </ul>
    </div>
  )
}