import { Link } from "react-router-dom"
import { ROUTES } from "../ROUTES"
import { State } from "../App"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type Props = {
  state:State
}

export default function GraphPage({state}: Props) {
  const total = state.expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  },0)

  const data = [
    {name: "合計支出", total: total}
  ];
  return (
    <div style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name"/>
          <YAxis />
          <Tooltip />
          <Bar dataKey="total"/>
        </BarChart>
      </ResponsiveContainer>

      <Link to={ROUTES.EXPENSE}>ExpensePageへ</Link>
      <Link to={ROUTES.HOME}>HomePageへ</Link>
    </div>
  )
}