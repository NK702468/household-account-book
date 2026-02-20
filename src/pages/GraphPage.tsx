import { Link } from "react-router-dom"
import { ROUTES } from "../ROUTES"
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts"


type Props = {}

export default function GraphPage({}: Props) {
  const data: object[] = [
    {name: "リンゴ", price: 150},
    {name: "バナナ", price: 100}
  ];
  
  return (
    <div>
      <BarChart width={400} height={300} data={data}>
        <XAxis dataKey="name"/>
        <YAxis />
        <Tooltip />
        <Bar dataKey="price"/>
      </BarChart>
      <Link to={ROUTES.EXPENSE}>記録へ</Link>
      <Link to={ROUTES.HOME}>ホームページへ</Link>
    </div>
  )
}