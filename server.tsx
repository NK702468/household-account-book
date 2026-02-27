import { useState } from "react"


type Props = {}

export default function server({}: Props) {
    const [transactions, settTransactions] = useState<object[]>([])
  return (
    <div>server</div>
  )
}