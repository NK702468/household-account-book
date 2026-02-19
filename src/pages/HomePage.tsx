import { Link } from "react-router-dom"
import { ROUTES } from "../ROUTES"

type Props = {}

export default function HomePage({}: Props) {
  return (
    <div>
        HomePage
        <Link to={ROUTES.EXPENSE}>記録へ</Link>
        <Link to={ROUTES.GRAPH}>グラフへ</Link>
    </div>
  )
}