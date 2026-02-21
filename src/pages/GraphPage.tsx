import { Link } from "react-router-dom"
import { ROUTES } from "../ROUTES"
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts"


type Props = {}

export default function GraphPage({}: Props) {
  const data: object[] = [
    {month: "1月", storeA: 400, storeB: 200},
    {month: "2月", storeA: 500, storeB: 300},
    {month: "3月", storeA: 700, storeB: 800}
  ];

  return (
    <div>
      <BarChart width={400} height={300} data={data}>
        <XAxis dataKey="month"/>
        <YAxis />
        <Tooltip />
        <Bar dataKey="storeA" stackId="a"/>
        <Bar dataKey="storeB" stackId="a"/>
      </BarChart>
      <Link to={ROUTES.EXPENSE}>記録へ</Link>
      <Link to={ROUTES.HOME}>ホームページへ</Link>
    </div>
  )
}