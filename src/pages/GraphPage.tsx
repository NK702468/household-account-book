import { Link } from "react-router-dom"
import { ROUTES } from "../ROUTES"


type Props = {}

export default function GraphPage({}: Props) {
  return (
    <div>
      GraphPage
      <Link to={ROUTES.EXPENSE}>記録へ</Link>
      <Link to={ROUTES.HOME}>ホームページへ</Link>
    </div>
  )
}