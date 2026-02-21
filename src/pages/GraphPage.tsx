import { Link } from "react-router-dom"
import { ROUTES } from "../ROUTES"
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts"


type Props = {}

export default function GraphPage({}: Props) {
  const data: object[] = [
    {name: "リンゴ", storeA: 150, storeB: 50},
    {name: "バナナ", storeA: 100, storeB: 30}
  ];

  return (
    <div>
      <BarChart width={400} height={300} data={data}>
        <XAxis dataKey="name"/>
        <YAxis />
        <Tooltip />
        <Bar dataKey="storeA" />
        <Bar dataKey="storeB" />
      </BarChart>
      <Link to={ROUTES.EXPENSE}>記録へ</Link>
      <Link to={ROUTES.HOME}>ホームページへ</Link>
    </div>
  )
}