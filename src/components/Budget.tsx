
type BudgetProps = {
    remaining:number
    onChange:(e: React.ChangeEvent<HTMLInputElement>) => void
    onClick:() => void
}

export default function Budget({remaining, onChange, onClick}: BudgetProps) {
  return (
    <div>
        <input type="text" className="inputBudget" onChange={onChange} />
        <button onClick={onClick} >予算を追加</button>
        <h2>{remaining}</h2>
    </div>
  )
}