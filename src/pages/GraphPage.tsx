import { Link } from "react-router-dom"
import { ROUTES } from "../ROUTES"
import { State } from "../App"

type Props = {
  state:State
}

export default function GraphPage({state}: Props) {
  const total = state.expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  },0)

  return (
    <div>
      {total}

      <Link to={ROUTES.HOME}>HomePageへ</Link>
      <Link to={ROUTES.EXPENSE}>ExpensePageへ</Link>
    </div>
  )
}