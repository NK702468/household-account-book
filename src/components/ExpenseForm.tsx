
type ExpenseFormProps = {
    fixedValue: string
    variableValue: string
    costValue: number
    expenseType: "fixed" | "variable" | null
    onFixedChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    onVariableChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onCostChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ExpenseForm({
    fixedValue,
    variableValue,
    costValue,
    expenseType,
    onFixedChange,
    onVariableChange,
    onCostChange,
}: ExpenseFormProps) {
  return (
    <>
    <div className="Fixed">
      固定費：
    <select name="fixed" onChange={onFixedChange} disabled={expenseType === "variable"} value={fixedValue}>
      <option value="">選んでください</option>
      <option value="家賃">家賃</option>
      <option value="光熱費">光熱費</option>
      <option value="通信費">通信費</option>
      <option value="保険料">保険料</option>
    </select>
    </div>
    <div className="Variable">
      変動費：
      <input type="text" className="inputVariable" onChange={onVariableChange} disabled={expenseType === "fixed"} value={variableValue} />
    </div>
    <div className="Cost">
      金額：
      <input type="number" className="cost" onChange={onCostChange} value={costValue === 0 ? "" : costValue}/>
    </div>
    </>
  )
}