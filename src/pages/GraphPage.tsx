import { Link } from "react-router-dom"
import { ROUTES } from "../ROUTES"
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts"


type Props = {}

export default function GraphPage({}: Props) {
  const data: object[] = [
    {month: "1月", sales: 400},
    {month: "2月", sales: 300},
    {month: "3月", sales: 500}
  ];

  return (
    <div>
      <BarChart width={400} height={300} data={data}>
        <XAxis dataKey="month"/>
        <YAxis />
        <Tooltip />
        <Bar dataKey="sales"/>
      </BarChart>
      <Link to={ROUTES.EXPENSE}>記録へ</Link>
      <Link to={ROUTES.HOME}>ホームページへ</Link>
    </div>
  )
}